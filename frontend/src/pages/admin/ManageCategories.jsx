import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminLayout from "../../layouts/AdminLayout";

function ManageCategories() {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [editingId, setEditingId] = useState(null);

  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // const handleAddCategory = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await api.post("/categories/add", {
  //       name,
  //       description,
  //       image,
  //     });

  //     alert("Category Added Successfully");

  //     setName("");
  //     setDescription("");
  //     setImage("");

  //     fetchCategories();
  //   } catch (error) {
  //     console.log(error);
  //     alert("Failed");
  //   }
  // };
  const handleAddCategory = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);

      if (image) {
        formData.append("image", image);
      }

      await api.post("/categories/add", formData);

      alert("Category Added Successfully");

      setName("");
      setDescription("");
      setImage("");

      fetchCategories();
    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/categories/${id}`);

      alert("Category Deleted Successfully");

      fetchCategories();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  // const handleUpdate = async () => {
  //   try {
  //     await api.put(`/categories/${editingId}`, {
  //       name: editName,
  //     });

  //     alert("Category Updated Successfully");

  //     setEditingId(null);
  //     setEditName("");

  //     fetchCategories();
  //   } catch (error) {
  //     console.log(error);
  //     alert("Update Failed");
  //   }
  // };
  // const handleUpdate = async () => {
  //   try {
  //     const formData = new FormData();

  //     formData.append("name", editName);
  //     formData.append("description", editDescription);

  //     if (editImage) {
  //       formData.append("image", editImage);
  //     }

  //     await api.put(`/categories/${editingId}`, formData);

  //     alert("Category Updated Successfully");

  //     setEditingId(null);

  //     setEditName("");
  //     setEditDescription("");
  //     setEditImage("");

  //     fetchCategories();
  //   } catch (error) {
  //     console.log(error);
  //     alert("Update Failed");
  //   }
  // };
  const handleUpdate = async () => {
  try {

    const formData = new FormData();

    formData.append("name", editName);
    formData.append("description", editDescription);

    if (editImage) {
      formData.append("image", editImage);
    }

    await api.put(`/categories/${editingId}`, formData);

    alert("Category Updated Successfully");

    setEditingId(null);
    setEditName("");
    setEditDescription("");
    setEditImage(null);

    fetchCategories();

  } catch (error) {
    console.log(error);
    alert("Update Failed");
  }
};

  return (
    <AdminLayout>
      <h1 className="text-4xl font-bold mb-8">Manage Categories</h1>

      {/* <form onSubmit={handleAddCategory} className="flex gap-4 mb-8">
        <input
          type="text"
          required
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 rounded-lg flex-1"
        />

        <input
          type="text"
          placeholder="Category Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-3 rounded-lg flex-1"
        />

        <input
          type="text"
          placeholder="Category Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border p-3 rounded-lg flex-1"
        />

        <button className="bg-green-700 text-white px-6 rounded-lg">
          Add Category
        </button>
      </form> */}

      <form onSubmit={handleAddCategory} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 rounded-lg w-full"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-3 rounded-lg w-full"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-3 rounded-lg"
        />

        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="w-32 h-32 rounded-lg object-cover"
          />
        )}

        <button className="bg-green-700 text-white px-6 py-3 rounded-lg">
          Add Category
        </button>
      </form>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Description</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id} className="border-b">
                {/* Image */}

                <td className="p-4">
                  {editingId === cat._id ? (
                    <div className="space-y-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setEditImage(e.target.files[0])}
                        className="border p-2 rounded w-full mb-2"
                      />
                      {editImage && (
                        <img
                          src={URL.createObjectURL(editImage)}
                          alt=""
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                    </div>
                  ) : (
                    <img
                      src={
                        cat.image
                          ? cat.image
                          : "https://via.placeholder.com/80?text=No+Image"
                      }
                      alt={cat.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  )}
                </td>

                {/* Name */}

                <td className="p-4">
                  {editingId === cat._id ? (
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="border p-2 rounded w-full"
                    />
                  ) : (
                    cat.name
                  )}
                </td>

                {/* Description */}

                <td className="p-4">
                  {editingId === cat._id ? (
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="border p-2 rounded w-full"
                    />
                  ) : (
                    cat.description
                  )}
                </td>

                {/* Buttons */}

                <td className="p-4">
                  {editingId === cat._id ? (
                    <>
                      <button
                        type="button"
                        onClick={handleUpdate}
                        className="bg-green-600 text-white px-3 py-2 rounded mr-2"
                      >
                        Save
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null);
                          setEditName("");
                          setEditDescription("");
                          setEditImage("");
                        }}
                        className="bg-gray-500 text-white px-3 py-2 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(cat._id);
                          setEditName(cat.name);
                          setEditDescription(cat.description || "");
                          setEditImage(null);
                        }}
                        className="bg-blue-600 text-white px-3 py-2 rounded mr-2"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(cat._id)}
                        className="bg-red-600 text-white px-3 py-2 rounded"
                      >
                        Delete
                      </button>
                    </>
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

export default ManageCategories;
