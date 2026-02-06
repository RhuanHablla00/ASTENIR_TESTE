import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/Base/Button";
import { FormInput } from "@/components/Base/Form";
import { useTranslation } from "react-i18next";
import { useResetPasswordAuthenticatedMutation } from "@/api/authApi";
import { showErrorNotification, showSuccessNotification } from "@/components/Base/Notification";

export default function Security() {
  const { t } = useTranslation();
  const [resetPasswordAuthenticated] = useResetPasswordAuthenticatedMutation()

  const passwordRequirements = [
    t("password_min_12_chars"),
    t("password_uppercase"),
    t("password_number"),
    t("password_symbol")
  ] as const;

  const securitySchema = z
    .object({
      currentPassword: z.string().min(1, "required"),
      newPassword: z
        .string()
        .min(12, t("password_min_12_chars"))
        .regex(/[A-Z]/, t("password_uppercase"))
        .regex(/[0-9]/, t("password_number"))
        .regex(/[^A-Za-z0-9]/, t("password_symbol")),
      confirmPassword: z.string().min(1, t('required')),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t("passwords_must_match"),
      path: ["confirmPassword"],
    });

  type SecurityForm = z.infer<typeof securitySchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SecurityForm>({
    resolver: zodResolver(securitySchema),
  });

  const onSubmit: SubmitHandler<SecurityForm> = async (data) => {
    const result: any = await resetPasswordAuthenticated({ current_password: data?.currentPassword, new_password: data?.newPassword })
    if (result?.error) {
      showErrorNotification(t(`errors:${result?.error?.data?.error_code}`))
    } else {
      showSuccessNotification(t('password_changed_successfully'))
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-5 box box--stacked">
      <div className="pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">
        {t("security")}
      </div>

      <div className="flex-col block pt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-64 xl:mr-14">
          <div className="text-left">
            <div className="flex items-center">
              <div className="font-medium">{t("current_password")}</div>
              <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                {t("required")}
              </div>
            </div>
            <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
              {t("enter_your_current_password_to_verify_your_identity")}
            </div>
          </div>
        </label>
        <div className="flex-1 w-full mt-3 xl:mt-0">
          <FormInput
            type="password"
            placeholder={t("current_password_placeholder")}
            {...register("currentPassword")}
          />
          {errors.currentPassword && (
            <p className="mt-1 text-xs text-red-500">
              {t(errors.currentPassword.message || "erro_desconhecido")}
            </p>
          )}
        </div>
      </div>

      <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-64 xl:mr-14">
          <div className="text-left">
            <div className="flex items-center">
              <div className="font-medium">{t("new_password")}</div>
              <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                {t("required")}
              </div>
            </div>
            <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
              {t("create_a_new_password_for_your_account")}
            </div>
          </div>
        </label>
        <div className="flex-1 w-full mt-3 xl:mt-0">
          <FormInput
            type="password"
            placeholder={t("new_password")}
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <p className="mt-1 text-xs text-red-500">
              {t(errors.newPassword.message || "erro_desconhecido")}
            </p>
          )}

          <div className="mt-4 text-slate-500">
            <div className="font-medium">{t("password_requirements")}</div>
            <ul className="flex flex-col gap-1 pl-3 mt-2.5 list-disc text-slate-500">
              {passwordRequirements.map((req) => (
                <li key={req}>{t(req)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-64 xl:mr-14">
          <div className="text-left">
            <div className="flex items-center">
              <div className="font-medium">{t("confirm_your_new_password")}</div>
              <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                {t("required")}
              </div>
            </div>
            <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
              {t("please_reenter_your_new_password")}
            </div>
          </div>
        </label>
        <div className="flex-1 w-full mt-3 xl:mt-0">
          <FormInput
            type="password"
            placeholder={t("confirm_new_password")}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">
              {t(errors.confirmPassword.message || "erro_desconhecido")}
            </p>
          )}
        </div>
      </div>

      <div className="flex pt-5 mt-6 border-t border-dashed md:justify-end border-slate-300/70">
        <Button variant="outline-primary" className="w-full px-4 border-primary/50 md:w-auto">
          {t("save_changes")}
        </Button>
      </div>
    </form>
  );
}
