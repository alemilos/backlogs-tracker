import { useAuth } from "providers/AuthProvider";
import React from "react";

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <button
      className="absolute border px-4 py-2 border-black bottom-8 right-4 rounded-lg transition-all hover:bg-[#f00]/50 z-10"
      onClick={logout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
