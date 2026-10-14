import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/my-orders");
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen bg-gray-50">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-700">My Orders</h1>

        <p className="text-gray-500 mt-2">Track all your recent purchases.</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-lg py-20 text-center">
          <div className="text-7xl mb-5">📦</div>

          <h2 className="text-3xl font-bold text-gray-700">No Orders Yet</h2>

          <p className="text-gray-500 mt-3">
            Looks like you haven't placed any orders yet.
          </p>

          <a
            href="/products"
            className="inline-block mt-8 bg-green-700 text-white px-8 py-3 rounded-xl hover:bg-green-800 transition"
          >
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition"
            >
              {/* Header */}
              <div className="bg-green-50 px-8 py-5 flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <h2 className="font-bold text-lg text-gray-800">Order ID</h2>

                  <p className="text-gray-500 text-sm break-all">{order._id}</p>

                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex flex-col items-start md:items-end gap-2">
                  <span
                    className={`px-5 py-2 rounded-full text-sm font-semibold
                  ${
                    order.orderStatus === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.orderStatus === "Processing"
                        ? "bg-blue-100 text-blue-700"
                        : order.orderStatus === "Shipped"
                          ? "bg-purple-100 text-purple-700"
                          : order.orderStatus === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                  }`}
                  >
                    {order.orderStatus}
                  </span>

                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                    💳 {order.paymentMethod}
                  </span>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      order.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : order.paymentStatus === "Failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.paymentStatus === "Paid"
                      ? "✅ Payment Paid"
                      : order.paymentStatus === "Failed"
                        ? "❌ Payment Failed"
                        : "⏳ Payment Pending"}
                  </span>
                </div>
              </div>

              {/* Products */}
              <div className="p-8 space-y-5">
                {order.products
                  .filter((item) => item.product)
                  .map((item) => (
                    <div
                      key={item.product._id}
                      className="flex flex-col md:flex-row justify-between items-center gap-6 border-b pb-5"
                    >
                      <div className="flex items-center gap-5">
                        <img
                          src={
                            item.product?.image ||
                            "https://via.placeholder.com/120x120?text=No+Image"
                          }
                          alt={item.product.name}
                          className="w-24 h-24 rounded-xl object-cover border"
                        />

                        <div>
                          <h3 className="font-bold text-xl">
                            {item.product?.name || "Product Removed"}
                          </h3>

                          <p className="text-gray-500 mt-2">
                            Quantity : {item.quantity}
                          </p>

                          <p className="text-green-700 font-semibold mt-1">
                            ₹{item.product?.price || 0}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-xl text-green-700">
                          ₹{(item.product?.price || 0) * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}

                {/* Footer */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-8">
                  <div>
                    <h3 className="font-bold text-lg">Shipping Address</h3>

                    <p className="text-gray-600 mt-2">
                      📍 {order.shippingAddress}
                    </p>
                  </div>

                  {order.paymentMethod === "Online Payment" &&
                    order.paymentId && (
                      <p className="text-sm text-gray-500 mt-3 break-all">
                        Payment ID: {order.paymentId}
                      </p>
                    )}

                  <div className="text-right">
                    <h2 className="text-3xl font-bold text-green-700">
                      ₹{order.totalPrice}
                    </h2>

                    <p className="text-gray-500">Total Amount</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
