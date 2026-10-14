import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { FaHeart } from "react-icons/fa";
import { WishlistContext } from "../../context/WishlistContext";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const { wishlistItems, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const isWishlisted = wishlistItems.some((item) => item._id === product._id);

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = () => {
    if (!token) {
      toast.info("Please login or register to add products to cart.");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

      return;
    }

    if (product.stock <= 0) {
      toast.error("Product is currently unavailable.");
      return;
    }

    addToCart(product._id);

    toast.success("Added to Cart");
  };

  // =========================
  // WISHLIST
  // =========================
  const handleWishlist = () => {
    if (!token) {
      toast.info("Please login or register first.");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

      return;
    }

    if (isWishlisted) {
      removeFromWishlist(product._id);
      toast.success("Removed from Wishlist");
    } else {
      addToWishlist(product._id);
      toast.success("Added to Wishlist");
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
      {/* =========================
          IMAGE
      ========================= */}
      <div className="relative bg-gray-50">
        <Link to={`/products/${product._id}`}>
          <img
            src={
              product.image ||
              "https://via.placeholder.com/300x250?text=No+Image"
            }
            alt={product.name}
            className="w-full h-60 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition"
          aria-label="Wishlist"
        >
          <FaHeart
            className={`text-lg ${
              isWishlisted ? "text-red-600" : "text-gray-400 hover:text-red-500"
            }`}
          />
        </button>

        {/* Availability Badge */}
        {product.stock <= 0 && (
          <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            Out of Stock
          </span>
        )}
      </div>

      {/* =========================
          PRODUCT INFORMATION
      ========================= */}
      <div className="p-5">
        {/* Product Name */}
        <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
          {product.name}
        </h3>

        {/* Rating + Reviews */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-yellow-500 font-semibold">
            ⭐ {Number(product.rating || 0).toFixed(1)}
          </span>

          <span className="text-sm text-gray-500">
            ({product.numReviews || 0} Reviews)
          </span>
        </div>

        {/* Price */}
        <div className="mt-4">
          <span className="text-2xl font-bold text-green-700">
            ₹{product.price}
          </span>
        </div>

        {/* =========================
            BUTTONS
        ========================= */}
        <div className="flex gap-3 mt-5">
          <Link
            to={`/products/${product._id}`}
            className="flex-1 flex items-center justify-center gap-2
      border-2 border-green-700
      text-green-700
      px-4 py-3
      rounded-xl
      font-semibold
      hover:bg-green-700
      hover:text-white
      transition-all duration-300"
          >
            👁️ View
          </Link>

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`flex-1 flex items-center justify-center gap-2
      px-4 py-3
      rounded-xl
      font-semibold
      transition-all duration-300
      ${
        product.stock <= 0
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg"
      }`}
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
