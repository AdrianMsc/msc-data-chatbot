// src/components/AuthStatusAlert.tsx
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useEffect, useState } from "react";

const AuthStatusAlert = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      setIsVisible(true);
      // setTimeout(() => {
      //   setIsVisible(false);
      // }, 3000);
    } else {
      setIsVisible(false);
    }
  }, []);

  return isAuthenticated ? (
    <div
      className={`p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 fixed z-50 ${
        isVisible ? "flex" : "hidden"
      }`}
      role="alert"
    >
      <span className="font-medium">¡Autenticado!</span> Ya estás logueado y
      listo.
    </div>
  ) : (
    <div
      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
      role="alert"
    >
      <span className="font-medium">¡No autenticado!</span> Por favor inicia
      sesión para continuar.
    </div>
  );
};

export default AuthStatusAlert;
