import express from 'express';
import Order from '../model/order.js';
import Cart from '../model/cart.js';

const router = express.Router();


router.post('/order/:userId', async (req, res) => {
  const { paymentMethod, shippingAddress } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty or not found' });
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    );

    const order = new Order({
      userId: req.params.userId,
      items: cart.items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
      totalAmount,
      paymentMethod,
      shippingAddress,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Completed',
    });

    await order.save();

    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/order/:orderId/cancel', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.orderStatus === 'Cancelled') {
      return res.status(400).json({ message: 'Order is already cancelled' });
    }

    order.orderStatus = 'Cancelled';
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/order/:orderId/return', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.orderStatus !== 'Delivered') {
      return res.status(400).json({ message: 'Only delivered orders can be returned' });
    }

    order.orderStatus = 'Returned';
    order.returnDate = Date.now();
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .populate('items.productId');
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Orders by UserId
router.get('/orders/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate('userId', 'name email')
      .populate('items.productId')
      .sort({ createdAt: -1 });
    
    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
