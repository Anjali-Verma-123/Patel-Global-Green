import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminLayout from "../../layouts/AdminLayout";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");

      setUsers(res.data.users);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/users/${id}`);

      alert("User Deleted Successfully");

      fetchUsers();

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <AdminLayout>

      <h1 className="text-4xl font-bold mb-8">
        Manage Users
      </h1>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-green-700 text-white">

            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Action</th>
            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user._id}
                className="border-b"
              >
                <td className="p-4">
                  {user.name}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">
                  {user.role}
                </td>

                <td className="p-4">

                  {user.role === "admin" ? (

                    <span className="text-gray-500">
                      Protected
                    </span>

                  ) : (

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-600 text-white px-3 py-2 rounded"
                    >
                      Delete
                    </button>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
}

export default ManageUsers;