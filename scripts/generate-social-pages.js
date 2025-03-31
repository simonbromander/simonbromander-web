/**
 * This script generates static HTML pages for each blog post
 * with proper OpenGraph meta tags for social media sharing
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const BLOG_DIR = path.join(__dirname, '../public/content/blog');
const TEMPLATE_FILE = path.join(__dirname, '../public/blog-meta.html');
const OUTPUT_DIR = path.join(__dirname, '../public/blog');

console.log('Generating social media-friendly pages for blog posts...');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`Created output directory: ${OUTPUT_DIR}`);
}

// Read template file
let template;
try {
  template = fs.readFileSync(TEMPLATE_FILE, 'utf8');
  console.log('Loaded template file');
} catch (error) {
  console.error('Error reading template file:', error);
  process.exit(1);
}

// Get list of blog posts
const blogFiles = fs.readdirSync(BLOG_DIR).filter(file => 
  file.endsWith('.md') && 
  !file.includes('{{') && 
  !file.includes('}}')
);
console.log(`Found ${blogFiles.length} blog posts`);

// Process each blog post
let generatedCount = 0;
for (const file of blogFiles) {
  try {
    console.log(`Processing ${file}...`);
    const filePath = path.join(BLOG_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);
    
    if (!data.title || !data.slug) {
      console.warn(`  Skipping ${file}: Missing required frontmatter (title or slug)`);
      continue;
    }
    
    // Extract the slug from the filename if not provided in frontmatter
    let slug = data.slug;
    if (!slug) {
      const match = file.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/);
      if (match) {
        slug = match[1];
      } else {
        slug = file.replace('.md', '');
      }
    }
    
    // Format date
    const date = data.date 
      ? new Date(data.date).toISOString() 
      : new Date().toISOString();
    
    // Get the thumbnail or use default
    let thumbnail = 'https://simonbromander.com/og-image.png'; // Default fallback
    
    if (data.thumbnail) {
      // Handle different formats of thumbnail paths
      if (data.thumbnail.startsWith('http')) {
        // Already an absolute URL, use as is
        thumbnail = data.thumbnail;
      } else {
        // Relative path - convert to absolute URL with simonbromander.com domain
        // Strip leading slash if present for consistent formatting
        const cleanPath = data.thumbnail.startsWith('/') 
          ? data.thumbnail.substring(1) 
          : data.thumbnail;
        thumbnail = `https://simonbromander.com/${cleanPath}`;
      }
      
      console.log(`  Using thumbnail image: ${thumbnail}`);
    } else {
      console.log(`  No thumbnail found, using default image: ${thumbnail}`);
    }
    
    // Get the excerpt or create one
    const excerpt = data.excerpt || `Read ${data.title} by Simon Bromander`;
    
    // Create the URL - use direct path format for social sharing
    const url = `https://simonbromander.com/blog/${slug}.html`;
    
    // Replace placeholders in template
    let html = template
      .replace(/\{\{title\}\}/g, data.title)
      .replace(/\{\{description\}\}/g, excerpt)
      .replace(/\{\{image\}\}/g, thumbnail)
      .replace(/\{\{url\}\}/g, url)
      .replace(/\{\{date\}\}/g, date)
      .replace(/\{\{slug\}\}/g, slug);
    
    // Write to output file
    const outputFile = path.join(OUTPUT_DIR, `${slug}.html`);
    fs.writeFileSync(outputFile, html);
    
    console.log(`  Generated ${outputFile}`);
    
    // Also generate a copy at the root level for direct URL access
    // This ensures /[slug] URLs work directly for social sharing
    const rootOutputFile = path.join(__dirname, '../public', `${slug}.html`);
    fs.writeFileSync(rootOutputFile, html);
    console.log(`  Generated root-level page: ${rootOutputFile}`);
    
    generatedCount++;
    
  } catch (error) {
    console.error(`  Error processing ${file}:`, error);
  }
}

console.log(`\nCompleted! Generated ${generatedCount} social media-friendly pages.`);
console.log('Pages are available at:');
console.log('- https://simonbromander.com/blog/[slug].html');
console.log('- https://simonbromander.com/[slug].html'); 