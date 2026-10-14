import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const placeOrder = async (req, res) => {
  try {
    const {
      shippingAddress,
      paymentMethod,
      paymentId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,

      // Buy Now ke liye
      buyNow,
      productId,
      quantity,
    } = req.body;

    console.log("========= PLACE ORDER =========");
    console.log("Buy Now:", buyNow);
    console.log("Product ID:", productId);
    console.log("Quantity:", quantity);

    // =====================================================
    // ⚡ BUY NOW
    // =====================================================
    if (buyNow === true) {
      if (!productId) {
        return res.status(400).json({
          success: false,
          message: "Product ID is required",
        });
      }

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      const buyQuantity = quantity || 1;

      if (product.stock < buyQuantity) {
        return res.status(400).json({
          success: false,
          message: "Insufficient stock",
        });
      }

      const totalPrice = product.price * buyQuantity;

      const order = await Order.create({
        user: req.user.id,

        products: [
          {
            product: product._id,
            quantity: buyQuantity,
          },
        ],

        totalPrice,
        shippingAddress,

        paymentMethod: paymentMethod || "Cash on Delivery",

        paymentId: paymentId || "",

        paymentStatus: paymentMethod === "Online Payment" ? "Paid" : "Pending",

        razorpayOrderId: razorpayOrderId || "",
        razorpayPaymentId: razorpayPaymentId || "",
        razorpaySignature: razorpaySignature || "",
      });

      product.stock -= buyQuantity;

      await product.save();

      console.log("Buy Now Stock Updated:", product.stock);

      console.log("Buy Now Order Created:", order._id);

      return res.status(201).json({
        success: true,
        message: "Order Placed Successfully",
        order,
      });
    }

    // =====================================================
    // 🛒 NORMAL CART CHECKOUT
    // =====================================================

    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate("products.product");

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const validProducts = cart.products.filter((item) => item.product);

    if (validProducts.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid products found in cart",
      });
    }

    const totalPrice = validProducts.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    const orderProducts = validProducts.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    const order = await Order.create({
      user: req.user.id,

      products: orderProducts,

      totalPrice,
      shippingAddress,

      paymentMethod: paymentMethod || "Cash on Delivery",

      paymentId: paymentId || "",

      paymentStatus: paymentMethod === "Online Payment" ? "Paid" : "Pending",

      razorpayOrderId: razorpayOrderId || "",
      razorpayPaymentId: razorpayPaymentId || "",
      razorpaySignature: razorpaySignature || "",
    });
    for (const item of validProducts) {
      item.product.stock -= item.quantity;

      await item.product.save();
    }

    console.log("Cart Products Stock Updated");

    console.log("Cart Order Created:", order._id);

    // Cart sirf normal cart checkout mein empty hoga
    cart.products = [];

    await cart.save();

    console.log("Cart Emptied Successfully");

    return res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
      order,
    });
  } catch (error) {
    console.log("PLACE ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    })
      .populate("products.product")
      .sort({ createdAt: -1 });

    orders.forEach((order) => {
      order.products = order.products.filter((item) => item.product);
    });
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name image price");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = orderStatus;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order Status Updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
