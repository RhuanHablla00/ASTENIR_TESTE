import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import clsx from "clsx";

import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import { FormInput, FormHelp } from "@/components/Base/Form";
import { useAuthenticateMetaApiMutation, UseCaseType, useCreateFanpageAndInstagramConnectionApiMutation, useGetAllConnectionsQuery } from "@/api/connectionsApi";
import { useAppSelector } from "@/stores/hooks";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { showSuccessNotification } from "../Base/Notification";

declare global {
  interface Window {
    FB: any;
  }
}

export default function ModalCreateConnectionInstagram({ onSuccess, }: { onSuccess: () => void; }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [fbSdkLoaded, setFbSdkLoaded] = useState(false);
  const [fbConnected, setFbConnected] = useState(false);
  const [pagesLoading, setPagesLoading] = useState(false);
  const [authenticateMeta, { data }] = useAuthenticateMetaApiMutation();
  const workspace = useAppSelector((state) => state.workspace?.selectedWorkspace?.id);
  const params = useParams();
  const { t } = useTranslation();
  const [createMetaConnection, { isLoading, isSuccess, isError }] = useCreateFanpageAndInstagramConnectionApiMutation();

  const form = useForm({
    defaultValues: {
      connectionName: "",
    },
  });

  const {
    register,
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = form;

  const steps = [
    { id: 1, label: t('connection_name') },
    { id: 2, label: t('connect_meta_account') },
    { id: 3, label: t('conclusion') },
  ];

  const totalSteps = steps.length;


  const handleNext = async (e: React.MouseEvent) => {
    e.preventDefault();
    let isValid = false;
    if (currentStep === 1) {
      isValid = await trigger("connectionName");
    }

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [selectedCatalogs, setSelectedCatalogs] = useState<string[]>([]);
  const [selectedPixels, setSelectedPixels] = useState<string[]>([]);
  const [selectedAdAccounts, setSelectedAdAccounts] = useState<string[]>([]);

  const togglePageSelection = (pageId: string) => {
    setSelectedPages(prev =>
      prev.includes(pageId)
        ? prev?.filter(id => id !== pageId)
        : [...prev, pageId]
    );
  };
  const toggleCatalogSelection = (catalogId: string) => {
    setSelectedCatalogs(prev =>
      prev.includes(catalogId)
        ? prev?.filter(id => id !== catalogId)
        : [...prev, catalogId]
    );
  };
  const togglePixelSelection = (pixelId: string) => {
    setSelectedPixels(prev =>
      prev.includes(pixelId)
        ? prev?.filter(id => id !== pixelId)
        : [...prev, pixelId]
    );
  };
  const toggleAdAccountSelection = (id: string) => {
    setSelectedAdAccounts(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };


  useEffect(() => {
    if (currentStep === 2 && !fbSdkLoaded) {
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/pt_BR/sdk.js";
      script.async = true;
      script.onload = () => {
        window.FB.init({
          appId: "1013969894244814",
          cookie: true,
          xfbml: true,
          version: 'v23.0',
        });
        setFbSdkLoaded(true);
      };
      document.body.appendChild(script);
    }
  }, [currentStep, fbSdkLoaded]);


  const handleFormSubmit = async (formData: any) => {
    try {
      const finalData = { ...data, ...formData, workspace, selectedPages, selectedPixels, selectedCatalogs, selectedAdAccounts };

      const formattedPages = finalData.pages.filter((page: any) => finalData.selectedPages.includes(page.page_id))
        .map((page: any) => ({ id: page.page_id, name: `${finalData.connectionName} - ${page.page_name}` }));

      const formattedAdAccounts = finalData.selectedAdAccounts.map((id: string) => ({ id }));
      const formattedPixels = finalData.selectedPixels.map((id: string) => ({ id }));
      const formattedCatalogs = finalData.selectedCatalogs.map((id: string) => ({ id }));

      const body = {
        token: finalData.token,
        pages: formattedPages,
        ad_accounts: formattedAdAccounts,
        pixels: formattedPixels,
        product_catalogs: formattedCatalogs,
      };

      await createMetaConnection({ body }).unwrap();

      showSuccessNotification(t("connection_created_successfully"));
      onSuccess();
    } catch (err) {
      console.error("Erro ao criar conexão:", err);
    }
  };



  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12">
        <div className="flex flex-col mb-10 gap-y-2 lg:items-center lg:flex-row">
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

        <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-7">

          {isError && <div className="p-4 mb-2 text-white bg-red-500 rounded-t-md">{isError}</div>}
          {isSuccess && <div className="p-4 mb-2 text-white bg-green-500 rounded-t-md">{isSuccess}</div>}

          <div className="pb-7">
            {currentStep === 1 && (
              <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                  <div className="text-left">
                    <div className="flex items-center">
                      <div className="font-medium">{t('connection_name')}</div>
                      <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                        {t('required')}
                      </div>
                    </div>
                    <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                      {t('connection_name_description')}
                    </div>
                  </div>
                </label>
                <div className="flex-1 w-full mt-3 xl:mt-0">
                  <FormInput
                    {...register("connectionName", { required: t('name_is_required') })}
                    className={clsx({ "border-danger": errors.connectionName })}
                    placeholder={`Ex: ${t("my_instagram_connection")}`}
                  />
                  {errors.connectionName && <FormHelp className="text-danger">{errors.connectionName.message}</FormHelp>}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="animate-[fadeIn_0.4s_ease-in-out] flex flex-col items-center justify-center pb-8">
                <div className="mb-4 text-center text-slate-600 dark:text-slate-400 max-w-md">
                  {t('login_facebook_description')}
                </div>

                <div className="w-full max-w-xs">
                  <Button
                    type="button"
                    variant="outline-primary"
                    className="w-full"
                    onClick={() => {
                      window.FB.login((response: any) => {
                        setPagesLoading(true);

                        if (response.authResponse && response.status === "connected") {
                          const code = response.authResponse.code;
                          setFbConnected(true);

                          if (code) {
                            setCurrentStep(3);
                            setPagesLoading(true);

                            authenticateMeta({ code, scope: 'INSTAGRAM' })
                              .unwrap()
                              .then((result) => {
                              })
                              .catch((err) => {
                              })
                              .finally(() => {
                                setPagesLoading(false);
                              });
                          }
                        }
                        else {
                          setFbConnected(false);
                        }
                      }, {
                        config_id: "850845250684693",
                        response_type: "code",
                        override_default_response_type: true,
                      });
                    }}
                  >
                    {t('connect_with_facebook')}
                  </Button>

                </div>
              </div>
            )}


            {currentStep === 3 && (
              <div className="animate-[fadeIn_0.4s_ease-in-out] space-y-8">
                <div className="mb-4">
                  <h2 className="text-[1rem] font-semibold text-slate-700 dark:text-slate-300">
                    {t('select_desired_items')}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {t('select_desired_items_to_finish_creating_the_connection')}
                  </p>
                </div>

                {pagesLoading && (
                  <div className="text-center text-slate-600 dark:text-slate-400">
                    {t('loading_pages')}...
                  </div>
                )}

                {!pagesLoading && (

                  <>
                    <section>
                      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                        {t('pages')}
                      </h3>

                      {data?.pages?.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                          {data.pages.map((page: any) => {
                            const isSelected = selectedPages.includes(page.page_id);

                            return (
                              <div
                                key={page.page_id}
                                onClick={() => togglePageSelection(page.page_id)}
                                className={clsx(
                                  "p-4 border rounded-md shadow-sm bg-white dark:bg-darkmode-800 cursor-pointer relative transition-all duration-200",
                                  isSelected
                                    ? "border-2 border-primary shadow-lg"
                                    : "border-slate-200 dark:border-darkmode-600"
                                )}
                              >
                                {isSelected && (
                                  <div className="absolute top-2 right-2 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                                    ✓
                                  </div>
                                )}

                                <div className="relative w-20 h-12 mb-3 flex items-center">
                                  <img
                                    src={page.ig_profile_picture}
                                    alt={page.ig_user_name}
                                    className="w-12 h-12 rounded-full object-cover"
                                  />
                                </div>

                                <div className="font-semibold text-sm text-slate-700 dark:text-slate-300">
                                  Instagram: {page.ig_user_name}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {t('no_pages_founded')}
                        </div>
                      )}
                    </section>

                    <section>
                      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                        {t('product_catalogs')}
                      </h3>

                      {data?.product_catalogs?.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                          {data.product_catalogs.map((catalog: any) => {
                            const isSelected = selectedCatalogs.includes(catalog.id);

                            return (
                              <div
                                key={catalog.id}
                                onClick={() => toggleCatalogSelection(catalog.id)}
                                className={clsx(
                                  "p-4 border rounded-md shadow-sm bg-white dark:bg-darkmode-800 cursor-pointer relative transition-all",
                                  isSelected
                                    ? "border-2 border-primary shadow-lg"
                                    : "border-slate-200 dark:border-darkmode-600"
                                )}
                              >
                                {isSelected && (
                                  <div className="absolute top-2 right-2 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                                    ✓
                                  </div>
                                )}

                                <div className="font-semibold text-sm text-slate-700 dark:text-slate-300">
                                  🛒 {catalog.name}
                                </div>

                                <div className="text-xs text-slate-500 mt-1">
                                  ID: {catalog.id}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {t('no_catalogs_found')}
                        </div>
                      )}
                    </section>

                    <section>
                      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                        {t('pixels')}
                      </h3>

                      {data?.pixels?.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                          {data.pixels.map((pixel: any) => {
                            const isSelected = selectedPixels.includes(pixel.id);

                            return (
                              <div
                                key={pixel.id}
                                onClick={() => togglePixelSelection(pixel.id)}
                                className={clsx(
                                  "p-4 border rounded-md shadow-sm bg-white dark:bg-darkmode-800 cursor-pointer relative transition-all",
                                  isSelected
                                    ? "border-2 border-primary shadow-lg"
                                    : "border-slate-200 dark:border-darkmode-600"
                                )}
                              >
                                {isSelected && (
                                  <div className="absolute top-2 right-2 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                                    ✓
                                  </div>
                                )}

                                <div className="font-semibold text-sm text-slate-700 dark:text-slate-300">
                                  📊 {pixel.name}
                                </div>

                                <div className="text-xs text-slate-500 mt-1">
                                  ID: {pixel.id}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {t('no_pixels_found')}
                        </div>
                      )}
                    </section>

                    <section>
                      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                        {t('ad_accounts')}
                      </h3>

                      {data?.ad_accounts?.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                          {data.ad_accounts.map((account: any) => {
                            const isSelected = selectedAdAccounts.includes(account.id);

                            return (
                              <div
                                key={account.id}
                                onClick={() => toggleAdAccountSelection(account.id)}
                                className={clsx(
                                  "p-4 border rounded-md shadow-sm bg-white dark:bg-darkmode-800 cursor-pointer relative transition-all",
                                  isSelected
                                    ? "border-2 border-primary shadow-lg"
                                    : "border-slate-200 dark:border-darkmode-600"
                                )}
                              >
                                {isSelected && (
                                  <div className="absolute top-2 right-2 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                                    ✓
                                  </div>
                                )}

                                <div className="font-semibold text-sm text-slate-700 dark:text-slate-300">
                                  💼 {account.name}
                                </div>

                                <div className="text-xs text-slate-500 mt-1">
                                  ID: {account.id}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {t('no_ad_accounts_found')}
                        </div>
                      )}
                    </section>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex w-full justify-end gap-4">
            <div>
              {currentStep === 2 && (
                <Button
                  type="button"
                  variant="outline-secondary"
                  className="px-6"
                  onClick={handlePrev}
                  disabled={pagesLoading}
                >
                  {t('previous')}
                </Button>
              )}
            </div>

            {currentStep < totalSteps ? (
              <Button
                type="button"
                variant="primary"
                className="px-6"
                onClick={handleNext}
                disabled={currentStep === 2 && !fbConnected}
              >
                {t('next')}
                <Lucide icon="ArrowRight" className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                className="px-6"
                disabled={isLoading || pagesLoading || selectedPages.length === 0}
              >
                {isLoading ? (
                  <Lucide icon="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Lucide icon="CheckCircle" className="w-4 h-4 mr-2" />
                )}

                {t('finish_creation')}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}