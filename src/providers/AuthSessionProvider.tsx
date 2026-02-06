import { useLogoutMutation } from "@/api/authApi";
import { clearCredentials } from "@/stores/authSlice";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { persistor } from "@/stores/store";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export function AuthSessionProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logoutApi] = useLogoutMutation();
  const accessToken = useAppSelector(state => state.auth.accessToken);

  const token = accessToken || localStorage.getItem("access_token");
  const hasLoggedOutRef = useRef(false);

  useEffect(() => {
    if (!token) return;

    const ws = new WebSocket(
      `${import.meta.env.VITE_SESSION_SOCKET_URL}?token=${token}`
    );

    ws.onopen = () => {
      console.log("🟢 WebSocket conectado");
    };

    ws.onmessage = async (event) => {
      let data: any;
      try {
        data = JSON.parse(event.data);
      } catch {
        console.warn("⚠️ Mensagem não é JSON:", event.data);
        return;
      }

      if (data.msg_type === "logout" && !hasLoggedOutRef.current) {
        hasLoggedOutRef.current = true;
        console.log("Webhook desconectado")
        ws.close();

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
      }
    };

    ws.onclose = (event) => {
      console.warn("🔴 WebSocket fechado", {
        code: event.code,
        reason: event.reason,
        wasClean: event.wasClean
      });
    };

    ws.onerror = (error) => {
      console.error("⚠️ WebSocket erro", error);
    };

    return () => {
      ws.close();
    };
  }, [token, logoutApi]);

  return <>{children}</>;
}
