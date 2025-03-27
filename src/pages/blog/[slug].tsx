import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogPost } from '@/components/blog/BlogPost';
import { Layout } from '@/components/layout/Layout';
import { getPostBySlug, BlogPost as BlogPostType } from '@/lib/blog';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { NewsletterSubscribe } from '@/components/blog/NewsletterSubscribe';

export default function BlogPostPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { slug } = params;
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log("BlogPostPage params:", params);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("Fetching post with slug:", slug);
        if (slug) {
          const fetchedPost = await getPostBySlug(slug);
          console.log("Fetched post:", fetchedPost);
          setPost(fetchedPost);
          if (!fetchedPost) {
            setError(`Post with slug '${slug}' not found`);
          }
        } else {
          setError("No slug parameter found in URL");
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setError(`Error fetching post: ${error instanceof Error ? error.message : String(error)}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);
  
  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Layout>
        <div className="space-y-8">
          <div className="backdrop-blur-sm bg-white/50 dark:bg-neutral-800/50 p-8 rounded-2xl border border-white/20 dark:border-neutral-700/20">
            <div className="text-center py-8">Loading post...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="space-y-8">
          <div className="backdrop-blur-sm bg-white/50 dark:bg-neutral-900/80 p-8 rounded-2xl border border-white/20 dark:border-neutral-700/20">
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
            <p className="text-neutral-600 dark:text-neutral-300">
              {error || "The blog post you're looking for doesn't exist."}
            </p>
            <p className="text-neutral-600 dark:text-neutral-300 mt-4">
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
        <div className="backdrop-blur-sm bg-white/50 dark:bg-neutral-900/80 p-8 rounded-2xl border border-white/20 dark:border-neutral-700/20">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleBackClick}
            className="mb-6 text-neutral-600 dark:text-neutral-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <BlogPost {...post} />
          </div>
        </div>
        
        <NewsletterSubscribe />
      </div>
    </Layout>
  );
} 