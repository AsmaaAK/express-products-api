let products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 800 },
  { id: 2, name: 'Book', category: 'Education', price: 15 }
];

exports.getAllProducts = (req, res) => {
  const { category } = req.query;

  if (category) {
    const filtered = products.filter(p => p.category === category);
    return res.json(filtered);
  }

  res.json(products);
};

exports.getSingleProduct = (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
};
