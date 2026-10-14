import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../services/api";

function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    featured: false,

    // Features
    features: "",

    // Plant Care
    sunlight: "",
    watering: "",
    soil: "",
    temperature: "",
  });

  const [image, setImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);

  // =====================================================
  // FETCH CATEGORIES
  // =====================================================

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");

        setCategories(res.data.categories || []);
      } catch (error) {
        console.log("CATEGORY ERROR:", error);
      }
    };

    fetchCategories();
  }, []);

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =====================================================
  // MAIN IMAGE
  // =====================================================

  const handleMainImage = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
    }
  };

  // =====================================================
  // ADDITIONAL IMAGES
  // =====================================================

  const handleAdditionalImages = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    setAdditionalImages((prevImages) => [
      ...prevImages,
      ...selectedFiles,
    ]);

    e.target.value = "";
  };

  // =====================================================
  // REMOVE ADDITIONAL IMAGE
  // =====================================================

  const removeAdditionalImage = (index) => {
    setAdditionalImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    // Basic validation
    if (!product.name.trim()) {
      alert("Please enter product name");
      return;
    }

    if (!product.description.trim()) {
      alert("Please enter product description");
      return;
    }

    if (!product.price) {
      alert("Please enter product price");
      return;
    }

    if (!product.category) {
      alert("Please select category");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      // =================================================
      // BASIC DETAILS
      // =================================================

      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("category", product.category);
      formData.append("featured", product.featured);

      // =================================================
      // FEATURES
      // =================================================

      const featureArray = product.features
        .split("\n")
        .map((feature) => feature.trim())
        .filter((feature) => feature.length > 0);

      formData.append(
        "features",
        JSON.stringify(featureArray)
      );

      // =================================================
      // PLANT CARE
      // =================================================

      formData.append(
        "sunlight",
        product.sunlight
      );

      formData.append(
        "watering",
        product.watering
      );

      formData.append(
        "soil",
        product.soil
      );

      formData.append(
        "temperature",
        product.temperature
      );

      // =================================================
      // MAIN IMAGE
      // =================================================

      if (image) {
        formData.append("mainImage", image);
      }

      // =================================================
      // ADDITIONAL IMAGES
      // =================================================

      additionalImages.forEach((file) => {
        formData.append(
          "additionalImages",
          file
        );
      });

      // =================================================
      // API
      // =================================================

      const res = await api.post(
        "/products/add",
        formData
      );

      console.log(
        "PRODUCT RESPONSE:",
        res.data
      );

      alert("Product Added Successfully!");

      // =================================================
      // RESET
      // =================================================

      setProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        featured: false,

        features: "",

        sunlight: "",
        watering: "",
        soil: "",
        temperature: "",
      });

      setImage(null);
      setAdditionalImages([]);

      const mainInput =
        document.getElementById(
          "mainImageUpload"
        );

      const additionalInput =
        document.getElementById(
          "additionalImagesUpload"
        );

      if (mainInput) {
        mainInput.value = "";
      }

      if (additionalInput) {
        additionalInput.value = "";
      }
    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log(
        "RESPONSE:",
        error.response
      );

      alert(
        error.response?.data?.message ||
          "Failed to add product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Add New Product
          </h1>

          <p className="text-gray-500 mt-2">
            Add product details, images,
            features and plant care information.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-lg p-6 md:p-8"
        >

          {/* =================================================
              PRODUCT INFORMATION
          ================================================= */}

          <div className="mb-8">

            <h2 className="text-xl font-bold text-green-700 mb-5">
              Product Information
            </h2>

            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={handleChange}
              className="border border-gray-200 p-4 rounded-xl w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <textarea
              name="description"
              placeholder="Product Description"
              value={product.description}
              onChange={handleChange}
              className="border border-gray-200 p-4 rounded-xl w-full h-32 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <div className="grid md:grid-cols-2 gap-4 mb-4">

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={product.price}
                onChange={handleChange}
                className="border border-gray-200 p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={product.stock}
                onChange={handleChange}
                className="border border-gray-200 p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />

            </div>

            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="border border-gray-200 p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            >

              <option value="">
                Select Category
              </option>

              {categories.map((cat) => (
                <option
                  key={cat._id}
                  value={cat._id}
                >
                  {cat.name}
                </option>
              ))}

            </select>

          </div>

          {/* =================================================
              FEATURES
          ================================================= */}

          <div className="mb-8">

            <h2 className="text-xl font-bold text-green-700 mb-2">
              Key Features
            </h2>

            <p className="text-sm text-gray-500 mb-3">
              Enter each feature on a separate line.
            </p>

            <textarea
              name="features"
              value={product.features}
              onChange={handleChange}
              placeholder={`Example:
Easy to grow
Low maintenance
Air purifying
Beautiful green leaves`}
              className="border border-gray-200 p-4 rounded-xl w-full h-36 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          {/* =================================================
              PLANT CARE
          ================================================= */}

          <div className="mb-8">

            <h2 className="text-xl font-bold text-green-700 mb-2">
              🌱 Plant Care Information
            </h2>

            <p className="text-sm text-gray-500 mb-5">
              Add detailed care information
              for the plant.
            </p>

            {/* SUNLIGHT */}

            {/* <div className="mb-5">

              <label className="block font-semibold text-gray-700 mb-2">
                ☀️ Sunlight
              </label>

              <select
                name="sunlight"
                value={product.sunlight}
                onChange={handleChange}
                className="border border-gray-200 bg-white p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              >

                <option value="">
                  Select Sunlight
                </option>

                <option value="bright">
                  ☀️ Bright
                </option>

                <option value="medium">
                  🌤️ Medium
                </option>

                <option value="low">
                  🌙 Low Light
                </option>

              </select>

            </div> */}

            <div className="grid md:grid-cols-3 gap-4">

              <input
                type="text"
                name="watering"
                placeholder="💧 Watering"
                value={product.watering}
                onChange={handleChange}
                className="border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="text"
                name="soil"
                placeholder="🌱 Soil"
                value={product.soil}
                onChange={handleChange}
                className="border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="text"
                name="temperature"
                placeholder="🌡️ Temperature"
                value={product.temperature}
                onChange={handleChange}
                className="border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />

            </div>

          </div>

          {/* =================================================
              MAIN IMAGE
          ================================================= */}

          <div className="mb-8">

            <h2 className="text-xl font-bold text-green-700 mb-4">
              Main Product Image
            </h2>

            <label
              htmlFor="mainImageUpload"
              className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-green-300 rounded-2xl cursor-pointer bg-green-50 hover:bg-green-100 transition"
            >

              {image ? (
                <>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="h-32 object-contain rounded-xl mb-3"
                  />

                  <span className="text-green-700 font-medium">
                    {image.name}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-5xl">
                    📷
                  </span>

                  <p className="mt-3 text-gray-600">
                    Click to upload main image
                  </p>

                  <p className="text-sm text-gray-400">
                    JPG, PNG, JPEG
                  </p>
                </>
              )}

            </label>

            <input
              id="mainImageUpload"
              type="file"
              accept="image/*"
              onChange={handleMainImage}
              className="hidden"
            />

          </div>

          {/* =================================================
              ADDITIONAL IMAGES
          ================================================= */}

          <div className="mb-8">

            <h2 className="text-xl font-bold text-green-700 mb-2">
              Additional Product Images
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              Select multiple images.
            </p>

            <label
              htmlFor="additionalImagesUpload"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-green-300 rounded-2xl cursor-pointer bg-green-50 hover:bg-green-100 transition"
            >

              <span className="text-5xl">
                🖼️
              </span>

              <p className="mt-3 text-gray-600">
                Click to upload additional images
              </p>

              <p className="text-sm text-gray-400">
                You can select multiple images
              </p>

            </label>

            <input
              id="additionalImagesUpload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleAdditionalImages}
              className="hidden"
            />

            {additionalImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">

                {additionalImages.map(
                  (file, index) => (
                    <div
                      key={index}
                      className="border rounded-xl p-2 bg-gray-50 relative"
                    >

                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Additional ${index + 1}`}
                        className="w-full h-28 object-cover rounded-lg"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeAdditionalImage(index)
                        }
                        className="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-500 text-white text-sm"
                      >
                        ×
                      </button>

                      <p className="text-xs text-gray-500 mt-2 truncate">
                        {file.name}
                      </p>

                    </div>
                  )
                )}

              </div>
            )}

          </div>

          {/* =================================================
              FEATURED
          ================================================= */}

          <div className="mb-8">

            <label className="flex items-center gap-3 cursor-pointer">

              <input
                type="checkbox"
                name="featured"
                checked={product.featured}
                onChange={handleChange}
                className="w-5 h-5 accent-green-700"
              />

              <span className="font-semibold text-gray-700">
                Featured Product
              </span>

            </label>

          </div>

          {/* =================================================
              SUBMIT
          ================================================= */}

          <button
            type="submit"
            disabled={loading}
            className={`w-full md:w-auto px-10 py-4 rounded-xl text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-700 hover:bg-green-800 hover:shadow-lg"
            }`}
          >
            {loading
              ? "Adding Product..."
              : "Add Product"}
          </button>

        </form>

      </div>
    </AdminLayout>
  );
}

export default AddProduct;