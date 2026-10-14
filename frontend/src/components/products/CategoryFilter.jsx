import { useEffect, useState } from "react";
import api from "../../services/api";

function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold text-green-700 mb-5">
        Categories
      </h2>

      <div className="space-y-4">

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            checked={selectedCategory === ""}
            onChange={() => setSelectedCategory("")}
          />

          All Products
        </label>

        {categories.map((category) => (
          <label
            key={category._id}
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              type="radio"
              checked={selectedCategory === category._id}
              onChange={() => setSelectedCategory(category._id)}
            />

            {category.name}
          </label>
        ))}

      </div>
    </div>
  );
}

export default CategoryFilter;