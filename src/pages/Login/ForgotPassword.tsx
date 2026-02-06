import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FormInput, FormLabel } from "@/components/Base/Form";
import Button from "@/components/Base/Button";
import Lucide from "@/components/Base/Lucide";
import clsx from "clsx";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Tippy from "@/components/Base/Tippy";
import { ForgotPasswordFormData, useForgotPassword } from "@/hooks/useForgotPassword";
import Alert from "@/components/Base/Alert";
import { useResetPasswordMutation } from "@/api/authApi";
import { showErrorNotification, showSuccessNotification } from "@/components/Base/Notification";
import { Menu } from "@/components/Base/Headless";
import LanguageSelector from "@/components/LanguageSelector";
import ToggleDarkMode from "@/components/ToggleDarkMode";
import { useTranslation } from "react-i18next";

export default function ResetPassword() {
  const { form, handleSubmit, isLoading, submitError } = useForgotPassword();
  const [resetPassword] = useResetPasswordMutation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { register, formState: { errors } } = form;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordRequirements = [
    "Mínimo de 12 caracteres",
    "1 letra maiúscula",
    "1 número",
    "1 símbolo",
  ];

  // Captura token da URL
  const params = new URLSearchParams(window.location.search);
  const token = params.get("code");

  const onSubmit = async (data: any) => {
    if (!token) return;

    try {
      await resetPassword({ token, new_password: data.newPassword }).unwrap();
      showSuccessNotification("Senha resetada com sucesso!");
      navigate("/workspace/list");
    } catch (err: any) {
      const message = t(`errors:${err?.data?.error_code}`) || "Erro ao resetar senha.";
      showErrorNotification(message);
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
          </Menu.Items>
        </Menu>
      </div>
      <div className="container grid lg:h-screen grid-cols-12 lg:max-w-[1550px] 2xl:max-w-[1750px] py-10 px-5 sm:py-14 sm:px-10 md:px-36 lg:py-0 lg:pl-14 lg:pr-12 xl:px-24">
        {/* Painel esquerdo */}
        <div
          className={clsx([
            "relative z-50 h-full col-span-12 p-7 sm:p-14 bg-white rounded-2xl lg:bg-transparent lg:pr-10 lg:col-span-5 xl:pr-24 2xl:col-span-4 lg:p-0 dark:bg-darkmode-600",
            "before:content-[''] before:absolute before:inset-0 before:-mb-3.5 before:bg-white/40 before:rounded-2xl before:mx-5 dark:before:hidden",
          ])}
        >
          <div className="relative z-10 flex flex-col justify-center w-full h-full py-2 lg:py-32">
            <div className="relative flex items-center mr-auto h-[50px]">
              <img
                src="/astenirBgLight.svg"
                alt="Astenir"
                className="h-full w-auto object-contain"
              />
            </div>

            <div className="mt-10">
              <div className="text-2xl font-medium">{t('reset_password')}</div>

              {token ? (
                <>
                  <div className="mt-2.5 text-slate-600 dark:text-slate-400">
                    {t('reset_your_password_in_few_steps')}
                  </div>

                  {submitError && (
                    <Alert
                      variant="outline-danger"
                      className="flex items-center px-4 py-3 mt-4 border-danger/30 rounded-[0.6rem] text-xs sm:text-sm"
                    >
                      <div className="flex items-start">
                        <Lucide
                          icon="AlertTriangle"
                          className="w-5 h-5 mr-2 mt-[2px] text-danger"
                        />
                        <div>{submitError}</div>
                      </div>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Inputs de senha */}
                    <FormLabel>{t('password')} *</FormLabel>
                    <div className="relative">
                      <FormInput
                        type={showPassword ? "text" : "password"}
                        className="block px-4 py-3.5 rounded-[0.6rem] border-slate-300/80 pr-10"
                        {...register("newPassword")}
                      />
                      <Lucide
                        icon={showPassword ? "Eye" : "EyeOff"}
                        className="w-5 h-5 absolute inset-y-0 right-3 my-auto text-slate-500 cursor-pointer"
                        onClick={() => setShowPassword(prev => !prev)}
                      />
                    </div>
                    {errors.newPassword && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.newPassword.message as string}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mt-2">
                      {passwordRequirements.map(req => (
                        <div
                          key={req}
                          className="text-xs bg-slate-100 dark:bg-darkmode-400 text-slate-600 dark:text-slate-300 py-1 px-2 rounded-md"
                        >
                          {req}
                        </div>
                      ))}
                    </div>

                    <FormLabel className="mt-4">{t('confirm_your_password')} *</FormLabel>
                    <div className="relative">
                      <FormInput
                        type={showConfirmPassword ? "text" : "password"}
                        className="block px-4 py-3.5 rounded-[0.6rem] border-slate-300/80 pr-10"
                        {...register("confirmPassword")}
                      />
                      <Lucide
                        icon={showConfirmPassword ? "Eye" : "EyeOff"}
                        className="w-5 h-5 absolute inset-y-0 right-3 my-auto text-slate-500 cursor-pointer"
                        onClick={() => setShowConfirmPassword(prev => !prev)}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.confirmPassword.message as string}
                      </div>
                    )}

                    <div className="flex justify-between items-center mt-5 text-center xl:mt-8 xl:text-left">
                      <div className="text-xs text-slate-500">
                        1 {t('of')} 1
                        <span className="inline-block h-1.5 w-10 ml-2 bg-primary rounded-full align-middle"></span>
                      </div>
                      <Button
                        variant="primary"
                        rounded
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center bg-gradient-to-r from-theme-1/70 to-theme-2/70 py-3.5 px-6 dark:border-darkmode-400"
                      >
                        <Lucide icon="Mail" className="w-4 h-4 mr-2" />
                        {isLoading ? t('sending') : t('send')}
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="mt-4 text-slate-600 dark:text-slate-400">
                {t('an_email_with_instructions_to_reset_your_password')}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Painel direito - layout 100% intacto */}
        <div className="fixed container grid w-screen inset-0 h-screen grid-cols-12 lg:max-w-[1550px] 2xl:max-w-[1750px] pl-14 pr-12 xl:px-24">
          <div className={clsx([
            "relative h-screen col-span-12 lg:col-span-5 2xl:col-span-4 z-20",
            "after:bg-white after:hidden after:lg:block after:content-[''] after:absolute after:right-0 after:inset-y-0 after:bg-gradient-to-b after:from-white after:to-slate-100/80 after:w-[800%] after:rounded-[0_1.2rem_1.2rem_0/0_1.7rem_1.7rem_0] dark:after:bg-darkmode-600 dark:after:from-darkmode-600 dark:after:to-darkmode-600",
            "before:content-[''] before:hidden before:lg:block before:absolute before:right-0 before:inset-y-0 before:my-6 before:bg-gradient-to-b before:from-white/10 before:to-slate-50/10 before:bg-white/50 before:w-[800%] before:-mr-4 before:rounded-[0_1.2rem_1.2rem_0/0_1.7rem_1.7rem_0] dark:before:from-darkmode-300 dark:before:to-darkmode-300",
          ])}></div>
          <div className={clsx([
            "h-full col-span-7 2xl:col-span-8 lg:relative",
            "before:content-[''] before:absolute before:lg:-ml-10 before:left-0 before:inset-y-0 before:bg-gradient-to-b before:from-theme-1 before:to-theme-2 before:w-screen before:lg:w-[800%]",
            "after:content-[''] after:absolute after:inset-y-0 after:left-0 after:w-screen after:lg:w-[800%] after:bg-texture-white after:bg-fixed after:bg-center after:lg:bg-[25rem_-25rem] after:bg-no-repeat",
          ])}>
            <div className="sticky top-0 z-10 flex-col justify-center hidden h-screen ml-16 lg:flex xl:ml-28 2xl:ml-36">
              <div className="leading-[1.4] text-[2.6rem] xl:text-5xl font-medium xl:leading-[1.2] text-white">
                {t('powering_the_future_of_intelligent_omnichannel')}
              </div>
              <div className="mt-5 text-base leading-relaxed xl:text-lg text-white/70">
                {t('discover_astenir')}
              </div>
              <div className="flex flex-col gap-3 mt-10 xl:items-center xl:flex-row">
                <div className="flex items-center">
                  <div className="w-9 h-9 2xl:w-11 2xl:h-11 image-fit zoom-in">
                    <Tippy
                      as="img"
                      alt="Astenir - Intelligent Omnichannel Platform"
                      className="rounded-full border-[3px] border-white/50"
                      src="/astenir.svg" 
                      content={t('astenir_team')}
                    />
                  </div>
                </div>
                <div className="text-base xl:ml-2 2xl:ml-3 text-white/70">
                  {t('join_an_evolving_ecosystem')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

