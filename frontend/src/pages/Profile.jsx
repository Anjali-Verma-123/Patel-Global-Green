import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/profile");

      setFormData(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put("/users/profile", {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      });

      alert("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-[500px]"
      >
        <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
          My Profile
        </h1>

        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-green-200 flex items-center justify-center text-4xl font-bold text-green-700">
            {formData.name ? formData.name.charAt(0).toUpperCase() : "U"}
          </div>
        </div>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mb-4"
        />

        <input
          type="email"
          value={formData.email}
          readOnly
          className="border p-3 rounded-lg w-full mb-4 bg-gray-100"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone || ""}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mb-4"
        />

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address || ""}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mb-6"
        />

        <button className="bg-green-700 text-white w-full py-3 rounded-lg hover:bg-green-800">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;
