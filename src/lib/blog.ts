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

// Helper function to fetch Markdown content with retries
async function fetchMarkdownContent(fileName: string, retries = 3): Promise<string> {
  try {
    console.log(`Attempting to fetch blog post: ${fileName} from /content/blog/${fileName}`);
    
    // Add cache buster to avoid caching issues
    const cacheBuster = `?t=${Date.now()}`;
    const response = await fetch(`/content/blog/${fileName}${cacheBuster}`);
    
    if (!response.ok) {
      console.error(`Failed to fetch ${fileName}: ${response.status} ${response.statusText}`);
      
      // Retry with exponential backoff if retries remain
      if (retries > 0) {
        const delay = Math.pow(2, 4 - retries) * 100; // Exponential backoff
        console.log(`Retrying fetch for ${fileName} in ${delay}ms... (${retries} retries left)`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchMarkdownContent(fileName, retries - 1);
      }
      
      // Return error content if all retries fail
      return `---
title: Error Loading Post
date: ${new Date().toISOString().split('T')[0]}
excerpt: There was an error loading this post.
---

# Error Loading Post

There was an error loading the post content: ${fileName}
Status: ${response.status} ${response.statusText}

Please check the console for more details or refresh the page to try again.`;
    }
    
    const content = await response.text();
    console.log(`Successfully fetched ${fileName}, content length: ${content.length}`);
    
    if (!content || content.trim().length === 0) {
      console.error(`Empty content received for ${fileName}`);
      throw new Error(`Empty content received for ${fileName}`);
    }
    
    return content;
  } catch (error) {
    console.error(`Error fetching ${fileName}:`, error);
    
    // Retry with exponential backoff if retries remain
    if (retries > 0) {
      const delay = Math.pow(2, 4 - retries) * 100; // Exponential backoff
      console.log(`Retrying fetch for ${fileName} after error in ${delay}ms... (${retries} retries left)`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchMarkdownContent(fileName, retries - 1);
    }
    
    return `---
title: Error Loading Post
date: ${new Date().toISOString().split('T')[0]}
excerpt: There was an error loading this post.
---

# Error Loading Post

There was an error fetching the post content: ${fileName}
Error: ${error instanceof Error ? error.message : String(error)}

Please check the console for more details or refresh the page to try again.`;
  }
}

// Parse markdown frontmatter
function parseFrontmatter(content: string): { frontmatter: Record<string, any>; markdownContent: string } {
  const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    console.warn('No frontmatter found in content');
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

// Fetch the file index with cache busting
async function getFileIndex(): Promise<string[]> {
  try {
    console.log('Fetching blog index...');
    // Add cache buster to avoid caching issues
    const cacheBuster = `?t=${Date.now()}`;
    const response = await fetch(`/content/blog-index.json${cacheBuster}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`Successfully loaded blog index with ${data.files?.length || 0} posts`);
      return data.files || [];
    } else {
      console.error(`Failed to load blog index: ${response.status} ${response.statusText}`);
    }
  } catch (e) {
    console.error('Error fetching blog index:', e);
  }
    
  console.log('Using fallback methods for blog index...');
  
  // Fallback 1: Try to directly access the blog directory
  try {
    const directoryResponse = await fetch('/content/blog/');
    if (directoryResponse.ok) {
      const html = await directoryResponse.text();
      // Parse the HTML to extract filenames
      const matches = html.match(/href="([^"]+\.md)"/g) || [];
      const files = matches.map(match => match.replace(/href="(.+)"/, '$1'));
      console.log(`Fallback 1 successful: Found ${files.length} files via directory listing`);
      return files;
    }
  } catch (e) {
    console.log('Directory listing fallback failed:', e);
  }
  
  // Fallback 2: Try to find individual post files based on known patterns
  try {
    const currentYear = new Date().getFullYear();
    const potentialFiles = [];
    
    // Check for posts from the last 2 years with monthly patterns
    for (let year = currentYear - 1; year <= currentYear; year++) {
      for (let month = 1; month <= 12; month++) {
        // Format month with leading zero
        const monthStr = month.toString().padStart(2, '0');
        // Try day 1 and day 15 of each month (common posting days)
        potentialFiles.push(`${year}-${monthStr}-01-post.md`);
        potentialFiles.push(`${year}-${monthStr}-15-post.md`);
      }
    }
    
    console.log(`Trying ${potentialFiles.length} potential post filenames as fallback`);
    
    // Check which files actually exist
    const checkPromises = potentialFiles.map(async (file) => {
      try {
        const response = await fetch(`/content/blog/${file}`, { method: 'HEAD' });
        return response.ok ? file : null;
      } catch {
        return null;
      }
    });
    
    const existingFiles = (await Promise.all(checkPromises)).filter(Boolean) as string[];
    if (existingFiles.length > 0) {
      console.log(`Fallback 2 successful: Found ${existingFiles.length} files via pattern checking`);
      return existingFiles;
    }
  } catch (e) {
    console.log('Pattern checking fallback failed:', e);
  }
  
  // Fallback 3: Use the most recent posts we know about
  console.log('Using hardcoded fallback list of known posts');
  return [
    '2025-03-28-step-by-step-ai-prototyping.md',
    '2025-03-25-from-vibe-coding-to-vibe-prototyping.md',
    '2025-03-06-micro-apps-are-making-a-comebackjust-not-how-apple-imagined.md',
    '2024-11-01-building-trust-led-me-here.md',
    '2024-09-01-a-new-chapter.md'
  ];
}

// Configure marked options
const renderer = new marked.Renderer();

// Helper to clean up slugs
const cleanupSlug = (dirtySlug: string): string => {
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
  // If it contains template variables, return a generic slug
  if (dirtySlug.includes('{{') || dirtySlug.includes('}}')) {
    return 'post-' + Math.random().toString(36).substring(2, 10);
  }
  return dirtySlug;
};

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    console.log('Getting all blog posts...');
    
    // Get the list of blog post files
    const fileNames = await getFileIndex();
    console.log(`Retrieved ${fileNames.length} post filenames from index`);
    
    if (fileNames.length === 0) {
      console.error('No blog posts found in the index');
      return [];
    }
    
    const postPromises = fileNames.map(async (fileName) => {
      try {
        console.log(`Processing post: ${fileName}`);
        const content = await fetchMarkdownContent(fileName);
        const { frontmatter, markdownContent } = parseFrontmatter(content);
        
        // Parse markdown to HTML
        const html = marked.parse(markdownContent, {
          renderer: renderer
        }) as string;
        
        // Fix image paths in the HTML and add rounded corners
        const fixedHtml = html.replace(/<img src="(?!http|\/)(.*?)"/g, '<img src="/$1"')
                              .replace(/<img /g, '<img class="rounded-2xl " ');
        
        // Extract slug with priority: frontmatter.slug > filename date-slug pattern > filename
        let slug = '';
        
        // If frontmatter has a slug field, use that as the highest priority
        if (frontmatter.slug) {
          slug = cleanupSlug(frontmatter.slug);
          console.log(`Using frontmatter slug for ${fileName}: ${slug}`);
        }
        // Handle generic 'post.md' filenames and templates
        else if (fileName === 'post.md' || fileName.match(/^post-\d+\.md$/) || fileName.includes('{{')) {
          // For generic filenames, use the title to generate a slug
          slug = frontmatter.title 
            ? frontmatter.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
            : 'post-' + Math.random().toString(36).substring(2, 10);
          console.log(`Generated slug from title for ${fileName}: ${slug}`);
        } else {
          // Normal case - extract slug from filename
          // Check if the filename follows the YYYY-MM-DD-slug.md pattern
          const dateSlugMatch = fileName.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/);
          if (dateSlugMatch && dateSlugMatch[1]) {
            slug = cleanupSlug(dateSlugMatch[1]);
            console.log(`Extracted slug from filename pattern for ${fileName}: ${slug}`);
          } else {
            slug = cleanupSlug(fileName);
            console.log(`Using cleaned filename as slug for ${fileName}: ${slug}`);
          }
        }
        
        // Safely parse the date
        let formattedDate = '';
        try {
          if (frontmatter.date) {
            const date = new Date(frontmatter.date);
            if (!isNaN(date.getTime())) {
              formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD format
            } else {
              console.warn(`Invalid date format in frontmatter for ${fileName}: ${frontmatter.date}`);
              // Try to extract date from filename as fallback
              const dateMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})/);
              if (dateMatch && dateMatch[1]) {
                formattedDate = dateMatch[1];
              } else {
                formattedDate = new Date().toISOString().split('T')[0]; // Use today as fallback
              }
            }
          } else {
            console.warn(`No date in frontmatter for ${fileName}`);
            // Try to extract date from filename as fallback
            const dateMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})/);
            if (dateMatch && dateMatch[1]) {
              formattedDate = dateMatch[1];
            } else {
              formattedDate = new Date().toISOString().split('T')[0]; // Use today as fallback
            }
          }
        } catch (e) {
          console.error(`Error parsing date for ${fileName}:`, e);
          formattedDate = new Date().toISOString().split('T')[0]; // Use today as fallback
        }
        
        return {
          id: slug,
          title: frontmatter.title || 'Untitled',
          excerpt: frontmatter.excerpt || '',
          date: formattedDate,
          slug,
          author: frontmatter.author || 'Anonymous',
          thumbnail: frontmatter.thumbnail,
          content: markdownContent,
          html: fixedHtml
        };
      } catch (error) {
        console.error(`Error processing post ${fileName}:`, error);
        // Return a placeholder post for errors to prevent the entire list from failing
        return {
          id: `error-${Math.random().toString(36).substring(2, 10)}`,
          title: `Error Loading Post: ${fileName}`,
          excerpt: 'There was an error loading this post.',
          date: new Date().toISOString().split('T')[0],
          slug: `error-${Math.random().toString(36).substring(2, 10)}`,
          author: 'System',
          content: `# Error Loading Post\n\nThere was an error loading the post: ${fileName}\n\nError: ${error instanceof Error ? error.message : String(error)}`,
          html: `<h1>Error Loading Post</h1><p>There was an error loading the post: ${fileName}</p><p>Error: ${error instanceof Error ? error.message : String(error)}</p>`
        };
      }
    });
    
    // Use Promise.allSettled to prevent one failed post from breaking everything
    const settledResults = await Promise.allSettled(postPromises);
    
    // Filter out rejected promises and extract fulfilled values
    const posts = settledResults
      .filter((result) => result.status === 'fulfilled')
      .map((result) => (result as PromiseFulfilledResult<BlogPost>).value);
    
    console.log(`Successfully processed ${posts.length} out of ${fileNames.length} posts`);
    
    // Log errors for rejected promises
    settledResults
      .filter((result) => result.status === 'rejected')
      .forEach((result, index) => {
        console.error(`Failed to process post at index ${index}:`, (result as PromiseRejectedResult).reason);
      });
    
    // Sort posts by date (newest first) using a safer sorting method
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
  try {
    console.log(`Looking for post with slug: ${slug}`);
    
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
    console.log(`Cleaned requested slug: ${requestedSlug}`);
    
    // Get all posts
    const posts = await getAllPosts();
    console.log(`Retrieved ${posts.length} posts to search for slug: ${requestedSlug}`);
    
    // First, try to find a post with an exact slug match (after cleaning)
    let post = posts.find(post => cleanSlug(post.slug) === requestedSlug);
    
    if (post) {
      console.log(`Found post with exact slug match: ${post.title}`);
      return post;
    }
    
    console.log(`No exact slug match found, trying alternative matching methods`);
    
    // If not found and the requested slug might be a cleaned version of a problematic slug,
    // try different matching strategies
    
    // 1. Try matching by title
    post = posts.find(post => {
      const titleSlug = post.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      const isMatch = titleSlug === requestedSlug;
      if (isMatch) console.log(`Found post by title slug match: ${post.title}`);
      return isMatch;
    });
    
    if (post) return post;
    
    // 2. Try partial slug matching
    post = posts.find(post => {
      const isPartialMatch = cleanSlug(post.slug).includes(requestedSlug) || 
                            requestedSlug.includes(cleanSlug(post.slug));
      if (isPartialMatch) console.log(`Found post by partial slug match: ${post.title}`);
      return isPartialMatch;
    });
    
    if (post) return post;
    
    // 3. Try matching any posts with template variables in slug as last resort
    post = posts.find(post => {
      const hasTemplateVars = post.slug.includes('{{') || post.slug.includes('}}');
      if (hasTemplateVars) console.log(`Found post with template variables: ${post.title}`);
      return hasTemplateVars;
    });
    
    // 4. If still not found and we have posts, return the most recent post as a fallback
    if (!post && posts.length > 0) {
      post = posts[0]; // First post should be most recent due to sorting
      console.log(`No matches found, falling back to most recent post: ${post.title}`);
    }
    
    return post || null;
  } catch (error) {
    console.error('Error getting post by slug:', error);
    return null;
  }
} 