import React from 'react';
import { Mail } from "lucide-react";
import { ExternalLink } from "lucide-react";

interface NewsletterSubscribeProps {
  title?: string;
  description?: string;
}

export function NewsletterSubscribe({
  title = "Subscribe to my newsletter",
  description = "Signing up is free, unsubscribe anytime."
}: NewsletterSubscribeProps) {
  return (
    <div className="backdrop-blur-sm bg-white/50 dark:bg-neutral-800/50 p-8 rounded-2xl border border-neutral-200/60 dark:border-neutral-700/40 space-y-6 w-full mt-12 mb-6 max-w-full">
      <div className="flex items-center space-x-4">
        <div className="p-2 rounded-lg bg-blue-100/50 dark:bg-blue-900/20">
          <Mail className="w-5 h-5 text-blue-700 dark:text-blue-300" />
        </div>
        <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
          {title}
        </h2>
      </div>
      
      <div className="space-y-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed">
          {description}
        </p>
        
        <div className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
          <p className="font-medium mb-2">What you'll get:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Practical UX & product design techniques</li>
            <li>Time-saving AI design workflows</li>
            <li>Product strategy frameworks for startups</li>
          </ul>
        </div>

        <div className="mb-2">
          <a 
            href="https://blog.simonbromander.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Read it first
          </a>
        </div>

        <div className="mt-4 px-1">
          <iframe 
            src="https://embeds.beehiiv.com/8cdc9299-9bcd-4890-88fd-6cbaac49c18a?slim=true" 
            data-test-id="beehiiv-embed" 
            height="60" 
            frameBorder="0" 
            scrolling="no" 
            style={{ 
              margin: 0, 
              borderRadius: 8, 
              backgroundColor: 'transparent', 
              width: '100%',
              maxWidth: '600px' 
            }}
          />
        </div>
        
        <p className="text-neutral-500 dark:text-neutral-500 text-xs italic">
          No spam, unsubscribe anytime. I typically send 1-2 emails per month with high-value content only.
        </p>
      </div>
    </div>
  );
} 