import { useContext } from "react";
import { AuthContext } from "../contexts/auth-context";
import jwt_decode from "jwt-decode";
import Token from "../types/interfaces/token";
import useLocalStorage from "./use-local-storage";
import AuthService from "../services/auth-service";
const useAuth = () => {
  const {
    accessToken,
    setAccessToken,
    isAuthenticated,
    setIsAuthenticated,
    loading,
    loadingAuth,
    setLoadingAuth,
    userId,
    setUserId,
    email,
    setEmail,
    errors,
  } = useContext(AuthContext);
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    "refreshToken",
    null
  );
  const login = (accessToken: string, refreshToken: string) => {
    const { exp, id, email } = jwt_decode<Token>(accessToken);
    silentRefresh(exp);
    setUserId(id);
    setEmail(email);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setIsAuthenticated(true);
  };

  const silentRefresh = (exp: number) => {
    const msExpiration = Math.abs(
      new Date().getTime() - new Date(exp * 1000).getTime()
    );

    setTimeout(() => {
      refreshAccessToken();
    }, msExpiration);
  };

  const destoryAuth = () => {
    setRefreshToken(null);
    setAccessToken(null);
    setUserId(null);
    setEmail(null);
    setIsAuthenticated(false);
  };
  const refreshAccessToken = async () => {
    if (refreshToken === null) {
      destoryAuth();
      setLoadingAuth(false);
      return;
    }
    try {
      const response = await AuthService.refreshToken({ token: refreshToken });
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        response.data;
      login(newAccessToken, newRefreshToken);
    } catch (error) {
      destoryAuth();
    } finally {
      setLoadingAuth(false);
    }
  };
  const logout = async () => {
    if (!accessToken) return;
    try {
      await AuthService.logout(accessToken);
    } catch {
    } finally {
      destoryAuth();
    }
  };
  return {
    accessToken,
    isAuthenticated,
    loading,
    loadingAuth,
    errors,
    userId,
    email,
    login,
    logout,
    refreshAccessToken,
  };
};

export default useAuth;
