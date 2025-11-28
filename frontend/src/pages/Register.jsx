import { useState } from "react";
import { registerUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const nav = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      login(res.data.user, res.data.access_token);
      nav("/");
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>

        {error && <p className="text-red-600">{error}</p>}

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            name="name"
            className="border p-2 w-full rounded"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
            name="email"
            className="border p-2 w-full rounded"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            name="password"
            className="border p-2 w-full rounded"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Register
          </button>
        </form>

        <p className="mt-4 text-sm">
          Already registered? <Link className="text-blue-600" to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
