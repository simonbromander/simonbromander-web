// Utility functions for working with thumbnails and OpenGraph images

/**
 * Converts a relative image path to an absolute URL
 */
export function getAbsoluteImageUrl(url: string): string {
  if (url.startsWith('http')) return url;
  
  // If it's a relative URL starting with / use the origin
  if (url.startsWith('/')) {
    return `https://simonbromander.com${url}`;
  }
  
  // If it's a relative URL without /, use origin + /
  return `https://simonbromander.com/${url}`;
}

/**
 * Sets OpenGraph meta tags for social media sharing
 */
export function setOpenGraphTags(
  title: string, 
  description: string, 
  imageUrl: string, 
  url: string = window.location.href,
  type: string = 'article'
): void {
  const tags = {
    'og:title': title,
    'og:description': description,
    'og:image': getAbsoluteImageUrl(imageUrl),
    'og:image:width': '1200',
    'og:image:height': '630', 
    'og:url': url,
    'og:type': type,
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': getAbsoluteImageUrl(imageUrl)
  };
  
  // Update all tags
  Object.entries(tags).forEach(([name, content]) => {
    updateMetaTag(name, content);
  });
  
  // Add preload link for the image to ensure it loads quickly
  addPreloadLink(getAbsoluteImageUrl(imageUrl));
  
  console.log('Set OpenGraph tags with image:', getAbsoluteImageUrl(imageUrl));
}

/**
 * Helper function to update meta tags in the DOM
 */
function updateMetaTag(name: string, content: string): void {
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
}

/**
 * Adds a preload link for an image
 */
function addPreloadLink(url: string): void {
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
} 