import { useEffect, useState } from "react";
import { FaLeaf, FaSlidersH } from "react-icons/fa";
import api from "../services/api";
import ProductCard from "../components/ProductCard/ProductCard";
import { useSearchParams } from "react-router-dom";
import CategoryFilter from "../components/products/CategoryFilter";

function Products() {
  const [searchParams] = useSearchParams();

  // URL SEARCH PARAMETER
  const keyword = searchParams.get("search") || "";

  // STATE
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [loading, setLoading] = useState(false);

  // UPDATE CATEGORY WHEN URL CHANGES
  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "");
  }, [searchParams]);

  // FETCH PRODUCTS
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);

        let url = "";

        // SEARCH
        if (keyword) {
          url = `/products/search?keyword=${encodeURIComponent(keyword)}`;
        } else {
          url = "/products";
        }

        // CATEGORY FILTER
        if (selectedCategory) {
          url += url.includes("?")
            ? `&category=${selectedCategory}`
            : `?category=${selectedCategory}`;
        }

        console.log("PRODUCT API URL:", url);

        const res = await api.get(url);

        setProducts(res.data.products || []);
      } catch (err) {
        console.log("PRODUCT FETCH ERROR:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [keyword, selectedCategory]);

  return (
    <div className="bg-white min-h-screen">

      {/* =====================================
          PAGE INTRO
      ===================================== */}

      <section className="pt-14 md:pt-20 pb-10">

        <div className="max-w-7xl mx-auto px-6">

          <div className="max-w-4xl">

            <div className="flex items-center gap-3 mb-4">

              <span className="w-10 h-[2px] bg-green-700"></span>

              <span className="text-sm uppercase tracking-[3px] font-bold text-green-700">
                Our Collection
              </span>

            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">

              {keyword ? (
                <>
                  Discover Results For{" "}
                  <span className="text-green-700">
                    "{keyword}"
                  </span>
                </>
              ) : (
                <>
                  Bring Nature
                  <span className="text-green-700">
                    {" "}Into Your Space.
                  </span>
                </>
              )}

            </h1>

            <p className="mt-5 text-gray-500 text-base md:text-lg leading-8 max-w-3xl">
              Explore our collection of indoor plants, flowering plants,
              fruit plants, gardening essentials and more — carefully
              selected to make your home and garden greener.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================
          COLLECTION CONTENT
      ===================================== */}

      <section className="pb-20">

        <div className="max-w-7xl mx-auto px-6">

          {/* TOP BAR */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

            <div>

              <div className="flex items-center gap-2 text-green-700 mb-2">

                <FaLeaf className="text-sm" />

                <span className="text-sm font-semibold uppercase tracking-wider">
                  Plant Collection
                </span>

              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">

                {keyword
                  ? `Search Results for "${keyword}"`
                  : "Explore Our Plants"}

              </h2>

            </div>


            {/* PRODUCT COUNT */}

            {!loading && products.length > 0 && (

              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 px-4 py-2.5 rounded-full">

                <span className="w-2 h-2 rounded-full bg-green-600"></span>

                <span className="text-sm font-semibold text-green-800">
                  {products.length}{" "}
                  {products.length === 1 ? "Plant" : "Plants"} Available
                </span>

              </div>

            )}

          </div>


          {/* MAIN GRID */}

          <div className="grid lg:grid-cols-4 gap-8 lg:gap-10">


            {/* =====================================
                CATEGORY SIDEBAR
            ===================================== */}

            <aside className="lg:col-span-1">

              <div className="sticky top-28">

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
                    <FaSlidersH />
                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                      Browse
                    </p>

                    <h3 className="font-bold text-gray-900">
                      Categories
                    </h3>

                  </div>

                </div>

                <div className="bg-green-50/60 rounded-3xl p-4 border border-green-100">

                  <CategoryFilter
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />

                </div>

              </div>

            </aside>


            {/* =====================================
                PRODUCTS AREA
            ===================================== */}

            <div className="lg:col-span-3">

              {/* LOADING */}

              {loading ? (

                <div className="min-h-[400px] flex flex-col justify-center items-center">

                  <div className="w-12 h-12 border-4 border-green-100 border-t-green-700 rounded-full animate-spin"></div>

                  <p className="mt-5 text-gray-500 font-medium">
                    Loading plants...
                  </p>

                </div>

              ) : products.length > 0 ? (

                <>

                  {/* PRODUCT GRID */}

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-7">

                    {products.map((product) => (

                      <ProductCard
                        key={product._id}
                        product={product}
                      />

                    ))}

                  </div>

                </>

              ) : (

                /* =====================================
                   NO PRODUCTS
                ===================================== */

                <div className="min-h-[400px] bg-green-50 rounded-[2rem] border border-green-100 flex flex-col items-center justify-center text-center px-6">

                  <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-6">

                    <FaLeaf className="text-3xl text-green-600" />

                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    No Plants Found
                  </h2>

                  <p className="text-gray-500 mt-3 max-w-md leading-7">
                    We couldn't find any plants matching your search or
                    selected category. Try another keyword or browse a
                    different category.
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Products;