import { FormInput } from "@/components/Base/Form";
import Button from "@/components/Base/Button";
import { useChangeEmailForm } from "../../hooks/useChangeEmailForm";
import { useProfileQuery } from "@/api/authApi";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import GenericModal from "@/components/Modals/GenericModal";

export default function EmailSettings() {
  const { t } = useTranslation();

  const {
    form: emailForm,
    handleSubmit: submitForm,
    isLoading: isSavingEmail,
    submitSuccess: emailSuccess,
    submitError: emailError,
  } = useChangeEmailForm();

  const {
    register: registerEmail,
    formState: { errors: emailErrors },
    handleSubmit
  } = emailForm;

  const { data: profile } = useProfileQuery();

  const [openModal, setOpenModal] = useState(false);

  const handleEmailChange = (data: any) => {
    submitForm();
    setOpenModal(false);
  };

  return (
    <div className="flex flex-col p-5 box box--stacked"    >
      <div className="pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">
        {t('email_settings')}
      </div>

      <div>
        <div className="text-slate-500">
          {t('your_current_email_address_is')}
          <span className="font-medium">
            {" "}{profile?.email}
          </span>
          .
        </div>

        <div className="flex-col block pt-5 mt-2 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
          <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
            <div className="text-left">
              <div className="flex items-center">
                <div className="font-medium">{t('new_email_address')}</div>
                <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                  {t('required')}
                </div>
              </div>
              <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                {t('provide_valid_email_address')}
              </div>
            </div>
          </label>

          <div className="flex-1 w-full mt-3 xl:mt-0">
            <FormInput
              autoComplete="email"
              className="form-input-styles"
              type="text"
              {...registerEmail("new_email")}
            />

            {emailErrors.new_email && (
              <div className="text-red-500 text-xs mt-1">
                {emailErrors.new_email.message}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex pt-5 mt-6 border-t border-dashed md:justify-end border-slate-300/70">
        <Button
          variant="outline-primary"
          className="w-full px-4 border-primary/50 md:w-auto"
          onClick={async () => {
            const isValid = await emailForm.trigger("new_email");
            if (isValid) {
              setOpenModal(true);
            }
          }}        >
          {t('save_changes')}
        </Button>
      </div>

      <GenericModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={t("email_change")}
        subtitle={t("email_change_description")}
        size="default"
        modalButtons={[
          { label: t('close'), onClick: () => setOpenModal(false), variant: "outline-secondary" },
          { label: isSavingEmail ? t('saving') + "..." : t('save_changes'), onClick: () => handleSubmit(handleEmailChange)?.(), variant: "primary" },
        ]}
        content={
          <div className="flex flex-col">
            <FormInput
              label={t("current_password")}
              autoComplete="current-password"
              type="password"
              {...registerEmail("password")}
            />

            {emailErrors.password && (
              <div className="text-red-500 text-xs mt-1">
                {emailErrors.password.message}
              </div>
            )}
          </div>
        }
      />

      {emailSuccess && (
        <p className="text-green-600 text-sm mt-3">{emailSuccess}</p>
      )}

      {emailError && (
        <p className="text-red-600 text-sm mt-3">{emailError}</p>
      )}
    </div>
  );
}
