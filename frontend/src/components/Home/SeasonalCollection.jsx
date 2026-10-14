import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaLeaf,
  FaSeedling,
} from "react-icons/fa";

function SeasonalCollection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-green-800 via-green-700 to-green-600">

          {/* Decorative circles */}

          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-white/5"></div>

          <div className="relative grid lg:grid-cols-2 items-center gap-10 lg:gap-16 p-8 md:p-12 lg:p-16">

            {/* ================= LEFT CONTENT ================= */}

            <div className="text-white">

              {/* Small heading */}

              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6">
                <FaSeedling className="text-yellow-300" />

                <span className="text-sm font-semibold tracking-wide">
                  Seasonal Collection
                </span>
              </div>

              {/* Main heading */}

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1]">
                Bring More
                <br />
                <span className="text-yellow-300">
                  Nature Home
                </span>
              </h2>

              {/* Description */}

              <p className="mt-6 text-green-100 text-base md:text-lg leading-8 max-w-xl">
                Explore our handpicked collection of seasonal plants,
                flowering beauties, indoor greens, fruit plants and
                premium gardening essentials.
              </p>

              {/* Highlights */}

              <div className="flex flex-wrap gap-5 mt-7">

                <div className="flex items-center gap-2 text-sm text-green-100">
                  <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                    <FaLeaf className="text-yellow-300" />
                  </span>
                  Fresh Plants
                </div>

                <div className="flex items-center gap-2 text-sm text-green-100">
                  <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                    <FaLeaf className="text-yellow-300" />
                  </span>
                  Seasonal Picks
                </div>

              </div>

              {/* Button */}

              <Link
                to="/products"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  mt-9
                  bg-white
                  text-green-700
                  px-7
                  py-3.5
                  rounded-xl
                  font-semibold
                  shadow-lg
                  hover:bg-yellow-300
                  hover:text-green-900
                  transition-all
                  duration-300
                "
              >
                Explore Collection

                <FaArrowRight
                  className="
                    text-sm
                    group-hover:translate-x-1
                    transition-transform
                  "
                />
              </Link>

            </div>

            {/* ================= RIGHT IMAGE COLLAGE ================= */}

            <div className="relative">

              {/* Main large image */}

              <div className="relative z-10">

                <img
                  src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=900"
                  alt="Beautiful green plants"
                  className="
                    w-full
                    h-[280px]
                    md:h-[350px]
                    lg:h-[400px]
                    object-cover
                    rounded-3xl
                    shadow-2xl
                  "
                />

                {/* Image badge */}

                <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg">
                  <p className="text-xs text-gray-500">
                    Fresh from our nursery
                  </p>

                  <p className="font-bold text-green-700">
                    🌿 Premium Plants
                  </p>
                </div>

              </div>

              {/* Small floating image 1 */}

              <div
                className="
                  hidden md:block
                  absolute
                  -left-8
                  -bottom-8
                  z-20
                  w-36
                  h-36
                  rounded-2xl
                  overflow-hidden
                  border-4
                  border-white
                  shadow-xl
                "
              >
                <img
                  src="https://images.unsplash.com/photo-1459156212016-c812468e2115?w=500"
                  alt="Succulent plant"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Small floating image 2 */}

              <div
                className="
                  hidden md:block
                  absolute
                  -right-5
                  -top-8
                  z-20
                  w-32
                  h-32
                  rounded-2xl
                  overflow-hidden
                  border-4
                  border-white
                  shadow-xl
                "
              >
                <img
                  src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500"
                  alt="Beautiful flowers"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default SeasonalCollection;