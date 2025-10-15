import { decodeJwt } from "../utils/jwtUtils";

export const useAuth = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return { username: null, role: null, email: null, isAuthenticated: false };
  }

  const decoded = decodeJwt(token);

  const username =
    decoded?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "";
  const role = decoded?.roles || "";
  const email = decoded?.email || "";

  return {
    username,
    role,
    email,
    token,
    isAuthenticated: !!token,
  };
};
