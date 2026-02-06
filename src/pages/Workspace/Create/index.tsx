import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import clsx from "clsx";

import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import { FormInput, FormHelp, FormSelect } from "@/components/Base/Form";
import TomSelect from "@/components/Base/TomSelect";
import { useWorkspaceCreateForm } from "@/hooks/useWorkspaceForms";
import { useTranslation } from "react-i18next";
import ModalCreateConnectionInstagram from "@/components/Modals/ModalCreateConnectionInstagram";
import ModalCreateConnectionWhatsapp from "@/components/Modals/ModalCreateConnectionWhatsApp";
import GenericModal from "@/components/Modals/GenericModal";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/stores/hooks";
import timezones from "@/utils/timezones";
import countries from "@/utils/countries";
import currencies from "@/utils/currencies";
import { TbBrandWhatsapp } from "react-icons/tb";

const countriesData = [
  { name: "Brazil", code: "BR", timezone: "America/Sao_Paulo", currency: "BRL" },
  { name: "United States", code: "US", timezone: "America/New_York", currency: "USD" },
  { name: "Portugal", code: "PT", timezone: "Europe/Lisbon", currency: "EUR" },
];

type ArchitectureType = "whatsapp" | "website" | "instagram" | "scratch" | null;

function WorkspaceCreate() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 4;
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [selectedArchitecture, setSelectedArchitecture] = useState<ArchitectureType>(() => {
    const saved = localStorage.getItem("selectedArchitecture");
    return (saved as ArchitectureType) || null;
  });

  const [connectionType, setConnectionType] = useState<"instagram" | "whatsapp">("instagram");
  const workspace = useAppSelector((state) => state.workspace.selectedWorkspace?.id);
  const navigate = useNavigate();

  const {
    form,
    handleSubmit,
    validateStep,
    isSaving,
    submitError,
    submitSuccess
  } = useWorkspaceCreateForm();

  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const selectedCountry = watch("country");

  useEffect(() => {
    if (selectedCountry) {
      const cData = countriesData.find((c) => c.name === selectedCountry);
      if (cData) {
        setValue("timezone", cData.timezone);
        setValue("currency", cData.currency);
      }
    }
  }, [selectedCountry, setValue]);

  useEffect(() => {
    if (submitSuccess && currentStep === 3) {
      setCurrentStep(4);
    }
  }, [submitSuccess, currentStep]);

  const handleNext = async (e: React.MouseEvent) => {
    e.preventDefault();

    const isValid = await validateStep(currentStep);
    if (!isValid) return;

    if (currentStep === 3) {
      handleSubmit();
      return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFinishSetup = () => {
    localStorage.setItem("@astenir.usage_type", selectedArchitecture!);

    navigate(`/workspace/${workspace}`)
  };

  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12 sm:col-span-10 sm:col-start-2">
        <div className="flex flex-col mb-10 gap-y-2 lg:items-center lg:flex-row">
          {[
            { id: 1, label: t("company_essentials") },
            { id: 2, label: t("location_and_contact") },
            { id: 3, label: t("regional_settings") },
            { id: 4, label: t('connect_your_accounts') },
          ].map((step, index, arr) => (
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

        <form onSubmit={handleSubmit} className="mt-7">
          <div className="flex flex-col shadow-md box box--stacked">

            {submitError && <div className="p-4 mb-2 text-white bg-red-500 rounded-t-md">{submitError}</div>}
            {submitSuccess && <div className="p-4 mb-2 text-white bg-green-500 rounded-t-md">{t('workspace_created_successfully')}</div>}

            <div className="p-7">
              {currentStep === 1 && (
                <div className="animate-[fadeIn_0.4s_ease-in-out]">
                  <div className="pb-5 mb-6 text-[0.94rem] font-medium border-b border-dashed border-slate-300/70">
                    {t('company_essentials')}
                  </div>

                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">{t('workspace_name')}</div>
                          <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                            {t('required')}
                          </div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                          {t('workspace_name_description')}
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <FormInput
                        {...register("name")}
                        className={clsx({ "border-danger": errors.name })}
                        placeholder="e.g. Acme Corporation"
                      />
                      {errors.name && <FormHelp className="text-danger">{errors.name.message}</FormHelp>}
                    </div>
                  </div>

                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">{t('workspace_description')}</div>
                          <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                            {t('required')}
                          </div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                          {t('workspace_description_description')}
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <FormInput
                        {...register("description")}
                        className={clsx({ "border-danger": errors.name })}
                        placeholder="e.g. Acme Corporation"
                      />
                      {errors.name && <FormHelp className="text-danger">{errors.name.message}</FormHelp>}
                    </div>
                  </div>

                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">{t('business_email')}</div>
                          <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                            {t('required')}
                          </div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                          {t('business_email_description')}
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <FormInput
                        {...register("business_email")}
                        className={clsx({ "border-danger": errors.business_email })}
                        placeholder="admin@company.com"
                      />
                      {errors.business_email && <FormHelp className="text-danger">{errors.business_email.message}</FormHelp>}
                    </div>
                  </div>

                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Website</div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                          {t('website_description')}
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <FormInput
                        {...register("website")}
                        className={clsx({ "border-danger": errors.website })}
                        placeholder="https://hablla.com"
                      />
                      {errors.website && <FormHelp className="text-danger">{errors.website.message}</FormHelp>}
                    </div>
                  </div>

                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">{t('industry')}</div>
                          <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                            {t('required')}
                          </div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                          {t('industry_description')}
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <Controller
                        name="industry"
                        control={control}
                        render={({ field }) => (
                          <FormSelect
                            {...field}
                            value={field.value || ""}
                            className={clsx({ "border-danger": errors.industry })}
                          >
                            <option value="">{t('select_an_industry')}</option>
                            <option value="tech">{t('technology_saaS')}</option>
                            <option value="retail">{t('retail_ecommerce')}</option>
                            <option value="finance">{t('finance_banking')}</option>
                            <option value="health">{t('healthcare')}</option>
                            <option value="other">{t('other')}</option>
                          </FormSelect>
                        )}
                      />
                      {errors.industry && <FormHelp className="text-danger">{errors.industry.message}</FormHelp>}
                    </div>
                  </div>

                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">{t('type')}</div>
                          <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                            {t('required')}
                          </div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                          {t('workspace_type')}
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                          <FormSelect
                            {...field}
                            value={field.value || "default"}
                            className={clsx({ "border-danger": errors.type })}
                          >
                            <option value="franchise">{t('franchise')}</option>
                            <option value="agency">{t('agency')}</option>
                            <option value="default">{t('default')}</option>
                          </FormSelect>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="animate-[fadeIn_0.4s_ease-in-out]">
                  <div className="pb-5 mb-6 text-[0.94rem] font-medium border-b border-dashed border-slate-300/70">
                    {t('location_and_details')}
                  </div>

                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">{t('country')}</div>
                          <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                            {t('required')}
                          </div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                          {t('country_description')}
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <Controller
                        name="country"
                        control={control}
                        render={({ field }) => (
                          <TomSelect
                            value={field.value}
                            onChange={field.onChange}
                            options={{
                              placeholder: t("select_a_country"),
                              maxOptions: undefined,
                            }}
                            className="w-full"
                          >
                            <option value="">{t('select_a_country')}</option>
                            {countries.getAll().map((country, countryKey) => (
                              <option key={countryKey} value={country.name}>
                                {country.name}
                              </option>
                            ))}
                          </TomSelect>
                        )}
                      />
                      {errors.country && <FormHelp className="text-danger">{errors.country.message}</FormHelp>}
                    </div>
                  </div>

                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">{t('phone_number')}</div>
                          <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                            {t('required')}
                          </div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                          {t('phone_number_description')}
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <FormInput
                        {...register("phone")}
                        placeholder="+1 (555) 000-0000"
                        className={clsx({ "border-danger": errors.phone })}
                      />
                      {errors.phone && <FormHelp className="text-danger">{errors.phone.message}</FormHelp>}
                    </div>
                  </div>

                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">{t('zip_postal_code')}</div>
                          <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                            {t('required')}
                          </div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                          {t('zip_postal_code_description')}
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <FormInput
                        {...register("postal_code")}
                        className={clsx({ "border-danger": errors.postal_code })}
                      />
                      {errors.postal_code && <FormHelp className="text-danger">{errors.postal_code.message}</FormHelp>}
                    </div>
                  </div>

                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">{t('address')}</div>
                          <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                            {t('required')}
                          </div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                          {t('address_description')}
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <FormInput
                        {...register("address_line")}
                        placeholder="Street, number, etc."
                        className={clsx({ "border-danger": errors.address_line })}
                      />
                      {errors.address_line && <FormHelp className="text-danger">{errors.address_line.message}</FormHelp>}
                    </div>
                  </div>

                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">{t('city')}</div>
                          <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                            {t('required')}
                          </div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                          {t('city_description')}
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <FormInput
                        {...register("city")}
                        className={clsx({ "border-danger": errors.city })}
                      />
                      {errors.city && <FormHelp className="text-danger">{errors.city.message}</FormHelp>}
                    </div>
                  </div>

                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">{t('state_province')}</div>
                          <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                            {t('required')}
                          </div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                          {t('state_province_description')}
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <FormInput
                        type="text"
                        disabled={isSaving}
                        {...register("administrative_area")}
                        className={clsx({ "border-danger": errors.administrative_area })}
                      />
                      {errors.administrative_area && (
                        <FormHelp className="mt-2 text-xs text-red-500">
                          {errors.administrative_area.message as string}
                        </FormHelp>
                      )}
                    </div>
                  </div>

                </div>
              )}

              {currentStep === 3 && (
                <div className="animate-[fadeIn_0.4s_ease-in-out]">
                  <div className="pb-5 mb-6 text-[0.94rem] font-medium border-b border-dashed border-slate-300/70">
                    {t('regional_configuration')}
                  </div>

                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">{t('timezone')}</div>
                          <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                            {t('required')}
                          </div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                          {t('timezone_description')}
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <Controller
                        name="timezone"
                        control={control}
                        render={({ field }) => (
                          <TomSelect
                            value={field.value}
                            onChange={field.onChange}
                            options={{
                              placeholder: t("select_your_timezone"),
                              maxOptions: undefined,
                            }}
                            className="w-full"
                          >
                            {timezones.getAll().map((timezone) => (
                              <option key={timezone.code} value={timezone.code}>
                                {timezone.name}
                              </option>
                            ))}
                          </TomSelect>
                        )}
                      />
                      {errors.timezone && <FormHelp className="text-danger">{errors.timezone.message}</FormHelp>}
                    </div>

                  </div>

                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">{t('currency')}</div>
                          <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                            {t('required')}
                          </div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                          {t('currency_description')}
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <Controller
                        name="currency"
                        control={control}
                        render={({ field }) => (
                          <TomSelect
                            value={field.value}
                            onChange={field.onChange}
                            options={{
                              placeholder: t("select_a_currency"),
                              maxOptions: undefined,
                            }}
                            className="w-full"
                          >
                            <option value="">{t("select_a_currency")}</option>
                            {currencies.getAll().map((c) => (
                              <option key={c.code} value={c.code}>{c.code}</option>
                            ))}
                          </TomSelect>
                        )}
                      />
                      {errors.currency && <FormHelp className="text-danger">{errors.currency.message}</FormHelp>}
                    </div>
                  </div>

                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">{t('date_format')}</div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                          {t('date_format_description')}
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <Controller
                        name="date_format"
                        control={control}
                        render={({ field }) => (
                          <FormSelect
                            {...field}
                            value={field.value || ""}
                            className={clsx({ "border-danger": errors.date_format })}
                          >
                            <option value="DD/MM/YYYY">DD/MM/YYYY (31/12/2024)</option>
                            <option value="MM/DD/YYYY">MM/DD/YYYY (12/31/2024)</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD (2024-12-31)</option>
                          </FormSelect>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="flex flex-col w-full">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    {t('choose_architecture_title')}
                  </h2>
              
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
                    {t('choose_architecture_subtitle')}
                  </p>
                </div>
              
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                  <div
                    className={clsx(
                      "group relative flex flex-col gap-2 rounded-xl border p-5 shadow-sm transition-all cursor-pointer",
                      selectedArchitecture === "whatsapp"
                        ? "border-green-500 bg-green-50/20 ring-1 ring-green-500 dark:bg-green-500/10"
                        : "border-slate-200 bg-white dark:bg-darkmode-600 dark:border-slate-700 hover:border-green-500/50 hover:bg-green-50/30 dark:hover:bg-green-500/5"
                    )}
                    onClick={() => setSelectedArchitecture("whatsapp")}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={clsx(
                          "p-2 rounded-lg transition",
                          selectedArchitecture === "whatsapp" ? "bg-green-100 dark:bg-green-900/30" : "bg-green-100 dark:bg-green-900/20"
                        )}>
                          <TbBrandWhatsapp className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <span className={clsx(
                          "text-base font-semibold",
                          selectedArchitecture === "whatsapp" ? "text-green-800 dark:text-green-400" : "text-slate-700 dark:text-slate-300"
                        )}>
                          WhatsApp
                        </span>
                      </div>
                      {selectedArchitecture === "whatsapp" && (
                        <Lucide icon="CheckCircle" className="h-5 w-5 text-green-600 dark:text-green-400" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {t('whatsapp_description')}
                    </p>
                  </div>
              
                  <div
                    className={clsx(
                      "group relative flex flex-col gap-2 rounded-xl border p-5 shadow-sm transition-all cursor-pointer",
                      selectedArchitecture === "website"
                        ? "border-blue-500 bg-blue-50/20 ring-1 ring-blue-500 dark:bg-blue-500/10"
                        : "border-slate-200 bg-white dark:bg-darkmode-600 dark:border-slate-700 hover:border-blue-500/50 hover:bg-blue-50/30 dark:hover:bg-blue-500/5"
                    )}
                    onClick={() => setSelectedArchitecture("website")}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg transition">
                          <Lucide icon="Globe" className="h-6 w-6 text-[#1877F2] dark:text-blue-400" />
                        </div>
                        <span className={clsx(
                          "text-base font-semibold",
                          selectedArchitecture === "website" ? "text-blue-800 dark:text-blue-400" : "text-slate-700 dark:text-slate-300"
                        )}>
                          Website
                        </span>
                      </div>
                      {selectedArchitecture === "website" && (
                        <Lucide icon="CheckCircle" className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {t('website_description')}
                    </p>
                  </div>
              
                  <div
                    className={clsx(
                      "group relative flex flex-col gap-2 rounded-xl border p-5 shadow-sm transition-all cursor-pointer",
                      selectedArchitecture === "instagram"
                        ? "border-pink-500 bg-pink-50/20 ring-1 ring-pink-500 dark:bg-pink-500/10"
                        : "border-slate-200 bg-white dark:bg-darkmode-600 dark:border-slate-700 hover:border-pink-500/50 hover:bg-pink-50/30 dark:hover:bg-pink-500/5"
                    )}
                    onClick={() => setSelectedArchitecture("instagram")}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg transition">
                          <Lucide icon="Instagram" className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                        </div>
                        <span className={clsx(
                          "text-base font-semibold",
                          selectedArchitecture === "instagram" ? "text-pink-800 dark:text-pink-400" : "text-slate-700 dark:text-slate-300"
                        )}>
                          Instagram
                        </span>
                      </div>
                      {selectedArchitecture === "instagram" && (
                        <Lucide icon="CheckCircle" className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {t('instagram_description')}
                    </p>
                  </div>
              
                  <div
                    className={clsx(
                      "group relative flex flex-col gap-2 rounded-xl border border-dashed p-5 transition-all cursor-pointer",
                      selectedArchitecture === "scratch"
                        ? "border-slate-400 bg-slate-100 dark:bg-slate-700 dark:border-slate-500 ring-1 ring-slate-400"
                        : "border-slate-300 bg-slate-50/50 dark:bg-darkmode-600 dark:border-slate-700 hover:border-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                    )}
                    onClick={() => setSelectedArchitecture("scratch")}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg transition">
                          <Lucide icon="LayoutGrid" className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                        </div>
                        <span className="text-base font-semibold text-slate-700 dark:text-slate-300">
                          {t('scratch_title')}
                        </span>
                      </div>
                      {selectedArchitecture === "scratch" && (
                        <Lucide icon="CheckCircle" className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {t('scratch_description')}
                    </p>
                  </div>
                </div>
              
                <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
                  <div className="flex items-start gap-4 rounded-lg bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 px-4 py-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                      <Lucide icon="Sparkles" className="h-4 w-4" />
                    </div>
              
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                        {t('ia_generation_title')}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {t('ia_generation_message')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>

            <div className="flex justify-between px-7 py-5 border-t border-slate-200/80 bg-slate-50/50 rounded-b-md dark:bg-darkmode-600/50">
              <div>
                {(currentStep > 1  && currentStep < totalSteps) && (
                  <Button type="button" variant="outline-secondary" className="px-6" onClick={handlePrev}>
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
                  disabled={isSaving}
                >
                  {t('next')}
                  <Lucide icon="ArrowRight" className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="primary"
                  className="px-6"
                  disabled={isSaving || !selectedArchitecture}
                  onClick={handleFinishSetup}
                >
                  {isSaving ? (
                    <Lucide icon="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Lucide icon="CheckCircle" className="w-4 h-4 mr-2" />
                  )}
                  {t('finish_setup')}
                </Button>
              )}
            </div>
          </div>
        </form>

        <GenericModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          title={t('connection_creation')}
          closeOnBackdrop={false}
          subtitle={t('connection_creation_description')}
          size="giant"
          content={
            connectionType === "instagram" ? (
              <ModalCreateConnectionInstagram onSuccess={() => {
                setOpenModal(false)
              }}
              />
            ) : (
              <ModalCreateConnectionWhatsapp onSuccess={() => {
                setOpenModal(false)
              }}
              />
            )
          }
        />
      </div>
    </div>
  );
}

export default WorkspaceCreate;