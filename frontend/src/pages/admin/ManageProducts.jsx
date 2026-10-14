import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminLayout from "../../layouts/AdminLayout";
import { Link } from "react-router-dom";

function ManageProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");

      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);

      alert("Product Deleted Successfully");

      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Failed to delete product");
    }
    const deleteProduct = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  try {
    await api.delete(`/products/${id}`);

    alert("Product Deleted Successfully");

    fetchProducts();
  } catch (error) {
    console.log(error);
    alert("Delete Failed");
  }
};
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <AdminLayout>
      <h1 className="text-4xl font-bold mb-8">Manage Products</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="w-full">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Category</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b">
                <td className="p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </td>

                <td className="p-4">{product.name}</td>

                <td className="p-4">₹{product.price}</td>

                <td className="p-4">{product.stock}</td>

                <td className="p-4">{product.category?.name}</td>

                <td className="p-4">
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="bg-blue-600 text-white px-3 py-2 rounded mr-2"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default ManageProducts;
