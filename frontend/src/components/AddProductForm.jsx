import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useUser } from '@clerk/clerk-react'; // Import useUser from Clerk
import { useEffect } from 'react'; // Import useEffect

const AddProductForm = ({ onClose, onProductAdded, onProductUpdated }) => {
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
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [existingProduct, setExistingProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successAction, setSuccessAction] = useState('added'); // 'added' or 'updated'

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
    setIsSubmitting(true);

    if (!product.image_url) {
      alert('Please select an image to upload.');
      setIsSubmitting(false);
      return;
    }

    // Check current user session using Clerk
    if (!isSignedIn) {
      console.error('No authenticated user found. Please log in.');
      alert('You must be logged in to upload products.');
      setIsSubmitting(false);
      return;
    }

    // Check for duplicate product
    const { data: existingProducts, error: checkError } = await supabase
      .from('products')
      .select('*')
      .ilike('name', product.name);

    if (checkError) {
      console.error('Error checking for duplicates:', checkError);
      setIsSubmitting(false);
      return;
    }

    if (existingProducts && existingProducts.length > 0) {
      setExistingProduct(existingProducts[0]);
      setShowDuplicateModal(true);
      setIsSubmitting(false);
      return;
    }

    await addProduct(product);
  };

  const addProduct = async (productData = product) => {
    setIsSubmitting(true);
    console.log('Authenticated user:', user.id); // Clerk user object has an 'id' property

    let imageUrl = null;
    if (productData.image_url) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('productimages') // Ensure you have a bucket named 'productimages'
        .upload(`${Date.now()}_${productData.image_url.name}`, productData.image_url);

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        alert('Error uploading image: ' + uploadError.message);
        setIsSubmitting(false);
        return;
      }
      imageUrl = uploadData.path;
      console.log('Generated image URL path:', imageUrl);
    }

    const { data, error } = await supabase.from('products').insert([
      {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        stock: productData.stock,
        quality: productData.quality,
        length: productData.length,
        width: productData.width,
        category: productData.category,
        image_url: imageUrl ? `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/productimages/${imageUrl}` : null,
      },
     ]);

    if (error) {
      console.error('Error adding product:', error);
      alert('Error adding product: ' + error.message);
      setIsSubmitting(false);
    } else {
      console.log('Product added successfully:', data);

      // Call the callback to update parent component
      if (onProductAdded && data && data.length > 0) {
        onProductAdded(data[0]);
      }

      // Show success message instead of alert
      setSuccessAction('added');
      setShowSuccessMessage(true);
      setIsSubmitting(false);
    }
  };

  const handleAddMore = () => {
    // Reset form for new product
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
    setShowSuccessMessage(false);
    setSuccessAction('added');
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleDuplicateConfirm = async (updateQuantity) => {
    setIsSubmitting(true);

    if (updateQuantity) {
      // Update existing product quantity
      const newStock = existingProduct.stock + parseInt(product.stock);
      const { error } = await supabase
        .from('products')
        .update({ stock: newStock })
        .eq('id', existingProduct.id);

      if (error) {
        console.error('Error updating product stock:', error);
        alert('Error updating product stock');
        setIsSubmitting(false);
      } else {
        // Call the update callback instead of add callback
        if (onProductUpdated) {
          onProductUpdated({ ...existingProduct, stock: newStock });
        }
        setSuccessAction('updated');
        setShowSuccessMessage(true);
        setIsSubmitting(false);
      }
    } else {
      // Add as new product with modified name
      const modifiedProduct = { ...product, name: product.name + ' (Copy)' };
      await addProduct(modifiedProduct);
    }

    setShowDuplicateModal(false);
    setExistingProduct(null);
  };

  // Show success message after product is added
  if (showSuccessMessage) {
    return (
      <div className="w-full mx-auto mt-10 p-8 bg-white rounded-lg shadow-md text-center">
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {successAction === 'updated' ? 'Product Updated Successfully!' : 'Product Added Successfully!'}
          </h2>
          <p className="text-gray-600">
            {successAction === 'updated'
              ? 'The product quantity has been updated in the inventory.'
              : 'Your product has been added to the inventory.'
            }
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-lg font-medium text-gray-900 mb-6">Do you want to add more products?</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleAddMore}
              className="flex-1 sm:flex-none px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Add Another Product
            </button>
            <button
              onClick={handleClose}
              className="flex-1 sm:flex-none px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Adding Product...
            </div>
          ) : (
            'Add Product'
          )}
        </button>
      </form>

      {/* Duplicate Product Modal */}
      {showDuplicateModal && existingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <svg className="h-5 w-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
                Product Already Exists
              </h2>
              <button
                onClick={() => setShowDuplicateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-4">
                A product with the name "<strong>{existingProduct.name}</strong>" already exists.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Existing Product:</h4>
                <p className="text-sm text-gray-600">Stock: {existingProduct.stock} units</p>
                <p className="text-sm text-gray-600">Price: ₹{existingProduct.price}</p>
              </div>
              <p className="text-gray-600 mb-6">
                Would you like to update the existing product's quantity by adding {product.stock} units,
                or add this as a new product with a different name?
              </p>

              <div className="flex space-x-3">
                <button
                  onClick={() => handleDuplicateConfirm(true)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Quantity
                </button>
                <button
                  onClick={() => handleDuplicateConfirm(false)}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add as New
                </button>
                <button
                  onClick={() => setShowDuplicateModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductForm;