import DOMPurify from 'dompurify';

export const sanitizeHTML = (htmlContent) => DOMPurify.sanitize(htmlContent);
