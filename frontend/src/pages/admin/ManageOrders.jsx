import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminLayout from "../../layouts/AdminLayout";

function ManageOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");

      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, {
        orderStatus: status,
      });

      alert("Order Status Updated");

      fetchOrders();
    } catch (error) {
      console.log(error);
      alert("Failed to Update Status");
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-4xl font-bold mb-8">Manage Orders</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="w-full">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Products</th>
              <th className="p-4">Total</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Payment Status</th>
              <th className="p-4">Order Status</th>
              <th className="p-4">Date</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="p-4">
                  {order.user?.name}
                  <p className="text-xs text-gray-500">{order.user?.email}</p>
                </td>

                <td className="p-4">{order.products.length}</td>

                <td className="p-4">₹{order.totalPrice}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.paymentMethod === "Online Payment"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.paymentMethod}
                  </span>
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : order.paymentStatus === "Failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="p-4">{order.orderStatus}</td>

                <td className="p-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4">
                  <select
                    value={order.orderStatus}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default ManageOrders;
