import {
  FaLeaf,
  FaSeedling,
  FaTruck,
  FaAward,
  FaArrowRight,
  FaHeart,
  FaUsers,
} from "react-icons/fa";

function About() {
  const features = [
    {
      number: "01",
      icon: <FaLeaf />,
      title: "Healthy Plants",
      description:
        "Fresh, healthy and carefully nurtured plants directly from our nursery.",
    },
    {
      number: "02",
      icon: <FaTruck />,
      title: "Safe Delivery",
      description:
        "Every plant is carefully packed to ensure safe delivery to your doorstep.",
    },
    {
      number: "03",
      icon: <FaSeedling />,
      title: "Premium Quality",
      description:
        "We provide carefully grown plants and gardening essentials at great prices.",
    },
    {
      number: "04",
      icon: <FaAward />,
      title: "Trusted Nursery",
      description:
        "A reliable destination for plant lovers looking to create greener spaces.",
    },
  ];

  const stats = [
    {
      number: "500+",
      title: "Happy Customers",
      icon: <FaUsers />,
    },
    {
      number: "1000+",
      title: "Plants Sold",
      icon: <FaSeedling />,
    },
    {
      number: "50+",
      title: "Plant Varieties",
      icon: <FaLeaf />,
    },
    {
      number: "5★",
      title: "Customer Rating",
      icon: <FaHeart />,
    },
  ];

  return (
    <div className="bg-white min-h-screen">

      {/* ==============================
          INTRO SECTION
      ============================== */}

      <section className="pt-16 md:pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6">

          <div className="max-w-4xl">

            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-[2px] bg-green-700"></span>

              <span className="text-sm uppercase tracking-[3px] font-bold text-green-700">
                About Patel Global Green
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Bringing Nature
              <span className="text-green-700"> Closer To Every Home.</span>
            </h1>

            <p className="mt-6 text-gray-500 text-base md:text-lg leading-8 max-w-3xl">
              We believe that every home deserves a little more greenery.
              Patel Global Green Nursery brings together beautiful plants,
              gardening essentials and thoughtful service to help you create
              spaces that feel fresh, peaceful and alive.
            </p>

          </div>

        </div>
      </section>


      {/* ==============================
          OUR STORY
      ============================== */}

      <section className="pb-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Image */}

            <div className="relative">

              <div className="absolute -top-5 -left-5 w-24 h-24 bg-green-100 rounded-3xl"></div>

              <div className="absolute -bottom-5 -right-5 w-28 h-28 bg-green-100 rounded-3xl"></div>

              <div className="relative rounded-[2rem] overflow-hidden shadow-xl">

                <img
                  src="https://images.unsplash.com/photo-1483794344563-d27a8d18014e?w=1000"
                  alt="Patel Global Green Nursery"
                  className="w-full h-[480px] object-cover"
                />

              </div>

              {/* Floating Card */}

              <div className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
                  <FaLeaf />
                </div>

                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">
                    Our Mission
                  </p>

                  <p className="font-bold text-gray-800">
                    Make Every Space Greener
                  </p>
                </div>

              </div>

            </div>


            {/* Content */}

            <div>

              <div className="flex items-center gap-3 mb-4">

                <span className="w-10 h-[2px] bg-green-700"></span>

                <span className="text-sm uppercase tracking-[3px] font-bold text-green-700">
                  Our Story
                </span>

              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Growing A
                <span className="text-green-700"> Greener Future.</span>
              </h2>

              <p className="mt-6 text-gray-600 leading-8">
                Patel Global Green Nursery was started with one simple
                mission — to make every home greener, healthier and more
                beautiful.
              </p>

              <p className="mt-5 text-gray-600 leading-8">
                We provide premium quality indoor plants, flowering plants,
                fruit plants, pots and gardening essentials. Every plant is
                selected and cared for with attention so that it can become
                a beautiful part of your home or garden.
              </p>

              <p className="mt-5 text-gray-600 leading-8">
                From first-time plant parents to experienced gardening
                lovers, we aim to make your journey with plants simple,
                enjoyable and rewarding.
              </p>


              {/* Mission Points */}

              <div className="grid sm:grid-cols-2 gap-4 mt-8">

                <div className="flex items-center gap-3 bg-green-50 rounded-xl p-4">

                  <div className="w-10 h-10 rounded-lg bg-green-700 text-white flex items-center justify-center">
                    <FaSeedling />
                  </div>

                  <div>
                    <p className="font-bold text-gray-800">
                      Quality First
                    </p>

                    <p className="text-sm text-gray-500">
                      Carefully nurtured plants
                    </p>
                  </div>

                </div>


                <div className="flex items-center gap-3 bg-green-50 rounded-xl p-4">

                  <div className="w-10 h-10 rounded-lg bg-green-700 text-white flex items-center justify-center">
                    <FaHeart />
                  </div>

                  <div>
                    <p className="font-bold text-gray-800">
                      Customer Care
                    </p>

                    <p className="text-sm text-gray-500">
                      Service you can trust
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ==============================
          WHY CHOOSE US
      ============================== */}

      <section className="py-20 bg-green-50">

        <div className="max-w-7xl mx-auto px-6">

          {/* Heading */}

          <div className="text-center mb-14">

            <div className="flex items-center justify-center gap-3 mb-4">

              <span className="w-10 h-[2px] bg-green-700"></span>

              <span className="text-sm uppercase tracking-[3px] font-bold text-green-700">
                Why Us
              </span>

              <span className="w-10 h-[2px] bg-green-700"></span>

            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Why Choose Us?
            </h2>

            <p className="text-gray-500 mt-4 max-w-2xl mx-auto leading-7">
              We combine healthy plants, quality products and reliable
              service to make your gardening experience better.
            </p>

          </div>


          {/* Cards */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {features.map((item) => (

              <div
                key={item.number}
                className="
                  group
                  relative
                  bg-white
                  rounded-3xl
                  p-8
                  border
                  border-green-100
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-2
                  transition-all
                  duration-500
                  overflow-hidden
                "
              >

                {/* Number */}

                <span
                  className="
                    absolute
                    top-4
                    right-5
                    text-6xl
                    font-bold
                    text-green-50
                    group-hover:text-green-100
                    transition-colors
                  "
                >
                  {item.number}
                </span>


                {/* Icon */}

                <div
                  className="
                    relative
                    w-16
                    h-16
                    rounded-2xl
                    bg-green-100
                    text-green-700
                    flex
                    items-center
                    justify-center
                    mb-7
                    group-hover:bg-green-700
                    group-hover:text-white
                    group-hover:scale-110
                    transition-all
                    duration-500
                  "
                >
                  <span className="text-2xl">
                    {item.icon}
                  </span>
                </div>


                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-500 leading-7 text-sm">
                  {item.description}
                </p>


                {/* Bottom line */}

                <div
                  className="
                    mt-7
                    w-10
                    h-1
                    rounded-full
                    bg-green-200
                    group-hover:w-16
                    group-hover:bg-green-700
                    transition-all
                    duration-500
                  "
                ></div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ==============================
          STATS
      ============================== */}

      <section className="py-20 bg-green-900 text-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">

            <div className="flex items-center justify-center gap-3 mb-4">

              <span className="w-10 h-[2px] bg-green-300"></span>

              <span className="text-sm uppercase tracking-[3px] font-bold text-green-300">
                Our Growing Community
              </span>

              <span className="w-10 h-[2px] bg-green-300"></span>

            </div>

            <h2 className="text-3xl md:text-4xl font-bold">
              Growing Together, One Plant At A Time.
            </h2>

          </div>


          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">

            {stats.map((item) => (

              <div
                key={item.title}
                className="
                  text-center
                  rounded-3xl
                  bg-white/5
                  border
                  border-white/10
                  p-6
                  md:p-8
                  hover:bg-white/10
                  transition
                "
              >

                <div className="w-12 h-12 mx-auto rounded-xl bg-white/10 flex items-center justify-center text-green-300 mb-5">
                  {item.icon}
                </div>

                <h3 className="text-4xl md:text-5xl font-bold">
                  {item.number}
                </h3>

                <p className="mt-3 text-green-200 text-sm md:text-base">
                  {item.title}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ==============================
          CTA
      ============================== */}

      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="relative overflow-hidden rounded-[2rem] bg-green-50 border border-green-100 p-8 md:p-12">

            {/* Decorative circles */}

            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-green-100"></div>

            <div className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-green-100"></div>


            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">

              <div className="max-w-2xl">

                <div className="flex items-center gap-2 text-green-700 font-semibold mb-3">
                  <FaLeaf />
                  <span>Bring Nature Home</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Ready To Make Your Space Greener?
                </h2>

                <p className="text-gray-500 mt-3 leading-7">
                  Explore our collection of beautiful plants and gardening
                  essentials and start creating your own green space today.
                </p>

              </div>


              <a
                href="/products"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  bg-green-700
                  text-white
                  px-7
                  py-4
                  rounded-xl
                  font-semibold
                  shadow-lg
                  hover:bg-green-800
                  hover:shadow-xl
                  transition-all
                  whitespace-nowrap
                "
              >
                Explore Plants

                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />

              </a>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default About;