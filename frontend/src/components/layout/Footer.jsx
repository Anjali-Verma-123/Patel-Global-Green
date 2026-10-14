import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaArrowRight,
  FaLeaf,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-green-950 text-green-100">

      {/* ================= MAIN FOOTER ================= */}

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* ================= BRAND ================= */}

          <div className="lg:pr-8">

            <Link
              to="/"
              className="inline-flex items-center gap-3 mb-6"
            >
              <img
                src="/logo.jpeg"
                alt="Patel Global Green"
                className="
                  w-14
                  h-14
                  rounded-full
                  object-cover
                  border-2
                  border-green-700
                  shadow-lg
                "
              />

              <div>
                <h2 className="text-xl font-bold text-white">
                  Patel Global Green
                </h2>

                <p className="text-xs text-green-400 mt-0.5">
                  Grow • Care • Bloom
                </p>
              </div>
            </Link>

            <p className="text-sm text-green-200 leading-7">
              Bringing nature closer to every home with healthy
              plants, premium pots, quality soil and everything
              you need to create your own green space.
            </p>

            {/* Mini CTA */}

            <Link
              to="/products"
              className="
                group
                inline-flex
                items-center
                gap-2
                mt-6
                text-sm
                font-semibold
                text-white
                hover:text-yellow-300
                transition
              "
            >
              Explore Our Plants

              <FaArrowRight
                className="
                  text-xs
                  group-hover:translate-x-1
                  transition-transform
                "
              />
            </Link>

          </div>

          {/* ================= QUICK LINKS ================= */}

          <div>

            <h3 className="text-lg font-bold text-white mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4 text-sm">

              <li>
                <Link
                  to="/"
                  className="hover:text-yellow-300 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className="hover:text-yellow-300 transition"
                >
                  Plants
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className="hover:text-yellow-300 transition"
                >
                  Pots & Planters
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className="hover:text-yellow-300 transition"
                >
                  Soil & Gardening
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="hover:text-yellow-300 transition"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-yellow-300 transition"
                >
                  Contact Us
                </Link>
              </li>

            </ul>

          </div>

          {/* ================= CUSTOMER SUPPORT ================= */}

          <div>

            <h3 className="text-lg font-bold text-white mb-6">
              Customer Support
            </h3>

            <ul className="space-y-4 text-sm">

              <li>
                <Link
                  to="/faq"
                  className="hover:text-yellow-300 transition"
                >
                  Frequently Asked Questions
                </Link>
              </li>

              <li>
                <Link
                  to="/shipping-policy"
                  className="hover:text-yellow-300 transition"
                >
                  Shipping & Delivery
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-yellow-300 transition"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="hover:text-yellow-300 transition"
                >
                  Terms & Conditions
                </Link>
              </li>

            </ul>

            {/* Support Badge */}

            <div className="mt-7 flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center">
                <FaLeaf className="text-green-300" />
              </div>

              <div>
                <p className="text-xs text-green-400">
                  Need Help?
                </p>

                <p className="text-sm font-semibold text-white">
                  We're here for you
                </p>
              </div>

            </div>

          </div>

          {/* ================= CONTACT ================= */}

          <div>

            <h3 className="text-lg font-bold text-white mb-6">
              Get In Touch
            </h3>

            <div className="space-y-5 text-sm">

              {/* Address */}

              <div className="flex items-start gap-3">

                <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-green-800 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-green-300" />
                </div>

                <p className="leading-6 text-green-200">
                  Sarfabad, Sector-73,
                  <br />
                  Noida, Uttar Pradesh
                </p>

              </div>

              {/* Email */}

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-green-800 flex items-center justify-center">
                  <FaEnvelope className="text-green-300" />
                </div>

                <a
                  href="mailto:patelglobalgreen2019@gmail.com"
                  className="hover:text-yellow-300 transition break-all"
                >
                  patelglobalgreen2019@gmail.com
                </a>

              </div>

              {/* Phone */}

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-green-800 flex items-center justify-center">
                  <FaPhoneAlt className="text-green-300" />
                </div>

                <a
                  href="tel:+917292009034"
                  className="hover:text-yellow-300 transition"
                >
                  +91 7292009034
                </a>

              </div>

            </div>

            {/* Social Icons */}

            <div className="flex gap-3 mt-7">

              <a
                href="#"
                aria-label="Facebook"
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-green-800
                  flex
                  items-center
                  justify-center
                  hover:bg-blue-600
                  hover:text-white
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-green-800
                  flex
                  items-center
                  justify-center
                  hover:bg-pink-600
                  hover:text-white
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-green-800
                  flex
                  items-center
                  justify-center
                  hover:bg-red-600
                  hover:text-white
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                <FaYoutube />
              </a>

              <a
                href="#"
                aria-label="WhatsApp"
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-green-800
                  flex
                  items-center
                  justify-center
                  hover:bg-green-500
                  hover:text-white
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                <FaWhatsapp />
              </a>

            </div>

          </div>

        </div>

      </div>

      {/* ================= BOTTOM BAR ================= */}

      <div className="border-t border-green-800">

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            py-5
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-3
            text-sm
          "
        >

          <p className="text-green-300 text-center md:text-left">
            © {new Date().getFullYear()} Patel Global Green Nursery.
            All Rights Reserved.
          </p>

          <p className="flex items-center gap-2 text-green-400">
            Made with
            <span className="text-red-400">♥</span>
            for plant lovers
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;