const Product = require('../models/productModel');

// جلب كل المنتجات
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// جلب منتج واحد
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// إنشاء منتج جديد
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    // التحقق من الحقول المطلوبة
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    const newProduct = await Product.create({ name, price, description });
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

// تحديث منتج
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// حذف منتج

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};
