import { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp,
  FaArrowRight,
  FaLeaf,
} from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you! Your message has been submitted.");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="bg-white min-h-screen">

      {/* =====================================================
          INTRO SECTION
      ===================================================== */}

      <section className="pt-16 md:pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">

          <div className="max-w-3xl">

            <div className="flex items-center gap-3 mb-4">

              <span className="w-10 h-[2px] bg-green-700"></span>

              <span className="text-sm uppercase tracking-[3px] font-bold text-green-700">
                Contact Us
              </span>

            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Let's Grow Something
              <span className="text-green-700"> Beautiful Together.</span>
            </h1>

            <p className="mt-5 text-gray-500 text-base md:text-lg leading-8 max-w-2xl">
              Have a question about our plants, gardening products or
              your order? Our team is always happy to help you create
              a greener and more beautiful space.
            </p>

          </div>

        </div>
      </section>


      {/* =====================================================
          CONTACT + FORM
      ===================================================== */}

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-5 gap-8">

            {/* =================================================
                LEFT CONTACT INFORMATION
            ================================================= */}

            <div
              className="
                lg:col-span-2
                relative
                overflow-hidden
                rounded-[2rem]
                bg-green-900
                p-8
                md:p-10
                text-white
              "
            >

              {/* Decorative circles */}

              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5"></div>

              <div className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-white/5"></div>

              <div className="relative">

                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full">

                  <FaLeaf className="text-green-300 text-sm" />

                  <span className="text-sm font-semibold">
                    We'd love to hear from you
                  </span>

                </div>

                <h2 className="text-3xl font-bold mt-6">
                  Get In Touch
                </h2>

                <p className="text-green-200 mt-3 leading-7 text-sm">
                  Whether you need plant advice, order assistance or
                  simply want to know more about us, feel free to reach
                  out.
                </p>


                {/* CONTACT ITEMS */}

                <div className="mt-9 space-y-6">

                  {/* Phone */}

                  <a
                    href="tel:+917292009034"
                    className="flex items-start gap-4 group"
                  >

                    <div
                      className="
                        w-11
                        h-11
                        flex-shrink-0
                        rounded-xl
                        bg-white/10
                        flex
                        items-center
                        justify-center
                        group-hover:bg-white
                        group-hover:text-green-800
                        transition-all
                      "
                    >
                      <FaPhoneAlt />
                    </div>

                    <div>

                      <p className="text-xs uppercase tracking-wider text-green-300">
                        Call Us
                      </p>

                      <p className="font-semibold mt-1">
                        +91 7292009034
                      </p>

                    </div>

                  </a>


                  {/* Email */}

                  <a
                    href="mailto:patelglobalgreen2019@gmail.com"
                    className="flex items-start gap-4 group"
                  >

                    <div
                      className="
                        w-11
                        h-11
                        flex-shrink-0
                        rounded-xl
                        bg-white/10
                        flex
                        items-center
                        justify-center
                        group-hover:bg-white
                        group-hover:text-green-800
                        transition-all
                      "
                    >
                      <FaEnvelope />
                    </div>

                    <div className="min-w-0">

                      <p className="text-xs uppercase tracking-wider text-green-300">
                        Email Us
                      </p>

                      <p className="font-semibold mt-1 break-all">
                        patelglobalgreen2019@gmail.com
                      </p>

                    </div>

                  </a>


                  {/* Address */}

                  <div className="flex items-start gap-4">

                    <div
                      className="
                        w-11
                        h-11
                        flex-shrink-0
                        rounded-xl
                        bg-white/10
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <FaMapMarkerAlt />
                    </div>

                    <div>

                      <p className="text-xs uppercase tracking-wider text-green-300">
                        Visit Us
                      </p>

                      <p className="font-semibold mt-1 leading-6">
                        Sarfabad, Sector 73,
                        <br />
                        Noida, Uttar Pradesh, India
                      </p>

                    </div>

                  </div>


                  {/* Working Hours */}

                  <div className="flex items-start gap-4">

                    <div
                      className="
                        w-11
                        h-11
                        flex-shrink-0
                        rounded-xl
                        bg-white/10
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <FaClock />
                    </div>

                    <div>

                      <p className="text-xs uppercase tracking-wider text-green-300">
                        Working Hours
                      </p>

                      <p className="font-semibold mt-1">
                        Open 24 Hours
                      </p>

                      <p className="text-sm text-green-200 mt-1">
                        Monday – Sunday
                      </p>

                    </div>

                  </div>

                </div>


                {/* WHATSAPP */}

                <a
                  href="https://wa.me/917292009034"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    group
                    mt-10
                    flex
                    items-center
                    justify-between
                    gap-4
                    bg-green-800
                    border
                    border-green-700
                    rounded-2xl
                    p-4
                    hover:bg-green-700
                    transition
                  "
                >

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">

                      <FaWhatsapp className="text-xl" />

                    </div>

                    <div>

                      <p className="text-xs text-green-300">
                        Quick Support
                      </p>

                      <p className="font-semibold">
                        Chat with us on WhatsApp
                      </p>

                    </div>

                  </div>

                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />

                </a>

              </div>

            </div>


            {/* =================================================
                CONTACT FORM
            ================================================= */}

            <div
              className="
                lg:col-span-3
                bg-white
                rounded-[2rem]
                border
                border-gray-100
                shadow-xl
                p-7
                md:p-10
              "
            >

              <div className="mb-8">

                <span className="text-sm uppercase tracking-[3px] font-bold text-green-700">
                  Send a Message
                </span>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                  How Can We Help?
                </h2>

                <p className="text-gray-500 mt-3 leading-7">
                  Fill out the form below and our team will get back
                  to you as soon as possible.
                </p>

              </div>


              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Name + Email */}

                <div className="grid md:grid-cols-2 gap-5">

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="
                        w-full
                        px-4
                        py-3.5
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-50
                        outline-none
                        text-gray-700
                        focus:bg-white
                        focus:border-green-600
                        focus:ring-4
                        focus:ring-green-50
                        transition
                      "
                    />

                  </div>


                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="
                        w-full
                        px-4
                        py-3.5
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-50
                        outline-none
                        text-gray-700
                        focus:bg-white
                        focus:border-green-600
                        focus:ring-4
                        focus:ring-green-50
                        transition
                      "
                    />

                  </div>

                </div>


                {/* Subject */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What would you like to know?"
                    required
                    className="
                      w-full
                      px-4
                      py-3.5
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      outline-none
                      text-gray-700
                      focus:bg-white
                      focus:border-green-600
                      focus:ring-4
                      focus:ring-green-50
                      transition
                    "
                  />

                </div>


                {/* Message */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Message
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Write your message here..."
                    required
                    className="
                      w-full
                      px-4
                      py-3.5
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      outline-none
                      text-gray-700
                      resize-none
                      focus:bg-white
                      focus:border-green-600
                      focus:ring-4
                      focus:ring-green-50
                      transition
                    "
                  ></textarea>

                </div>


                {/* Submit */}

                <button
                  type="submit"
                  className="
                    group
                    w-full
                    flex
                    items-center
                    justify-center
                    gap-3
                    bg-green-700
                    text-white
                    py-4
                    rounded-xl
                    font-semibold
                    shadow-lg
                    hover:bg-green-800
                    hover:shadow-xl
                    transition-all
                    duration-300
                  "
                >

                  Send Message

                  <FaArrowRight
                    className="
                      text-sm
                      group-hover:translate-x-1
                      transition-transform
                    "
                  />

                </button>

              </form>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          MAP SECTION
      ===================================================== */}

      <section className="pb-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="mb-7">

            <div className="flex items-center gap-3 mb-3">

              <span className="w-10 h-[2px] bg-green-700"></span>

              <span className="text-sm uppercase tracking-[3px] font-bold text-green-700">
                Find Us
              </span>

            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Visit Our Location
            </h2>

            <p className="text-gray-500 mt-2">
              Come visit Patel Global Green and explore our green world.
            </p>

          </div>


          <div
            className="
              overflow-hidden
              rounded-[2rem]
              shadow-xl
              border
              border-gray-100
              bg-gray-100
            "
          >

            <iframe
              title="Patel Global Green Location"
              src="https://www.google.com/maps?q=Sarfabad+Sector+73+Noida&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            ></iframe>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Contact;