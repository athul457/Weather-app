import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate();

  // Load user from localStorage on mount (if you stored user details too)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      // const response = await fetch("http://localhost:3224/api/v1/admin/login", {
      const response = await fetch(
        "https://weather-app-fr8r.onrender.com/api/v1/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      console.log("Login Successful, Token:", data.token);

      if (!data.token) {
        throw new Error("No token received from server");
      }

      setToken(data.token);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ email }));

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: error.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await fetch(
        // "http://localhost:3224/api/v1/admin/register",
        "https://weather-app-fr8r.onrender.com/api/v1/admin/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Automatically login or redirect to login
      navigate("/login");
      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const updateUserProfile = async (profileData) => {
    try {
      const isFormData = profileData instanceof FormData;
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(
        // "http://localhost:3224/api/v1/admin/profile",
        "https://weather-app-fr8r.onrender.com/api/v1/admin/profile",
        {
          method: "PUT",
          headers,
          body: isFormData ? profileData : JSON.stringify(profileData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Update failed");
      }

      // Update local user state
      setUser(data.admin);
      localStorage.setItem("user", JSON.stringify(data.admin));

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Profile update error:", error);
      return { success: false, message: error.message };
    }
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
