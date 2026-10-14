import { Link } from "react-router-dom";

function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-green-700 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

        <ul className="space-y-5">
          <li>
            <Link to="/admin">Dashboard</Link>
          </li>

          <li>
            <Link to="/admin/products">Products</Link>
          </li>

          <li>
            <Link to="/admin/add-product">Add Product</Link>
          </li>

          <li>
            <Link to="/admin/orders">Orders</Link>
          </li>

          <li>
            <Link to="/admin/categories">Categories</Link>
          </li>

          <li>
            <Link to="/admin/users">Users</Link>
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

export default AdminLayout;
