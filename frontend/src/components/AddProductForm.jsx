import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useUser } from '@clerk/clerk-react'; // Import useUser from Clerk
import { useEffect } from 'react'; // Import useEffect

const AddProductForm = () => {
  const { isSignedIn, user } = useUser(); // Use Clerk's useUser hook
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    quality: '',
    length: '',
    width: '',
    category: '',
    image_url: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      image_url: e.target.files[0],
    }));
  };

  useEffect(() => {
    console.log('VITE_SUPABASE_URL on mount:', import.meta.env.VITE_SUPABASE_URL);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.image_url) {
      alert('Please select an image to upload.');
      return;
    }

    // Check current user session using Clerk
    if (!isSignedIn) {
      console.error('No authenticated user found. Please log in.');
      alert('You must be logged in to upload products.');
      return;
    }
    console.log('Authenticated user:', user.id); // Clerk user object has an 'id' property

    let imageUrl = null;
    if (product.image_url) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('productimages') // Ensure you have a bucket named 'productimages'
        .upload(`${Date.now()}_${product.image_url.name}`, product.image_url);

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        alert('Error uploading image: ' + uploadError.message);
        return;
      }
      imageUrl = uploadData.path;
      console.log('Generated image URL path:', imageUrl);
    }

    const { data, error } = await supabase.from('products').insert([
      {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        quality: product.quality,
        length: product.length,
        width: product.width,
        category: product.category,
        image_url: imageUrl ? `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/productimages/${imageUrl}` : null,
      },
     ]);

    if (error) {
      console.error('Error adding product:', error);
      alert('Error adding product: ' + error.message);
    } else {
      console.log('Product added successfully:', data);
      alert('Product added successfully!');
    }
    // Reset form
    setProduct({
      name: '',
      description: '',
      price: '',
      stock: '',
      quality: '',
      length: '',
      width: '',
      category: '',
      image_url: null,
    });
  };

  return (
    <div className="w-full mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select a category</option>
              <option value="Curtains">Curtains</option>
              <option value="Cushions">Cushions</option>
              <option value="Carpet">Carpet</option>
              <option value="Bedsheets">Bedsheets</option>
              <option value="Mats">Mats</option>
              <option value="Rugs">Rugs</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          ></textarea>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock:</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="quality" className="block text-sm font-medium text-gray-700">Quality:</label>
            <input
              type="text"
              id="quality"
              name="quality"
              value={product.quality}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
       
          <div>
            <label htmlFor="length" className="block text-sm font-medium text-gray-700">Length (cm):</label>
            <input
              type="number"
              id="length"
              name="length"
              value={product.length}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="width" className="block text-sm font-medium text-gray-700">Width (cm):</label>
            <input
              type="number"
              id="width"
              name="width"
              value={product.width}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">Product Image:</label>
          <input
            type="file"
            id="image_url"
            name="image_url"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-600
              hover:file:bg-indigo-100"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;