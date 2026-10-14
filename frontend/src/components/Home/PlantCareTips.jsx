

import {
  FaTint,
  FaSun,
  FaLeaf,
  FaSeedling,
  FaArrowRight,
} from "react-icons/fa";

const tips = [
  {
    id: "01",
    icon: <FaTint />,
    title: "Water Regularly",
    description:
      "Water your plants according to their needs and avoid overwatering to keep the roots healthy.",
  },
  {
    id: "02",
    icon: <FaSun />,
    title: "Proper Sunlight",
    description:
      "Place indoor plants near bright windows and outdoor plants where they receive suitable sunlight.",
  },
  {
    id: "03",
    icon: <FaLeaf />,
    title: "Healthy Soil",
    description:
      "Use nutrient-rich soil and organic fertilizers to provide your plants with essential nutrients.",
  },
  {
    id: "04",
    icon: <FaSeedling />,
    title: "Trim Dry Leaves",
    description:
      "Remove dry and damaged leaves regularly to encourage healthy new growth and maintain appearance.",
  },
];

function PlantCareTips() {
  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-12">

          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-[2px] bg-green-700"></span>

              <span className="text-sm uppercase tracking-[3px] font-semibold text-green-700">
                Plant Care
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Simple Care,
              <span className="text-green-700"> Happy Plants</span>
            </h2>

            <p className="text-gray-500 mt-4 max-w-2xl leading-7">
              Follow these simple plant care tips to keep your
              plants fresh, healthy and beautiful throughout the year.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-green-700 font-semibold text-sm">
            <span>Care for your plants</span>
            <FaArrowRight />
          </div>

        </div>

        {/* ================= TIPS ================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {tips.map((tip) => (
            <div
              key={tip.id}
              className="
                group
                relative
                bg-white
                rounded-3xl
                p-6 md:p-7
                border
                border-green-100
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-500
                overflow-hidden
              "
            >

              {/* Large Number */}

              <span
                className="
                  absolute
                  right-5
                  top-2
                  text-7xl
                  font-bold
                  text-green-50
                  group-hover:text-green-100
                  transition-colors
                  duration-500
                "
              >
                {tip.id}
              </span>

              <div className="relative flex items-start gap-5">

                {/* Icon */}

                <div
                  className="
                    flex-shrink-0
                    w-14
                    h-14
                    rounded-2xl
                    bg-green-100
                    text-green-700
                    flex
                    items-center
                    justify-center
                    text-xl
                    group-hover:bg-green-700
                    group-hover:text-white
                    group-hover:scale-110
                    transition-all
                    duration-500
                  "
                >
                  {tip.icon}
                </div>

                {/* Content */}

                <div className="pr-4">

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {tip.title}
                  </h3>

                  <p className="text-sm text-gray-500 leading-6">
                    {tip.description}
                  </p>

                </div>

              </div>

              {/* Bottom Accent */}

              <div
                className="
                  mt-6
                  h-1
                  w-10
                  rounded-full
                  bg-green-200
                  group-hover:w-full
                  group-hover:bg-green-700
                  transition-all
                  duration-500
                "
              />

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default PlantCareTips;