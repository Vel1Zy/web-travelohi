import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  component: React.ComponentType;
}

const checkJWTInCookie = (): string | null => {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "jwt") {
      console.log("Cookie from function:", value);
      return value;
    }
  }
  console.log("Cookie from function:", null);
  return null;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
}) => {
  const [isCookieAvailable, setIsCookieAvailable] = useState<string | null>(
    null
  );
  const [checkingCookie, setCheckingCookie] = useState<boolean>(true);
  const location = useLocation();

  // console.log(isLoggedIn);
  // console.log(user);
  useEffect(() => {
    setIsCookieAvailable((prevValue) => {
      const cookieValue = checkJWTInCookie();
      if (cookieValue !== prevValue) {
        setCheckingCookie(false);
      }
      return cookieValue;
    });
  }, []);

  if (checkingCookie) {
    return null;
  }

  if (isCookieAvailable === null) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  return <Component />;
};
export default ProtectedRoute;
