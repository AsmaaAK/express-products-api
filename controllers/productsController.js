let products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 800 },
  { id: 2, name: 'Book', category: 'Education', price: 15 }
];

// إنشاء منتج جديد
exports.createProduct = (req, res) => {
  const { name, category, price } = req.body;
  const newProduct = { id: products.length + 1, name, category, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

// تحديث منتج موجود
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === parseInt(id));
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const { name, category, price } = req.body;
  product.name = name || product.name;
  product.category = category || product.category;
  product.price = price || product.price;

  res.json(product);
};

// حذف منتج
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(p => p.id === parseInt(id));
  if (index === -1) return res.status(404).json({ message: 'Product not found' });

  const deleted = products.splice(index, 1);
  res.json({ message: 'Product deleted', deleted });
};
