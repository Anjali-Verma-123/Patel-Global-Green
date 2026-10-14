import { FaLeaf, FaSeedling, FaHeart } from "react-icons/fa";

function NurseryStory() {
  return (
    <section className="bg-[#f5f7f1] py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* IMAGE */}
          <div className="relative">

            <div className="overflow-hidden rounded-[32px] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1000"
                alt="Beautiful green plants"
                className="w-full h-[420px] md:h-[520px] object-cover hover:scale-105 transition duration-700"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-4 md:right-8 bg-white rounded-2xl shadow-xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                <FaSeedling />
              </div>

              <div>
                <p className="font-bold text-gray-900">
                  Grown with Care
                </p>

                <p className="text-sm text-gray-500">
                  From our nursery to you
                </p>
              </div>
            </div>

          </div>

          {/* CONTENT */}
          <div>

            <p className="text-sm uppercase tracking-[0.25em] text-green-700 font-semibold mb-4">
              Our Green Story
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              From Our Nursery
              <span className="block text-green-700">
                To Your Home
              </span>
            </h2>

            <p className="text-gray-600 text-lg leading-8 mt-6">
              Every plant we grow is nurtured with patience, care and
              attention. We believe that bringing a plant home is more
              than just adding greenery — it's bringing a little piece
              of nature into your everyday life.
            </p>

            <p className="text-gray-500 leading-7 mt-4">
              Whether you're creating a peaceful corner, decorating your
              home or starting your first garden, we're here to help you
              make your space greener and happier.
            </p>

            {/* FEATURES */}
            <div className="grid sm:grid-cols-3 gap-5 mt-8">

              <div>
                <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center text-green-700 mb-3">
                  <FaLeaf />
                </div>

                <h3 className="font-semibold text-gray-900">
                  Fresh Plants
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Healthy & carefully nurtured
                </p>
              </div>

              <div>
                <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center text-green-700 mb-3">
                  <FaSeedling />
                </div>

                <h3 className="font-semibold text-gray-900">
                  Grown With Care
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Quality you can trust
                </p>
              </div>

              <div>
                <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center text-green-700 mb-3">
                  <FaHeart />
                </div>

                <h3 className="font-semibold text-gray-900">
                  Made for You
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Greenery for every space
                </p>
              </div>

            </div>

            {/* BUTTON */}
            <div className="mt-9">
              <a
                href="/products"
                className="inline-flex items-center gap-3 bg-green-700 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-green-800 hover:shadow-lg transition"
              >
                Explore Our Plants
                <span>→</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default NurseryStory;
