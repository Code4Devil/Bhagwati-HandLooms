const supabase = require('./supabase');

async function seedProducts() {
  console.log('Seeding products...');
  const products = [
    {
      name: 'Rug',
      description: 'A beautiful hand-knotted rug.',
      price: 150.00,
      'image_url': `${process.env.SUPABASE_URL}/storage/v1/object/public/productimages/rug.jpg` // Use environment variable
    },
    {
      name: 'Mat',
      description: 'Durable and stylish floor mat.',
      price: 25.00,
      image_url: `${process.env.SUPABASE_URL}/storage/v1/object/public/productimages/mat.jpg` // Use environment variable
    },
    {
      name: 'Cushion',
      description: 'Soft decorative cushion.',
      price: 15.00,
      image_url: `${process.env.SUPABASE_URL}/storage/v1/object/public/productimages/cushion.jpg` // Use environment variable
    },
    {
      name: 'Carpet',
      description: 'Luxurious area carpet.',
      price: 200.00,
      image_url: `${process.env.SUPABASE_URL}/storage/v1/object/public/productimages/carpet.jpg` // Use environment variable
    },
    {
      name: 'Bedsheets',
      description: 'High-quality cotton bedsheets.',
      price: 75.00,
      image_url: `${process.env.SUPABASE_URL}/storage/v1/object/public/productimages/bedsheets.jpg` // Use environment variable
    },
    {
      name: 'Curtains',
      description: 'Elegant window curtains.',
      price: 60.00,
      image_url: `${process.env.SUPABASE_URL}/storage/v1/object/public/productimages/curtains.jpg` // Use environment variable
    }
  ];

  for (const product of products) {
    const { data, error } = await supabase
      .from('products')
      .insert([product]);

    if (error) {
      console.error('Error seeding product:', product.name, error.message);
    } else {
      console.log('Seeded product:', product.name);
    }
  }
  console.log('Product seeding complete.');
}

seedProducts();