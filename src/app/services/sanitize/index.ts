import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML and prevents XSS attacks
 * This function is declared as global function, so there is no need to import.
 */
export function sanitize(dirty: string): string {
  if (typeof dirty !== 'string' || !dirty) return dirty;

  return DOMPurify.sanitize(dirty);
}
