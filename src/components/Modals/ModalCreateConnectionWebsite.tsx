import { useForm } from "react-hook-form";
import clsx from "clsx";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import { FormInput, FormHelp } from "@/components/Base/Form";
import { useCreateWebsiteConnectionApiMutation } from "@/api/connectionsApi";
import { useAppSelector } from "@/stores/hooks";
import { useTranslation } from "react-i18next";
import { showErrorNotification, showSuccessNotification } from "../Base/Notification";

interface CreateWebsiteForm {
  name: string;
  website: string;
}

export default function ModalCreateConnectionWebsite({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { t } = useTranslation();
  const workspaceId = useAppSelector((state) => state.workspace?.selectedWorkspace?.id);

  const [createWebsiteConnection, { isLoading }] = useCreateWebsiteConnectionApiMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWebsiteForm>();

  const handleFormSubmit = async (formData: CreateWebsiteForm) => {
    try {
      if (!workspaceId) throw new Error("Workspace ID is missing");

      const body = {
        name: formData.name,
        website: formData.website,
      };

      await createWebsiteConnection({ body }).unwrap();

      showSuccessNotification(t("connection_created_successfully"));
      onSuccess();
    } catch (err: any) {
      console.error("Erro ao criar conexão:", err);
      showErrorNotification(t(`errors:${err?.data?.error_code}`) || "Erro ao criar conexão");
    }
  };

  // Componente auxiliar para o Label + Badge + Descrição (coluna da esquerda)
  const FieldLabel = ({ label, required, description }: { label: string, required?: boolean, description?: string }) => (
    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
      <div className="text-left">
        <div className="flex items-center">
          <div className="font-medium">{label}</div>
          {required && (
            <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
              {t('required')}
            </div>
          )}
        </div>
        {description && (
          <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
            {description}
          </div>
        )}
      </div>
    </label>
  );

  return (
    <div className="">
      <div className="mb-8">
        <h2 className="text-lg font-medium mr-auto">
          {t('connect_website')}
        </h2>
        <p className="text-slate-500 text-xs mt-1">
          {t('fill_details_below_to_connect_website')}
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)}>

        {/* CAMPO: NOME */}
        <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
          <FieldLabel
            label={t('connection_name')}
            required
            description={t('connection_name_description')}
          />
          <div className="flex-1 w-full mt-3 xl:mt-0">
            <FormInput
              {...register("name", { required: t('name_is_required') })}
              className={clsx({ "border-danger": errors.name })}
              placeholder={`Ex: ${t("my_website_connection")}`}
            />
            {errors.name && <FormHelp className="text-danger">{errors.name.message}</FormHelp>}
          </div>
        </div>

        {/* CAMPO: website */}
        <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row">
          <FieldLabel
            label={t('website_url')}
            required
            description={t('website_url_description')}
          />
          <div className="flex-1 w-full mt-3 xl:mt-0">
            <FormInput
              {...register("website", {
                required: t('url_is_required'),
                pattern: {
                  value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                  message: t('invalid_url_format')
                }
              })}
              className={clsx({ "border-danger": errors.website })}
              placeholder="Ex: https://meusite.com.br"
            />
            {errors.website ? (
              <FormHelp className="text-danger">{errors.website.message}</FormHelp>
            ) : (
              <FormHelp className="text-slate-500">{t('ensure_url_starts_with_http')}</FormHelp>
            )}
          </div>
        </div>

        {/* BOTÃO SALVAR */}
        <div className="flex justify-end pt-10">
          <Button
            type="submit"
            variant="primary"
            className="w-full sm:w-auto px-6"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Lucide icon="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                {t("saving")}...
              </>
            ) : (
              <>
                <Lucide icon="CheckCircle" className="w-4 h-4 mr-2" />
                {t("create_connection")}
              </>
            )}
          </Button>
        </div>

      </form>
    </div>
  );
}