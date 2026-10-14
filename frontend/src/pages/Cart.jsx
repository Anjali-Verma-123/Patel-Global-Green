import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.product?.price || 0) * item.quantity,
    0,
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-green-700 mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <h2 className="text-xl text-gray-500">Your cart is empty.</h2>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems
              .filter((item) => item.product)
              .map((item) => (
                <div
                  key={item.product._id}
                  className="flex items-center justify-between bg-white shadow-md rounded-xl p-4"
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={
                        item.product.image ||
                        "https://via.placeholder.com/120x120?text=No+Image"
                      }
                      alt={item.product.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />

                    <div>
                      <h2 className="text-xl font-semibold">
                        {item.product.name}
                      </h2>

                      <p className="text-gray-500">₹{item.product.price}</p>
                      <p className="text-green-700 font-semibold mt-2">
                        Total: ₹{item.product.price * item.quantity}
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() =>
                            decreaseQuantity(item.product._id, item.quantity)
                          }
                          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                        >
                          -
                        </button>

                        <span className="font-bold text-lg">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(item.product._id, item.quantity)
                          }
                          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
          </div>

          <div className="mt-10 text-right">
            <h2 className="text-2xl font-bold">Total: ₹{totalPrice}</h2>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-5 bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-800"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
