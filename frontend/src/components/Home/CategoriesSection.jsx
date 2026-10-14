import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
} from "react-icons/fa";
import api from "../../services/api";

function CategorySection() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const sliderRef = useRef(null);

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

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -320,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#f7f6f0] py-20 md:py-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* Center Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">

          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-green-700 font-semibold mb-4">
            Grown for your space
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight">
            Every Space Deserves
            <br />
            <span className="text-green-800">
              A Little Green
            </span>
          </h2>

          <p className="text-gray-500 mt-5 max-w-2xl mx-auto leading-7">
            Explore our collection of plants, each ready to bring
            freshness, character and life to your home.
          </p>

        </div>

        {/* Category Slider */}
        <div className="relative">

          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10
            w-11 h-11 rounded-full bg-white border border-gray-200
            shadow-md items-center justify-center text-gray-700
            hover:bg-green-700 hover:text-white hover:border-green-700
            transition-all duration-300"
          >
            <FaChevronLeft className="text-sm" />
          </button>

          {/* Slider */}
          <div
            ref={sliderRef}
            className="flex gap-5 overflow-x-auto scroll-smooth
            snap-x snap-mandatory pb-5 scrollbar-hide px-1"
          >

            {categories.map((category) => (

              <div
                key={category._id}
                onClick={() =>
                  navigate(
                    `/products?category=${category._id}`
                  )
                }
                className="group min-w-[210px] sm:min-w-[230px]
                md:min-w-[250px] snap-start cursor-pointer"
              >

                {/* Image */}
                <div
                  className="relative aspect-[4/5] rounded-[24px]
                  overflow-hidden bg-gray-100"
                >

                  <img
                    src={
                      category.image ||
                      "https://via.placeholder.com/500x600?text=Category"
                    }
                    alt={category.name}
                    className="w-full h-full object-cover
                    transition-transform duration-700
                    group-hover:scale-105"
                  />

                  {/* Bottom gradient */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-1/3
                    bg-gradient-to-t from-black/40 to-transparent
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-500"
                  />

                  {/* Arrow */}
                  <div
                    className="absolute bottom-4 right-4
                    w-10 h-10 rounded-full bg-white
                    flex items-center justify-center
                    text-gray-800 shadow-lg
                    opacity-0 translate-y-2
                    group-hover:opacity-100
                    group-hover:translate-y-0
                    transition-all duration-300"
                  >
                    <FaArrowRight className="text-xs" />
                  </div>

                </div>

                {/* Category Name */}
                <div className="text-center mt-5">

                  <h3
                    className="text-lg md:text-xl font-semibold
                    text-gray-900
                    group-hover:text-green-700
                    transition-colors duration-300"
                  >
                    {category.name}
                  </h3>

                  <p
                    className="text-xs uppercase tracking-[0.15em]
                    text-gray-400 mt-2
                    group-hover:text-green-700
                    transition-colors"
                  >
                    Discover
                  </p>

                </div>

              </div>

            ))}

          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10
            w-11 h-11 rounded-full bg-white border border-gray-200
            shadow-md items-center justify-center text-gray-700
            hover:bg-green-700 hover:text-white hover:border-green-700
            transition-all duration-300"
          >
            <FaChevronRight className="text-sm" />
          </button>

        </div>

        {/* Mobile Arrows */}
        <div className="flex md:hidden justify-center gap-3 mt-5">

          <button
            onClick={scrollLeft}
            className="w-11 h-11 rounded-full bg-white
            border border-gray-200 shadow-sm
            flex items-center justify-center"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={scrollRight}
            className="w-11 h-11 rounded-full bg-white
            border border-gray-200 shadow-sm
            flex items-center justify-center"
          >
            <FaChevronRight />
          </button>

        </div>

      </div>

    </section>
  );
}

export default CategorySection;