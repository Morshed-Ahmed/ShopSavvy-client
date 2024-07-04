import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Simulate an async auth check
    const checkAuth = async () => {
      try {
        // Simulate loading delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Replace this with your actual auth check
        const token = localStorage.getItem("token");
        if (token) {
          setUser(true);
        } else {
          setUser(false);
        }
      } catch (error) {
        setUser(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
