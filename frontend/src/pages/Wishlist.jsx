import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";

function Wishlist() {
  const { wishlistItems, removeFromWishlist } =
    useContext(WishlistContext);

  const { addToCart } = useContext(CartContext);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-green-700 mb-8">
        My Wishlist
      </h1>

      {wishlistItems.length === 0 ? (
        <h2 className="text-xl text-gray-500">
          Your Wishlist is Empty.
        </h2>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistItems.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <img
                src={
                  product.image ||
                  "https://via.placeholder.com/300x250?text=No+Image"
                }
                alt={product.name}
                className="w-full h-60 object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-bold">
                  {product.name}
                </h2>

                <p className="text-gray-500 mt-2">
                  ₹{product.price}
                </p>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => addToCart(product._id)}
                    className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() =>
                      removeFromWishlist(product._id)
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;