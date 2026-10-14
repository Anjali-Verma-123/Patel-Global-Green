import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

// =====================================================
// ADD PRODUCT
// =====================================================

export const addProduct = async (req, res) => {
  try {
    console.log("FILES:", req.files);
    console.log("BODY:", req.body);

    const {
      name,
      description,
      price,
      category,
      stock,
      quantity,
      featured,
      features,

      // Plant Care
      sunlight,
      watering,
      soil,
      temperature,

      matchSpaces,
      matchSunlight,
      careLevel,
    } = req.body;

    // =====================================================
    // MAIN IMAGE
    // =====================================================

    let imageUrl = "";

    if (req.files?.mainImage?.[0]) {
      const file = req.files.mainImage[0];

      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        {
          folder: "patel-global-green-products",
        },
      );

      imageUrl = result.secure_url;
    }

    // =====================================================
    // ADDITIONAL IMAGES
    // =====================================================

    let imageUrls = [];

    if (req.files?.additionalImages) {
      for (const file of req.files.additionalImages) {
        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          {
            folder: "patel-global-green-products",
          },
        );

        imageUrls.push(result.secure_url);
      }
    }

    // =====================================================
    // FEATURES
    // =====================================================

    let productFeatures = [];

    if (features) {
      try {
        const parsedFeatures = JSON.parse(features);

        if (Array.isArray(parsedFeatures)) {
          productFeatures = parsedFeatures
            .flat()
            .map((feature) => String(feature).trim())
            .filter(Boolean);
        } else {
          productFeatures = [String(parsedFeatures).trim()];
        }
      } catch {
        productFeatures = String(features)
          .split("\n")
          .map((feature) => feature.trim())
          .filter(Boolean);
      }
    }

    // =====================================================
    // CREATE PRODUCT
    // =====================================================

    const product = await Product.create({
      name,
      description,
      features: productFeatures,

      price,
      category,

      // Images
      image: imageUrl,
      images: imageUrls,

      // Plant Care
      plantCare: {
        sunlight: sunlight || "",
        watering: watering || "",
        soil: soil || "",
        temperature: temperature || "",
      },

      plantMatch: {
        spaces: matchSpaces ? JSON.parse(matchSpaces) : [],

        sunlight: matchSunlight || "",

        careLevel: careLevel || "",
      },
      stock,
      quantity,
      featured,
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
    const { category, space, sunlight, careLevel } = req.query;

    let filter = {};

    if (category) {
      filter.category = category;
    }

    // Find My Plant filters

    if (space) {
      filter.space = space;
    }

    if (sunlight) {
      filter["plantCare.sunlight"] = sunlight;
    }

    if (careLevel) {
      filter.careLevel = careLevel;
    }

    const products = await Product.find(filter).populate("category");

    res.status(200).json({
      success: true,
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
// GET SINGLE PRODUCT
// =====================================================

export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate("category");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
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

    console.log("========== UPDATE PRODUCT ==========");
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // =====================================================
    // BASIC DETAILS
    // =====================================================

    product.name = req.body.name ?? product.name;

    product.description = req.body.description ?? product.description;

    product.price = req.body.price ?? product.price;

    product.stock = req.body.stock ?? product.stock;

    product.category = req.body.category ?? product.category;

    // =====================================================
    // FIND MY PLANT
    // =====================================================

    product.space = req.body.space ?? product.space ?? "";

    product.careLevel = req.body.careLevel ?? product.careLevel ?? "";

    // =====================================================
    // FEATURED
    // =====================================================

    product.featured =
      req.body.featured === "true"
        ? true
        : req.body.featured === "false"
          ? false
          : product.featured;

    // =====================================================
    // FEATURES
    // =====================================================

    if (req.body.features) {
      try {
        const parsedFeatures = JSON.parse(req.body.features);

        if (Array.isArray(parsedFeatures)) {
          product.features = parsedFeatures
            .flat()
            .map((feature) => String(feature).trim())
            .filter(Boolean);
        }
      } catch (error) {
        console.log("FEATURE PARSE ERROR:", error);
      }
    }

    // =====================================================
    // PLANT CARE
    // =====================================================

    product.plantCare = {
      sunlight: req.body.sunlight ?? product.plantCare?.sunlight ?? "",

      watering: req.body.watering ?? product.plantCare?.watering ?? "",

      soil: req.body.soil ?? product.plantCare?.soil ?? "",

      temperature: req.body.temperature ?? product.plantCare?.temperature ?? "",
    };

    // =====================================================
    // MAIN IMAGE
    // =====================================================

    if (req.files?.mainImage && req.files.mainImage.length > 0) {
      const file = req.files.mainImage[0];

      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        {
          folder: "patel-global-green-products",
        },
      );

      product.image = result.secure_url;
    }

    // =====================================================
    // EXISTING ADDITIONAL IMAGES
    // =====================================================

    let existingImages = Array.isArray(product.images)
      ? [...product.images]
      : [];

    // =====================================================
    // DELETED IMAGE INDEXES
    // =====================================================

    let deletedIndexes = [];

    if (req.body.deletedImageIndexes) {
      try {
        deletedIndexes = JSON.parse(req.body.deletedImageIndexes);
      } catch (error) {
        console.log("DELETE INDEX PARSE ERROR:", error);
      }
    }

    if (Array.isArray(deletedIndexes) && deletedIndexes.length > 0) {
      existingImages = existingImages.filter(
        (_, index) => !deletedIndexes.includes(index),
      );
    }

    // =====================================================
    // REPLACE ADDITIONAL IMAGES
    // =====================================================

    let replacementIndexes = [];

    if (req.body.additionalImageIndexes) {
      try {
        replacementIndexes = JSON.parse(req.body.additionalImageIndexes);
      } catch (error) {
        console.log("REPLACEMENT INDEX PARSE ERROR:", error);
      }
    }

    const replacementFiles = req.files?.additionalImages || [];

    if (replacementFiles.length > 0 && Array.isArray(replacementIndexes)) {
      for (let i = 0; i < replacementFiles.length; i++) {
        const file = replacementFiles[i];

        const originalIndex = replacementIndexes[i];

        if (originalIndex === undefined || originalIndex === null) {
          continue;
        }

        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          {
            folder: "patel-global-green-products",
          },
        );

        if (originalIndex >= 0 && originalIndex < existingImages.length) {
          existingImages[originalIndex] = result.secure_url;
        }
      }
    }

    // =====================================================
    // NEW ADDITIONAL IMAGES
    // =====================================================

    const newAdditionalFiles = req.files?.newAdditionalImages || [];

    if (newAdditionalFiles.length > 0) {
      for (const file of newAdditionalFiles) {
        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          {
            folder: "patel-global-green-products",
          },
        );

        existingImages.push(result.secure_url);
      }
    }

    product.images = existingImages;

    // =====================================================
    // SAVE
    // =====================================================

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product,
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
// DELETE PRODUCT
// =====================================================

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
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
      filter.name = {
        $regex: keyword,
        $options: "i",
      };
    }

    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter).populate("category");

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// FILTER BY CATEGORY
// =====================================================

export const filterByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await Product.find({
      category: categoryId,
    }).populate("category");

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
