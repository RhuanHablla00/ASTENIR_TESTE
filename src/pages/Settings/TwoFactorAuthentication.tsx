import { useEffect, useState } from "react";
import Button from "@/components/Base/Button";
import { FormHelp, FormInput, FormLabel } from "@/components/Base/Form";
import { useTranslation } from "react-i18next";
import { useDisableOtpMutation, useEnableOtpMutation, useVerifyOtpMutation } from "@/api/authApi";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { showErrorNotification, showSuccessNotification } from "@/components/Base/Notification";
import { setCredentials } from "@/stores/authSlice";

export default function TwoFactorAuthentication() {
  const { t } = useTranslation();
  const user = useAppSelector(state => state.auth.user);
  const [otpEnabled, setOtpEnabled] = useState(user?.otp_enabled);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const dispatch = useAppDispatch();

  const [enableOtp, { isLoading: isEnabling }] = useEnableOtpMutation();
  const [disableOtp, { isLoading: isDisabling }] = useDisableOtpMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();

  const handleEnableOtp = async () => {
    try {
      const response = await enableOtp().unwrap();
      setQrCodeUrl(response.qr_code_url);
      setOtpEnabled(true);
    } catch (err) {
      setOtpEnabled(false);
    }
  };


  const handleDisableOtp = async () => {
    if (qrCodeUrl) {
      setQrCodeUrl(null);
      setOtpEnabled(false);
      setCode("");
      return;
    }

    try {
      await disableOtp().unwrap();

      dispatch(
        setCredentials({
          user: {
            ...user!,
            otp_enabled: false, 
          },
      })
    );

      setOtpEnabled(false);
      setCode("");
    } catch (err) {
        setOtpEnabled(false);
        dispatch(setCredentials({ user: { ...user!, otp_enabled: false } }));
    }
  };



  const handleToggleChange = (checked: boolean) => {
    if (checked) {
      handleEnableOtp();
    } else {
      handleDisableOtp();
    }
  };


  const handleSave = async () => {
    try {
      await verifyOtp({ code }).unwrap();
      showSuccessNotification(t("otp_authenticated_successfully"));

      dispatch(
        setCredentials({
          user: {
            ...user!,
            otp_enabled: true,
          },
        })
      );
      
      setQrCodeUrl(null);
      setCode("");
    } catch (error: any) {
      showErrorNotification(
        error?.data?.message ?? t("unexpected_error")
      );
    }
  };



  const authApps = [
    {
      name: "Google Authenticator",
      desc: t("auth_app_google_desc"),
    },
    {
      name: "Microsoft Authenticator",
      desc: t("auth_app_microsoft_desc"),
    },
    {
      name: "Authy (by Twilio)",
      desc: t("auth_app_authy_desc"),
    },
  ];

  return (
    <div className="flex flex-col p-5 box box--stacked">
      <div className="pb-5 mb-5 border-b border-dashed border-slate-300/70">
        <h2 className="text-base font-medium text-slate-800 dark:text-white">
          {t("two_factor_authentication")}
        </h2>
        <div className="mt-1 text-slate-500 text-sm">
          {t("two_factor_authentication_description")}
        </div>
      </div>

      <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-transparent border border-slate-200">
        <div className="flex flex-col">
          <span className="font-medium text-slate-700 dark:text-white">
            {t("enable_two_factor_auth")}
          </span>
          <span className="text-xs text-slate-500 mt-0.5">
            {t("toggle_to_enable_setup")}
          </span>
        </div>

        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={!!otpEnabled}
            onChange={(e) => handleToggleChange(e.target.checked)}
            disabled={isEnabling || isDisabling || isVerifying}
          />
          <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:bg-primary relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full" />
        </label>
      </div>

      {qrCodeUrl && (
        <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium text-slate-700 dark:text-white mb-3">
                1. {t("download_auth_app")}
                <p className="text-sm text-slate-500 mb-4">
                  {t("auth_app_intro_text")}
                </p>

                <ul className="space-y-3">
                  {authApps.map((app, index) => (
                    <li key={index} className="bg-white dark:bg-transparent p-3 rounded border border-slate-100 shadow-sm text-sm">
                      <span className="block font-semibold text-slate-700 dark:text-white">{app.name}</span>
                      <span className="text-slate-500 text-xs">{app.desc}</span>
                    </li>
                  ))}
                </ul>
              </h3>
            </div>

            <div className="flex flex-col items-center justify-start pt-2">
              <h3 className="font-medium text-slate-700 dark:text-white mb-3 self-start w-full">
                2. {t("scan_and_verify")}
              </h3>

              <div className="p-2 bg-white border rounded-lg shadow-sm">
                <img
                  src={qrCodeUrl}
                  alt="QR Code OTP"
                  className="w-40 h-40 object-contain"
                />
              </div>

              <div className="w-full mt-5">
                <FormLabel htmlFor="otp-code" className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1 block">
                  {t("verification_code")}
                </FormLabel>
                <div className="flex gap-2">
                  <FormInput
                    id="otp-code"
                    type="text"
                    className="flex-1"
                    placeholder="000 000"
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <Button
                    variant="primary"
                    disabled={!code || isVerifying}
                    onClick={handleSave}
                    className="shrink-0"
                  >
                    {t("verify_and_save")}
                  </Button>
                </div>
                <FormHelp className="mt-2">
                  {t("enter_the_code_generated_by_your_authenticator")}
                </FormHelp>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}