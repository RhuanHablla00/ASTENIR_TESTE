import { FormSwitch } from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";
import { useTranslation } from "react-i18next";

export default function ConnectedDevices() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col p-5 box box--stacked">
      <div className="pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">
        {t('connected_services')}
      </div>
      <div>
        <div className="flex items-center pt-2.5 mt-2.5 last:mb-2 first:mt-0 first:pt-0">
          <div>
            <div className="flex items-center justify-center w-10 h-10 ml-2 border rounded-full border-primary/10 bg-primary/10">
              <Lucide
                icon="Linkedin"
                className="stroke-[1.3] w-4 h-4 text-primary fill-primary/10"
              />
            </div>
          </div>
          <div className="flex flex-col sm:items-center ml-5 gap-y-2.5 sm:flex-row w-full">
            <div>
              <div className="flex items-center">
                <div className="font-medium">Linked In</div>
              </div>
              <div className="pr-10 mt-1 text-xs leading-relaxed text-slate-500">
                {t('professional_network_and_career_profile')}
              </div>
            </div>
            <div className="flex flex-1 w-full sm:justify-end">
              <FormSwitch.Input
                id="checkbox-switch-7"
                type="checkbox"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center pt-2.5 mt-2.5 last:mb-2 first:mt-0 first:pt-0">
          <div>
            <div className="flex items-center justify-center w-10 h-10 ml-2 border rounded-full border-primary/10 bg-primary/10">
              <Lucide
                icon="Dribbble"
                className="stroke-[1.3] w-4 h-4 text-primary fill-primary/10"
              />
            </div>
          </div>
          <div className="flex flex-col sm:items-center ml-5 gap-y-2.5 sm:flex-row w-full">
            <div>
              <div className="flex items-center">
                <div className="font-medium">Dribbble</div>
              </div>
              <div className="pr-10 mt-1 text-xs leading-relaxed text-slate-500">
                {t('design_portfolio_and_creative_work')}
              </div>
            </div>
            <div className="flex flex-1 w-full sm:justify-end">
              <FormSwitch.Input
                id="checkbox-switch-7"
                type="checkbox"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center pt-2.5 mt-2.5 last:mb-2 first:mt-0 first:pt-0">
          <div>
            <div className="flex items-center justify-center w-10 h-10 ml-2 border rounded-full border-primary/10 bg-primary/10">
              <Lucide
                icon="Facebook"
                className="stroke-[1.3] w-4 h-4 text-primary fill-primary/10"
              />
            </div>
          </div>
          <div className="flex flex-col sm:items-center ml-5 gap-y-2.5 sm:flex-row w-full">
            <div>
              <div className="flex items-center">
                <div className="font-medium">Facebook</div>
              </div>
              <div className="pr-10 mt-1 text-xs leading-relaxed text-slate-500">
                {t('social_connections_and_personal_updates')}
              </div>
            </div>
            <div className="flex flex-1 w-full sm:justify-end">
              <FormSwitch.Input
                id="checkbox-switch-7"
                type="checkbox"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center pt-2.5 mt-2.5 last:mb-2 first:mt-0 first:pt-0">
          <div>
            <div className="flex items-center justify-center w-10 h-10 ml-2 border rounded-full border-primary/10 bg-primary/10">
              <Lucide
                icon="Instagram"
                className="stroke-[1.3] w-4 h-4 text-primary fill-primary/10"
              />
            </div>
          </div>
          <div className="flex flex-col sm:items-center ml-5 gap-y-2.5 sm:flex-row w-full">
            <div>
              <div className="flex items-center">
                <div className="font-medium">Instagram</div>
              </div>
              <div className="pr-10 mt-1 text-xs leading-relaxed text-slate-500">
                {t('visual_stories_and_photos')}
              </div>
            </div>
            <div className="flex flex-1 w-full sm:justify-end">
              <FormSwitch.Input
                id="checkbox-switch-7"
                type="checkbox"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center pt-2.5 mt-2.5 last:mb-2 first:mt-0 first:pt-0">
          <div>
            <div className="flex items-center justify-center w-10 h-10 ml-2 border rounded-full border-primary/10 bg-primary/10">
              <Lucide
                icon="Twitter"
                className="stroke-[1.3] w-4 h-4 text-primary fill-primary/10"
              />
            </div>
          </div>
          <div className="flex flex-col sm:items-center ml-5 gap-y-2.5 sm:flex-row w-full">
            <div>
              <div className="flex items-center">
                <div className="font-medium">Twitter</div>
              </div>
              <div className="pr-10 mt-1 text-xs leading-relaxed text-slate-500">
                {t('microblogging_and_real_time_updates')}
              </div>
            </div>
            <div className="flex flex-1 w-full sm:justify-end">
              <FormSwitch.Input
                id="checkbox-switch-7"
                type="checkbox"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}