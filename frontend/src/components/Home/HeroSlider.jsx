import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    tag: "PATEL GLOBAL GREEN",
    title: "Bring Nature",
    highlight: "Into Your Home",
    subtitle:
      "Discover beautiful plants, thoughtfully grown to make your home greener, calmer and more alive.",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1800&q=90",
  },
  {
    id: 2,
    tag: "CREATE YOUR GREEN SPACE",
    title: "Grow Something",
    highlight: "Beautiful",
    subtitle:
      "From easy-care indoor plants to beautiful outdoor greens, find the perfect plant for your space.",
    image:
      "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=1800&q=90",
  },
  {
    id: 3,
    tag: "PREMIUM PLANT COLLECTION",
    title: "A Little More",
    highlight: "Green Every Day",
    subtitle:
      "Bring home fresh greenery and create a space that feels naturally beautiful.",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1800&q=90",
  },
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);

  // Auto change every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative h-[620px] md:h-[700px] overflow-hidden bg-[#eef3ec]">
      
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current
              ? "opacity-100 z-10"
              : "opacity-0 z-0"
          }`}
        >
          {/* Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] ${
              index === current ? "scale-105" : "scale-100"
            }`}
          />

          {/* Premium overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/10" />

          {/* Soft bottom gradient */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/30 to-transparent" />

          {/* Content */}
          <div className="relative z-20 h-full max-w-7xl mx-auto px-6 md:px-10 flex items-center">
            <div className="max-w-2xl text-white">

              {/* Small label */}
              <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <span className="w-2 h-2 rounded-full bg-green-400" />

                <span className="text-xs md:text-sm tracking-[0.25em] font-medium">
                  {slide.tag}
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight">
                {slide.title}
                <br />

                <span className="text-green-300">
                  {slide.highlight}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-7 text-base md:text-xl leading-8 text-white/90 max-w-xl">
                {slide.subtitle}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4 mt-9">

                <Link
                  to="/products"
                  className="group inline-flex items-center gap-3 bg-white text-gray-900 px-7 py-4 rounded-full font-semibold shadow-xl hover:bg-green-50 transition-all duration-300"
                >
                  Shop Plants

                  <FaArrowRight
                    className="text-sm transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/products"
                  className="inline-flex items-center px-7 py-4 rounded-full border border-white/40 bg-white/10 backdrop-blur-md text-white font-medium hover:bg-white/20 transition-all duration-300"
                >
                  Explore Collection
                </Link>

              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Previous button */}
      <button
        onClick={prevSlide}
        className="absolute z-30 left-5 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-gray-800 transition-all duration-300"
      >
        <FaChevronLeft />
      </button>

      {/* Next button */}
      <button
        onClick={nextSlide}
        className="absolute z-30 right-5 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-gray-800 transition-all duration-300"
      >
        <FaChevronRight />
      </button>

      {/* Bottom controls */}
      <div className="absolute z-30 bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">

        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              current === index
                ? "w-12 bg-white"
                : "w-5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}

      </div>

      {/* Slide counter */}
      <div className="absolute z-30 bottom-8 right-8 hidden md:flex items-center gap-2 text-white/80 text-sm">
        <span className="font-semibold text-white">
          {String(current + 1).padStart(2, "0")}
        </span>

        <span>/</span>

        <span>
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>

    </section>
  );
}

export default HeroSlider;