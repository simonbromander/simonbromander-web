import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from 'date-fns';
import { Separator } from "@/components/ui/separator";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {posts.map((post) => (
        <Card key={post.id} className="hover:shadow-lg transition-shadow backdrop-blur-sm bg-white/50 dark:bg-neutral-800/50 border-white/20 dark:border-neutral-700/20">
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
              <a
                href={`#/blog/${post.slug}`}
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
              >
                Read more →
              </a>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 