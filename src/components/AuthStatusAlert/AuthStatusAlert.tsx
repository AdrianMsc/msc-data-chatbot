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
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } else {
      setIsVisible(false);
    }
  }, []);

  return isAuthenticated ? (
    <>
      <div className="bg-green-500 h-2 w-2 rounded-full fixed top-1 left-1 z-50"></div>
      <div
        className={`p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 top-1 left-1 fixed z-50 ${
          isVisible ? "flex" : "hidden"
        }`}
        role="alert"
      >
        <span className="font-medium">Authenticated!</span>
      </div>
    </>
  ) : (
    <>
      <div className="bg-red-500 h-2 w-2 rounded-full fixed top-1 left-1 z-50"></div>
      <div
        className={`p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 top-1 left-1 fixed z-50 ${
          isVisible ? "flex" : "hidden"
        }`}
        role="alert"
      >
        <span className="font-medium">¡Nope!</span>
      </div>
    </>
  );
};

export default AuthStatusAlert;
