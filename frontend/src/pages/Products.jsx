import { useEffect, useState } from "react";
import { FaLeaf, FaSlidersH } from "react-icons/fa";
import api from "../services/api";
import ProductCard from "../components/ProductCard/ProductCard";
import { useSearchParams } from "react-router-dom";
import CategoryFilter from "../components/products/CategoryFilter";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL PARAMETERS
  const keyword = searchParams.get("search") || "";

  // STATE
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [loading, setLoading] = useState(false);

  // UPDATE STATE WHEN URL CHANGES
  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "");
  }, [searchParams]);

  // FETCH PRODUCTS
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);

        let url = "";

        if (keyword) {
          url = `/products/search?keyword=${encodeURIComponent(keyword)}`;
        } else {
          url = "/products";
        }

        if (selectedCategory) {
          url += url.includes("?")
            ? `&category=${selectedCategory}`
            : `?category=${selectedCategory}`;
        }

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
    <div className="min-h-screen bg-white">
      {/* PAGE INTRO */}
      <section className="pb-10 pt-14 md:pt-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-green-700"></span>
              <span className="text-sm font-bold uppercase tracking-[3px] text-green-700">
                Our Collection
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
              {keyword ? (
                <>
                  Discover Results For{" "}
                  <span className="text-green-700">"{keyword}"</span>
                </>
              ) : (
                <>
                  Bring Nature{" "}
                  <span className="text-green-700">Into Your Space.</span>
                </>
              )}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-gray-500 md:text-lg">
              Explore our collection of indoor plants, flowering plants, fruit plants, gardening essentials and more.
            </p>
          </div>
        </div>
      </section>

      {/* COLLECTION CONTENT */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-green-700">
                <FaLeaf className="text-sm" />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  Plant Collection
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {keyword ? `Search Results for "${keyword}"` : "Explore Our Plants"}
              </h2>
            </div>

            {!loading && products.length > 0 && (
              <div className="inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2.5">
                <span className="h-2 w-2 rounded-full bg-green-600"></span>
                <span className="text-sm font-semibold text-green-800">
                  {products.length} {products.length === 1 ? "Plant" : "Plants"} Available
                </span>
              </div>
            )}
          </div>

          <div className="grid gap-8 lg:grid-cols-4 lg:gap-10">
            {/* SIDEBAR */}
            <aside className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
                    <FaSlidersH />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Browse
                    </p>
                    <h3 className="font-bold text-gray-900">Categories</h3>
                  </div>
                </div>

                <div className="rounded-3xl border border-green-100 bg-green-50/60 p-4">
                  <CategoryFilter
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                </div>
              </div>
            </aside>

            {/* PRODUCT GRID */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-100 border-t-green-700"></div>
                  <p className="mt-5 font-medium text-gray-500">
                    Loading plants...
                  </p>
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-7 xl:grid-cols-3">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[2rem] border border-green-100 bg-green-50 px-6 text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
                    <FaLeaf className="text-3xl text-green-600" />
                  </div>

                  <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
                    No Plants Found
                  </h2>

                  <p className="mt-3 max-w-md leading-7 text-gray-500">
                    We couldn't find any plants matching your search or selected category.
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