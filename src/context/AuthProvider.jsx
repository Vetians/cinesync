import { useState } from "react";
import { AuthContext } from "./AuthContextStore";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(localStorage.getItem("session_id") || "");
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate();

  const login = (newSessionId, userData) => {
    localStorage.setItem("session_id", newSessionId);
    localStorage.setItem("user", JSON.stringify(userData));
    setSessionId(newSessionId);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("session_id");
    localStorage.removeItem("user");
    setSessionId("");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ sessionId, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
