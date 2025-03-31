import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from 'date-fns';
import { Separator } from "@/components/ui/separator";
import useAnalytics from '@/hooks/useAnalytics';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  thumbnail?: string;
}

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  const { trackEvent } = useAnalytics();

  // Helper function to ensure the slug is clean (no template variables or paths)
  const cleanSlug = (dirtySlug: string): string => {
    // If it's a full path, extract just the filename
    if (dirtySlug.includes('/')) {
      dirtySlug = dirtySlug.split('/').pop() || dirtySlug;
    }
    // Remove .md extension if present
    dirtySlug = dirtySlug.replace(/\.md$/, '');
    // If it's just 'post', use a random string
    if (dirtySlug === 'post') {
      return 'post-' + Math.random().toString(36).substring(2, 10);
    }
    // If it contains template variables, use a random string
    if (dirtySlug.includes('{{') || dirtySlug.includes('}}')) {
      return 'post-' + Math.random().toString(36).substring(2, 10);
    }
    return dirtySlug;
  };

  const handlePostClick = (post: BlogPost) => {
    trackEvent('blog_post_click', {
      title: post.title,
      slug: post.slug,
      date: post.date,
      url: `#/blog/${cleanSlug(post.slug)}`
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {posts.map((post) => {
        const postUrl = `#/blog/${cleanSlug(post.slug)}`;
        return (
          <a 
            href={postUrl} 
            key={post.id} 
            className="block no-underline group"
            onClick={() => handlePostClick(post)}
          >
            <Card className="h-full hover:shadow-lg transition-shadow backdrop-blur-sm bg-white/50 dark:bg-neutral-800/50 border-neutral-200/60 dark:border-neutral-700/40">
              {post.thumbnail && (
                <div className="w-full h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={post.thumbnail} 
                    alt={post.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl text-neutral-800 dark:text-neutral-100">
                  {post.title}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                  <time dateTime={post.date}>
                    {format(new Date(post.date), 'MMMM d, yyyy')}
                  </time>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 dark:text-neutral-400">{post.excerpt}</p>
                <div className="mt-4">
                  <span className="inline-flex items-center text-blue-600 dark:text-blue-400 group-hover:underline">
                    Read more →
                  </span>
                </div>
              </CardContent>
            </Card>
          </a>
        );
      })}
    </div>
  );
} 