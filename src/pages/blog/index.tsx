import React, { useState, useEffect, useRef } from 'react';
import { BlogList } from '@/components/blog/BlogList';
import { Layout } from '@/components/layout/Layout';
import { getAllPosts, BlogPost } from '@/lib/blog';
import { useLocation } from 'react-router-dom';
import { NewsletterSubscribe } from '@/components/blog/NewsletterSubscribe';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export default function BlogPage() {
  const location = useLocation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const refreshTimerRef = useRef<number | null>(null);

  // Debug log
  console.log('Blog page rendered with location:', location);

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
    fetchPosts();
    
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
    fetchPosts();
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