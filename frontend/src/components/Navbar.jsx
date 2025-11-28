import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <nav className="bg-white shadow mb-4">
      <div className="max-w-4xl mx-auto p-4 flex justify-between">
        <Link to="/" className="font-semibold text-lg">Dashboard</Link>

        {user && (
          <div className="flex gap-4 items-center">
            <Link to="/profile">{user.name}</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
