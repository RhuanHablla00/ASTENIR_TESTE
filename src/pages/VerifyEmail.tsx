import { useLogoutMutation, useRequestEmailVerificationMutation, useVerifyEmailMutation } from "@/api/authApi";
import Button from "@/components/Base/Button";
import { Menu } from "@/components/Base/Headless";
import Lucide from "@/components/Base/Lucide";
import { showSuccessNotification, showErrorNotification } from "@/components/Base/Notification";
import LanguageSelector from "@/components/LanguageSelector";
import ToggleDarkMode from "@/components/ToggleDarkMode";
import { clearCredentials } from "@/stores/authSlice";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { persistor } from "@/stores/store";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const calcRemainingSeconds = (expireAt: string) => {
  const expires = new Date(expireAt).getTime();
  const now = Date.now();
  const diff = Math.floor((expires - now) / 1000);
  return diff > 0 ? diff : 0;
};

const formatTime = (seconds: number) => {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
};

export default function VerifyEmail() {
  const [resendTimer, setResendTimer] = useState(0);
  const [verifyEmail] = useVerifyEmailMutation();
  const [requestEmailVerification] = useRequestEmailVerificationMutation();
  const Auth = useAppSelector((state) => state.auth || "");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [logoutApi] = useLogoutMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let interval: any;
    if (resendTimer > 0) {
      interval = setInterval(() =>
        setResendTimer(prev => (prev > 0 ? prev - 1 : 0))
        , 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  useEffect(() => {
    if (Auth.user?.email_verified) {
      navigate('/workspace/list')
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      (async () => {
        try {
          await verifyEmail({ token }).unwrap();
          showSuccessNotification(t('email_successfully_verified'));
          navigate("/workspace/list");
        } catch (err: any) {
          const message = err?.data?.error || t('error_verifying_email');
          showErrorNotification(message);
        }
      })();
    }
  }, [verifyEmail]);

  // useEffect(() => {
  //   (async () => {
  //     const response: any = await requestEmailVerification();

  //     if (response?.error?.data?.retry_at_utc) {
  //       const seconds = calcRemainingSeconds(response.error.data.retry_at_utc);
  //       setResendTimer(seconds);
  //       return;
  //     }

  //     showSuccessNotification("Email enviado com sucesso!");
  //     setResendTimer(300);
  //   })();
  // }, []);

  const handleResend = async () => {
    const response: any = await requestEmailVerification();

    if (response?.error?.data?.retry_at_utc) {
      const seconds = calcRemainingSeconds(response.error.data.retry_at_utc);
      setResendTimer(seconds);
      showErrorNotification(t('please_wait_before_resending_the_email'));
      return;
    }

    showSuccessNotification(t('email_successfully_sent'));
    setResendTimer(300);
  };


  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        await logoutApi({ refresh_token: refreshToken });
      }

      dispatch(clearCredentials());
      persistor.purge();

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      dispatch(clearCredentials());
      persistor.purge();
      navigate("/login", { replace: true });
    }
  };

  return (
    <>
      <div className="fixed top-5 right-5 z-10">
        <Menu>
          <Menu.Button className="w-10 h-10 rounded-full bg-white/90 dark:bg-darkmode-600/90 backdrop-blur flex items-center justify-center border border-slate-200 dark:border-darkmode-500 shadow-lg text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-darkmode-500 transition-colors">
            <Lucide icon="User" className="w-5 h-5" />
          </Menu.Button>
          <Menu.Items className="w-56 mt-2 origin-top-right">
            <LanguageSelector />
            <ToggleDarkMode />
            <Menu.Item
              onClick={() => {
                handleLogout();
              }}
            >
              <Lucide icon="Power" className="w-4 h-4 mr-2" />
              {t('logout')}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
      <div className="max-w-2xl mx-auto mt-40 p-6 box box--stacked text-center">
        <h2 className="text-xl font-semibold mb-4">{t('validate_your_email')}</h2>

        <p className="text-sm text-gray-600 mb-6">
          {t('for_your_safety_verify_your_email')} <strong>{Auth?.user?.email}</strong> {t('to_continue')}
        </p>

        <Button
          variant="primary"
          rounded
          disabled={resendTimer > 0}
          className="bg-gradient-to-r from-theme-1/70 to-theme-2/70 w-full py-3.5"
          onClick={handleResend}
        >
          {resendTimer > 0 ? `${t('resend_in')} ${formatTime(resendTimer)}` : t('resend_email')}
        </Button>

        <p className="text-xs text-gray-500 mt-4">
          {t('did_not_receive_the_email')}
        </p>
      </div>
    </>
  );
}
