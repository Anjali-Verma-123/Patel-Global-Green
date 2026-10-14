import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

import { toast } from "react-toastify";

import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [quantity, setQuantity] = useState(1);

  const [selectedImage, setSelectedImage] =
    useState("");

  // =====================================================
  // FETCH PRODUCT
  // =====================================================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);

        const productData = res.data.product;

        setProduct(productData);

        setSelectedImage(
          productData.image || ""
        );
      } catch (error) {
        console.log(
          "PRODUCT DETAILS ERROR:",
          error
        );
      }
    };

    fetchProduct();
  }, [id]);

  // =====================================================
  // FETCH REVIEWS
  // =====================================================

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get(
          `/reviews/${id}`
        );

        setReviews(res.data.reviews || []);
      } catch (error) {
        console.log(
          "REVIEWS ERROR:",
          error
        );
      }
    };

    fetchReviews();
  }, [id]);

  // =====================================================
  // FETCH RELATED PRODUCTS
  // =====================================================

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product?.category) return;

      try {
        const categoryId =
          typeof product.category === "object"
            ? product.category._id
            : product.category;

        const res = await api.get(
          `/products/category/${categoryId}`
        );

        const related =
          res.data.products.filter(
            (item) => item._id !== id
          );

        setRelatedProducts(related);
      } catch (error) {
        console.log(
          "RELATED PRODUCTS ERROR:",
          error
        );
      }
    };

    fetchRelatedProducts();
  }, [product, id]);

  // =====================================================
  // ADD TO CART
  // =====================================================

  const handleAddToCart = () => {
    if (!token) {
      toast.info("Please login first!");

      setTimeout(() => {
        navigate("/login");
      }, 1200);

      return;
    }

    addToCart(product._id);

    toast.success("Added to Cart");
  };

  // =====================================================
  // BUY NOW
  // =====================================================

  const handleBuyNow = () => {
    if (!token) {
      toast.info("Please login first!");

      setTimeout(() => {
        navigate("/login");
      }, 1200);

      return;
    }

    navigate("/checkout", {
      state: {
        buyNow: true,
        product,
        quantity,
      },
    });
  };

  // =====================================================
  // QUANTITY
  // =====================================================

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(
        (prev) => prev + 1
      );
    } else {
      toast.info(
        `Only ${product.stock} items available`
      );
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(
        (prev) => prev - 1
      );
    }
  };

  // =====================================================
  // SUBMIT REVIEW
  // =====================================================

  const submitReview = async () => {
    if (!token) {
      toast.info("Please login first!");

      setTimeout(() => {
        navigate("/login");
      }, 1200);

      return;
    }

    if (!comment.trim()) {
      toast.info("Please write a review");
      return;
    }

    try {
      await api.post(
        "/reviews/add",
        {
          productId: id,
          rating,
          comment,
        }
      );

      toast.success(
        "Review Added Successfully"
      );

      setRating(5);
      setComment("");

      const res = await api.get(
        `/reviews/${id}`
      );

      setReviews(
        res.data.reviews || []
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add review"
      );
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">

          <div className="w-12 h-12 border-4 border-green-200 border-t-green-700 rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-500">
            Loading product...
          </p>

        </div>
      </div>
    );
  }

  // =====================================================
  // FEATURES FIX
  // =====================================================

  let features = [];

  if (Array.isArray(product.features)) {
    features = product.features;
  } else if (typeof product.features === "string") {
    try {
      const parsed =
        JSON.parse(product.features);

      features = Array.isArray(parsed)
        ? parsed
        : [product.features];
    } catch {
      features = product.features
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  // =====================================================
  // IMAGES
  // =====================================================

  const allImages = [
    product.image,
    ...(product.images || []),
  ].filter(Boolean);

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="bg-[#f8faf9] min-h-screen">

      {/* =================================================
          PRODUCT TOP
      ================================================= */}

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">

        <div className="grid lg:grid-cols-2 gap-12">

          {/* IMAGE SECTION */}

          <div>

            <div className="bg-white rounded-3xl p-5 shadow-sm">

              <div className="h-[420px] md:h-[500px] flex items-center justify-center bg-[#f5f8f5] rounded-2xl overflow-hidden">

                <img
                  src={
                    selectedImage ||
                    "https://via.placeholder.com/500"
                  }
                  alt={product.name}
                  className="w-full h-full object-contain"
                />

              </div>

              {/* THUMBNAILS */}

              {allImages.length > 1 && (
                <div className="flex gap-3 mt-5 overflow-x-auto">

                  {allImages.map(
                    (image, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          setSelectedImage(image)
                        }
                        className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 ${
                          selectedImage === image
                            ? "border-green-700"
                            : "border-transparent"
                        }`}
                      >

                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />

                      </button>
                    )
                  )}

                </div>
              )}

            </div>

          </div>

          {/* PRODUCT INFO */}

          <div className="flex flex-col justify-center">

            <p className="text-green-700 font-semibold uppercase tracking-wider text-sm">
              {product.category?.name ||
                "Premium Plant"}
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
              {product.name}
            </h1>

            {/* RATING */}

            <div className="flex items-center gap-3 mt-5">

              <span className="text-yellow-500 text-lg">
                ⭐{" "}
                {Number(
                  product.rating || 0
                ).toFixed(1)}
              </span>

              <span className="text-gray-500">
                ({product.numReviews || 0} Reviews)
              </span>

            </div>

            {/* PRICE */}

            <p className="text-3xl font-bold text-green-700 mt-6">
              ₹{product.price}
            </p>

            {/* AVAILABILITY */}

            <div className="mt-5">

              {product.stock > 0 ? (
                <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full font-semibold">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  Available
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full font-semibold">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Currently Unavailable
                </span>
              )}

            </div>

            {/* QUANTITY */}

            {product.stock > 0 && (
              <div className="mt-7">

                <p className="font-semibold text-gray-800 mb-3">
                  Quantity
                </p>

                <div className="flex items-center gap-4">

                  <button
                    onClick={decreaseQuantity}
                    className="w-10 h-10 rounded-lg border bg-white hover:bg-gray-100"
                  >
                    −
                  </button>

                  <span className="font-bold text-lg w-6 text-center">
                    {quantity}
                  </span>

                  <button
                    onClick={increaseQuantity}
                    className="w-10 h-10 rounded-lg border bg-white hover:bg-gray-100"
                  >
                    +
                  </button>

                </div>

              </div>
            )}

            {/* BUTTONS */}

            <div className="flex flex-col sm:flex-row gap-4 mt-8">

              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="flex-1 bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl font-semibold transition shadow-sm"
              >
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold transition shadow-sm"
              >
                Buy Now
              </button>

            </div>

          </div>

        </div>

        {/* =================================================
            DESCRIPTION + FEATURES
        ================================================= */}

        <div className="grid lg:grid-cols-3 gap-7 mt-14">

          {/* DESCRIPTION */}

          <div className="lg:col-span-2 bg-white rounded-3xl p-7 md:p-9 shadow-sm border border-gray-100">

            <div className="flex items-center gap-4 mb-6">

              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-2xl">
                🌿
              </div>

              <div>
                <p className="text-green-700 text-sm font-semibold uppercase tracking-widest">
                  About This Plant
                </p>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Product Description
                </h2>
              </div>

            </div>

            <div className="border-t pt-6">

              <p className="text-gray-600 leading-8 whitespace-pre-line">
                {product.description}
              </p>

            </div>

          </div>

          {/* FEATURES */}

          <div className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-7 md:p-9 border border-green-100">

            <div className="flex items-center gap-4 mb-6">

              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl">
                ✨
              </div>

              <div>

                <p className="text-green-700 text-sm font-semibold uppercase tracking-widest">
                  Why You'll Love It
                </p>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Key Features
                </h2>

              </div>

            </div>

            <div className="border-t border-green-100 pt-5">

              {features.length > 0 ? (

                <ul className="space-y-4">

                  {features.map(
                    (feature, index) => {

                      /*
                        Extra safety:
                        Agar old data me feature
                        array ke andar stringified
                        array aa gaya hai, to usko
                        bhi clean karenge.
                      */

                      let cleanFeature =
                        feature;

                      if (
                        typeof feature ===
                        "string"
                      ) {
                        try {
                          const parsed =
                            JSON.parse(feature);

                          if (
                            Array.isArray(parsed)
                          ) {
                            return parsed.map(
                              (
                                item,
                                innerIndex
                              ) => (
                                <li
                                  key={`${index}-${innerIndex}`}
                                  className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-green-50"
                                >

                                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">
                                    ✓
                                  </span>

                                  <span className="text-gray-700 leading-6 pt-0.5">
                                    {item}
                                  </span>

                                </li>
                              )
                            );
                          }
                        } catch {
                          // Normal string
                        }
                      }

                      return (
                        <li
                          key={index}
                          className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-green-50"
                        >

                          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">
                            ✓
                          </span>

                          <span className="text-gray-700 leading-6 pt-0.5">
                            {cleanFeature}
                          </span>

                        </li>
                      );
                    }
                  )}

                </ul>

              ) : (

                <p className="text-gray-500">
                  No features available.
                </p>

              )}

            </div>

          </div>

        </div>

        {/* =================================================
            PLANT CARE
        ================================================= */}

        {product.plantCare &&
          (
            product.plantCare.sunlight ||
            product.plantCare.watering ||
            product.plantCare.soil ||
            product.plantCare.temperature
          ) && (

          <div className="mt-7 bg-white rounded-3xl p-7 md:p-9 shadow-sm border border-gray-100">

            <div className="mb-7">

              <p className="text-green-700 text-sm font-semibold uppercase tracking-widest">
                Care Guide
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                Plant Care Information
              </h2>

            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

              {/* SUNLIGHT */}

              <div className="rounded-2xl bg-green-50 p-5">

                <div className="text-3xl mb-4">
                  ☀️
                </div>

                <h3 className="font-bold text-gray-900">
                  Sunlight
                </h3>

                <p className="text-gray-600 mt-2 leading-6">
                  {product.plantCare.sunlight ||
                    "Not specified"}
                </p>

              </div>

              {/* WATERING */}

              <div className="rounded-2xl bg-blue-50 p-5">

                <div className="text-3xl mb-4">
                  💧
                </div>

                <h3 className="font-bold text-gray-900">
                  Watering
                </h3>

                <p className="text-gray-600 mt-2 leading-6">
                  {product.plantCare.watering ||
                    "Not specified"}
                </p>

              </div>

              {/* SOIL */}

              <div className="rounded-2xl bg-yellow-50 p-5">

                <div className="text-3xl mb-4">
                  🌱
                </div>

                <h3 className="font-bold text-gray-900">
                  Soil
                </h3>

                <p className="text-gray-600 mt-2 leading-6">
                  {product.plantCare.soil ||
                    "Not specified"}
                </p>

              </div>

              {/* TEMPERATURE */}

              <div className="rounded-2xl bg-orange-50 p-5">

                <div className="text-3xl mb-4">
                  🌡️
                </div>

                <h3 className="font-bold text-gray-900">
                  Temperature
                </h3>

                <p className="text-gray-600 mt-2 leading-6">
                  {product.plantCare.temperature ||
                    "Not specified"}
                </p>

              </div>

            </div>

          </div>
        )}

        {/* =================================================
            REVIEWS
        ================================================= */}

        <div className="mt-14">

          <div className="mb-7">

            <p className="text-green-700 text-sm font-semibold uppercase tracking-widest">
              Customer Feedback
            </p>

            <h2 className="text-3xl font-bold text-gray-900">
              Customer Reviews
            </h2>

          </div>

          {/* WRITE REVIEW */}

          {token && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-7 mb-8">

              <h3 className="text-xl font-bold text-gray-900 mb-5">
                Write a Review
              </h3>

              <select
                value={rating}
                onChange={(e) =>
                  setRating(
                    Number(e.target.value)
                  )
                }
                className="border border-gray-200 p-3 rounded-xl w-full mb-4"
              >

                <option value={5}>
                  ⭐⭐⭐⭐⭐ (5)
                </option>

                <option value={4}>
                  ⭐⭐⭐⭐ (4)
                </option>

                <option value={3}>
                  ⭐⭐⭐ (3)
                </option>

                <option value={2}>
                  ⭐⭐ (2)
                </option>

                <option value={1}>
                  ⭐ (1)
                </option>

              </select>

              <textarea
                value={comment}
                onChange={(e) =>
                  setComment(e.target.value)
                }
                placeholder="Share your experience with this product..."
                className="border border-gray-200 p-4 rounded-xl w-full h-32 resize-none"
              />

              <button
                onClick={submitReview}
                className="mt-4 bg-green-700 hover:bg-green-800 text-white px-7 py-3 rounded-xl font-semibold"
              >
                Submit Review
              </button>

            </div>
          )}

          {/* REVIEWS LIST */}

          <div className="space-y-5">

            {reviews.length === 0 ? (

              <div className="bg-white rounded-2xl p-8 text-center">
                <p className="text-gray-500">
                  No reviews yet.
                </p>
              </div>

            ) : (

              reviews.map((review) => (

                <div
                  key={review._id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                >

                  <div className="flex justify-between items-center">

                    <h3 className="font-bold text-lg">
                      {review.user?.name ||
                        "Customer"}
                    </h3>

                    <span className="text-yellow-500">
                      {"⭐".repeat(
                        review.rating
                      )}
                    </span>

                  </div>

                  <p className="mt-3 text-gray-700 leading-7">
                    {review.comment}
                  </p>

                  <p className="text-sm text-gray-400 mt-3">
                    {new Date(
                      review.createdAt
                    ).toLocaleDateString()}
                  </p>

                </div>

              ))
            )}

          </div>

        </div>

        {/* =================================================
            RELATED PRODUCTS
        ================================================= */}

        {relatedProducts.length > 0 && (

          <div className="mt-16">

            <div className="mb-7">

              <p className="text-green-700 text-sm font-semibold uppercase tracking-widest">
                You May Also Like
              </p>

              <h2 className="text-3xl font-bold text-gray-900">
                Related Plants
              </h2>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {relatedProducts
                .slice(0, 4)
                .map((item) => (

                  <div
                    key={item._id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition border border-gray-100"
                  >

                    <div className="h-56 bg-gray-50">

                      <img
                        src={
                          item.image ||
                          "https://via.placeholder.com/300"
                        }
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />

                    </div>

                    <div className="p-5">

                      <h3 className="font-bold text-lg text-gray-900">
                        {item.name}
                      </h3>

                      <div className="flex items-center gap-2 mt-2">

                        <span className="text-yellow-500">
                          ⭐{" "}
                          {Number(
                            item.rating || 0
                          ).toFixed(1)}
                        </span>

                        <span className="text-gray-400 text-sm">
                          ({item.numReviews || 0})
                        </span>

                      </div>

                      <p className="text-green-700 font-bold text-xl mt-3">
                        ₹{item.price}
                      </p>

                      <button
                        onClick={() =>
                          navigate(
                            `/products/${item._id}`
                          )
                        }
                        className="w-full mt-4 bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold transition"
                      >
                        View Product
                      </button>

                    </div>

                  </div>

                ))}

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default ProductDetails;