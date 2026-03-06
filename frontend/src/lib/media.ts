export function resolveMediaUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  
  // If it's already an absolute URL, return it
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  
  // Otherwise, prepend the Payload CMS URL
  const backendUrl = import.meta.env?.PUBLIC_API_URL || 'http://localhost:3000';
  
  // Ensure we don't have double slashes
  const cleanBase = backendUrl.endsWith('/') ? backendUrl.slice(0, -1) : backendUrl;
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  
  return `${cleanBase}${cleanPath}`;
}
