import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    features: [
      {
        type: String,
      },
    ],

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    // ==========================================
    // FIND MY PLANT
    // ==========================================

    space: {
      type: String,
      enum: ["living", "bedroom", "desk", "balcony", ""],
      default: "",
    },

    careLevel: {
      type: String,
      enum: ["easy", "moderate", "gardener", ""],
      default: "",
    },

    // ==========================================
    // MAIN IMAGE
    // ==========================================

    image: {
      type: String,
      default: "",
    },

    // ==========================================
    // ADDITIONAL IMAGES
    // ==========================================

    images: [
      {
        type: String,
      },
    ],

    // ==========================================
    // PLANT CARE
    // ==========================================

    plantCare: {
      sunlight: {
        type: String,
        enum: ["bright", "medium", "low", ""],
        default: "",
      },

      watering: {
        type: String,
        default: "",
      },

      soil: {
        type: String,
        default: "",
      },

      temperature: {
        type: String,
        default: "",
      },
    },

    // Plant Match Preferences
    plantMatch: {
      spaces: [
        {
          type: String,
        },
      ],

      sunlight: {
        type: String,
        default: "",
      },

      careLevel: {
        type: String,
        default: "",
      },
    },

    stock: {
      type: Number,
      default: 0,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    rating: {
      type: Number,
      default: 0,
    },

    numReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
