import clsx from "clsx";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import { useCreateTemplate } from "@/hooks/useCreateTemplate";
import StepCategory from "../TemplateWhatsapp/StepCategory";
import StepContent from "../TemplateWhatsapp/StepContent";
import TemplatePreview from "../TemplateWhatsapp/TemplatePreview";
import { showSuccessNotification } from "../Base/Notification";
import { TemplateData } from "../TemplateWhatsapp/templateTypes";

interface ModalCreateTemplateWhatsappProps {
  initialData?: TemplateData | null;
  initialStep?: number;
  onSuccess?: () => void;
}

export default function ModalCreateTemplateWhatsapp({ initialData = null, initialStep = 1, onSuccess }: ModalCreateTemplateWhatsappProps) {
  const {
    currentStep,
    steps,
    templateData,
    updateTemplateData,
    form,
    refs,
    variables,
    handlers,
    creatingTemplate,
    validationErrors,
    t,
    buttonActions,
    submitTemplate
  } = useCreateTemplate({ initialData, initialStep });

  const { handleSubmit } = form;

  const onSubmit = async () => {
    try {
      const result = await submitTemplate();
      if (result && onSuccess) {
        onSuccess();
        showSuccessNotification(t('template_created_successfully'))
      }
    } catch (error) {
      console.error("Erro ao criar:", error);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12">
        <div className="flex flex-col gap-y-2 lg:items-center lg:flex-row">
          {steps.map((step, index, arr) => (
            <div
              key={step.id}
              className={clsx([
                "flex items-center lg:justify-center flex-1 lg:first:justify-start lg:last:justify-end group",
                "after:hidden before:hidden after:lg:block before:lg:block",
                index === 0
                  ? "first:after:content-[''] first:after:w-full first:after:bg-slate-300/60 first:after:h-[2px] first:after:ml-5 group-[.mode--light]:first:after:bg-slate-300/20"
                  : "",
                index === arr.length - 1
                  ? "last:before:content-[''] last:before:w-full last:before:bg-slate-300/60 last:before:h-[2px] last:before:mr-5 group-[.mode--light]:last:before:bg-slate-300/20"
                  : "",
                index > 0 && index < arr.length - 1
                  ? "after:content-[''] after:w-full after:bg-slate-300/60 after:h-[2px] after:ml-5 group-[.mode--light]:after:bg-slate-300/20 before:content-[''] before:w-full before:bg-slate-300/60 before:h-[2px] before:mr-5 group-[.mode--light]:before:bg-slate-300/20"
                  : "",
                currentStep >= step.id ? "active" : "",
              ])}
            >
              <div className="flex items-center">
                <div
                  className={clsx([
                    "bg-white border rounded-full flex items-center justify-center w-10 h-10",
                    "group-[.active]:bg-primary group-[.active]:text-white",
                    "group-[.mode--light]:!bg-transparent",
                    "group-[.mode--light]:!text-slate-200",
                    "group-[.mode--light]:!border-white/[0.25]",
                    "[.group.mode--light_.group.active_&]:!bg-white/[0.12]",
                    "[.group.mode--light_.group.active_&]:!border-white/[0.15]",
                    "dark:[.group.mode--light_.group.active_&]:!bg-darkmode-800/30",
                    "dark:[.group.mode--light_.group.active_&]:!border-white/10",
                    "dark:group-[.mode--light]:!border-white/10",
                    "dark:bg-transparent"
                  ])}
                >
                  {step.id}
                </div>
                <div
                  className={clsx([
                    "ml-3.5 font-medium whitespace-nowrap",
                    "text-slate-500",
                    "group-[.active]:text-current",
                    "group-[.mode--light]:!text-slate-300",
                    "[.group.mode--light_.group.active_&]:!text-slate-100"
                  ])}
                >
                  {step.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-7">
          <div className="flex flex-col xl:flex-row gap-4 pb-7 w-full">
            <div className="flex-1 min-w-0">
              {currentStep === 1 && (
                <StepCategory data={templateData} update={updateTemplateData} handlers={handlers} />
              )}
              {currentStep === 2 && (
                <StepContent
                  validationErrors={validationErrors}
                  form={form}
                  data={templateData}
                  update={updateTemplateData}
                  refs={refs}
                  handlers={handlers}
                  variables={variables}
                  buttonActions={buttonActions}
                />
              )}
            </div>

            <TemplatePreview data={templateData} />
          </div>

          <div className="flex w-full justify-end gap-4">
            <div>
              {currentStep === 2 && (
                <Button
                  type="button"
                  variant="outline-secondary"
                  className="px-6"
                  onClick={handlers.handlePrev}
                >
                  {t('previous')}
                </Button>
              )}
            </div>

            {currentStep < steps.length ? (
              <Button
                type="button"
                variant="primary"
                className="px-6"
                onClick={handlers.handleNext}
                disabled={currentStep === 2}
              >
                {t('next')}
                <Lucide icon="ArrowRight" className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                className="px-6"
                disabled={creatingTemplate}
              >
                {creatingTemplate ? (
                  <Lucide icon="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Lucide icon="CheckCircle" className="w-4 h-4 mr-2" />
                )}
                {creatingTemplate ? t('creating_template') : t('finish_creation')}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}