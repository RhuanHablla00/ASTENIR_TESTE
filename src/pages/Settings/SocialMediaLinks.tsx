import Button from "@/components/Base/Button";
import Lucide from "@/components/Base/Lucide";
import { useTranslation } from "react-i18next";

export default function SocialMediaLinks() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col p-5 box box--stacked">
      <div className="pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">
        {t('social_media_links')}
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
                {t('not_connected')}
              </div>
            </div>
            <div className="flex flex-1 w-full sm:justify-end">
              <Button
                variant="primary"
                className="px-4 bg-primary/5 border-primary/50 text-primary"
              >
                <Lucide
                  icon="UserPlus"
                  className="stroke-[1.3] w-4 h-4 -ml-0.5 mr-2"
                />
                {t('connect')}
              </Button>
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
                <div className="font-medium">Dribbble</div>
              </div>
              <div className="pr-10 mt-1 text-xs leading-relaxed text-slate-500">
                {t('not_connected')}
              </div>
            </div>
            <div className="flex flex-1 w-full sm:justify-end">
              <Button
                variant="primary"
                className="px-4 bg-primary/5 border-primary/50 text-primary"
              >
                <Lucide
                  icon="UserPlus"
                  className="stroke-[1.3] w-4 h-4 -ml-0.5 mr-2"
                />
                {t('connect')}
              </Button>
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
                {/* connected url placeholder */}
              </div>
            </div>
            <div className="flex flex-1 w-full sm:justify-end">
              <Button
                variant="primary"
                className="px-4 bg-primary/5 border-primary/50 text-primary"
              >
                <Lucide
                  icon="Check"
                  className="stroke-[1.3] w-4 h-4 -ml-0.5 mr-2"
                />
                {t('connected')}
              </Button>
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
                {t('not_connected')}
              </div>
            </div>
            <div className="flex flex-1 w-full sm:justify-end">
              <Button
                variant="primary"
                className="px-4 bg-primary/5 border-primary/50 text-primary"
              >
                <Lucide
                  icon="UserPlus"
                  className="stroke-[1.3] w-4 h-4 -ml-0.5 mr-2"
                />
                {t('connect')}
              </Button>
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
                {/* connected url placeholder */}
              </div>
            </div>
            <div className="flex flex-1 w-full sm:justify-end">
              <Button
                variant="primary"
                className="px-4 bg-primary/5 border-primary/50 text-primary"
              >
                <Lucide
                  icon="Check"
                  className="stroke-[1.3] w-4 h-4 -ml-0.5 mr-2"
                />
                {t('connected')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}