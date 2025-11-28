import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProfile, updateProfile } from "../api/profile";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    getProfile().then((res) => {
      setForm({ name: res.data.name, email: res.data.email });
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateProfile({ name: form.name });
    login({ ...user, name: res.data.name }, localStorage.getItem("token"));
    alert("Profile updated!");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Profile</h1>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            className="border p-2 w-full rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="border p-2 w-full rounded bg-gray-100"
            value={form.email}
            disabled
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default Profile;
