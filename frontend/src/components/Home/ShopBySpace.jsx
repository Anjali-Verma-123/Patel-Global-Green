import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaCouch,
  FaBed,
  FaLaptop,
  FaSun,
} from "react-icons/fa";

const spaces = [
  {
    id: 1,
    title: "Living Room",
    subtitle: "Bring warmth & life to your interiors",
    icon: <FaCouch />,
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1000&q=90",
  },
  {
    id: 2,
    title: "Bedroom",
    subtitle: "Create a calm & refreshing space",
    icon: <FaBed />,
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=90",
  },
  {
    id: 3,
    title: "Work Desk",
    subtitle: "Make your workspace feel alive",
    icon: <FaLaptop />,
    image:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=1000&q=90",
  },
  {
    id: 4,
    title: "Balcony",
    subtitle: "Turn your balcony into a green corner",
    icon: <FaSun />,
    image:
      "https://images.unsplash.com/photo-1598902108854-10e335adac99?w=1000&q=90",
  },
  {
    id: 5,
    title: "Study Corner",
    subtitle: "Add a refreshing touch to your study space",
    icon: <FaLaptop />,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1000&q=90",
  },
];

function ShopBySpace() {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -380,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 380,
      behavior: "smooth",
    });
  };

  const handleExplore = (space) => {
    navigate(`/products?space=${space.title}`);
  };

  return (
    <section className="bg-white py-20 md:py-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* Center Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">

          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-green-700 font-semibold mb-4">
            Designed around you
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight">
            Find Greenery For
            <br />
            <span className="text-green-800">
              Every Corner
            </span>
          </h2>

          <p className="text-gray-500 mt-5 max-w-2xl mx-auto leading-7">
            From peaceful bedrooms to lively balconies,
            discover plants that belong exactly where you do.
          </p>

        </div>

        {/* Slider Wrapper */}
        <div className="relative">

          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="hidden md:flex absolute -left-5 top-1/2
            -translate-y-1/2 z-10
            w-12 h-12 rounded-full
            bg-white/95 backdrop-blur
            shadow-lg border border-gray-200
            items-center justify-center
            text-gray-700
            hover:bg-green-700 hover:text-white
            hover:border-green-700
            transition-all duration-300"
          >
            <FaChevronLeft />
          </button>

          {/* Slider */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto
            scroll-smooth snap-x snap-mandatory
            pb-5 scrollbar-hide"
          >

            {spaces.map((space) => (

              <div
                key={space.id}
                onClick={() => handleExplore(space)}
                className="group min-w-[290px] sm:min-w-[330px]
                md:min-w-[360px] snap-start cursor-pointer"
              >

                {/* Large Image Card */}
                <div
                  className="relative h-[410px] md:h-[450px]
                  rounded-[30px] overflow-hidden"
                >

                  <img
                    src={space.image}
                    alt={space.title}
                    className="absolute inset-0 w-full h-full
                    object-cover
                    transition-transform duration-1000
                    group-hover:scale-110"
                  />

                  {/* Dark Gradient */}
                  <div
                    className="absolute inset-0
                    bg-gradient-to-t
                    from-black/85 via-black/20
                    to-transparent"
                  />

                  {/* Top Right Number */}
                  <div
                    className="absolute top-6 right-6
                    w-10 h-10 rounded-full
                    border border-white/40
                    bg-black/10 backdrop-blur-md
                    flex items-center justify-center
                    text-white text-xs font-medium"
                  >
                    0{space.id}
                  </div>

                  {/* Content */}
                  <div
                    className="absolute bottom-0 left-0 right-0
                    p-7 md:p-8 text-white"
                  >

                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-full
                      bg-white/15 backdrop-blur-md
                      border border-white/25
                      flex items-center justify-center
                      text-lg mb-5"
                    >
                      {space.icon}
                    </div>

                    <h3 className="text-3xl md:text-4xl font-semibold">
                      {space.title}
                    </h3>

                    <p
                      className="text-white/75 mt-2
                      leading-6 max-w-sm"
                    >
                      {space.subtitle}
                    </p>

                    {/* Explore */}
                    <div
                      className="flex items-center gap-3
                      mt-6 text-sm font-semibold"
                    >
                      <span>Explore Plants</span>

                      <span
                        className="w-10 h-10 rounded-full
                        bg-white text-gray-900
                        flex items-center justify-center
                        transition-transform duration-300
                        group-hover:translate-x-2"
                      >
                        <FaArrowRight className="text-xs" />
                      </span>
                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="hidden md:flex absolute -right-5 top-1/2
            -translate-y-1/2 z-10
            w-12 h-12 rounded-full
            bg-white/95 backdrop-blur
            shadow-lg border border-gray-200
            items-center justify-center
            text-gray-700
            hover:bg-green-700 hover:text-white
            hover:border-green-700
            transition-all duration-300"
          >
            <FaChevronRight />
          </button>

        </div>

        {/* Mobile Arrows */}
        <div className="flex md:hidden justify-center gap-3 mt-5">

          <button
            onClick={scrollLeft}
            className="w-11 h-11 rounded-full
            bg-white border border-gray-200
            shadow-sm flex items-center justify-center"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={scrollRight}
            className="w-11 h-11 rounded-full
            bg-white border border-gray-200
            shadow-sm flex items-center justify-center"
          >
            <FaChevronRight />
          </button>

        </div>

      </div>

    </section>
  );
}

export default ShopBySpace;