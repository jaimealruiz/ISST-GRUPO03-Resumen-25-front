import { useEffect, useState } from "react";
import { getCurrentUser } from "../api/auth";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser().then(setUser).catch(() => {});
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
