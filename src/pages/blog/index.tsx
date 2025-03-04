import React, { useState, useEffect } from 'react';
import { BlogList } from '@/components/blog/BlogList';
import { Layout } from '@/components/layout/Layout';
import { getAllPosts, BlogPost } from '@/lib/blog';
import { useLocation } from 'react-router-dom';

export default function BlogPage() {
  const location = useLocation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Debug log
  console.log('Blog page rendered with location:', location);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="backdrop-blur-sm bg-white/50 dark:bg-neutral-800/50 p-8 rounded-2xl border border-white/20 dark:border-neutral-700/20">
          <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Blog</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Thoughts on product design, development, and technology.
          </p>
        </div>
        {loading ? (
          <div className="text-center py-8">Loading posts...</div>
        ) : (
          <BlogList posts={posts} />
        )}
      </div>
    </Layout>
  );
} 