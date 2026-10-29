import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ThemeProvider } from 'next-themes';

const scriptHash = (source) => `'sha256-${createHash('sha256').update(source).digest('base64')}'`;

export function securityMeta(html, themeScripts = []) {
  const inlineScripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)]
    .filter((match) => !/\bsrc\s*=/.test(match[0]))
    .map((match) => match[1]);
  const hashes = [...new Set([...inlineScripts, ...themeScripts].map(scriptHash))];
  const policy = [
    "default-src 'self'",
    `script-src 'self' ${hashes.join(' ')} https://scripts.simpleanalyticscdn.com https://plausible.io`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https://www.google.com https://*.gstatic.com https://queue.simpleanalyticscdn.com",
    "connect-src 'self' https://queue.simpleanalyticscdn.com https://plausible.io",
    "frame-src https://embeds.beehiiv.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'none'",
    'upgrade-insecure-requests',
  ].join('; ');
  return `<meta http-equiv="Content-Security-Policy" content="${policy}">\n<meta name="referrer" content="strict-origin-when-cross-origin">`;
}

async function secureDirectory(directory, themeScripts) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await secureDirectory(file, themeScripts);
    else if (entry.name.endsWith('.html')) {
      const html = await readFile(file, 'utf8');
      if (!/<head\b/i.test(html)) throw new Error(`Missing head in ${file}`);
      await writeFile(file, html.replace(/(<head\b[^>]*>)/i, `$1\n${securityMeta(html, themeScripts)}`));
    }
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === import.meta.filename) {
  const themeMarkup = renderToStaticMarkup(React.createElement(ThemeProvider, {
    attribute: 'class', defaultTheme: 'system', enableSystem: true,
  }));
  const themeScripts = [...themeMarkup.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map((match) => match[1]);
  if (themeScripts.length !== 1) throw new Error('Theme script hash could not be generated');
  await secureDirectory('dist', themeScripts);
  console.log('Applied script restrictions and referrer policy to every HTML page.');
}
