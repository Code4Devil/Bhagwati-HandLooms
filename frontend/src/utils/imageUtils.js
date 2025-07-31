import { supabase } from '../supabaseClient';

/**
 * Get the public URL for an image from Supabase storage
 * @param {string} imagePath - The path/filename of the image in storage
 * @param {string} bucket - The storage bucket name (default: 'productimages')
 * @returns {string} - The public URL for the image
 */
export const getSupabaseImageUrl = (imagePath, bucket = 'productimages') => {
  if (!imagePath) {
    return 'https://via.placeholder.com/300x300?text=No+Image';
  }

  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // Get the public URL from Supabase
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(imagePath);

  return data.publicUrl;
};

/**
 * Get a fallback image URL
 * @returns {string} - A placeholder image URL
 */
export const getFallbackImageUrl = () => {
  return 'https://via.placeholder.com/300x300?text=No+Image';
};

/**
 * Validate and get the best image URL from a product object
 * @param {object} product - The product object
 * @returns {string} - The best available image URL
 */
export const getProductImageUrl = (product) => {
  // Try different image properties in order of preference
  const imageUrl = product.image_url || product.image;
  
  if (!imageUrl) {
    return getFallbackImageUrl();
  }

  // If it's already a full URL, return as is
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }

  // If it's a storage path, construct the full URL
  return getSupabaseImageUrl(imageUrl);
};
