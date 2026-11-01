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
    features: "",
    sunlight: "",
    watering: "",
    soil: "",
    temperature: "",
  });

  const [image, setImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/api/categories");
        setCategories(res.data.categories || []);
      } catch (error) {
        console.log("CATEGORY ERROR:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMainImage = (e) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const handleAdditionalImages = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    setAdditionalImages((prevImages) => [...prevImages, ...selectedFiles]);
    e.target.value = "";
  };

  const removeAdditionalImage = (index) => {
    setAdditionalImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

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

      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("category", product.category);
      formData.append("featured", product.featured);

      const featureArray = product.features
        .split("\n")
        .map((feature) => feature.trim())
        .filter((feature) => feature.length > 0);

      formData.append("features", JSON.stringify(featureArray));

      // Plant Care (Sunlight added back)
      formData.append("sunlight", product.sunlight);
      formData.append("watering", product.watering);
      formData.append("soil", product.soil);
      formData.append("temperature", product.temperature);

      if (image) {
        formData.append("mainImage", image);
      }

      additionalImages.forEach((file) => {
        formData.append("additionalImages", file);
      });

      const res = await api.post("/products/add", formData);
      console.log("PRODUCT RESPONSE:", res.data);
      alert("Product Added Successfully!");

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

      const mainInput = document.getElementById("mainImageUpload");
      const additionalInput = document.getElementById("additionalImagesUpload");
      if (mainInput) mainInput.value = "";
      if (additionalInput) additionalInput.value = "";
    } catch (error) {
      console.log("FULL ERROR:", error);
      alert(error.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Add New Product
          </h1>
          <p className="mt-2 text-gray-500">
            Add product details, images and plant care information.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-6 shadow-lg md:p-8"
        >
          {/* PRODUCT INFO */}
          <div className="mb-8">
            <h2 className="mb-5 text-xl font-bold text-green-700">
              Product Information
            </h2>

            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={handleChange}
              className="mb-4 w-full rounded-xl border border-gray-200 p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <textarea
              name="description"
              placeholder="Product Description"
              value={product.description}
              onChange={handleChange}
              className="mb-4 h-32 w-full resize-none rounded-xl border border-gray-200 p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <div className="mb-4 grid gap-4 md:grid-cols-2">
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={product.price}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={product.stock}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-white p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* KEY FEATURES */}
          <div className="mb-8">
            <h2 className="mb-2 text-xl font-bold text-green-700">
              Key Features
            </h2>
            <textarea
              name="features"
              value={product.features}
              onChange={handleChange}
              placeholder={`Example:\nEasy to grow\nLow maintenance`}
              className="h-36 w-full resize-none rounded-xl border border-gray-200 p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* PLANT CARE TIPS (SUNLIGHT ADDED BACK) */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-green-700">
              🌱 Plant Care Information
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-600">
                  ☀️ Sunlight
                </label>
                <input
                  type="text"
                  name="sunlight"
                  placeholder="e.g. Bright, indirect light"
                  value={product.sunlight}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-600">
                  💧 Watering
                </label>
                <input
                  type="text"
                  name="watering"
                  placeholder="e.g. Water once a week"
                  value={product.watering}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-600">
                  🌱 Soil
                </label>
                <input
                  type="text"
                  name="soil"
                  placeholder="e.g. Well-draining potting mix"
                  value={product.soil}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-600">
                  🌡️ Temperature
                </label>
                <input
                  type="text"
                  name="temperature"
                  placeholder="e.g. 18°C - 28°C"
                  value={product.temperature}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* MAIN IMAGE */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-green-700">
              Main Product Image
            </h2>
            <label
              htmlFor="mainImageUpload"
              className="flex h-56 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-green-300 bg-green-50 transition hover:bg-green-100"
            >
              {image ? (
                <>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="mb-3 h-32 rounded-xl object-contain"
                  />
                  <span className="font-medium text-green-700">{image.name}</span>
                </>
              ) : (
                <>
                  <span className="text-5xl">📷</span>
                  <p className="mt-3 text-gray-600">Click to upload main image</p>
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

          {/* ADDITIONAL IMAGES */}
          <div className="mb-8">
            <h2 className="mb-2 text-xl font-bold text-green-700">
              Additional Product Images
            </h2>
            <label
              htmlFor="additionalImagesUpload"
              className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-green-300 bg-green-50 transition hover:bg-green-100"
            >
              <span className="text-5xl">🖼️</span>
              <p className="mt-3 text-gray-600">Click to upload additional images</p>
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
              <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
                {additionalImages.map((file, index) => (
                  <div
                    key={index}
                    className="relative rounded-xl border bg-gray-50 p-2"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Additional ${index + 1}`}
                      className="h-28 w-full rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeAdditionalImage(index)}
                      className="absolute right-3 top-3 h-7 w-7 rounded-full bg-red-500 text-sm text-white"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FEATURED PRODUCT */}
          <div className="mb-8">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                checked={product.featured}
                onChange={handleChange}
                className="h-5 w-5 accent-green-700"
              />
              <span className="font-semibold text-gray-700">
                Featured Product
              </span>
            </label>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl px-10 py-4 font-semibold text-white transition md:w-auto ${
              loading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-green-700 hover:bg-green-800 hover:shadow-lg"
            }`}
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AddProduct;