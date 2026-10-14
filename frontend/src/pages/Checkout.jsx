import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Checkout() {
  const [shippingAddress, setShippingAddress] = useState("");
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Online Payment");

  const navigate = useNavigate();

  const location = useLocation();

  const buyNow = location.state?.buyNow;
  const buyNowProduct = location.state?.product;
  const buyNowQuantity = location.state?.quantity || 1;

  const fetchCart = async () => {
    try {
      // BUY NOW
      if (buyNow && buyNowProduct) {
        setCart(null);

        setTotal(buyNowProduct.price * buyNowQuantity);

        return;
      }

      // NORMAL CART CHECKOUT
      const res = await api.get("/cart");

      setCart(res.data.cart);

      const validProducts = res.data.cart.products.filter(
        (item) => item.product,
      );

      const totalPrice = validProducts.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      );

      setTotal(totalPrice);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [buyNow, buyNowProduct]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (total <= 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      // =========================
      // CASH ON DELIVERY
      // =========================
      if (paymentMethod === "Cash on Delivery") {
        const res = await api.post("/orders/place", {
          shippingAddress,
          paymentMethod: "Cash on Delivery",
          paymentId: "",
          buyNow: buyNow,
          productId: buyNow ? buyNowProduct._id : null,
          quantity: buyNow ? buyNowQuantity : null,
        });

        if (!buyNow) {
          await fetchCart();
        }
        alert("Order Placed Successfully 🎉");

        navigate("/orders");

        return;
      }

      // =========================
      // ONLINE PAYMENT
      // =========================

      // 1. Create Razorpay order
      const { data } = await api.post("/payment/create-order", {
        amount: total,
      });

      const order = data.order;

      // 2. Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Patel Global Green",
        description: "Plant Purchase",
        image: "/logo.jpeg",
        order_id: order.id,

        // 3. Payment successful
        handler: async function (response) {
          try {
            // 4. Verify payment
            const verify = await api.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,

              buyNow: buyNow,
              productId: buyNow ? buyNowProduct._id : null,
              quantity: buyNow ? buyNowQuantity : null,
            });

            if (!verify.data.success) {
              alert("Payment Verification Failed");
              return;
            }

            // 5. Save order
            const res = await api.post("/orders/place", {
              shippingAddress,
              paymentMethod: "Online Payment",

              paymentId: response.razorpay_payment_id,

              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,

              buyNow: buyNow,
              productId: buyNow ? buyNowProduct._id : null,
              quantity: buyNow ? buyNowQuantity : null,
            });

            // 6. Refresh cart
            await fetchCart();

            alert("Payment Successful & Order Placed 🎉");

            // 7. Orders page
            navigate("/orders");
          } catch (error) {
            console.log(error);

            alert(
              error.response?.data?.message || "Payment verification failed",
            );
          }
        },

        prefill: {
          name: "Customer",
          email: "",
          contact: "",
        },

        theme: {
          color: "#15803d",
        },
      };

      // 8. Open Razorpay
      const razor = new window.Razorpay(options);

      razor.open();
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Payment Failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold text-green-700 mb-8">Checkout</h1>

      <form
        onSubmit={handlePlaceOrder}
        className="bg-white shadow-lg rounded-xl p-6"
      >
        <label className="block mb-2 font-semibold">Shipping Address</label>

        <textarea
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          className="w-full border rounded-lg p-3 h-32"
          placeholder="Enter your full address..."
          required
        />

        <div className="mt-6">
          <label className="block mb-3 font-semibold">Payment Method</label>

          <div className="space-y-3">
            <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:bg-green-50">
              <input
                type="radio"
                name="paymentMethod"
                value="Online Payment"
                checked={paymentMethod === "Online Payment"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />

              <div>
                <p className="font-semibold">💳 Online Payment</p>
                <p className="text-sm text-gray-500">
                  Pay securely using UPI, Card or Net Banking
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:bg-green-50">
              <input
                type="radio"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={paymentMethod === "Cash on Delivery"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />

              <div>
                <p className="font-semibold">💵 Cash on Delivery</p>
                <p className="text-sm text-gray-500">
                  Pay when your order is delivered
                </p>
              </div>
            </label>
          </div>
        </div>

        <div className="mt-6 border-t pt-5">
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold">Total Amount</span>

            <span className="text-2xl font-bold text-green-700">₹{total}</span>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-800 transition"
        >
          {paymentMethod === "Cash on Delivery"
            ? "Place Order"
            : `Pay ₹${total}`}
        </button>
      </form>
    </div>
  );
}

export default Checkout;
