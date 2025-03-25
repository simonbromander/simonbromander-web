export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  author: string;
  thumbnail?: string;
  content: string;
  html: string;
}

import { marked } from 'marked';

// Helper function to fetch Markdown content
async function fetchMarkdownContent(fileName: string): Promise<string> {
  try {
    console.log(`Attempting to fetch blog post: ${fileName} from /content/blog/${fileName}`);
    const response = await fetch(`/content/blog/${fileName}`);
    if (!response.ok) {
      console.error(`Failed to fetch ${fileName}: ${response.status} ${response.statusText}`);
      return `---
title: Error Loading Post
date: 2025-03-25
excerpt: There was an error loading this post.
---

# Error Loading Post

There was an error loading the post content: ${fileName}
Status: ${response.status} ${response.statusText}

Please check the console for more details.`;
    }
    const content = await response.text();
    console.log(`Successfully fetched ${fileName}, content length: ${content.length}`);
    return content;
  } catch (error) {
    console.error(`Error fetching ${fileName}:`, error);
    return `---
title: Error Loading Post
date: 2025-03-25
excerpt: There was an error loading this post.
---

# Error Loading Post

There was an error fetching the post content: ${fileName}
Error: ${error instanceof Error ? error.message : String(error)}

Please check the console for more details.`;
  }
}

// Parse markdown frontmatter
function parseFrontmatter(content: string): { frontmatter: Record<string, any>; markdownContent: string } {
  const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, markdownContent: content };
  }
  
  const frontmatterStr = match[1];
  const markdownContent = content.slice(match[0].length).trim();
  
  // Very simple YAML parser for frontmatter
  const frontmatter: Record<string, any> = {};
  frontmatterStr.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      const value = valueParts.join(':').trim();
      frontmatter[key.trim()] = value;
    }
  });
  
  return { frontmatter, markdownContent };
}

// Fetch the file index (a dynamically generated list of blog posts)
async function getFileIndex(): Promise<string[]> {
  try {
    // For GitHub Pages, we'll use an index.json file that gets generated at build time
    // Create this file if it doesn't exist
    try {
      const response = await fetch('/content/blog-index.json');
      if (response.ok) {
        const data = await response.json();
        return data.files || [];
      }
    } catch (e) {
      console.log('No blog index found, trying directory listing fallback');
    }
    
    // Fallback 1: Try to fetch the content/blog directory and parse it
    try {
      const response = await fetch('/content/blog/');
      if (response.ok) {
        const html = await response.text();
        // Parse the HTML to extract filenames
        const matches = html.match(/href="([^"]+\.md)"/g) || [];
        return matches.map(match => match.replace(/href="(.+)"/, '$1'));
      }
    } catch (e) {
      console.log('Directory listing failed, using hardcoded fallback');
    }
    
    // Fallback 2: Use hardcoded files we know exist
    return [
      '2023-04-01-hello-world.md'
    ];
  } catch (error) {
    console.error('Error getting file index:', error);
    return [];
  }
}

// Configure marked options - use a simpler approach
const renderer = new marked.Renderer();

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    // Get the list of blog post files
    const fileNames = await getFileIndex();
    
    const posts = await Promise.all(
      fileNames.map(async (fileName) => {
        const content = await fetchMarkdownContent(fileName);
        const { frontmatter, markdownContent } = parseFrontmatter(content);
        
        // Parse markdown to HTML - using default options
        const html = marked.parse(markdownContent, {
          renderer: renderer
        }) as string;
        
        // Fix image paths in the HTML and add rounded corners
        const fixedHtml = html.replace(/<img src="(?!http|\/)(.*?)"/g, '<img src="/$1"')
                              .replace(/<img /g, '<img class="rounded-2xl " ');
        
        // Extract slug from filename (remove date and extension)
        // Handle both normal date-slug format and template literals
        let slug = '';
        
        // Clean up a slug that might be a full path
        const cleanupSlug = (dirtySlug: string): string => {
          // If it's a full path, extract just the filename
          if (dirtySlug.includes('/')) {
            dirtySlug = dirtySlug.split('/').pop() || dirtySlug;
          }
          // Remove .md extension if present
          dirtySlug = dirtySlug.replace(/\.md$/, '');
          // If it's just 'post', use the title instead
          if (dirtySlug === 'post') {
            return frontmatter.title
              ? frontmatter.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
              : 'untitled-post';
          }
          return dirtySlug;
        };

        // If frontmatter has a slug field, use that as the highest priority
        if (frontmatter.slug) {
          slug = cleanupSlug(frontmatter.slug);
        }
        // Handle generic 'post.md' filenames and templates
        else if (fileName === 'post.md' || fileName.match(/^post-\d+\.md$/) || fileName.includes('{{')) {
          // For generic filenames, use the title to generate a slug
          slug = frontmatter.title 
            ? frontmatter.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
            : 'post';
        } else {
          // Normal case - extract slug from filename
          // Check if the filename follows the YYYY-MM-DD-slug.md pattern
          const dateSlugMatch = fileName.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/);
          if (dateSlugMatch && dateSlugMatch[1]) {
            slug = cleanupSlug(dateSlugMatch[1]);
          } else {
            slug = cleanupSlug(fileName);
          }
        }
        
        // Safely parse the date
        let formattedDate = '';
        try {
          if (frontmatter.date) {
            const date = new Date(frontmatter.date);
            if (!isNaN(date.getTime())) {
              formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD format
            }
          }
        } catch (e) {
          console.error('Error parsing date:', e);
        }
        
        return {
          id: slug,
          title: frontmatter.title || 'Untitled',
          excerpt: frontmatter.excerpt || '',
          date: formattedDate || 'Unknown date',
          slug,
          author: frontmatter.author || 'Anonymous',
          thumbnail: frontmatter.thumbnail,
          content: markdownContent,
          html: fixedHtml
        };
      })
    );
    
    // Sort posts by date (newest first)
    // Use a safer sorting method
    return posts.sort((a, b) => {
      try {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        
        // Check if both dates are valid
        if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
          return dateB.getTime() - dateA.getTime();
        }
        
        // Fall back to string comparison if dates are invalid
        return b.date.localeCompare(a.date);
      } catch (e) {
        console.error('Error sorting posts by date:', e);
        return 0;
      }
    });
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  
  // Clean up the requested slug
  const cleanSlug = (dirtySlug: string): string => {
    // If it's a full path, extract just the filename
    if (dirtySlug.includes('/')) {
      dirtySlug = dirtySlug.split('/').pop() || dirtySlug;
    }
    // Remove .md extension if present
    dirtySlug = dirtySlug.replace(/\.md$/, '');
    return dirtySlug;
  };

  const requestedSlug = cleanSlug(slug);
  
  // First, try to find a post with an exact slug match (after cleaning)
  let post = posts.find(post => cleanSlug(post.slug) === requestedSlug);
  
  // If not found and the requested slug might be a cleaned version of a problematic slug,
  // try to find the post by comparing the cleaned version of slugs
  if (!post && posts.length > 0) {
    // First try by title
    post = posts.find(post => {
      const titleSlug = post.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      return titleSlug === requestedSlug;
    });
    
    // If still not found, look for any post that contains template variables in slug
    if (!post) {
      post = posts.find(post => post.slug.includes('{{') || post.slug.includes('}}'));
    }
  }
  
  return post || null;
} 