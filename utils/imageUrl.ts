/**
 * Get the full image URL
 * Handles both external URLs (http/https) and local uploads (/uploads/...)
 */
export const getImageUrl = (imagePath: string | undefined): string => {
  if (!imagePath) {
    return 'https://via.placeholder.com/300x300?text=No+Image';
  }

  // If it's already a full URL (starts with http:// or https://)
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  const backendUrl = 'http://localhost:5000';

  // If it's a local upload path (starts with /uploads/)
  if (imagePath.startsWith('/uploads/')) {
    return `${backendUrl}${imagePath}`;
  }

  // If it's just a filename without path
  if (!imagePath.startsWith('/')) {
    return `${backendUrl}/uploads/${imagePath}`;
  }

  // Default: assume it's a path from backend
  return `${backendUrl}${imagePath}`;
};
