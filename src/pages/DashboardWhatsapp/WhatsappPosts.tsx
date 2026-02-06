import { useState } from "react";
import clsx from "clsx";
import { Tab } from "@/components/Base/Headless";
import Lucide from "@/components/Base/Lucide";
import Breadcrumb from "@/components/Base/Breadcrumb";
import Button from "@/components/Base/Button";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TbPlus } from "react-icons/tb";

// Hooks e Modais
import { useWhatsappTemplates } from "@/hooks/useWhatsappTemplates";
import GenericModal from "@/components/Modals/GenericModal";
import ModalCreateTemplateWhatsapp from "@/components/Modals/ModalCreateTemplateWhatsapp";
import { mapExampleToTemplateData } from "@/components/TemplateWhatsapp/templateHelper";
import MessageSenderTab from "./Tabs/MessageSenderTab";
import TemplateLibraryTab from "./Tabs/TemplateLibraryTab";
import TemplatesListTab from "./Tabs/TemplatesListTab";
import WebhookTab from "./Tabs/WebhookTab";

// Tabs Refatoradas

export default function WhatsappPosts() {
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const connection_id = params.connection_id!;
  
  const [selectedInitialData, setSelectedInitialData] = useState(null);
  const [initialStep, setInitialStep] = useState<number>(1);

  // Hook compartilhado
  const {
    templates,
    loading: templatesLoading,
    selectTemplate,
    selectedTemplate,
  } = useWhatsappTemplates({ connection_id });

  const isCreateModalOpen = searchParams.get("action") === "create";

  const handleOpenModal = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("action", "create");
    setSearchParams(newParams);
  };

  const handleCloseModal = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("action");
    setSearchParams(newParams);
  };

  // Controle de Tabs
  const tabParam = searchParams.get("tab");
  const selectedIndex =
    tabParam === "messages" ? 3 :
    tabParam === "webhook" ? 2 :
    tabParam === "library" ? 1 :
    0;

  const handleTabChange = (index: number) => {
    const newParams = new URLSearchParams(searchParams);
    if (index === 1) newParams.set("tab", "library");
    else if (index === 2) newParams.set("tab", "webhook");
    else if (index === 3) newParams.set("tab", "messages");
    else newParams.delete("tab");
    setSearchParams(newParams);
  };

  const handleSelectTemplateFromLibrary = (exampleTemplate: any) => {
    const formData: any = mapExampleToTemplateData(exampleTemplate);
    setSelectedInitialData(formData);
    setInitialStep(2);
    handleOpenModal();
  };

  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12">
        {/* --- Header e Breadcrumb --- */}
        <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row mb-3">
          <Breadcrumb light className="flex-1 hidden xl:block">
            <Breadcrumb.Link className="dark:before:bg-chevron-white" to={`/workspace/${params?.workspace_id}`}>Home</Breadcrumb.Link>
            <Breadcrumb.Link to={`/workspace/${params?.workspace_id}/connections/${params?.connection_type}`} className="dark:before:bg-chevron-white">WhatsApp</Breadcrumb.Link>
            <Breadcrumb.Link className="dark:before:bg-chevron-white" to={`/workspace/${params?.workspace_id}/connections/${params?.connection_type}/${params?.connection_id}`}>{params?.connection_id}</Breadcrumb.Link>
          </Breadcrumb>
          <Button variant="primary" className="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent dark:group-[.mode--light]:!bg-darkmode-900/30 dark:!box" onClick={() => navigate(`/workspace/${params?.workspace_id}/connections/${params?.connection_type}/${connection_id}/post/create`)}>
            <Lucide icon="PenLine" className="stroke-[1.3] w-4 h-4 mr-2" />
            {t("create_post")}
          </Button>
        </div>

        {/* --- BANNER RESTAURADO --- */}
        <div className="p-1.5 box flex flex-col box--stacked">
          <div className="h-48 relative w-full rounded-[0.6rem] bg-gradient-to-b from-theme-1/95 to-theme-2/95">
            <div className={clsx(["w-full h-full relative overflow-hidden", "before:content-[''] before:absolute before:inset-0 before:bg-texture-white before:-mt-[50rem]", "after:content-[''] after:absolute after:inset-0 after:bg-texture-white after:-mt-[50rem]"])}></div>
            <div className="absolute inset-x-0 top-0 w-32 h-32 mx-auto mt-24">
              <div className="w-full h-full overflow-hidden border-[6px] border-white bg-transparent rounded-full image-fit">
                <img src={"https://cdn-hablla-dev.nyc3.cdn.digitaloceanspaces.com/ws_660c476a7d6dde0750db5e4c/hablla-agent/astenir-832fc737-b675-4ba2-826d-6e287b529142.svghttps://cdn-hablla-dev.nyc3.cdn.digitaloceanspaces.com/ws_660c476a7d6dde0750db5e4c/hablla-agent/astenirLight-e5bb357f-0daa-410e-adc3-c85f6be710a6.svg"} alt="" />
              </div>
              <div className="absolute bottom-0 right-0 w-5 h-5 mb-2.5 mr-2.5 border-2 border-white rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="rounded-[0.6rem] bg-slate-50 dark:bg-black pt-4 pb-6"></div>
        </div>

        {/* --- TABS --- */}
        <Tab.Group className="mt-10" selectedIndex={selectedIndex} onChange={handleTabChange}>
          <div className="flex flex-col 2xl:items-center 2xl:flex-row gap-y-3">
            <Tab.List variant="boxed-tabs" className="flex-col sm:flex-row w-full 2xl:w-auto mr-auto box rounded-[0.6rem] border-slate-200">
              <Tab className="first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current"><Tab.Button className="w-full xl:w-64 py-2.5 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]" as="button">{t("templates")}</Tab.Button></Tab>
              <Tab className="first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current"><Tab.Button className="w-full py-2.5 xl:w-64 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]" as="button">{t("template_library")}</Tab.Button></Tab>
              <Tab className="first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current"><Tab.Button className="w-full xl:w-64 py-2.5 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]" as="button">Webhook</Tab.Button></Tab>
              <Tab className="first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current"><Tab.Button className="w-full xl:w-64 py-2.5 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]" as="button">{t('messages')}</Tab.Button></Tab>
            </Tab.List>
          </div>

          <Tab.Panels className="border border-t-0 rounded-xl shadow-lg 0-mt-px pt-px box box--stacked mt-4">
            
            <Tab.Panel>
              <div className="flex w-full p-4 justify-end">
                <Button variant="primary" onClick={handleOpenModal}>
                  <TbPlus className="stroke-[1.3] w-4 h-4 mr-2" />
                  {t("create_template")}
                </Button>
              </div>
              <TemplatesListTab templates={templates} loading={templatesLoading} />
            </Tab.Panel>

            <Tab.Panel className="p-4">
               <TemplateLibraryTab onSelect={handleSelectTemplateFromLibrary} />
            </Tab.Panel>

            <Tab.Panel className="p-4 box box--stacked rounded-lg">
              <WebhookTab connectionId={connection_id} />
            </Tab.Panel>

            <Tab.Panel className="p-4 box box--stacked rounded-lg">
               <MessageSenderTab 
                 connectionId={connection_id}
                 templates={templates}
                 selectTemplate={selectTemplate}
                 selectedTemplate={selectedTemplate}
               />
            </Tab.Panel>

          </Tab.Panels>
        </Tab.Group>
      </div>

      <GenericModal
        open={isCreateModalOpen}
        onClose={handleCloseModal}
        title={t("create_template")}
        closeOnBackdrop={false}
        subtitle={t("template_creation_description")}
        size="giant"
        content={
          <ModalCreateTemplateWhatsapp 
            initialData={selectedInitialData} 
            initialStep={initialStep} 
            onSuccess={handleCloseModal}
          />
        }
      />
    </div>
  );
}