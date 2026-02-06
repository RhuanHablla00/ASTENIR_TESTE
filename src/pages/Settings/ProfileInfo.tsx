import { FormCheck, FormHelp, FormInput, FormSelect } from "@/components/Base/Form";
import { useSettingsForm } from "../../hooks/useSettingsForm";
import Button from "@/components/Base/Button";
import Alert from "@/components/Base/Alert";
import { Controller } from "react-hook-form";
import TomSelect from "@/components/Base/TomSelect";
import { useTranslation } from "react-i18next";
import random from "lodash/random";
import countries from "@/utils/countries";

export default function ProfileInfo() {
  const { t } = useTranslation();

  const {
    form,
    handleSubmit,
    isLoadingProfile,
    isSaving,
    submitSuccess,
    submitError,
  } = useSettingsForm();


  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = form;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-5 box box--stacked"
    >

      {submitError && (
        <Alert
          variant="outline-danger"
          className="mb-4 px-4 py-3 border-danger/30"
        >
          {submitError}
        </Alert>
      )}

      {submitSuccess && (
        <Alert
          variant="outline-success"
          className="mb-4 px-4 py-3 border-success/30"
        >
          {submitSuccess}
        </Alert>
      )}


      <div className="pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">
        {t('profile_info')}
      </div>


      <div>
        {/* FULL NAME */}
        <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
          <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
            <div className="text-left">
              <div className="flex items-center">
                <div className="font-medium">{t('full_name')}</div>
                <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                  {t('required')}
                </div>
              </div>
              <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                {t('enter_your_full_name')}
              </div>
            </div>
          </label>
          <div className="flex-1 w-full mt-3 xl:mt-0">
            <div className="flex flex-col items-center md:flex-row">
              <FormInput
                type="text"
                disabled={isLoadingProfile}
                {...register("name")}
              />
            </div>
            {errors.name && (
              <FormHelp className="mt-2 text-xs text-red-500">
                {errors.name.message as string}
              </FormHelp>
            )}
          </div>
        </div>


        <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
          <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
            <div className="text-left">
              <div className="flex items-center">
                <div className="font-medium">{t('date_of_birth')}</div>
              </div>
              <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                {t('date_of_birth_description')}
              </div>
            </div>
          </label>

          <div className="flex-1 w-full mt-3 xl:mt-0">
            <Controller
              control={control}
              name="date_of_birth"
              render={({ field }) => (
                <FormInput
                  type="date"
                  disabled={isLoadingProfile}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    const year = value.split('-')[0];

                    if (year.length > 4) {
                      e.target.blur();
                      return;
                    }

                    field.onChange(value || null);
                  }}

                />
              )}
            />
            {errors.date_of_birth && (
              <FormHelp className="mt-2 text-xs text-red-500">
                {errors.date_of_birth.message as string}
              </FormHelp>
            )}
          </div>
        </div>

        {/* GENDER */}
        <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
          <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
            <div className="text-left">
              <div className="flex items-center">
                <div className="font-medium">{t('gender')}</div>
              </div>
              <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                {t('gender_description')}
              </div>
            </div>
          </label>

          <div className="flex-1 w-full mt-3 xl:mt-0">
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <>
                  <div className="flex flex-col items-center md:flex-row">
                    {/* Male */}
                    <div className="bg-white w-full px-3 py-2 border rounded-md shadow-sm border-slate-300/60 first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10 dark:bg-darkmode-600">
                      <FormCheck>
                        <FormCheck.Input
                          id="gender-male"
                          type="radio"
                          value="male"
                          disabled={isLoadingProfile}
                          checked={field.value === "male"}
                          onChange={() => field.onChange("male")}
                        />
                        <FormCheck.Label htmlFor="gender-male">
                          {t('male')}
                        </FormCheck.Label>
                      </FormCheck>
                    </div>

                    {/* Female */}
                    <div className="bg-white w-full px-3 py-2 border rounded-md shadow-sm border-slate-300/60 first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10 dark:bg-darkmode-600">
                      <FormCheck>
                        <FormCheck.Input
                          id="gender-female"
                          type="radio"
                          value="female"
                          disabled={isLoadingProfile}
                          checked={field.value === "female"}
                          onChange={() => field.onChange("female")}
                        />
                        <FormCheck.Label htmlFor="gender-female">
                          {t('female')}
                        </FormCheck.Label>
                      </FormCheck>
                    </div>

                    {/* Prefer not to say */}
                    <div className="bg-white w-full px-3 py-2 border rounded-md shadow-sm border-slate-300/60 first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10 dark:bg-darkmode-600">
                      <FormCheck>
                        <FormCheck.Input
                          id="gender-prefer-not"
                          type="radio"
                          value="prefer_not_to_say"
                          disabled={isLoadingProfile}
                          checked={field.value === "prefer_not_to_say"}
                          onChange={() => field.onChange("prefer_not_to_say")}
                        />
                        <FormCheck.Label htmlFor="gender-prefer-not">
                          {t('prefer_not_to_say')}
                        </FormCheck.Label>
                      </FormCheck>
                    </div>
                  </div>

                  {/* Se um dia você tornar gender obrigatório, já fica o espaço pra mostrar erro */}
                  {errors.gender && (
                    <FormHelp className="mt-2 text-xs text-red-500">
                      {errors.gender.message as string}
                    </FormHelp>
                  )}
                </>
              )}
            />
          </div>
        </div>


        {/* PHONE + PHONE TYPE */}
        <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
          <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
            <div className="text-left">
              <div className="flex items-center">
                <div className="font-medium">{t('phone_number')}</div>
              </div>
              <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                {t('provide_valid_phone_number')}
              </div>
            </div>
          </label>

          <div className="flex-1 w-full mt-3 xl:mt-0">
            <div className="flex flex-col items-center gap-3 md:flex-row">

              {/* PHONE */}
              <FormInput
                type="text"
                disabled={isLoadingProfile}
                {...register("phone")}
              />

              {/* PHONE TYPE - CONTROLLED SELECT */}
              <Controller
                name="phone_type"
                control={control}
                render={({ field }) => (
                  <FormSelect
                    disabled={isLoadingProfile}
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value || null)}
                  >
                    <option value="">{t('select_type')}</option>
                    <option value="office">{t('office')}</option>
                    <option value="home">{t('home')}</option>
                  </FormSelect>
                )}
              />
            </div>

            {errors.phone && (
              <FormHelp className="mt-2 text-xs text-red-500">
                {errors.phone.message as string}
              </FormHelp>
            )}

          </div>
        </div>


        {/* COUNTRY - agora gravando o NOME do país */}
        <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
          <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
            <div className="text-left">
              <div className="flex items-center">
                <div className="font-medium">{t('country')}</div>
              </div>
              <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                {t('specify_the_country')}
              </div>
            </div>
          </label>
          <div className="flex-1 w-full mt-3 xl:mt-0">
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <TomSelect
                  value={field.value ?? ""}
                  onChange={(e: any) => field.onChange(e.target.value)}
                  options={{
                    placeholder: t("select_your_country"),
                    maxOptions: undefined,
                  }}
                  className="w-full"
                >
                  {countries.getAll().map((country, countryKey) => (
                    <option key={countryKey} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </TomSelect>
              )}
            />
            {errors.country && (
              <FormHelp className="mt-2 text-xs text-red-500">
                {errors.country.message as string}
              </FormHelp>
            )}
          </div>
        </div>

        {/* ADDRESS LINE 1 */}
        <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
          <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
            <div className="text-left">
              <div className="flex items-center">
                <div className="font-medium">{t('address_line_1')}</div>
              </div>
              <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                {t('address_line_1_description')}
              </div>
            </div>
          </label>
          <div className="flex-1 w-full mt-3 xl:mt-0">
            <FormInput
              type="text"
              disabled={isLoadingProfile}
              {...register("address_line_1")}
            />
            {errors.address_line_1 && (
              <FormHelp className="mt-2 text-xs text-red-500">
                {errors.address_line_1.message as string}
              </FormHelp>
            )}
          </div>
        </div>

        {/* ADDRESS LINE 2 */}
        <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
          <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
            <div className="text-left">
              <div className="flex items-center">
                <div className="font-medium">{t('address_line_2')}</div>
              </div>
              <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                {t('address_line_2_description')}
              </div>
            </div>
          </label>
          <div className="flex-1 w-full mt-3 xl:mt-0">
            <FormInput
              type="text"
              disabled={isLoadingProfile}
              {...register("address_line_2")}
            />
          </div>
        </div>

        {/* CITY */}
        <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
          <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
            <div className="text-left">
              <div className="flex items-center">
                <div className="font-medium">{t('city')}</div>
              </div>
              <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                {t('enter_your_city')}
              </div>
            </div>
          </label>
          <div className="flex-1 w-full mt-3 xl:mt-0">
            <FormInput
              type="text"
              disabled={isLoadingProfile}
              {...register("city")}
            />
            {errors.city && (
              <FormHelp className="mt-2 text-xs text-red-500">
                {errors.city.message as string}
              </FormHelp>
            )}
          </div>
        </div>

        {/* STATE / PROVINCE */}
        <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
          <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
            <div className="text-left">
              <div className="flex items-center">
                <div className="font-medium">{t('state_province')}</div>
              </div>
              <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                {t('state_province_description')}
              </div>
            </div>
          </label>
          <div className="flex-1 w-full mt-3 xl:mt-0">
            <FormInput
              type="text"
              disabled={isLoadingProfile}
              {...register("administrative_area")}
            />
            {errors.administrative_area && (
              <FormHelp className="mt-2 text-xs text-red-500">
                {errors.administrative_area.message as string}
              </FormHelp>
            )}
          </div>
        </div>

        {/* ZIP / POSTAL CODE */}
        <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
          <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
            <div className="text-left">
              <div className="flex items-center">
                <div className="font-medium">{t('zip_postal_code')}</div>
              </div>
              <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                {t('enter_postal_code')}
              </div>
            </div>
          </label>
          <div className="flex-1 w-full mt-3 xl:mt-0">
            <FormInput
              type="text"
              placeholder={random(5000, 9000).toString()}
              disabled={isLoadingProfile}
              {...register("postal_code")}
            />
            {errors.postal_code && (
              <FormHelp className="mt-2 text-xs text-red-500">
                {errors.postal_code.message as string}
              </FormHelp>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER / SAVE BUTTON */}
      <div className="flex pt-5 mt-6 border-t border-dashed md:justify-end border-slate-300/70">
        <Button
          variant="outline-primary"
          className="w-full px-4 border-primary/50 md:w-auto"
          type="submit"
          disabled={isSaving || isLoadingProfile}
        >
          {isSaving ? `${t("saving")}...` : t("save_changes")}
        </Button>
      </div>
    </form>
  )
}