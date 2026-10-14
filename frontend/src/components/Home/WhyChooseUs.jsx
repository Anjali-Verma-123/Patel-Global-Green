import {
  FaLeaf,
  FaTruck,
  FaCreditCard,
  FaAward,
} from "react-icons/fa";

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
    title: "Fast & Safe Delivery",
    description:
      "We carefully pack every plant and deliver it safely to your doorstep.",
  },
  {
    number: "03",
    icon: <FaCreditCard />,
    title: "Secure Payment",
    description:
      "Enjoy a safe and seamless shopping experience with trusted payments.",
  },
  {
    number: "04",
    icon: <FaAward />,
    title: "Premium Quality",
    description:
      "Premium quality plants and gardening products at affordable prices.",
  },
];

function WhyChooseUs() {
  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= SECTION HEADER ================= */}

        <div className="text-center mb-14">

          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-10 h-[2px] bg-green-700"></span>

            <span className="text-sm uppercase tracking-[3px] font-semibold text-green-700">
              Why Us
            </span>

            <span className="w-10 h-[2px] bg-green-700"></span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Why Choose Patel Global Green?
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            We make it easy to bring nature home with healthy plants,
            reliable service and a shopping experience you can trust.
          </p>

        </div>

        {/* ================= FEATURES ================= */}

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

              {/* Background Number */}

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
                  duration-500
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

              {/* Content */}

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>

              <p className="text-gray-500 leading-7 text-sm">
                {item.description}
              </p>

              {/* Bottom Line */}

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
              />

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;