import { Link } from "react-router-dom";

import { FormCheck, FormInput, FormLabel } from "@/components/Base/Form";
import Button from "@/components/Base/Button";
import Alert from "@/components/Base/Alert";
import Lucide from "@/components/Base/Lucide";
import clsx from "clsx";
import ThemeSwitcher from "@/components/ThemeSwitcher";

import { useRegisterForm } from "./useRegisterForm";
import { Controller } from "react-hook-form";
import { Menu } from "@/components/Base/Headless";
import LanguageSelector from "@/components/LanguageSelector";
import ToggleDarkMode from "@/components/ToggleDarkMode";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function Register() {
  const { form, handleSubmit, isLoading, submitError } = useRegisterForm();
  const { t } = useTranslation();

  const {
    register,
    control,
    formState: { errors },
  } = form;

  const passwordRequirements = [
    t("password_min_12_chars"),
    t("password_uppercase"),
    t("password_number"),
    t("password_symbol")
  ] as const;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

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
      {/* LEFT MAIN CONTAINER */}
      <div className="container grid lg:h-screen grid-cols-12 lg:max-w-[1550px] 2xl:max-w-[1750px] py-10 px-5 sm:py-14 sm:px-10 md:px-36 lg:py-0 lg:pl-14 lg:pr-12 xl:px-24">
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

            {/* TITLE & SUBTITLE */}
            <div className="mt-10">
              <div className="text-2xl font-medium">
                {t('create_your_astenir_account')}
              </div>
              <div className="mt-2.5 text-slate-600 dark:text-slate-400">
                {t('already_using_astenir')}{" "}
                <Link className="font-medium text-primary" to="/login">
                  {t('sign_in')}
                </Link>
              </div>

              {/* API / SUBMIT ERROR */}
              {submitError && (
                <Alert
                  variant="outline-danger"
                  className="flex items-center px-4 py-3 mt-6 border-danger/30 rounded-[0.6rem]"
                >
                  <div className="flex items-start text-danger text-sm">
                    <Lucide
                      icon="AlertTriangle"
                      className="w-5 h-5 mr-2 mt-[2px]"
                    />
                    {submitError}
                  </div>
                </Alert>
              )}

              {/* FORM COM RHF */}
              <form className="mt-6" onSubmit={handleSubmit}>
                {/* FULL NAME */}
                <FormLabel>{t('full_name')}*</FormLabel>
                <FormInput
                  type="text"
                  className="block px-4 py-3.5 rounded-[0.6rem] border-slate-300/80"
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.fullName.message as string}
                  </div>
                )}

                {/* EMAIL */}
                <FormLabel className="mt-5">{t('email')}*</FormLabel>
                <FormInput
                  type="email"
                  className="block px-4 py-3.5 rounded-[0.6rem] border-slate-300/80"
                  {...register("email")}
                />
                {errors.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.email.message as string}
                  </div>
                )}

                {/* PASSWORD */}
                <FormLabel className="mt-5">{t('password')}*</FormLabel>
                <div className="relative">
                  <FormInput
                    type={showPassword ? "text" : "password"}
                    autoComplete="one-time-code"
                    className="block px-4 py-3.5 rounded-[0.6rem] border-slate-300/80"
                    placeholder="************"
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

                <div className="mt-4 text-slate-500">
                  <div className="font-medium">{t("password_requirements")}</div>
                  <ul className="flex flex-col gap-1 pl-3 mt-2.5 list-disc text-slate-500">
                    {passwordRequirements.map((req) => (
                      <li key={req}>{t(req)}</li>
                    ))}
                  </ul>
                </div>

                {/* PASSWORD CONFIRMATION */}
                <FormLabel className="mt-5">
                  {t('password_confirmation')}*
                </FormLabel>
                <div className="relative">
                  <FormInput
                    type={showConfirmedPassword ? "text" : "password"}
                    autoComplete="one-time-code"
                    className="block px-4 py-3.5 rounded-[0.6rem] border-slate-300/80"
                    placeholder="************"
                    {...register("confirmation")}
                  />
                  <Lucide
                    icon={showConfirmedPassword ? "Eye" : "EyeOff"}
                    className="w-5 h-5 absolute inset-y-0 right-3 my-auto text-slate-500 cursor-pointer"
                    onClick={() => setShowConfirmedPassword(prev => !prev)}
                  />
                </div>
                {errors.confirmation && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.confirmation.message as string}
                  </div>
                )}

                {/* PRIVACY POLICY / AGREE */}
                <div className="flex items-center mt-5 text-xs text-slate-500 sm:text-sm">
                  <Controller
                    name="agree"
                    control={control}
                    render={({ field }) => (
                      <>
                        <FormCheck.Input
                          id="agree-policy"
                          type="checkbox"
                          className="mr-2 border"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                        <label
                          className="cursor-pointer select-none"
                          htmlFor="agree-policy"
                        >
                          {t('i_agree_to_the_privacy')}
                        </label>
                        <Link
                          className="ml-1 text-primary dark:text-slate-200"
                          to="/privacy"
                        >
                          {t('privacy_policy')}
                        </Link>
                      </>
                    )}
                  />
                </div>
                {errors.agree && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.agree.message as string}
                  </div>
                )}


                <div className="mt-5 text-center xl:mt-8 xl:text-left">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    variant="primary"
                    rounded
                    className="bg-gradient-to-r from-theme-1/70 to-theme-2/70 w-full py-3.5 dark:border-darkmode-400"
                  >
                    {isLoading ? t('creating_account') : t('create_account')}
                  </Button>

                  <Button
                    as={Link}
                    to="/login"
                    variant="outline-secondary"
                    rounded
                    className="bg-white/70 w-full py-3.5 mt-3 dark:bg-darkmode-400"
                  >
                    {t('back_to_sign_in')}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE — NARRATIVE ADJUSTED FOR ASTENIR */}
      <div className="fixed container grid w-screen inset-0 h-screen grid-cols-12 lg:max-w-[1550px] 2xl:max-w-[1750px] pl-14 pr-12 xl:px-24">
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
              {t('start_with_astenir')}
            </div>

            <div className="flex flex-col gap-3 mt-10 xl:items-center xl:flex-row">
              <div className="flex items-center">
                {/* espaço para avatares ou badges futuros */}
              </div>

              <div className="text-base xl:ml-2 2xl:ml-3 text-white/70">
                {t('join_an_evolving_ecosystem')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ThemeSwitcher />
    </>
  );
}

export default Register;
