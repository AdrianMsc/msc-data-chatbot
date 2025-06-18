// src/components/LogoutButton.tsx
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import useChat from "../../hooks/useChat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const LogoutButton = () => {
  const { clearChat } = useChat();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // Redirige al login después de cerrar sesión
    clearChat();
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-1 font-semibold bg-red-600 text-white rounded-full hover:bg-red-700 transition"
      title="Logout"
    >
      <FontAwesomeIcon icon={faRightFromBracket} className=" text-white" />
    </button>
  );
};

export default LogoutButton;
