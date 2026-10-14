import { useState } from "react";
import {
  FaEnvelope,
  FaArrowRight,
  FaLeaf,
} from "react-icons/fa";

function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    alert("Thank you for subscribing!");

    setEmail("");
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= NEWSLETTER CARD ================= */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            bg-gradient-to-br
            from-green-800
            via-green-700
            to-green-600
            shadow-xl
          "
        >

          {/* Decorative circles */}

          <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-white/10"></div>

          <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-white/5"></div>

          <div className="relative grid lg:grid-cols-2 items-center gap-10 p-8 md:p-12 lg:p-16">

            {/* ================= LEFT ================= */}

            <div className="text-white">

              {/* Small heading */}

              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <FaLeaf className="text-yellow-300" />

                <span className="text-sm font-semibold tracking-wide">
                  Stay Connected
                </span>
              </div>

              {/* Main heading */}

              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Stay Connected
                <br />
                <span className="text-yellow-300">
                  With Nature
                </span>
              </h2>

              <p className="text-green-100 mt-5 text-base md:text-lg leading-8 max-w-xl">
                Get gardening tips, seasonal plant updates,
                new arrivals and exclusive offers delivered
                straight to your inbox.
              </p>

              {/* Benefits */}

              <div className="flex flex-wrap gap-5 mt-7 text-sm text-green-100">

                <div className="flex items-center gap-2">
                  <span className="text-yellow-300">✓</span>
                  Gardening Tips
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-yellow-300">✓</span>
                  New Arrivals
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-yellow-300">✓</span>
                  Exclusive Offers
                </div>

              </div>

            </div>

            {/* ================= RIGHT FORM ================= */}

            <div className="relative">

              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl">

                <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center mb-5">
                  <FaEnvelope className="text-xl" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900">
                  Join Our Green Community
                </h3>

                <p className="text-gray-500 mt-2 text-sm leading-6">
                  Enter your email and stay updated with everything
                  happening at Patel Global Green.
                </p>

                <form
                  onSubmit={handleSubscribe}
                  className="mt-6"
                >

                  <div className="flex flex-col sm:flex-row gap-3">

                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="
                        flex-1
                        px-5
                        py-3.5
                        rounded-xl
                        border
                        border-gray-200
                        outline-none
                        text-gray-700
                        focus:border-green-600
                        focus:ring-2
                        focus:ring-green-100
                        transition
                      "
                    />

                    <button
                      type="submit"
                      className="
                        group
                        flex
                        items-center
                        justify-center
                        gap-2
                        bg-green-700
                        text-white
                        px-6
                        py-3.5
                        rounded-xl
                        font-semibold
                        hover:bg-green-800
                        transition-all
                        duration-300
                        whitespace-nowrap
                      "
                    >
                      Subscribe

                      <FaArrowRight
                        className="
                          text-sm
                          group-hover:translate-x-1
                          transition-transform
                        "
                      />
                    </button>

                  </div>

                </form>

                <p className="text-xs text-gray-400 mt-4">
                  🌱 We respect your inbox. No spam, ever.
                </p>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Newsletter;