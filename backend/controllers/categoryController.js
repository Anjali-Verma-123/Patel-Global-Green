import Category from "../models/Category.js";
import cloudinary from "../config/cloudinary.js";


// Add Category
// export const addCategory = async (req, res) => {
//   try {
//     const { name, description, image } = req.body;

//     if (!name) {
//       return res.status(400).json({
//         success: false,
//         message: "Category name is required",
//       });
//     }

//     const existingCategory = await Category.findOne({ name });

//     if (existingCategory) {
//       return res.status(400).json({
//         success: false,
//         message: "Category already exists",
//       });
//     }

//     const category = await Category.create({
//       name,
//       description,
//       image,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Category Added Successfully",
//       category,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
export const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "patel-global-green-categories",
        }
      );

      imageUrl = result.secure_url;
    }

    const category = await Category.create({
      name,
      description,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Category Added Successfully",
      category,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get All Categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      success: true,
      categories,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Category
// export const updateCategory = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const { name, description, image } = req.body;

//     const category = await Category.findByIdAndUpdate(
//       id,
//       {
//         name,
//         description,
//         image,
//       },
//       {
//         new: true,
//       }
//     );

//     if (!category) {
//       return res.status(404).json({
//         success: false,
//         message: "Category not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Category Updated Successfully",
//       category,
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    let imageUrl = category.image;

    if (req.file) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "patel-global-green-categories",
        }
      );

      imageUrl = result.secure_url;
    }

    category.name = req.body.name;
    category.description = req.body.description;
    category.image = imageUrl;

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category Updated Successfully",
      category,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Delete Category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};