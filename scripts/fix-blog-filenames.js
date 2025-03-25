/**
 * This script fixes malformed blog post filenames
 * It finds files with template variables in the name or generic filenames like post.md and renames them to a proper format
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to blog posts directory
const BLOG_DIR = path.join(__dirname, '../public/content/blog');

// Pattern for generic filenames like post.md or post-1.md
const GENERIC_FILE_PATTERN = /^post(?:-\d+)?\.md$/;

// Function to parse frontmatter from a file
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return {};
  }
  
  const frontmatterStr = match[1];
  
  // Simple YAML parser for frontmatter
  const frontmatter = {};
  frontmatterStr.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      const value = valueParts.join(':').trim();
      frontmatter[key.trim()] = value;
    }
  });
  
  return frontmatter;
}

// Process the blog directory
try {
  if (!fs.existsSync(BLOG_DIR)) {
    console.log('Blog directory does not exist.');
    process.exit(0);
  }

  // Get all files in the blog directory
  const files = fs.readdirSync(BLOG_DIR);
  let fixedCount = 0;
  
  // Loop through each file
  for (const filename of files) {
    // Check if the filename has template variables or is a generic filename
    if (filename.includes('{{') || filename.includes('}}') || GENERIC_FILE_PATTERN.test(filename)) {
      console.log(`Found problematic file: ${filename}`);
      
      // Read the file contents
      const filePath = path.join(BLOG_DIR, filename);
      const content = fs.readFileSync(filePath, 'utf8');
      const frontmatter = parseFrontmatter(content);
      
      // Generate a new filename
      let newFilename = '';
      if (frontmatter.slug) {
        // If we have a slug in the frontmatter, prioritize using it
        const slugValue = frontmatter.slug.trim();
        
        if (frontmatter.date) {
          // Format: YYYY-MM-DD-slug.md
          const date = frontmatter.date.trim();
          newFilename = `${date}-${slugValue}.md`;
        } else {
          newFilename = `${slugValue}.md`;
        }
      } else if (frontmatter.date && frontmatter.title) {
        // Format: YYYY-MM-DD-title-slug.md
        const title = frontmatter.title
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
        
        const date = frontmatter.date.trim();
        newFilename = `${date}-${title}.md`;
      } else {
        // Fallback if missing required frontmatter
        newFilename = `fixed-post-${Date.now()}.md`;
      }
      
      // Rename the file
      const newPath = path.join(BLOG_DIR, newFilename);
      
      // Check if the target file already exists
      if (fs.existsSync(newPath)) {
        console.log(`Target file already exists: ${newFilename}`);
        const timestamp = Date.now();
        if (frontmatter.slug) {
          newFilename = `${frontmatter.date || 'undated'}-${frontmatter.slug}-${timestamp}.md`;
        } else {
          newFilename = `fixed-post-${timestamp}.md`;
        }
        console.log(`Using alternate name: ${newFilename}`);
      }
      
      const finalPath = path.join(BLOG_DIR, newFilename);
      fs.renameSync(filePath, finalPath);
      console.log(`Renamed to: ${newFilename}`);
      fixedCount++;
    }
  }
  
  console.log(`Fixed ${fixedCount} files.`);
  
} catch (error) {
  console.error('Error fixing blog post filenames:', error);
  process.exit(1);
} 