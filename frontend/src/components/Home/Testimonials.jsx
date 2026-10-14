import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Anjali Verma",
    city: "Pratapgarh",
    review:
      "Amazing quality plants. Delivery was fast and every plant arrived healthy.",
  },
  {
    id: 2,
    name: "Rahul Singh",
    city: "Lucknow",
    review:
      "The pots are beautiful and the plants were packed very carefully. Highly recommended!",
  },
  {
    id: 3,
    name: "Priya Sharma",
    city: "Delhi",
    review:
      "Excellent customer support. My garden looks beautiful because of Patel Global Green.",
  },
];

function Testimonials() {
  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-green-700">
            What Our Customers Say
          </h2>

          <p className="text-gray-600 mt-3">
            Trusted by hundreds of happy plant lovers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300"
            >

              <div className="flex mb-4 text-yellow-500">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className="text-gray-600 leading-7 italic">
                "{item.review}"
              </p>

              <div className="mt-6">

                <h3 className="font-bold text-lg text-green-700">
                  {item.name}
                </h3>

                <p className="text-gray-500">
                  {item.city}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;