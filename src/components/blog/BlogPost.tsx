import React from 'react';
import { format, isValid, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface BlogPostProps {
  title: string;
  content: string;
  html?: string;
  date: string;
  author?: string;
  thumbnail?: string;
}

export function BlogPost({ title, content, html, date, author, thumbnail }: BlogPostProps) {
  // Safely format the date
  const formatDate = (dateString: string) => {
    try {
      const parsedDate = parseISO(dateString);
      if (isValid(parsedDate)) {
        return format(parsedDate, 'MMMM d, yyyy');
      }
      return dateString;
    } catch (e) {
      console.error('Error formatting date:', e);
      return dateString;
    }
  };

  return (
    <article className="prose prose-lg dark:prose-invert max-w-3xl">
      <header className="mb-8">
        {thumbnail && (
          <div className="mb-6 w-full max-h-96 overflow-hidden rounded-2xl">
            <img 
              src={thumbnail} 
              alt={title} 
              className="w-full object-cover rounded-2xl"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold text-neutral-800 dark:text-white mb-4">
          {title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-300">
          <time dateTime={date}>
            {formatDate(date)}
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
        className="prose prose-lg dark:prose-invert max-w-3xl [&>p]:dark:text-neutral-200 [&>ul]:dark:text-neutral-200 [&>ol]:dark:text-neutral-200 [&>h1]:dark:text-white [&>h2]:dark:text-white [&>h3]:dark:text-white [&>h4]:dark:text-white"
        dangerouslySetInnerHTML={{ __html: html || content }}
      />
    </article>
  );
} 