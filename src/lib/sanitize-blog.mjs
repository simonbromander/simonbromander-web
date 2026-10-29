import DOMPurify from 'dompurify';

export function sanitizeBlogHtml(html) {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ['style', 'form', 'input', 'button'],
  });
}
