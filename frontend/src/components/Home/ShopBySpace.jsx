// import { useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaArrowRight,
//   FaChevronLeft,
//   FaChevronRight,
//   FaCouch,
//   FaBed,
//   FaLaptop,
//   FaSun,
//   FaTree,
// } from "react-icons/fa";

// const spaces = [
//   {
//     id: 1,
//     title: "Living Room",
//     subtitle: "Bring warmth & life to your interiors",
//     icon: <FaCouch />,
//     image:
//       "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1000&q=90",
//   },
//   {
//     id: 2,
//     title: "Bedroom",
//     subtitle: "Create a calm & refreshing space",
//     icon: <FaBed />,
//     image:
//       "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=90",
//   },
//   {
//     id: 3,
//     title: "Work Desk",
//     subtitle: "Make your workspace feel alive",
//     icon: <FaLaptop />,
//     image:
//       "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=1000&q=90",
//   },
//   {
//     id: 4,
//     title: "Balcony",
//     subtitle: "Turn your balcony into a green corner",
//     icon: <FaSun />,
//     image:
//       "https://images.unsplash.com/photo-1598902108854-10e335adac99?w=1000&q=90",
//   },
//   {
//     id: 5,
//     title: "Study Corner",
//     subtitle: "Add a refreshing touch to your study space",
//     icon: <FaLaptop />,
//     image:
//       "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1000&q=90",
//   },
//   {
//     id: 6,
//     title: "Garden",
//     subtitle: "Flourishing plants for lush outdoor gardens",
//     icon: <FaTree />,
//     image:
//       "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1000&q=90",
//   },
// ];

// function ShopBySpace() {
//   const navigate = useNavigate();
//   const sliderRef = useRef(null);

//   const scrollLeft = () => {
//     sliderRef.current?.scrollBy({
//       left: -380,
//       behavior: "smooth",
//     });
//   };

//   const scrollRight = () => {
//     sliderRef.current?.scrollBy({
//       left: 380,
//       behavior: "smooth",
//     });
//   };

//   const handleExplore = (space) => {
//     navigate(`/products?space=${encodeURIComponent(space.title)}`);
//   };

//   return (
//     <section className="bg-white py-20 md:py-24">
//       <div className="mx-auto max-w-7xl px-6">
//         {/* Center Heading */}
//         <div className="mx-auto mb-12 max-w-3xl text-center">
//           <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-green-700 md:text-sm">
//             Designed around you
//           </p>

//           <h2 className="text-4xl font-semibold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
//             Find Greenery For
//             <br />
//             <span className="text-green-800">Every Corner</span>
//           </h2>

//           <p className="mx-auto mt-5 max-w-2xl text-gray-500 leading-7">
//             From peaceful bedrooms to lively balconies and gardens, discover
//             plants that belong exactly where you do.
//           </p>
//         </div>

//         {/* Slider Wrapper */}
//         <div className="relative">
//           {/* Left Arrow */}
//           <button
//             onClick={scrollLeft}
//             className="absolute -left-5 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-gray-700 shadow-lg backdrop-blur transition-all duration-300 hover:border-green-700 hover:bg-green-700 hover:text-white md:flex"
//             aria-label="Previous spaces"
//           >
//             <FaChevronLeft />
//           </button>

//           {/* Slider */}
//           <div
//             ref={sliderRef}
//             className="flex gap-6 overflow-x-auto pb-5 scroll-smooth snap-x snap-mandatory scrollbar-hide"
//           >
//             {spaces.map((space) => (
//               <div
//                 key={space.id}
//                 onClick={() => handleExplore(space)}
//                 className="group min-w-[290px] cursor-pointer snap-start sm:min-w-[330px] md:min-w-[360px]"
//               >
//                 {/* Large Image Card */}
//                 <div className="relative h-[410px] overflow-hidden rounded-[30px] md:h-[450px]">
//                   <img
//                     src={space.image}
//                     alt={space.title}
//                     className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
//                   />

//                   {/* Dark Gradient */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

//                   {/* Top Right Number */}
//                   <div className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/10 text-xs font-medium text-white backdrop-blur-md">
//                     0{space.id}
//                   </div>

//                   {/* Content */}
//                   <div className="absolute bottom-0 left-0 right-0 p-7 text-white md:p-8">
//                     {/* Icon */}
//                     <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/15 text-lg backdrop-blur-md">
//                       {space.icon}
//                     </div>

//                     <h3 className="text-3xl font-semibold md:text-4xl">
//                       {space.title}
//                     </h3>

//                     <p className="mt-2 max-w-sm text-white/75 leading-6">
//                       {space.subtitle}
//                     </p>

//                     {/* Explore */}
//                     <div className="mt-6 flex items-center gap-3 text-sm font-semibold">
//                       <span>Explore Plants</span>

//                       <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 transition-transform duration-300 group-hover:translate-x-2">
//                         <FaArrowRight className="text-xs" />
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Right Arrow */}
//           <button
//             onClick={scrollRight}
//             className="absolute -right-5 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-gray-700 shadow-lg backdrop-blur transition-all duration-300 hover:border-green-700 hover:bg-green-700 hover:text-white md:flex"
//             aria-label="Next spaces"
//           >
//             <FaChevronRight />
//           </button>
//         </div>

//         {/* Mobile Arrows */}
//         <div className="mt-5 flex justify-center gap-3 md:hidden">
//           <button
//             onClick={scrollLeft}
//             className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm"
//             aria-label="Previous spaces"
//           >
//             <FaChevronLeft />
//           </button>

//           <button
//             onClick={scrollRight}
//             className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm"
//             aria-label="Next spaces"
//           >
//             <FaChevronRight />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default ShopBySpace;