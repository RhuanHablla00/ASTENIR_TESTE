import { Link, useNavigate } from "react-router-dom";
import { FormCheck, FormInput, FormLabel } from "@/components/Base/Form";
import Tippy from "@/components/Base/Tippy";
import Button from "@/components/Base/Button";
import Alert from "@/components/Base/Alert";
import Lucide from "@/components/Base/Lucide";
import clsx from "clsx";
import { Menu } from "@/components/Base/Headless";
import LanguageSelector from "@/components/LanguageSelector";
import ToggleDarkMode from "@/components/ToggleDarkMode";

import { useLoginForm } from "./useLoginForm";
import { useForgotPasswordMutation } from "@/api/authApi";
import { showErrorNotification, showSuccessNotification } from "@/components/Base/Notification";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ThemeSwitcher from "@/components/ThemeSwitcher";

function Main() {
  const { form, handleSubmit, isLoading, submitError, showOtpInput } = useLoginForm();

  const [forgotPassword] = useForgotPasswordMutation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
    watch
  } = form;

  const [showPassword, setShowPassword] = useState(false);

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
        <div
          className={clsx([
            "relative z-50 h-full col-span-12 p-7 sm:p-14  rounded-2xl lg:bg-transparent lg:pr-10 lg:col-span-5 xl:pr-24 2xl:col-span-4 lg:p-0 dark:bg-darkmode-600",
            "before:content-[''] before:absolute before:inset-0 before:-mb-3.5 before:bg-white/40 before:rounded-2xl before:mx-5 dark:before:hidden",
          ])}
        >
          <div className="relative z-10 flex flex-col w-full h-full py-2 lg:py-32">
            <div className="relative flex items-center mr-auto h-[50px]">
              <img
                src="/astenirBgLight.svg"
                alt="Astenir"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="mt-10">
              <div className="text-2xl font-medium">{t('sign_in_to_astenir')}</div>
              <div className="mt-2.5 text-slate-600 dark:text-slate-400">
                {t('dont_have_an_account_yet')}{" "}
                <Link className="font-medium text-primary" to="/register">
                  {t('create_account')}
                </Link>
              </div>

              {!showOtpInput && (
                <Alert
                  variant="outline-primary"
                  className="flex items-center px-4 py-3 my-7 bg-primary/5 border-primary/20 rounded-[0.6rem] leading-[1.7]"
                >
                  {({ dismiss }) => (
                    <>
                      <div className="">
                        <Lucide
                          icon="Lightbulb"
                          className="stroke-[0.8] w-7 h-7 mr-2 fill-primary/10"
                        />
                      </div>
                      <div className="ml-1 mr-8">
                        {t('welcome_to')}{" "}
                        <span className="font-medium">Astenir</span>. {t('experience_an_unified_intelligent_platform')}
                      </div>
                      <Alert.DismissButton
                        type="button"
                        className="btn-close text-primary"
                        onClick={dismiss}
                        aria-label="Close"
                      >
                        <Lucide icon="X" className="w-5 h-5" />
                      </Alert.DismissButton>
                    </>
                  )}
                </Alert>
              )}

              {showOtpInput && (
                <Alert variant="outline-secondary" className="flex items-center px-4 py-3 my-7 bg-red-50 border-red-400 rounded-[0.6rem]">
                  <Lucide icon="ShieldCheck" className="min-w-5 min-h-5 mr-3 text-red-500" />
                  <div className="text-red-600 text-sm ">
                    {t('enter_code_from_authenticator_app')}
                  </div>
                </Alert>
              )}

              <form className="mt-6" onSubmit={handleSubmit}>
                <FormLabel>{t('email')}*</FormLabel>
                <FormInput
                  type="email"
                  className="block px-4 py-3.5 rounded-[0.6rem] border-slate-300/80 disabled:bg-slate-100 disabled:text-slate-500"
                  placeholder="john@example.com"
                  disabled={showOtpInput}
                  {...register("email")}
                />
                {errors.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.email.message as string}
                  </div>
                )}

                <FormLabel className="mt-4">{t('password')}*</FormLabel>
                <div className="relative">
                  <FormInput
                    type={showPassword ? "text" : "password"}
                    autoComplete="one-time-code"
                    className="block w-full px-4 py-3.5 pr-12 rounded-[0.6rem] border-slate-300/80 disabled:bg-slate-100 disabled:text-slate-500"
                    placeholder="************"
                    disabled={showOtpInput}
                    {...register("password")}
                  />

                  <Lucide
                    icon={showPassword ? "Eye" : "EyeOff"}
                    className="w-5 h-5 absolute inset-y-0 right-3 my-auto text-slate-500 cursor-pointer"
                    onClick={() => setShowPassword(prev => !prev)}
                  />
                </div>
                {errors.password && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.password.message as string}
                  </div>
                )}

                {showOtpInput && (
                  <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <FormLabel className="mt-4">{t('authentication_code')}*</FormLabel>
                    <FormInput
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      autoFocus
                      className="block px-4 py-3.5 rounded-[0.6rem] border-slate-300/80 disabled:bg-slate-100 disabled:text-slate-500"
                      placeholder="000 000"
                      {...register("otp")}
                    />
                    {errors.otp && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.otp.message as string}
                      </div>
                    )}
                  </div>
                )}

                {!showOtpInput && (
                  <div className="flex mt-4 text-xs text-slate-500 sm:text-sm">
                    <div className="flex items-center mr-auto">
                      <FormCheck.Input
                        id="remember-me"
                        type="checkbox"
                        className="mr-2.5 border"
                        {...register("remember")}
                      />
                      <label
                        className="cursor-pointer select-none"
                        htmlFor="remember-me"
                      >
                        {t('remember_me')}
                      </label>
                    </div>
                    {watch("email") && (
                      <Button
                        type="button"
                        onClick={async (e: any) => {
                          e.preventDefault();
                          try {
                            const response = await forgotPassword({ email: watch("email") });
                            if (response.error) {
                              showErrorNotification(t('email_not_found'));
                            } else {
                              showSuccessNotification(t('email_successfully_sent'));
                              navigate("/forgot-password");
                            }
                          } catch (err: any) {
                            showErrorNotification(t('email_not_found'));
                          }
                        }}
                        className="text-primary hover:underline border-none shadow-none"
                      >
                        {t('forgot_password')}
                      </Button>
                    )}
                  </div>
                )}

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

                <div className="mt-5 text-center xl:mt-8 xl:text-left">
                  <Button
                    variant="primary"
                    rounded
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-theme-1/70 to-theme-2/70 w-full py-3.5 xl:mr-3 dark:border-darkmode-400"
                  >
                    {isLoading
                      ? (showOtpInput ? t('verifying') : t('signing_in'))
                      : t('sign_in')
                    }
                  </Button>

                  {showOtpInput ? (
                    <Button
                      type="button"
                      variant="outline-secondary"
                      rounded
                      className="bg-white/70 w-full py-3.5 mt-3 dark:bg-darkmode-400"
                      onClick={() => window.location.reload()}
                    >
                      {t('cancel')}
                    </Button>
                  ) : (
                    <Button
                      as={Link}
                      to="/register"
                      variant="outline-secondary"
                      rounded
                      type="button"
                      className="bg-white/70 w-full py-3.5 mt-3 dark:bg-darkmode-400"
                    >
                      {t('create_account')}
                    </Button>
                  )}
                </div>
              </form>
              <div className="mt-6 ">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Legal & Privacy
                </h3>
                <div className="flex items-center gap-6">
                  <Link
                    to="/privacy"
                    className="text-sm font-medium text-primary hover:underline underline-offset-4"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    to="/data-deletion"
                    className="text-sm font-medium text-slate-500 hover:text-red-600 hover:underline underline-offset-4 dark:text-slate-400 dark:hover:text-red-500"
                  >
                    Request Data Deletion Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed container grid w-screen inset-0 h-screen grid-cols-12 lg:max-w-[1550px] 2xl:max-w-[1750px] pl-14 pr-12 xl:px-24 pointer-events-none">
          <div
            className={clsx([
              "relative h-screen col-span-12 lg:col-span-5 2xl:col-span-4 z-20",
              "after:bg-white after:hidden after:lg:block after:content-[''] after:absolute after:right-0 after:inset-y-0 after:bg-gradient-to-b after:from-white after:to-slate-100/80 after:w-[800%] after:rounded-[0_1.2rem_1.2rem_0/0_1.7rem_1.7rem_0] dark:after:bg-darkmode-600 dark:after:from-darkmode-600 dark:after:to-darkmode-600",
              "before:content-[''] before:hidden before:lg:block before:absolute before:right-0 before:inset-y-0 before:my-6 before:bg-gradient-to-b before:from-white/10 before:to-slate-50/10 before:bg-white/50 before:w-[800%] before:-mr-4 before:rounded-[0_1.2rem_1.2rem_0/0_1.7rem_1.7rem_0] dark:before:from-darkmode-300 dark:before:to-darkmode-300",
            ])}
          ></div>
          <div
            className={clsx([
              "h-full col-span-7 2xl:col-span-8 lg:relative",
              "before:content-[''] before:absolute before:lg:-ml-10 before:left-0 before:inset-y-0 before:bg-gradient-to-b before:from-theme-1 before:to-theme-2 before:w-screen before:lg:w-[800%]",
              "after:content-[''] after:absolute after:inset-y-0 after:left-0 after:w-screen after:lg:w-[800%] after:bg-texture-white after:bg-fixed after:bg-center after:lg:bg-[25rem_-25rem] after:bg-no-repeat",
            ])}
          >
            <div className="sticky top-0 z-10 flex-col justify-center hidden h-screen ml-16 lg:flex xl:ml-28 2xl:ml-36">
              <div className="leading-[1.4] text-[2.6rem] xl:text-5xl font-medium xl:leading-[1.2] text-white">
                {t('powering_the_future_of_intelligent_omnichannel')}
              </div>
              <div className="mt-5 text-base leading-relaxed xl:text-lg text-white/70">
                {t('discover_astenir')}
              </div>
              <div className="flex flex-col gap-3 mt-10 xl:items-center xl:flex-row">
                <div className="text-base xl:ml-2 2xl:ml-3 text-white/70">
                  {t('join_an_evolving_ecosystem')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ThemeSwitcher />
    </>
  );
}

export default Main;