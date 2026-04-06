import { Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <div className="w-60 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Task Manager</h2>

        <button
          className="block mb-2"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>

        <button
          className="text-red-400 mt-10"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}