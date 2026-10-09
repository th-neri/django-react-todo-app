import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false))
  }, [])

  // to refresh the token automatically
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    // to send a request to the back-end with the refresh token to get a new access token
    try {
      const response = await api.post("auth/jwt/refresh/", {
        refresh: refreshToken,
      });
      // 200 meaning it's successfull
      if (response.status == 200) { 
        localStorage.setItem(ACCESS_TOKEN, response.data.access)
        setIsAuthorized(true)
      } else {
        setIsAuthorized(false)
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  // to check if i need to refresh the token
  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = token.tokenExpiration;
    const now = Date.now() / 1000; // seconds

    // if it is already expired then refresh using refreshToken
    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  if (isAuthorized == null) {
    return <div>Loading...</div>;
  }
  // if not authorized then return back to the login
  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
