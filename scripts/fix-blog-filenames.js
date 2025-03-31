/**
 * This script fixes malformed blog post filenames
 * It finds files with template variables in the name or generic filenames like post.md and renames them to a proper format
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory containing blog posts
const blogDir = path.join(__dirname, '..', 'public', 'content', 'blog');

console.log('Scanning blog directory:', blogDir);

try {
  // Get all files in the blog directory
  const files = fs.readdirSync(blogDir);
  console.log(`Found ${files.length} files in blog directory`);

  // Filter for template files
  const templateFiles = files.filter(filename => 
    filename.includes('{{') && filename.includes('}}')
  );
  
  if (templateFiles.length === 0) {
    console.log('No template files found. All filenames look good!');
    process.exit(0);
  }
  
  console.log(`Found ${templateFiles.length} template files to fix`);

  // Process each template file
  templateFiles.forEach(templateFile => {
    const filePath = path.join(blogDir, templateFile);
    console.log(`Processing ${templateFile}...`);
    
    try {
      // Read the file content
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Parse frontmatter
      const { data } = matter(fileContent);
      
      if (!data.date || !data.slug) {
        console.log(`  ERROR: Missing date or slug in ${templateFile}`);
        return;
      }
      
      // Format the date (assuming it's already in YYYY-MM-DD format)
      let dateStr = data.date;
      
      // If date is a Date object, format it as YYYY-MM-DD
      if (dateStr instanceof Date) {
        dateStr = dateStr.toISOString().split('T')[0];
      } else if (typeof dateStr === 'string' && dateStr.includes('T')) {
        // Handle ISO format
        dateStr = dateStr.split('T')[0];
      }
      
      // Create the new filename
      const newFilename = `${dateStr}-${data.slug}.md`;
      const newFilePath = path.join(blogDir, newFilename);
      
      // Check if target file already exists
      if (fs.existsSync(newFilePath) && newFilePath !== filePath) {
        console.log(`  ERROR: Target file ${newFilename} already exists, skipping`);
        return;
      }
      
      // Rename the file
      fs.renameSync(filePath, newFilePath);
      console.log(`  Renamed to ${newFilename}`);
      
    } catch (err) {
      console.error(`  Error processing ${templateFile}:`, err);
    }
  });
  
  console.log('Filename fixing complete!');
  
} catch (err) {
  console.error('Error scanning blog directory:', err);
  process.exit(1);
} 