/**
 * This script ensures the blog directories exist
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Required directories
const directories = [
  path.join(__dirname, '../public/content'),
  path.join(__dirname, '../public/content/blog'),
];

// Create the directories if they don't exist
directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    console.log(`Creating directory: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  }
});

console.log('Blog directories setup complete.'); 