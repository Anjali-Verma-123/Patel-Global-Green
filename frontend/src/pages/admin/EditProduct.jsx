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

  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [additionalImages, setAdditionalImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

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
        features: Array.isArray(data.features) ? data.features : [],
        sunlight: data.plantCare?.sunlight || "",
        watering: data.plantCare?.watering || "",
        soil: data.plantCare?.soil || "",
        temperature: data.plantCare?.temperature || "",
      });

      setMainImagePreview(data.image || "");

      const formattedExisting = Array.isArray(data.images)
        ? data.images.map((url) => ({
            url,
            file: null,
            preview: url,
            deleted: false,
          }))
        : [];

      setAdditionalImages(formattedExisting);
    } catch (error) {
      console.log("FETCH PRODUCT ERROR:", error);
      alert(error.response?.data?.message || "Failed to fetch product");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/api/categories");
      setCategories(res.data.categories || []);
    } catch (error) {
      console.log("CATEGORY ERROR:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFeatureChange = (index, value) => {
    setProduct((prev) => {
      const updatedFeatures = [...prev.features];
      updatedFeatures[index] = value;
      return { ...prev, features: updatedFeatures };
    });
  };

  const addFeature = () => {
    setProduct((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const removeFeature = (index) => {
    setProduct((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMainImage(file);
    setMainImagePreview(URL.createObjectURL(file));
  };

  const handleAdditionalImageChange = (index, e) => {
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

  const removeAdditionalImage = (index) => {
    setAdditionalImages((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], deleted: true };
      return updated;
    });
  };

  const handleNewImages = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const formattedFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setNewImages((prev) => [...prev, ...formattedFiles]);
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("category", product.category);
      formData.append("featured", product.featured);

      const cleanedFeatures = product.features
        .map((feature) => feature.trim())
        .filter(Boolean);

      formData.append("features", JSON.stringify(cleanedFeatures));

      // Care Information (Sunlight restored)
      formData.append("sunlight", product.sunlight);
      formData.append("watering", product.watering);
      formData.append("soil", product.soil);
      formData.append("temperature", product.temperature);

      if (mainImage) {
        formData.append("mainImage", mainImage);
      }

      const replacementIndexes = [];
      additionalImages.forEach((item, index) => {
        if (item.file && !item.deleted) {
          formData.append("additionalImages", item.file);
          replacementIndexes.push(index);
        }
      });

      formData.append(
        "additionalImageIndexes",
        JSON.stringify(replacementIndexes)
      );

      const deletedIndexes = additionalImages
        .map((item, index) => (item.deleted ? index : null))
        .filter((index) => index !== null);

      formData.append("deletedImageIndexes", JSON.stringify(deletedIndexes));

      newImages.forEach((item) => {
        formData.append("newAdditionalImages", item.file);
      });

      const res = await api.put(`/products/update/${id}`, formData);

      if (res.data.success) {
        alert("Product Updated Successfully!");
        navigate("/admin/products");
      }
    } catch (error) {
      console.log("UPDATE PRODUCT ERROR:", error);
      alert(error.response?.data?.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
            Admin Panel
          </p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900 md:text-4xl">
            Edit Product
          </h1>
          <p className="mt-2 text-gray-500">
            Update product details, images and plant care information.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-6 text-xl font-bold text-gray-900">
              Product Information
            </h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-semibold text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-gray-700">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* MAIN IMAGE */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-6 text-xl font-bold text-gray-900">
              Main Product Image
            </h2>

            <div className="flex flex-col items-start gap-6 md:flex-row">
              <div className="h-64 w-full overflow-hidden rounded-2xl border bg-gray-50 md:w-64">
                {mainImagePreview ? (
                  <img
                    src={mainImagePreview}
                    alt="Main Product"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="mainImage"
                  className="inline-flex cursor-pointer items-center rounded-xl bg-green-700 px-5 py-3 text-white transition hover:bg-green-800"
                >
                  Change Main Image
                </label>

                <input
                  id="mainImage"
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* ADDITIONAL IMAGES */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Additional Images
                </h2>
              </div>

              <label
                htmlFor="newImages"
                className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-green-700 px-5 py-3 text-white transition hover:bg-green-800"
              >
                + Add New Images
              </label>

              <input
                id="newImages"
                type="file"
                accept="image/*"
                multiple
                onChange={handleNewImages}
                className="hidden"
              />
            </div>

            {additionalImages.filter((item) => !item.deleted).length === 0 ? (
              <div className="rounded-xl border border-dashed p-8 text-center text-gray-400">
                No additional images.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {additionalImages.map((item, index) => {
                  if (item.deleted) return null;

                  return (
                    <div
                      key={index}
                      className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50"
                    >
                      <div className="h-52">
                        <img
                          src={item.preview}
                          alt={`Additional ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="p-4">
                        <label
                          htmlFor={`replace-${index}`}
                          className="block cursor-pointer rounded-xl border border-green-600 bg-white py-2.5 text-center font-semibold text-green-700 transition hover:bg-green-50"
                        >
                          Replace Image
                        </label>

                        <input
                          id={`replace-${index}`}
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleAdditionalImageChange(index, e)
                          }
                          className="hidden"
                        />

                        <button
                          type="button"
                          onClick={() => removeAdditionalImage(index)}
                          className="mt-2 w-full rounded-xl border border-red-200 bg-red-50 py-2.5 font-semibold text-red-600 transition hover:bg-red-100"
                        >
                          Remove Image
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {newImages.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-4 font-bold text-gray-800">
                  New Images to Add
                </h3>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {newImages.map((item, index) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-2xl border bg-gray-50"
                    >
                      <div className="h-44">
                        <img
                          src={item.preview}
                          alt="New"
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="w-full py-2.5 font-semibold text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* FEATURES */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Key Features</h2>
              <button
                type="button"
                onClick={addFeature}
                className="rounded-xl bg-green-700 px-4 py-2 text-white hover:bg-green-800"
              >
                + Add Feature
              </button>
            </div>

            <div className="space-y-3">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                    {index + 1}
                  </span>

                  <input
                    type="text"
                    value={feature}
                    onChange={(e) =>
                      handleFeatureChange(index, e.target.value)
                    }
                    className="flex-1 rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />

                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="h-10 w-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-100"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* PLANT CARE INFORMATION (SUNLIGHT INCLUDED) */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-4 text-xl font-bold text-green-700">
              🌱 Plant Care Information
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-600">
                  ☀️ Sunlight
                </label>
                <input
                  type="text"
                  name="sunlight"
                  value={product.sunlight}
                  onChange={handleChange}
                  placeholder="e.g. Bright, indirect light"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-600">
                  💧 Watering
                </label>
                <input
                  type="text"
                  name="watering"
                  value={product.watering}
                  onChange={handleChange}
                  placeholder="e.g. Water once a week"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-600">
                  🌱 Soil
                </label>
                <input
                  type="text"
                  name="soil"
                  value={product.soil}
                  onChange={handleChange}
                  placeholder="e.g. Well-draining potting mix"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-600">
                  🌡️ Temperature
                </label>
                <input
                  type="text"
                  name="temperature"
                  value={product.temperature}
                  onChange={handleChange}
                  placeholder="e.g. 18°C - 28°C"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* FEATURED */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                checked={product.featured}
                onChange={handleChange}
                className="h-5 w-5 accent-green-700"
              />
              <span className="font-semibold text-gray-700">
                Show as Featured Product
              </span>
            </label>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="rounded-xl border border-gray-300 bg-white py-3.5 font-semibold text-gray-700 hover:bg-gray-50 sm:flex-1"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`rounded-xl py-3.5 font-semibold text-white transition sm:flex-1 ${
                loading
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-green-700 hover:bg-green-800"
              }`}
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;