// src/services/productService.js
import { supabase } from '../supabaseClient';

export const fetchAllProducts = async () => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    console.error('Error fetching products:', error);
    return { data: null, error };
  }
  // Assuming image_Url is already the public URL from the database
  const productsWithImages = data.map(product => ({
    ...product,
    image: product.image_Url // Use image_Url directly
  }));
  return { data: productsWithImages, error: null };
};