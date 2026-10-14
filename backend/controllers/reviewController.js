import Review from "../models/Review.js";
import Product from "../models/Product.js";


export const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if user already reviewed
    const alreadyReviewed = await Review.findOne({
      user: req.user.id,
      product: productId,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product.",
      });
    }

    // Create Review
    await Review.create({
      user: req.user.id,
      product: productId,
      rating,
      comment,
    });

    // Get all reviews of this product
    const reviews = await Review.find({
      product: productId,
    });

    // Calculate Average Rating
    const averageRating =
      reviews.reduce((total, review) => total + review.rating, 0) /
      reviews.length;

    // Update Product
    product.rating = averageRating;
    product.numReviews = reviews.length;

    await product.save();

    res.status(201).json({
      success: true,
      message: "Review Added Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({
      product: productId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};