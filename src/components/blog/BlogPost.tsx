import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface BlogPostProps {
  title: string;
  content: string;
  date: string;
  author?: string;
}

export function BlogPost({ title, content, date, author }: BlogPostProps) {
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
          {title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
          <time dateTime={date}>
            {format(new Date(date), 'MMMM d, yyyy')}
          </time>
          {author && (
            <>
              <Separator orientation="vertical" className="h-4" />
              <span>by {author}</span>
            </>
          )}
        </div>
      </header>
      <div 
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
} 