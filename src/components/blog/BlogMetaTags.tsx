import React, { useEffect } from 'react';
import { BlogPost } from '@/lib/blog';

interface BlogMetaTagsProps {
  post: BlogPost;
}

/**
 * Component that dynamically updates meta tags for blog posts for social media sharing
 */
export function BlogMetaTags({ post }: BlogMetaTagsProps) {
  useEffect(() => {
    if (!post) return;

    // Update basic meta tags
    document.title = `${post.title} | Simon Bromander`;
    
    // Find and update or create description meta tag
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', post.excerpt);
    } else {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      descriptionMeta.setAttribute('content', post.excerpt);
      document.head.appendChild(descriptionMeta);
    }
    
    // OpenGraph tags
    updateMetaTag('og:title', post.title);
    updateMetaTag('og:description', post.excerpt);
    updateMetaTag('og:type', 'article');
    updateMetaTag('og:url', `https://simonbromander.com/#/blog/${post.slug}`);
    
    // Use the post thumbnail or fallback to default og image
    if (post.thumbnail) {
      const thumbnailUrl = post.thumbnail.startsWith('http') 
        ? post.thumbnail 
        : `https://simonbromander.com${post.thumbnail}`;
      updateMetaTag('og:image', thumbnailUrl);
    }
    
    // Article specific OG tags
    updateMetaTag('article:published_time', post.date);
    updateMetaTag('article:author', post.author);
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', post.title);
    updateMetaTag('twitter:description', post.excerpt);
    
    // Same for Twitter image as OG image
    if (post.thumbnail) {
      const thumbnailUrl = post.thumbnail.startsWith('http') 
        ? post.thumbnail 
        : `https://simonbromander.com${post.thumbnail}`;
      updateMetaTag('twitter:image', thumbnailUrl);
    }
    
    // Cleanup function to restore original meta tags when unmounting
    return () => {
      // Reset to default title and description
      document.title = 'Simon Bromander';
      updateMetaTag('description', 'Product Design & Strategy Lead focusing on innovative design tools and processes');
      updateMetaTag('og:title', 'Simon Bromander');
      updateMetaTag('og:description', 'Product Design & Strategy Lead focusing on innovative design tools and processes');
      updateMetaTag('og:type', 'website');
      updateMetaTag('og:url', 'https://simonbromander.com');
      updateMetaTag('og:image', '/og-image.png');
      updateMetaTag('twitter:card', 'summary_large_image');
      updateMetaTag('twitter:title', 'Simon Bromander');
      updateMetaTag('twitter:description', 'Product Design & Strategy Lead focusing on innovative design tools and processes');
      updateMetaTag('twitter:image', '/og-image.png');
      
      // Remove article specific tags
      removeMetaTag('article:published_time');
      removeMetaTag('article:author');
    };
  }, [post]);

  // Helper function to update meta tags
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
  };
  
  // Helper function to remove meta tags
  const removeMetaTag = (name: string) => {
    const isOg = name.startsWith('og:');
    const isTwitter = name.startsWith('twitter:');
    const isArticle = name.startsWith('article:');
    
    let selector: string;
    
    if (isOg || isArticle) {
      selector = `meta[property="${name}"]`;
    } else if (isTwitter) {
      selector = `meta[name="${name}"]`;
    } else {
      selector = `meta[name="${name}"]`;
    }
    
    const metaTag = document.querySelector(selector);
    if (metaTag) {
      metaTag.remove();
    }
  };

  // This component doesn't render anything visible
  return null;
} 