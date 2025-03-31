/**
 * This script generates a blog-index.json file containing a list of all blog post files.
 * It should be run during the build process to create an up-to-date index.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to blog posts directory
const BLOG_DIR = path.join(__dirname, '../public/content/blog');
// Output path for the index file
const INDEX_FILE = path.join(__dirname, '../public/content/blog-index.json');

// Create the output directory if it doesn't exist
const outputDir = path.dirname(INDEX_FILE);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Helper function to verify a file is a valid Markdown blog post
function isValidBlogPost(filePath) {
  try {
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      console.warn(`Warning: File does not exist: ${filePath}`);
      return false;
    }
    
    // Check if the file is readable
    const stats = fs.statSync(filePath);
    if (!stats.isFile()) {
      console.warn(`Warning: Not a file: ${filePath}`);
      return false;
    }
    
    // Read the file content
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it has frontmatter
    const hasFrontmatter = content.startsWith('---') && content.indexOf('---', 3) > 0;
    if (!hasFrontmatter) {
      console.warn(`Warning: File missing frontmatter: ${filePath}`);
      return false;
    }
    
    // The file is a valid blog post
    return true;
  } catch (error) {
    console.error(`Error validating blog post ${filePath}:`, error);
    return false;
  }
}

// Read the blog directory and generate the index
try {
  console.log(`Scanning blog directory: ${BLOG_DIR}`);
  
  // Check if the blog directory exists
  if (!fs.existsSync(BLOG_DIR)) {
    console.error(`Blog directory does not exist: ${BLOG_DIR}`);
    fs.mkdirSync(BLOG_DIR, { recursive: true });
    console.log(`Created blog directory: ${BLOG_DIR}`);
  }
  
  // Get all files in the blog directory
  const allFiles = fs.readdirSync(BLOG_DIR);
  console.log(`Found ${allFiles.length} files in blog directory`);
  
  // Filter for .md files, excluding template files
  const files = allFiles
    .filter(file => file.endsWith('.md'))
    .filter(file => !file.includes('{{') && !file.includes('}}'));
  
  console.log(`Found ${files.length} .md files (excluding templates)`);
  
  // Validate each blog post
  const validatedFiles = files.filter(file => {
    const filePath = path.join(BLOG_DIR, file);
    const isValid = isValidBlogPost(filePath);
    console.log(`Validating ${file}: ${isValid ? 'VALID' : 'INVALID'}`);
    return isValid;
  });
  
  console.log(`Found ${validatedFiles.length} valid blog posts`);
  
  // Sort files by date (newest first) - assuming the filename starts with a date
  validatedFiles.sort((a, b) => {
    // Extract date from filename if possible (YYYY-MM-DD format)
    const dateA = a.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] || '';
    const dateB = b.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] || '';
    
    // Sort in descending order (newest first)
    return dateB.localeCompare(dateA);
  });
  
  // Write the index file
  const indexData = {
    generatedAt: new Date().toISOString(),
    count: validatedFiles.length,
    files: validatedFiles
  };
  
  const indexJson = JSON.stringify(indexData, null, 2);
  fs.writeFileSync(INDEX_FILE, indexJson);
  
  // Verify the index was written correctly
  if (fs.existsSync(INDEX_FILE)) {
    const stats = fs.statSync(INDEX_FILE);
    console.log(`Blog index written: ${INDEX_FILE} (${stats.size} bytes)`);
    
    // Double-check the file can be read as JSON
    try {
      const readData = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8'));
      console.log(`Blog index validated, contains ${readData.files.length} posts`);
    } catch (readError) {
      console.error('Error validating the written index file:', readError);
    }
  } else {
    console.error(`Failed to create blog index file: ${INDEX_FILE}`);
  }
  
  console.log(`Blog index generation complete with ${validatedFiles.length} posts.`);
} catch (error) {
  console.error('Error generating blog index:', error);
  process.exit(1);
} 