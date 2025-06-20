const express = require('express');
const supabase = require('./supabase');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// API to get all products
app.get('/products', async (req, res) => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) return res.status(400).json({ error: error.message });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('An unexpected error occurred:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});
  res.status(200).json(data);
});

// API to get a single product by ID
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

// API to create a new product
app.post('/products', async (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  const { data, error } = await supabase.from('products').insert([{ name, description, price, imageUrl }]);
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

// API to update a product
app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, imageUrl } = req.body;
  const { data, error } = await supabase.from('products').update({ name, description, price, imageUrl }).eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

// API to delete a product
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('products').delete().eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(204).json(data);
});

// API to get all users
app.get('/users', async (req, res) => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

// API to get a single user by ID
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

// API to create a new user
app.post('/users', async (req, res) => {
  const { clerk_id, number, address } = req.body;
  const { data, error } = await supabase.from('users').insert([{ clerk_id, number, address }]);
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

// API to update a user
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { number, address } = req.body;
  const { data, error } = await supabase.from('users').update({ number, address }).eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

// API to delete a user
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('users').delete().eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(204).json(data);
});

// API to get all orders
app.get('/orders', async (req, res) => {
  const { data, error } = await supabase.from('orders').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

// API to get a single order by ID
app.get('/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('orders').select('*').eq('id', id).single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

// API to create a new order
app.post('/orders', async (req, res) => {
  console.log('1. Received order creation request. Body:', req.body);
  const { user_id, total_amount, status, products } = req.body;
  console.log('2. Extracted data from request body:');
  console.log('  User ID:', user_id);
  console.log('  Total Amount:', total_amount);
  console.log('  Status:', status);
  console.log('  Products (raw from frontend):', products);

  console.log('3. Attempting to insert new order into orders table...');
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert([{ user_id, total_amount, status }])
    .select(); // Use .select() to return the inserted data, including the ID
  console.log('3a. Supabase insert order call completed. OrderData:', orderData, 'OrderError:', orderError);

  if (orderError) {
    console.error('4. Error inserting new order into orders table:', orderError);
    return res.status(500).json({ error: orderError.message });
  }
  console.log('4a. No order insertion error detected. Proceeding.');
  const newOrder = orderData[0];
  console.log('5. New order inserted successfully. Order ID:', newOrder.id, 'New Order Object:', newOrder);
  console.log('6. Checking products for order items. Products array:', products);
  if (!products || products.length === 0) {
    console.log('7. No products received for order items. Skipping insertion.');
  }
  console.log('8. New Order Created:', newOrder);

  if (products && products.length > 0) {
    console.log('9. Products array is not empty. Received products for order:', JSON.stringify(products, null, 2));
    const orderItemsToInsert = products.map(product => {
      console.log(`9b. Mapping product: ${JSON.stringify(product)}`);
      return {
        order_id: newOrder.id,
        product_id: product.product_id,
        quantity: product.quantity, // Use quantity from frontend
        price: product.price_at_order,
      };
    });
    console.log('9a. Mapped products to order items format. Result:', orderItemsToInsert);

    console.log('10. Preparing to insert order items:', orderItemsToInsert);
    // Insert order items into the order_items table
    const { data: orderItemsData, error: orderItemsError } = await supabase
      .from('order_items')
      .insert(orderItemsToInsert);
    console.log('10a. Supabase insert order items call completed. OrderItemsData:', orderItemsData, 'OrderItemsError:', orderItemsError);

    if (orderItemsError) {
      console.error('11. Error inserting order items:', orderItemsError, 'Data that failed:', orderItemsToInsert);
      // Attempt to roll back the order if order items insertion fails
      console.log('12. Attempting to roll back order due to order items insertion failure...');
      const { error: deleteOrderError } = await supabase.from('orders').delete().eq('id', newOrder.id);
      if (deleteOrderError) {
        console.error('13. Error rolling back order after order items insertion failure:', deleteOrderError);
      } else {
        console.log('14. Order successfully rolled back.');
      }
      return res.status(500).json({ error: `Failed to insert order items: ${orderItemsError.message}. Order rolled back.` });
    }
    console.log('15. Order items inserted successfully:', orderItemsData);
  }

  console.log('16. Order creation process completed successfully. Responding with new order:', newOrder);

  res.status(201).json(newOrder);
});

// Start the server


// API to update an order
app.put('/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { total_amount, status } = req.body;
  const { data, error } = await supabase.from('orders').update({ total_amount, status }).eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

// API to delete an order
app.delete('/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('orders').delete().eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(204).json(data);
});

// API to get all order items
app.get('/order_items', async (req, res) => {
  const { data, error } = await supabase.from('order_items').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

// API to get a single order item by ID
app.get('/order_items/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('order_items').select('*').eq('id', id).single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

// API to create a new order item
app.post('/order_items', async (req, res) => {
  const { order_id, product_id, quantity, price } = req.body;
  console.log('1. Received request to create new order item with data:', req.body);
  const { data, error } = await supabase.from('order_items').insert([{ order_id, product_id, quantity, price }]);
  console.log('2. Database operation completed. Data:', data, 'Error:', error);
  if (error) return res.status(400).json({ error: error.message });
  console.log('3. New order item created successfully:', data);
  res.status(201).json(data);
});

// API to update an order item
app.put('/order_items/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity, price } = req.body;
  const { data, error } = await supabase.from('order_items').update({ quantity, price }).eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

// API to delete an order item
app.delete('/order_items/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('order_items').delete().eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(204).json(data);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
  console.log('Database connection status: Check Supabase client initialization log above.');
});