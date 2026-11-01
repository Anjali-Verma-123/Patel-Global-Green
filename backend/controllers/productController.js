import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

// =====================================================
// ADD PRODUCT
// =====================================================
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      stock,
      quantity,
      featured,
      features,
      sunlight,
      watering,
      soil,
      temperature,
    } = req.body;

    let imageUrl = "";
    if (req.files?.mainImage?.[0]) {
      const file = req.files.mainImage[0];
      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        { folder: "patel-global-green-products" }
      );
      imageUrl = result.secure_url;
    }

    let imageUrls = [];
    if (req.files?.additionalImages) {
      for (const file of req.files.additionalImages) {
        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          { folder: "patel-global-green-products" }
        );
        imageUrls.push(result.secure_url);
      }
    }

    let productFeatures = [];
    if (features) {
      try {
        const parsedFeatures = JSON.parse(features);
        productFeatures = Array.isArray(parsedFeatures)
          ? parsedFeatures.flat().map((f) => String(f).trim()).filter(Boolean)
          : [String(parsedFeatures).trim()];
      } catch {
        productFeatures = String(features)
          .split("\n")
          .map((f) => f.trim())
          .filter(Boolean);
      }
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      quantity,
      category,
      featured,
      features: productFeatures,
      plantCare: {
        sunlight: sunlight || "",
        watering: watering || "",
        soil: soil || "",
        temperature: temperature || "",
      },
      image: imageUrl,
      images: imageUrls,
    });

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product,
    });
  } catch (error) {
    console.log("ADD PRODUCT ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET ALL PRODUCTS
// =====================================================
export const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};

    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter)
      .populate("category")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.log("GET PRODUCTS ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// UPDATE PRODUCT
// =====================================================
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let productFeatures = existingProduct.features;
    if (req.body.features) {
      try {
        const parsedFeatures = JSON.parse(req.body.features);
        productFeatures = Array.isArray(parsedFeatures)
          ? parsedFeatures.flat().map((f) => String(f).trim()).filter(Boolean)
          : [String(parsedFeatures).trim()];
      } catch (e) {}
    }

    let imageUrl = existingProduct.image;
    if (req.files?.mainImage?.[0]) {
      const file = req.files.mainImage[0];
      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        { folder: "patel-global-green-products" }
      );
      imageUrl = result.secure_url;
    }

    let currentImages = Array.isArray(existingProduct.images)
      ? [...existingProduct.images]
      : [];

    let deletedIndexes = [];
    if (req.body.deletedImageIndexes) {
      try {
        deletedIndexes = JSON.parse(req.body.deletedImageIndexes);
      } catch (e) {}
    }
    if (deletedIndexes.length > 0) {
      currentImages = currentImages.filter(
        (_, index) => !deletedIndexes.includes(index)
      );
    }

    let replacementIndexes = [];
    if (req.body.additionalImageIndexes) {
      try {
        replacementIndexes = JSON.parse(req.body.additionalImageIndexes);
      } catch (e) {}
    }
    const replacementFiles = req.files?.additionalImages || [];
    if (replacementFiles.length > 0 && Array.isArray(replacementIndexes)) {
      for (let i = 0; i < replacementFiles.length; i++) {
        const file = replacementFiles[i];
        const originalIndex = replacementIndexes[i];
        if (originalIndex !== undefined && originalIndex !== null) {
          const result = await cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
            { folder: "patel-global-green-products" }
          );
          if (originalIndex >= 0 && originalIndex < currentImages.length) {
            currentImages[originalIndex] = result.secure_url;
          }
        }
      }
    }

    const newAdditionalFiles = req.files?.newAdditionalImages || [];
    if (newAdditionalFiles.length > 0) {
      for (const file of newAdditionalFiles) {
        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          { folder: "patel-global-green-products" }
        );
        currentImages.push(result.secure_url);
      }
    }

    const updateData = {
      name: req.body.name ?? existingProduct.name,
      description: req.body.description ?? existingProduct.description,
      price: req.body.price ?? existingProduct.price,
      stock: req.body.stock ?? existingProduct.stock,
      category: req.body.category ?? existingProduct.category,
      featured:
        req.body.featured === "true"
          ? true
          : req.body.featured === "false"
          ? false
          : existingProduct.featured,
      features: productFeatures,
      image: imageUrl,
      images: currentImages,
      plantCare: {
        sunlight: req.body.sunlight ?? existingProduct.plantCare?.sunlight ?? "",
        watering: req.body.watering ?? existingProduct.plantCare?.watering ?? "",
        soil: req.body.soil ?? existingProduct.plantCare?.soil ?? "",
        temperature: req.body.temperature ?? existingProduct.plantCare?.temperature ?? "",
      },
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: updateData,
        $unset: { space: "", plantMatch: "" }, // Space data ko database se saaf karega
      },
      { new: true, runValidators: false }
    );

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET SINGLE PRODUCT
// =====================================================
export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category");
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =====================================================
// DELETE PRODUCT
// =====================================================
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =====================================================
// SEARCH PRODUCT
// =====================================================
export const searchProduct = async (req, res) => {
  try {
    const { keyword, category } = req.query;
    let filter = {};
    if (keyword) {
      filter.name = { $regex: keyword, $options: "i" };
    }
    if (category) {
      filter.category = category;
    }
    const products = await Product.find(filter).populate("category");
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =====================================================
// FILTER BY CATEGORY
// =====================================================
export const filterByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ category: categoryId }).populate("category");
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};