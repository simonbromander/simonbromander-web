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

// Read the blog directory and generate the index
try {
  // Get all .md files in the blog directory, excluding template files
  const files = fs.readdirSync(BLOG_DIR)
    .filter(file => file.endsWith('.md'))
    .filter(file => !file.includes('{{') && !file.includes('}}'));
  
  // Write the index file
  const indexData = {
    generatedAt: new Date().toISOString(),
    count: files.length,
    files
  };
  
  fs.writeFileSync(INDEX_FILE, JSON.stringify(indexData, null, 2));
  
  console.log(`Blog index generated with ${files.length} posts.`);
} catch (error) {
  console.error('Error generating blog index:', error);
  process.exit(1);
} 