/**
 * This script updates all existing blog post filenames to match the new naming convention
 * It ensures all files follow the pattern: YYYY-MM-DD-slug.md
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to blog posts directory
const BLOG_DIR = path.join(__dirname, '../public/content/blog');

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
  let updatedCount = 0;
  
  // Loop through each file
  for (const filename of files) {
    // Skip files that don't end with .md
    if (!filename.endsWith('.md')) {
      continue;
    }
    
    // Skip .gitkeep files
    if (filename === '.gitkeep') {
      continue;
    }
    
    console.log(`Checking file: ${filename}`);
    
    // Read the file contents
    const filePath = path.join(BLOG_DIR, filename);
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatter = parseFrontmatter(content);
    
    // Skip if we don't have required frontmatter
    if (!frontmatter.date || (!frontmatter.slug && !frontmatter.title)) {
      console.log(`Skipping ${filename}: missing required frontmatter (date and slug/title)`);
      continue;
    }
    
    // Generate the expected filename based on frontmatter
    const date = frontmatter.date.trim();
    const slug = frontmatter.slug 
      ? frontmatter.slug.trim() 
      : frontmatter.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    const expectedFilename = `${date}-${slug}.md`;
    
    // Skip if the filename already matches the expected pattern
    if (filename === expectedFilename) {
      console.log(`File ${filename} already follows the correct pattern`);
      continue;
    }
    
    // Rename the file
    const newPath = path.join(BLOG_DIR, expectedFilename);
    
    // Check if the target file already exists
    if (fs.existsSync(newPath)) {
      console.log(`Target file already exists: ${expectedFilename}`);
      const timestamp = Date.now();
      const alternateFilename = `${date}-${slug}-${timestamp}.md`;
      console.log(`Using alternate name: ${alternateFilename}`);
      fs.renameSync(filePath, path.join(BLOG_DIR, alternateFilename));
    } else {
      fs.renameSync(filePath, newPath);
      console.log(`Renamed: ${filename} → ${expectedFilename}`);
    }
    
    updatedCount++;
  }
  
  console.log(`Updated ${updatedCount} files.`);
  
} catch (error) {
  console.error('Error updating blog post filenames:', error);
  process.exit(1);
} 