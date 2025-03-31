import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogPost } from '@/components/blog/BlogPost';
import { Layout } from '@/components/layout/Layout';
import { getPostBySlug, BlogPost as BlogPostType } from '@/lib/blog';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { NewsletterSubscribe } from '@/components/blog/NewsletterSubscribe';
import { BlogMetaTags } from '@/components/blog/BlogMetaTags';
import { setOpenGraphTags, getAbsoluteImageUrl } from '@/lib/thumbnails';

export default function BlogPostPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { slug } = params;
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const refreshTimerRef = useRef<number | null>(null);

  console.log("BlogPostPage params:", params);
  
  // Helper function to update meta tags directly
  const updateMetaTag = (name: string, content: string) => {
    // Handle OpenGraph and Twitter tags differently
    const isOg = name.startsWith('og:');
    const isTwitter = name.startsWith('twitter:');
    const isArticle = name.startsWith('article:');
    
    let selector: string;
    let createAttributes: Record<string, string>;
    
    if (isOg || isArticle) {
      selector = `meta[property="${name}"]`;
      createAttributes = { property: name, content };
    } else if (isTwitter) {
      selector = `meta[name="${name}"]`;
      createAttributes = { name, content };
    } else {
      selector = `meta[name="${name}"]`;
      createAttributes = { name, content };
    }
    
    // Try to find existing tag
    let metaTag = document.querySelector(selector);
    
    // Update or create meta tag
    if (metaTag) {
      metaTag.setAttribute('content', content);
    } else {
      metaTag = document.createElement('meta');
      for (const [attr, value] of Object.entries(createAttributes)) {
        metaTag.setAttribute(attr, value);
      }
      document.head.appendChild(metaTag);
    }
    
    // Add a special comment to help with server-side rendering
    // This allows us to track which meta tags have been set by this component
    const comment = document.createComment(`meta:${name}:dynamic`);
    document.head.appendChild(comment);
  };
  
  // Helper function to get absolute URL
  const getAbsoluteUrl = (url: string): string => {
    if (url.startsWith('http')) return url;
    
    // If it's a relative URL starting with / use the origin
    if (url.startsWith('/')) {
      return `https://simonbromander.com${url}`;
    }
    
    // If it's a relative URL without /, use origin + /
    return `https://simonbromander.com/${url}`;
  };
  
  // Helper function to add preload link for images
  const addPreloadLink = (url: string) => {
    // Remove any existing preload links
    const existingLinks = document.querySelectorAll('link[rel="preload"][as="image"]');
    existingLinks.forEach(link => link.remove());
    
    // Create new preload link
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = 'image';
    link.setAttribute('fetchpriority', 'high');
    document.head.appendChild(link);
    console.log("Added preload link for:", url);
  };

  const fetchPost = async (isRetry = false) => {
    try {
      setLoading(true);
      if (isRetry) {
        console.log(`Retrying post fetch for slug '${slug}' (attempt ${retryCount + 1} of ${maxRetries})...`);
      } else {
        console.log("Fetching post with slug:", slug);
      }
      
      if (slug) {
        const fetchedPost = await getPostBySlug(slug);
        console.log("Fetched post:", fetchedPost);
        
        // Debug the thumbnail
        if (fetchedPost) {
          console.log("Post thumbnail:", fetchedPost.thumbnail);
          
          // Set OpenGraph tags for the post
          if (fetchedPost.thumbnail) {
            // Ensure thumbnail has absolute URL if it exists
            if (!fetchedPost.thumbnail.startsWith('http') && !fetchedPost.thumbnail.startsWith('/')) {
              fetchedPost.thumbnail = `/${fetchedPost.thumbnail}`;
            }
            
            // Set OpenGraph tags with the thumbnail
            setOpenGraphTags(
              fetchedPost.title,
              fetchedPost.excerpt,
              fetchedPost.thumbnail,
              window.location.href
            );
          } else {
            // Fallback to default image
            setOpenGraphTags(
              fetchedPost.title,
              fetchedPost.excerpt,
              '/og-image.png',
              window.location.href
            );
          }
        }
        
        if (fetchedPost) {
          setPost(fetchedPost);
          // Reset error and retry count on success
          setError(null);
          setRetryCount(0);
        } else {
          setError(`Post with slug '${slug}' not found`);
          
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
              fetchPost(true);
            }, nextRetryDelay);
          }
        }
      } else {
        setError("No slug parameter found in URL");
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      setError(`Error fetching post: ${error instanceof Error ? error.message : String(error)}`);
      
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
          fetchPost(true);
        }, nextRetryDelay);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
    
    // Clean up any timers when component unmounts
    return () => {
      if (refreshTimerRef.current) {
        window.clearTimeout(refreshTimerRef.current);
      }
    };
  }, [slug]);
  
  const handleBackClick = () => {
    navigate(-1);
  };
  
  const handleManualRefresh = () => {
    // Reset retry count and fetch again
    setRetryCount(0);
    fetchPost();
  };

  if (loading) {
    return (
      <Layout>
        <div className="space-y-8">
          <div className="backdrop-blur-sm bg-white/50 dark:bg-neutral-800/50 p-8 rounded-2xl border border-neutral-200/60 dark:border-neutral-700/40">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleBackClick}
              className="mb-6 text-neutral-600 dark:text-neutral-300"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
            <div className="text-center py-8">
              <div className="inline-flex items-center space-x-2">
                <RefreshCw className="w-5 h-5 animate-spin text-blue-600 dark:text-blue-400" />
                <span>Loading post...</span>
              </div>
              {retryCount > 0 && (
                <p className="text-sm text-neutral-500 mt-2">
                  Retry attempt {retryCount} of {maxRetries}...
                </p>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="space-y-8">
          <div className="backdrop-blur-sm bg-white/50 dark:bg-neutral-900/80 p-8 rounded-2xl border border-neutral-200/60 dark:border-neutral-700/40">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleBackClick}
              className="mb-6 text-neutral-600 dark:text-neutral-300"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
            <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Post Not Found</h1>
            <p className="text-neutral-600 dark:text-neutral-300 mb-6">
              {error || "The blog post you're looking for doesn't exist."}
            </p>
            <div className="flex space-x-4">
              <Button onClick={handleManualRefresh} className="inline-flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Retry
              </Button>
              <Button variant="outline" onClick={handleBackClick} className="inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to All Posts
              </Button>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-6">
              URL parameters: {JSON.stringify(params)}
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="backdrop-blur-sm bg-white/50 dark:bg-neutral-900/80 p-8 rounded-2xl border border-neutral-200/60 dark:border-neutral-700/40">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleBackClick}
            className="mb-6 text-neutral-600 dark:text-neutral-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
          <BlogPost {...post} />
        </div>
        
        <NewsletterSubscribe />
      </div>
      {post && <BlogMetaTags post={post} />}
    </Layout>
  );
} 