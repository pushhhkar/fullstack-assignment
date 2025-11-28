import { useState } from "react";
import { loginUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const nav = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      login(res.data.user, res.data.access_token);
      nav("/");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>

        {error && <p className="text-red-600">{error}</p>}

        <form className="space-y-3" onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>

        <p className="mt-4 text-sm">
          No account? <Link className="text-blue-600" to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
