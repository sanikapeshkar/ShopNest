import express from 'express';
import Cart from '../model/cart.js';
import Product from '../model/products.js';
import User from '../model/users.js';

const router = express.Router();

// 1. Get Cart by User ID
router.get('/cart/:userId', async (req, res) => {
  try {
    // Populate the productId field in items with full product data
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. Add Item to Cart
router.post('/cart/:userId/add', async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    const user = await User.findById(req.params.userId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
      cart = new Cart({
        userId: req.params.userId,
        items: [],
      });
    }

    const newItem = {
      productId,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    };

    cart.items.push(newItem);

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. Remove Item from Cart
router.delete('/cart/:userId/remove/:itemId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item._id.toString() === req.params.itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.items.splice(itemIndex, 1);

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;