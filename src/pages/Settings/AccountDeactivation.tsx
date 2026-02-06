import Button from "@/components/Base/Button";
import { FormCheck } from "@/components/Base/Form";
import { useTranslation } from "react-i18next";

export default function AccountDeactivation() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col p-5 box box--stacked">
      <div className="flex items-center pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">
        {t('account_deactivation')}
      </div>
      <div>
        <div className="leading-relaxed">
          {t('account_deactivation_message')}
        </div>
        <FormCheck className="mt-5">
          <FormCheck.Input
            id="checkbox-switch-1"
            type="checkbox"
            value=""
          />
          <FormCheck.Label htmlFor="checkbox-switch-1">
            {t('account_deactivation_confirmation')}
          </FormCheck.Label>
        </FormCheck>
      </div>
      <div className="flex flex-col-reverse gap-3 pt-5 mt-6 border-t border-dashed md:flex-row md:justify-end border-slate-300/70">
        <Button
          variant="outline-secondary"
          className="w-full px-4 md:w-auto"
        >
          {t('learn_more')}
        </Button>
        <Button
          variant="outline-danger"
          className="w-full px-4 border-danger/50 bg-danger/5 md:w-auto"
        >
          {t('delete')}
        </Button>
      </div>
    </div>
  )
}