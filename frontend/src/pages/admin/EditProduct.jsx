import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    featured: false,

    features: [],

    sunlight: "",
    watering: "",
    soil: "",
    temperature: "",
  });

  // =========================
  // MAIN IMAGE
  // =========================

  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState("");

  // =========================
  // ADDITIONAL IMAGES
  // =========================

  const [additionalImages, setAdditionalImages] = useState([]);

  // Each item:
  // {
  //   url: existing image URL,
  //   file: new selected file,
  //   preview: preview URL,
  //   deleted: false
  // }

  // =========================
  // NEW ADDITIONAL IMAGES
  // =========================

  const [newImages, setNewImages] = useState([]);

  // =========================
  // FETCH PRODUCT
  // =========================

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);

      const data = res.data.product;

      setProduct({
        name: data.name || "",
        description: data.description || "",
        price: data.price || "",
        stock: data.stock || "",
        category:
          typeof data.category === "object"
            ? data.category._id
            : data.category || "",

        featured: data.featured || false,

        features: Array.isArray(data.features)
          ? data.features
          : [],

        sunlight: data.plantCare?.sunlight || "",
        watering: data.plantCare?.watering || "",
        soil: data.plantCare?.soil || "",
        temperature: data.plantCare?.temperature || "",
      });

      // Main image
      setMainImagePreview(data.image || "");

      // Additional images
      const existingImages = Array.isArray(data.images)
        ? data.images.map((url) => ({
            url,
            file: null,
            preview: url,
            deleted: false,
          }))
        : [];

      setAdditionalImages(existingImages);
    } catch (error) {
      console.log("FETCH PRODUCT ERROR:", error);
      alert(
        error.response?.data?.message ||
          "Failed to fetch product"
      );
    }
  };

  // =========================
  // FETCH CATEGORIES
  // =========================

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");

      setCategories(res.data.categories || []);
    } catch (error) {
      console.log("CATEGORY ERROR:", error);
    }
  };

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // =========================
  // FEATURES
  // =========================

  const handleFeatureChange = (index, value) => {
    setProduct((prev) => {
      const updatedFeatures = [...prev.features];

      updatedFeatures[index] = value;

      return {
        ...prev,
        features: updatedFeatures,
      };
    });
  };

  const addFeature = () => {
    setProduct((prev) => ({
      ...prev,
      features: [
        ...prev.features,
        "",
      ],
    }));
  };

  const removeFeature = (index) => {
    setProduct((prev) => ({
      ...prev,
      features: prev.features.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // =========================
  // MAIN IMAGE CHANGE
  // =========================

  const handleMainImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setMainImage(file);

    setMainImagePreview(
      URL.createObjectURL(file)
    );
  };

  // =========================
  // REPLACE ADDITIONAL IMAGE
  // =========================

  const handleAdditionalImageChange = (
    index,
    e
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setAdditionalImages((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        file,
        preview: URL.createObjectURL(file),
        deleted: false,
      };

      return updated;
    });
  };

  // =========================
  // DELETE ADDITIONAL IMAGE
  // =========================

  const removeAdditionalImage = (index) => {
    setAdditionalImages((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        deleted: true,
      };

      return updated;
    });
  };

  // =========================
  // ADD NEW IMAGES
  // =========================

  const handleNewImages = (e) => {
    const files = Array.from(
      e.target.files || []
    );

    if (!files.length) return;

    const formattedFiles = files.map(
      (file) => ({
        file,
        preview: URL.createObjectURL(file),
      })
    );

    setNewImages((prev) => [
      ...prev,
      ...formattedFiles,
    ]);
  };

  // =========================
  // REMOVE NEW IMAGE
  // =========================

  const removeNewImage = (index) => {
    setNewImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const formData = new FormData();

      // =========================
      // BASIC DETAILS
      // =========================

      formData.append(
        "name",
        product.name
      );

      formData.append(
        "description",
        product.description
      );

      formData.append(
        "price",
        product.price
      );

      formData.append(
        "stock",
        product.stock
      );

      formData.append(
        "category",
        product.category
      );

      formData.append(
        "featured",
        product.featured
      );

      // =========================
      // FEATURES
      // =========================

      const cleanedFeatures =
        product.features
          .map((feature) =>
            feature.trim()
          )
          .filter(Boolean);

      formData.append(
        "features",
        JSON.stringify(
          cleanedFeatures
        )
      );

      // =========================
      // PLANT CARE
      // =========================

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

      // =========================
      // MAIN IMAGE
      // =========================

      if (mainImage) {
        formData.append(
          "mainImage",
          mainImage
        );
      }

      // =========================
      // ADDITIONAL IMAGE REPLACEMENTS
      // =========================

      const replacementIndexes = [];

      additionalImages.forEach(
        (item, index) => {
          if (
            item.file &&
            !item.deleted
          ) {
            formData.append(
              "additionalImages",
              item.file
            );

            replacementIndexes.push(
              index
            );
          }
        }
      );

      formData.append(
        "additionalImageIndexes",
        JSON.stringify(
          replacementIndexes
        )
      );

      // =========================
      // DELETED IMAGES
      // =========================

      const deletedIndexes =
        additionalImages
          .map((item, index) =>
            item.deleted
              ? index
              : null
          )
          .filter(
            (index) => index !== null
          );

      formData.append(
        "deletedImageIndexes",
        JSON.stringify(
          deletedIndexes
        )
      );

      // =========================
      // NEW ADDITIONAL IMAGES
      // =========================

      newImages.forEach((item) => {
        formData.append(
          "newAdditionalImages",
          item.file
        );
      });

      // =========================
      // UPDATE API
      // =========================

      const res = await api.put(
        `/products/update/${id}`,
        formData
      );

      if (res.data.success) {
        alert(
          "Product Updated Successfully!"
        );

        navigate("/admin/products");
      }
    } catch (error) {
      console.log(
        "UPDATE PRODUCT ERROR:",
        error
      );

      console.log(
        "RESPONSE:",
        error.response
      );

      alert(
        error.response?.data?.message ||
          "Failed to update product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">

        {/* =========================
            HEADER
        ========================= */}

        <div className="mb-8">
          <p className="text-green-700 font-semibold uppercase tracking-wider text-sm">
            Admin Panel
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">
            Edit Product
          </h1>

          <p className="text-gray-500 mt-2">
            Update product details, images,
            features and plant care information.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-7"
        >

          {/* =========================
              BASIC INFORMATION
          ========================= */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">

            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Product Information
            </h2>

            <div className="space-y-5">

              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Price
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Stock
                  </label>

                  <input
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Category
                </label>

                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">
                    Select Category
                  </option>

                  {categories.map(
                    (category) => (
                      <option
                        key={
                          category._id
                        }
                        value={
                          category._id
                        }
                      >
                        {category.name}
                      </option>
                    )
                  )}
                </select>
              </div>

            </div>
          </div>

          {/* =========================
              MAIN IMAGE
          ========================= */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">

            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Main Product Image
            </h2>

            <div className="flex flex-col md:flex-row gap-6 items-start">

              <div className="w-full md:w-64 h-64 bg-gray-50 rounded-2xl overflow-hidden border">
                {mainImagePreview ? (
                  <img
                    src={mainImagePreview}
                    alt="Main Product"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="mainImage"
                  className="inline-flex items-center px-5 py-3 bg-green-700 text-white rounded-xl cursor-pointer hover:bg-green-800 transition"
                >
                  Change Main Image
                </label>

                <input
                  id="mainImage"
                  type="file"
                  accept="image/*"
                  onChange={
                    handleMainImageChange
                  }
                  className="hidden"
                />

                <p className="text-sm text-gray-400 mt-3">
                  JPG, PNG or JPEG
                </p>
              </div>

            </div>
          </div>

          {/* =========================
              ADDITIONAL IMAGES
          ========================= */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Additional Images
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Replace or remove existing images.
                </p>
              </div>

              <label
                htmlFor="newImages"
                className="inline-flex justify-center items-center px-5 py-3 bg-green-700 text-white rounded-xl cursor-pointer hover:bg-green-800 transition"
              >
                + Add New Images
              </label>

              <input
                id="newImages"
                type="file"
                accept="image/*"
                multiple
                onChange={
                  handleNewImages
                }
                className="hidden"
              />

            </div>

            {/* Existing Images */}

            {additionalImages.filter(
              (item) => !item.deleted
            ).length === 0 ? (
              <div className="border border-dashed rounded-xl p-8 text-center text-gray-400">
                No additional images.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {additionalImages.map(
                  (item, index) => {

                    if (item.deleted)
                      return null;

                    return (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50"
                      >

                        <div className="h-52">
                          <img
                            src={
                              item.preview
                            }
                            alt={`Additional ${
                              index + 1
                            }`}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="p-4">

                          <label
                            htmlFor={`replace-${index}`}
                            className="block text-center bg-white border border-green-600 text-green-700 font-semibold py-2.5 rounded-xl cursor-pointer hover:bg-green-50 transition"
                          >
                            Replace Image
                          </label>

                          <input
                            id={`replace-${index}`}
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleAdditionalImageChange(
                                index,
                                e
                              )
                            }
                            className="hidden"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              removeAdditionalImage(
                                index
                              )
                            }
                            className="w-full mt-2 bg-red-50 text-red-600 border border-red-200 font-semibold py-2.5 rounded-xl hover:bg-red-100 transition"
                          >
                            Remove Image
                          </button>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>
            )}

            {/* New Images */}

            {newImages.length > 0 && (
              <div className="mt-8">

                <h3 className="font-bold text-gray-800 mb-4">
                  New Images to Add
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                  {newImages.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="border rounded-2xl overflow-hidden bg-gray-50"
                      >

                        <div className="h-44">
                          <img
                            src={item.preview}
                            alt="New"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeNewImage(
                              index
                            )
                          }
                          className="w-full py-2.5 text-red-600 font-semibold hover:bg-red-50"
                        >
                          Remove
                        </button>

                      </div>
                    )
                  )}

                </div>
              </div>
            )}

          </div>

          {/* =========================
              FEATURES
          ========================= */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">

            <div className="flex justify-between items-center mb-6">

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Key Features
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Add important product features as points.
                </p>
              </div>

              <button
                type="button"
                onClick={addFeature}
                className="bg-green-700 text-white px-4 py-2 rounded-xl hover:bg-green-800"
              >
                + Add Feature
              </button>

            </div>

            <div className="space-y-3">

              {product.features.map(
                (feature, index) => (
                  <div
                    key={index}
                    className="flex gap-3 items-center"
                  >

                    <span className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold shrink-0">
                      {index + 1}
                    </span>

                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        handleFeatureChange(
                          index,
                          e.target.value
                        )
                      }
                      placeholder="Enter product feature"
                      className="flex-1 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeFeature(
                          index
                        )
                      }
                      className="w-10 h-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-100"
                    >
                      ✕
                    </button>

                  </div>
                )
              )}

            </div>

            {product.features.length ===
              0 && (
              <div className="text-center border border-dashed rounded-xl py-8 text-gray-400">
                No features added yet.
              </div>
            )}

          </div>

          {/* =========================
              PLANT CARE
          ========================= */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">

            <h2 className="text-xl font-bold text-green-700 mb-2">
              🌱 Plant Care Information
            </h2>

            <p className="text-gray-500 text-sm mb-6">
              Add care information according to
              this particular plant.
            </p>

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  ☀️ Sunlight
                </label>

                <input
                  type="text"
                  name="sunlight"
                  value={product.sunlight}
                  onChange={handleChange}
                  placeholder="e.g. Bright indirect sunlight"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  💧 Watering
                </label>

                <input
                  type="text"
                  name="watering"
                  value={product.watering}
                  onChange={handleChange}
                  placeholder="e.g. Water twice a week"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  🌱 Soil
                </label>

                <input
                  type="text"
                  name="soil"
                  value={product.soil}
                  onChange={handleChange}
                  placeholder="e.g. Well-draining soil"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  🌡️ Temperature
                </label>

                <input
                  type="text"
                  name="temperature"
                  value={product.temperature}
                  onChange={handleChange}
                  placeholder="e.g. 18°C - 30°C"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

            </div>
          </div>

          {/* =========================
              FEATURED
          ========================= */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

            <label className="flex items-center gap-3 cursor-pointer">

              <input
                type="checkbox"
                name="featured"
                checked={
                  product.featured
                }
                onChange={handleChange}
                className="w-5 h-5 accent-green-700"
              />

              <span className="font-semibold text-gray-700">
                Show as Featured Product
              </span>

            </label>

          </div>

          {/* =========================
              BUTTONS
          ========================= */}

          <div className="flex flex-col sm:flex-row gap-4">

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/admin/products"
                )
              }
              className="sm:flex-1 border border-gray-300 bg-white text-gray-700 py-3.5 rounded-xl font-semibold hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`sm:flex-1 py-3.5 rounded-xl text-white font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-700 hover:bg-green-800"
              }`}
            >
              {loading
                ? "Updating..."
                : "Update Product"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default EditProduct;