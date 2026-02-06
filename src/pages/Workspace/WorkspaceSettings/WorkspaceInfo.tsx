import { FormCheck, FormHelp, FormInput, FormSelect } from "@/components/Base/Form";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { showErrorNotification, showSuccessNotification } from "@/components/Base/Notification";
import Button from "@/components/Base/Button";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { updateWorkspace, Workspace } from "@/stores/workspaceSlice";
import { useUpdateWorkspaceApiMutation } from "@/api/workspaceApi";

export default function WorkspaceInfo() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const workspace = useAppSelector((state) => state.workspace.selectedWorkspace);

  const [updateWorkspaceApi, { isLoading: isSaving }] = useUpdateWorkspaceApiMutation();

  const form = useForm<Workspace>({ values: workspace ?? {} as Workspace });

  const { register, handleSubmit, control, formState } = form;
  const { errors } = formState;

  if (!workspace) {
    return (
      <div className="p-10 text-center border border-dashed border-slate-300 rounded-lg bg-slate-50 dark:border-darkmode-400 dark:bg-darkmode-600">
        <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
          Carregando informações
        </p>
      </div>
    );
  }

  const getError = (path: string, errors: any) =>
    path.split(".").reduce((acc, key) => acc?.[key], errors);

  const fields = [
    { key: "photo_url", label: t("workspace_photo"), required: false, type: "url" },
    { key: "name", label: t("name"), required: true, type: "text" },
    { key: "description", label: t("description"), required: true, type: "text" },
    { key: "business_email", label: t("business_email"), required: true, type: "email" },
    { key: "industry", label: t('industry'), required: true, type: "text" },
    { key: "website", label: "Website", required: false, type: "url" },
    { key: "address_line", label: t('address'), required: true, type: "text" },
    { key: "city", label: t('city'), required: true, type: "text" },
    { key: "administrative_area", label: t('state'), required: true, type: "text" },
    { key: "postal_code", label: t('postal_code'), required: true, type: "text" },
    { key: "phone", label: t('phone'), required: true, type: "tel" },
  ];

  const selectFields = [
    { key: "settings.timezone", label: "Timezone", required: true, options: ["UTC-3", "UTC+1", "America/Sao_Paulo"] },
    { key: "settings.currency", label: t('currency'), required: true, options: ["USD", "EUR", "BRL"] },
    { key: "settings.date_format", label: t('date_format'), required: true, options: ["YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"] },
  ];

  const onSubmit = async (values: typeof workspace) => {
    try {
      const updated = await updateWorkspaceApi({
        id: workspace.id,
        data: values,
      }).unwrap();

      dispatch(updateWorkspace(updated));
      showSuccessNotification("Sucesso ao atualizar o workspace!");
    } catch (error: any) {
      showErrorNotification(t(`errors:${error?.data?.error_code}`) || "Erro ao salvar!");
    }
  };

  return (
    <form
      key={workspace.id}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-5 box box--stacked"
    >
      <div className="pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem] dark:border-darkmode-400">
        {t("workspace_info")}
      </div>

      {fields.map(({ key, label, required, type }) => {
        const error = getError(key, errors);
        const inputId = `workspace-${key}`;

        return (
          <div key={key} className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
            <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
              <div className="text-left">
                <div className="flex items-center">
                  <div className="font-medium">{label}</div>
                  {required && (
                    <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200 dark:border-darkmode-200">
                      {t('required')}
                    </div>
                  )}
                </div>
                <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                  {t(`description_${key}`) || `Enter the ${label.toLowerCase()}.`}
                </div>
              </div>
            </label>

            <div className="flex-1 w-full mt-3 xl:mt-0">
              <FormInput
                id={inputId}
                type={type}
                disabled={isSaving}
                {...register(key as any, { required: required ? t("required_field") : false })}
              />
              {error && <FormHelp className="mt-2 text-xs text-red-500">{error.message as string}</FormHelp>}
            </div>
          </div>
        );
      })}

      <div className="pt-4 mt-4 font-medium border-t border-dashed border-slate-300/70 text-[0.94rem] dark:border-darkmode-400">
        {t('settings')}
      </div>

      {selectFields.map(({ key, label, required, options }) => {
        const error = getError(key, errors);
        const selectId = `workspace-${key.replace(".", "-")}`;

        return (
          <div key={key} className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
            <label htmlFor={selectId} className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
              <div className="text-left">
                <div className="flex items-center">
                  <div className="font-medium">{label}</div>
                  {required && (
                    <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200 dark:border-darkmode-200">
                      {t('required')}
                    </div>
                  )}
                </div>
                <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                  {t(`description_${key.split(".")[1]}`) || `Select your preferred ${label.toLowerCase()}.`}
                </div>
              </div>
            </label>

            <div className="flex-1 w-full mt-3 xl:mt-0">
              <Controller
                control={control}
                name={key as any}
                rules={{ required: required ? t("required_field") : false }}
                render={({ field }) => (
                  <FormSelect
                    id={selectId}
                    disabled={isSaving}
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    <option value="">{`Select ${label}`}</option>
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </FormSelect>
                )}
              />
              {error && <FormHelp className="mt-2 text-xs text-red-500">{error.message as string}</FormHelp>}
            </div>
          </div>
        );
      })}

      <div className="flex pt-5 mt-6 border-t border-dashed md:justify-end border-slate-300/70 dark:border-darkmode-400">
        <Button
          variant="outline-primary"
          className="w-full px-4 border-primary/50 md:w-auto dark:border-primary-400/50"
          type="submit"
          disabled={isSaving}
        >
          {isSaving ? t('saving') : t('save_changes')}
        </Button>
      </div>
    </form>
  );
}
