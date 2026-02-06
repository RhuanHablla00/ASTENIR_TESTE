import { useLogoutMutation } from "@/api/authApi";
import { clearCredentials } from "@/stores/authSlice";
import { useAppDispatch } from "@/stores/hooks";
import { persistor } from "@/stores/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoutApi] = useLogoutMutation();

  useEffect(() => {
    const performLogout = async () => {
      try {
        const refreshToken = localStorage.getItem("refresh_token");

        if (refreshToken) {
          await logoutApi({ refresh_token: refreshToken }).unwrap();
        }
      } catch (error) {
        console.error("Logout API error:", error);
      } finally {
        dispatch(clearCredentials());
        persistor.purge();

        navigate("/login", { replace: true });
      }
    };

    performLogout();
  }, [logoutApi, navigate]);

  return null;
}
