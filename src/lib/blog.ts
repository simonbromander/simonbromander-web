export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  author: string;
  thumbnail?: string;
  content: string;
}

// Helper function to fetch Markdown content
async function fetchMarkdownContent(fileName: string): Promise<string> {
  try {
    const response = await fetch(`/content/blog/${fileName}`);
    if (!response.ok) {
      console.error(`Failed to fetch ${fileName}: ${response.status} ${response.statusText}`);
      return '';
    }
    return await response.text();
  } catch (error) {
    console.error(`Error fetching ${fileName}:`, error);
    return '';
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
      '2024-03-04-getting-started-with-react.md',
      '2025-03-04-test.md'
    ];
  } catch (error) {
    console.error('Error getting file index:', error);
    return [];
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    // Get the list of blog post files
    const fileNames = await getFileIndex();
    
    const posts = await Promise.all(
      fileNames.map(async (fileName) => {
        const content = await fetchMarkdownContent(fileName);
        const { frontmatter, markdownContent } = parseFrontmatter(content);
        
        // Extract slug from filename (remove date and extension)
        const slug = fileName.replace(/^\d{4}-\d{2}-\d{2}-(.*)\.md$/, '$1');
        
        return {
          id: slug,
          title: frontmatter.title || 'Untitled',
          excerpt: frontmatter.excerpt || '',
          date: frontmatter.date || '',
          slug,
          author: frontmatter.author || 'Anonymous',
          thumbnail: frontmatter.thumbnail,
          content: markdownContent
        };
      })
    );
    
    // Sort posts by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find(post => post.slug === slug) || null;
} 