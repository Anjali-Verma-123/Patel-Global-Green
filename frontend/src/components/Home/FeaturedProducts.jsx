import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaStar,
  FaShoppingCart,
  FaArrowRight,
} from "react-icons/fa";
import api from "../../services/api";
import { WishlistContext } from "../../context/WishlistContext";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

function FeaturedProducts() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
  } = useContext(WishlistContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const res = await api.get("/products");

      const featured = res.data.products.filter(
        (product) => product.featured
      );

      setProducts(featured);
    } catch (error) {
      console.log("FEATURED PRODUCTS ERROR:", error);
    }
  };

  const handleWishlist = (productId, isWishlisted) => {
    if (!token) {
      toast.info("Please login first");

      setTimeout(() => {
        navigate("/login");
      }, 1200);

      return;
    }

    if (isWishlisted) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">

          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-[2px] bg-green-700"></span>

              <span className="text-sm uppercase tracking-[3px] font-semibold text-green-700">
                Our Collection
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Featured Plants
            </h2>

            <p className="text-gray-500 mt-3 max-w-xl">
              Discover our most loved plants, carefully selected
              to bring freshness and natural beauty to your space.
            </p>
          </div>

          <Link
            to="/products"
            className="group flex items-center gap-2 text-green-700 font-semibold hover:text-green-900 transition"
          >
            View All Plants
            <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
          </Link>

        </div>

        {/* =================================================
            PRODUCTS HORIZONTAL SCROLL
        ================================================= */}

        {products.length > 0 ? (
          <div
            className="
              flex
              gap-6
              overflow-x-auto
              pb-6
              snap-x
              snap-mandatory
              scrollbar-hide
            "
          >

            {products.map((product) => {

              const isWishlisted = wishlistItems.some(
                (item) => item._id === product._id
              );

              return (
                <div
                  key={product._id}
                  className="
                    group
                    flex-shrink-0
                    w-[280px]
                    sm:w-[300px]
                    md:w-[320px]
                    snap-start
                  "
                >

                  {/* =================================================
                      PRODUCT CARD
                  ================================================= */}

                  <div
                    className="
                      bg-white
                      rounded-3xl
                      overflow-hidden
                      border
                      border-gray-100
                      shadow-sm
                      hover:shadow-xl
                      transition-all
                      duration-500
                    "
                  >

                    {/* IMAGE */}

                    <div className="relative h-[300px] overflow-hidden bg-green-50">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="
                          w-full
                          h-full
                          object-cover
                          group-hover:scale-105
                          transition-transform
                          duration-700
                        "
                      />

                      {/* FEATURED BADGE */}

                      <div
                        className="
                          absolute
                          top-4
                          left-4
                          bg-white/95
                          backdrop-blur-sm
                          text-green-700
                          text-xs
                          font-bold
                          px-3
                          py-1.5
                          rounded-full
                          shadow-sm
                        "
                      >
                        Featured
                      </div>

                      {/* WISHLIST */}

                      <button
                        onClick={() =>
                          handleWishlist(
                            product._id,
                            isWishlisted
                          )
                        }
                        className="
                          absolute
                          top-4
                          right-4
                          w-10
                          h-10
                          rounded-full
                          bg-white/95
                          backdrop-blur-sm
                          flex
                          items-center
                          justify-center
                          shadow-sm
                          hover:scale-110
                          transition
                        "
                      >
                        <FaHeart
                          className={`text-lg ${
                            isWishlisted
                              ? "text-red-500"
                              : "text-gray-400"
                          }`}
                        />
                      </button>

                    </div>

                    {/* =================================================
                        CONTENT
                    ================================================= */}

                    <div className="p-5">

                      {/* CATEGORY */}

                      {product.category?.name && (
                        <p className="text-xs uppercase tracking-wider text-green-600 font-semibold mb-2">
                          {product.category.name}
                        </p>
                      )}

                      {/* NAME + RATING */}

                      <div className="flex items-start justify-between gap-3">

                        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                          {product.name}
                        </h3>

                        <div className="flex items-center gap-1 flex-shrink-0 bg-yellow-50 px-2 py-1 rounded-lg">
                          <FaStar className="text-yellow-500 text-xs" />

                          <span className="text-xs font-semibold text-gray-700">
                            {product.rating || "0.0"}
                          </span>
                        </div>

                      </div>

                      {/* DESCRIPTION */}

                      <p className="text-sm text-gray-500 mt-2 line-clamp-2 min-h-[40px]">
                        {product.description}
                      </p>

                      {/* PRICE + BUTTON */}

                      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">

                        <div>
                          <p className="text-xs text-gray-400">
                            Starting from
                          </p>

                          <p className="text-2xl font-bold text-green-700">
                            ₹{product.price}
                          </p>
                        </div>

                        <Link
                          to={`/product/${product._id}`}
                          className="
                            flex
                            items-center
                            gap-2
                            bg-green-700
                            text-white
                            px-4
                            py-2.5
                            rounded-xl
                            text-sm
                            font-semibold
                            hover:bg-green-800
                            hover:shadow-lg
                            transition
                          "
                        >
                          <FaShoppingCart className="text-sm" />
                          View
                        </Link>

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🌱</div>

            <h3 className="text-xl font-semibold text-gray-700">
              No Featured Plants Yet
            </h3>

            <p className="text-gray-500 mt-2">
              Featured products will appear here.
            </p>
          </div>
        )}

        {/* =================================================
            SCROLL HINT
        ================================================= */}

        {products.length > 3 && (
          <div className="flex justify-center items-center gap-2 mt-4 text-gray-400 text-sm">
            <span>Swipe to explore</span>
            <FaArrowRight className="text-xs" />
          </div>
        )}

      </div>
    </section>
  );
}

export default FeaturedProducts;