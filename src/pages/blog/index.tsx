import React, { useState, useEffect, useRef } from 'react';
import { BlogList } from '@/components/blog/BlogList';
import { Layout } from '@/components/layout/Layout';
import { getAllPosts, BlogPost } from '@/lib/blog';
import { useLocation } from 'react-router-dom';
import { NewsletterSubscribe } from '@/components/blog/NewsletterSubscribe';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

// Known blog posts - this ensures these will always be displayed even if the index is missing
const KNOWN_POSTS = [
  '2025-03-28-step-by-step-ai-prototyping.md',
  '2025-03-25-from-vibe-coding-to-vibe-prototyping.md',
  '2025-03-06-micro-apps-are-making-a-comebackjust-not-how-apple-imagined.md',
  '2024-11-01-building-trust-led-me-here.md',
  '2024-09-01-a-new-chapter.md'
];

// Function to check if a markdown file contains valid frontmatter
async function checkValidBlogPost(fileName: string): Promise<boolean> {
  try {
    const cacheBuster = `?t=${Date.now()}`;
    const response = await fetch(`/content/blog/${fileName}${cacheBuster}`);
    
    if (!response.ok) {
      console.warn(`File not accessible: ${fileName}`);
      return false;
    }
    
    const content = await response.text();
    
    // Check if it has frontmatter (starts with --- and has a second ---)
    const hasFrontmatter = content.startsWith('---') && content.indexOf('---', 3) > 0;
    if (!hasFrontmatter) {
      console.warn(`File missing frontmatter: ${fileName}`);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`Error checking blog post ${fileName}:`, error);
    return false;
  }
}

export default function BlogPage() {
  const location = useLocation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const refreshTimerRef = useRef<number | null>(null);
  const [clientScannedFiles, setClientScannedFiles] = useState<string[]>([]);

  // Debug log
  console.log('Blog page rendered with location:', location);

  // Client-side blog post scanning - this is a backup in case the blog index isn't working
  const scanBlogDirectory = async () => {
    try {
      console.log('Client-side scanning for blog posts...');
      const foundPosts: string[] = [];
      
      // First check all known posts
      for (const post of KNOWN_POSTS) {
        if (await checkValidBlogPost(post)) {
          foundPosts.push(post);
          console.log(`Client scan found known post: ${post}`);
        }
      }
      
      // If we found posts, update state
      if (foundPosts.length > 0) {
        console.log(`Client scan found ${foundPosts.length} blog posts`);
        setClientScannedFiles(foundPosts);
      }
    } catch (error) {
      console.error('Error during client-side blog scanning:', error);
    }
  };

  const fetchPosts = async (isRetry = false) => {
    try {
      setLoading(true);
      if (isRetry) {
        console.log(`Retrying blog posts fetch (attempt ${retryCount + 1} of ${maxRetries})...`);
      } else {
        console.log('Fetching blog posts...');
      }
      
      const fetchedPosts = await getAllPosts();
      
      // Filter out error posts (those with id starting with 'error-')
      const validPosts = fetchedPosts.filter(post => !post.id.startsWith('error-'));
      
      setPosts(validPosts);
      
      if (validPosts.length === 0) {
        console.warn('No valid posts returned from getAllPosts');
        setError('No blog posts found. Please try refreshing the page.');
        
        // If we have client-scanned files, try to use those
        if (clientScannedFiles.length > 0) {
          console.log(`Using ${clientScannedFiles.length} client-scanned files as fallback`);
          // Force a refresh with these files - they'll be picked up by the getAllPosts function
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
            fetchPosts(true);
          }, 500);
        }
        // Otherwise auto-retry if we haven't reached max retries
        else if (retryCount < maxRetries) {
          const nextRetryDelay = Math.pow(2, retryCount) * 1000; // Exponential backoff
          console.log(`Scheduling auto-retry in ${nextRetryDelay}ms...`);
          
          // Clear any existing timers
          if (refreshTimerRef.current) {
            window.clearTimeout(refreshTimerRef.current);
          }
          
          // Schedule a retry
          refreshTimerRef.current = window.setTimeout(() => {
            setRetryCount(prev => prev + 1);
            fetchPosts(true);
          }, nextRetryDelay);
        }
      } else {
        // Reset error and retry count on success
        setError(null);
        setRetryCount(0);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError(`Failed to load blog posts: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      // Auto-retry if we haven't reached max retries
      if (retryCount < maxRetries) {
        const nextRetryDelay = Math.pow(2, retryCount) * 1000; // Exponential backoff
        console.log(`Scheduling auto-retry in ${nextRetryDelay}ms...`);
        
        // Clear any existing timers
        if (refreshTimerRef.current) {
          window.clearTimeout(refreshTimerRef.current);
        }
        
        // Schedule a retry
        refreshTimerRef.current = window.setTimeout(() => {
          setRetryCount(prev => prev + 1);
          fetchPosts(true);
        }, nextRetryDelay);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // First scan the blog directory as a backup
    scanBlogDirectory().then(() => {
      // Then fetch posts normally
      fetchPosts();
    });
    
    // Clean up any timers when component unmounts
    return () => {
      if (refreshTimerRef.current) {
        window.clearTimeout(refreshTimerRef.current);
      }
    };
  }, []);
  
  const handleManualRefresh = () => {
    // Reset retry count and fetch again
    setRetryCount(0);
    // First scan the blog directory again
    scanBlogDirectory().then(() => {
      // Then fetch posts
      fetchPosts();
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="backdrop-blur-sm bg-white/50 dark:bg-neutral-800/50 p-8 rounded-2xl border border-neutral-200/60 dark:border-neutral-700/40">
          <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Blog</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Thoughts on product design, development, and technology.
          </p>
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center space-x-2">
              <RefreshCw className="w-5 h-5 animate-spin text-blue-600 dark:text-blue-400" />
              <span>Loading posts...</span>
            </div>
            {retryCount > 0 && (
              <p className="text-sm text-neutral-500 mt-2">
                Retry attempt {retryCount} of {maxRetries}...
              </p>
            )}
          </div>
        ) : error ? (
          <div className="backdrop-blur-sm bg-white/50 dark:bg-neutral-800/50 p-8 rounded-2xl border border-neutral-200/60 dark:border-neutral-700/40 text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <Button onClick={handleManualRefresh} className="inline-flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh Posts
            </Button>
          </div>
        ) : posts.length === 0 ? (
          <div className="backdrop-blur-sm bg-white/50 dark:bg-neutral-800/50 p-8 rounded-2xl border border-neutral-200/60 dark:border-neutral-700/40 text-center">
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              No blog posts found. Please check back later or refresh the page.
            </p>
            <Button onClick={handleManualRefresh} className="inline-flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh Posts
            </Button>
          </div>
        ) : (
          <BlogList posts={posts} />
        )}
        
        <NewsletterSubscribe />
      </div>
    </Layout>
  );
} 