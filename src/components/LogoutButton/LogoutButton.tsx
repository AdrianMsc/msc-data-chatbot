// src/components/LogoutButton.tsx
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // Redirige al login después de cerrar sesión
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-1 font-semibold bg-red-600 text-white rounded-full hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
