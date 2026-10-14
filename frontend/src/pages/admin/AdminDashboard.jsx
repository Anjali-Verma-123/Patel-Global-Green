import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminLayout from "../../layouts/AdminLayout";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setDashboard(res.data.dashboard);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-4xl font-bold mb-10">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-gray-500">Products</h2>

          <p className="text-4xl font-bold text-green-700 mt-3">
            {dashboard.totalProducts}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-gray-500">Categories</h2>

          <p className="text-4xl font-bold text-blue-600 mt-3">
            {dashboard.totalCategories}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-gray-500">Orders</h2>

          <p className="text-4xl font-bold text-orange-600 mt-3">
            {dashboard.totalOrders}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-gray-500">Users</h2>

          <p className="text-4xl font-bold text-purple-600 mt-3">
            {dashboard.totalUsers}
          </p>
        </div>

      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;