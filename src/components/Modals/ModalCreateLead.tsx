import { clsx } from "clsx";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import { FormInput, FormLabel, FormHelp, FormCheck } from "@/components/Base/Form";
import { useAppSelector } from "@/stores/hooks";
import { useTranslation } from "react-i18next";
import { useLeadForm } from "@/hooks/useLeads";
import { TbPlus } from "react-icons/tb";
import { Lead } from "@/api/leadApi";

interface ModalCreateLeadProps {
  onSuccess: () => void;
  onCancel?: () => void;
  initialData?: Lead | null;
}

export default function ModalCreateLead({ onSuccess, onCancel, initialData }: ModalCreateLeadProps) {
  const { t } = useTranslation();
  
  const workspaceId = useAppSelector((state) => state.workspace?.selectedWorkspace?.id);

  const {
    form: {
      register,
      formState: { errors },
    },
    phonesFieldArray,
    emailsFieldArray,
    handleSubmit,
    isSaving,
    submitError,
  } = useLeadForm({
    workspaceId: workspaceId!,
    initialData,
    onSuccess,
  });

  return (
    <div className="grid grid-cols-12 gap-y-4 gap-x-6">
      <div className="col-span-12">
        
        {submitError && (
          <div className="p-4 mb-4 text-white bg-red-500 rounded-md flex items-center animate-[fadeIn_0.3s_ease-in-out]">
            <Lucide icon="AlertTriangle" className="w-5 h-5 mr-2" />
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-2">
          <div className="mb-6">
            <FormLabel htmlFor="lead-name" className="font-medium text-slate-700 dark:text-slate-300">
              {t('name')} <span className="text-red-500">*</span>
            </FormLabel>
            <FormInput
              id="lead-name"
              {...register("name")}
              className={clsx({ "border-danger": errors.name })}
              placeholder={t('ex_joao_silva')}
              autoFocus
            />
            {errors.name && <FormHelp className="text-danger">{errors.name.message}</FormHelp>}
          </div>

          <div className="w-full border-t border-slate-200/60 dark:border-darkmode-400 my-6"></div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-base text-slate-700 dark:text-slate-300 flex items-center">
                <Lucide icon="Phone" className="w-4 h-4 mr-2" />
                {t('phone')}
              </h3>
              <Button
                type="button"
                variant="outline-secondary"
                size="sm"
                onClick={() => phonesFieldArray.append({ phone: "", is_whatsapp: false })}
                className="flex items-center text-xs"
              >
                <TbPlus className="stroke-[1.3] w-4 h-4 mr-2" />
                {t('add_phone')}
              </Button>
            </div>

            <div className="space-y-3">
              {phonesFieldArray.fields.map((field, index) => (
                <div key={field.id} className="p-3 border rounded-md border-slate-200 dark:border-darkmode-600 bg-slate-50 dark:bg-darkmode-800 animate-[fadeIn_0.3s_ease-in-out]">
                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    
                    <div className="flex-1 w-full">
                      <FormInput
                        {...register(`phones.${index}.phone` as const)}
                        placeholder="5511999999999"
                        className={clsx({ "border-danger": errors.phones?.[index]?.phone })}
                      />
                      {errors.phones?.[index]?.phone && (
                        <FormHelp className="text-danger">{errors.phones?.[index]?.phone?.message}</FormHelp>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-2 sm:pt-0 min-w-[100px]">
                      <FormCheck.Input
                        id={`phones.${index}.is_whatsapp`}
                        type="checkbox"
                        {...register(`phones.${index}.is_whatsapp` as const)}
                        className="border-slate-300"
                      />
                      <FormLabel htmlFor={`phones.${index}.is_whatsapp`} className="mb-0 cursor-pointer text-sm text-slate-600 dark:text-slate-400 select-none">
                        WhatsApp
                      </FormLabel>
                    </div>

                    <Button
                      variant="outline-danger"
                      className="flex items-center gap-2"
                      onClick={() => phonesFieldArray.remove(index)}
                      tabIndex={-1}
                    >
                      <Lucide icon="Trash2" className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {phonesFieldArray.fields.length === 0 && (
                 <div className="text-slate-400 text-sm text-center py-4 italic border border-dashed rounded-md">
                    {t('no_phones_added')}
                 </div>
              )}
            </div>
          </div>

          <div className="w-full border-t border-slate-200/60 dark:border-darkmode-400 my-6"></div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-base text-slate-700 dark:text-slate-300 flex items-center">
                <Lucide icon="Mail" className="w-4 h-4 mr-2" />
                Email
              </h3>
              <Button
                type="button"
                variant="outline-secondary"
                size="sm"
                onClick={() => emailsFieldArray.append({ email: "", subscribed: false })}
                className="flex items-center text-xs"
              >
                <TbPlus className="stroke-[1.3] w-4 h-4 mr-2" />
                {t('add_email')}
              </Button>
            </div>

            <div className="space-y-3">
              {emailsFieldArray.fields.map((field, index) => (
                <div key={field.id} className="p-3 border rounded-md border-slate-200 dark:border-darkmode-600 bg-slate-50 dark:bg-darkmode-800 animate-[fadeIn_0.3s_ease-in-out]">
                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    
                    <div className="flex-1 w-full">
                      <FormInput
                        {...register(`emails.${index}.email` as const)}
                        placeholder="email@company.com"
                        className={clsx({ "border-danger": errors.emails?.[index]?.email })}
                      />
                      {errors.emails?.[index]?.email && (
                        <FormHelp className="text-danger">{errors.emails?.[index]?.email?.message}</FormHelp>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-2 sm:pt-0 min-w-[100px]">
                      <FormCheck.Input
                        id={`emails.${index}.subscribed`}
                        type="checkbox"
                        {...register(`emails.${index}.subscribed` as const)}
                        className="border-slate-300"
                      />
                      <FormLabel htmlFor={`emails.${index}.subscribed`} className="mb-0 cursor-pointer text-sm text-slate-600 dark:text-slate-400 select-none">
                        {t('subscribed')}
                      </FormLabel>
                    </div>

                    <Button
                      variant="outline-danger"
                      className="flex items-center gap-2"
                      onClick={() => emailsFieldArray.remove(index)}
                      tabIndex={-1}
                    >
                      <Lucide icon="Trash2" className="w-4 h-4" />
                    </Button>

                  </div>
                </div>
              ))}
               {emailsFieldArray.fields.length === 0 && (
                 <div className="text-slate-400 text-sm text-center py-4 italic border border-dashed rounded-md">
                    {t('no_emails_added')}
                 </div>
              )}
            </div>
          </div>

          <div className="flex w-full justify-end gap-4 mt-8 pt-4 border-t border-slate-200 dark:border-darkmode-400 sticky bottom-0 bg-white dark:bg-darkmode-700 py-2">
            <Button
              type="button"
              variant="outline-secondary"
              className="px-6"
              onClick={onCancel}
              disabled={isSaving}
            >
              {t('cancel')}
            </Button>

            <Button
              type="submit"
              variant="primary"
              className="px-6 min-w-[140px]"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Lucide icon="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                  {t('saving')}...
                </>
              ) : (
                <>
                  <Lucide icon="CheckCircle" className="w-4 h-4 mr-2" />
                  {initialData ? t('save') : t('create')}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}