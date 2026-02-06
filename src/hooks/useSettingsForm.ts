import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  authApi,
  useProfileQuery,
  useUpdateProfileMutation,
  type ProfileResponse,
  type UpdateProfileRequest,
} from "@/api/authApi";
import { useAppDispatch } from "@/stores/hooks";
import { updateCache } from "@/utils/helper";
import { useTranslation } from "react-i18next";

// ----------------------------
// Zod schema do formulário
// ----------------------------
export const getProfileSchema = (t: any) => z.object({
  name: z
    .string()
    .min(3, t('name_validation_var', { var: 3 })) 
    .max(120, t('var_is_too_long', { var: t('name') })),

  date_of_birth: z.string().nullable().optional(),

  gender: z
    .enum(["male", "female", "prefer_not_to_say"])
    .nullable()
    .optional(),

  phone: z
    .string()
    .nullable()
    .transform((v) => (v === "" ? null : v))
    .refine(
      (value) => !value || value.replace(/\D/g, "").length >= 10,
      t('phone_min_digits_var', { var: 10 })
    ),

  phone_type: z
    .enum(["office", "home"])
    .nullable()
    .optional(),

  country: z.string().nullable().optional(),
  address_line_1: z.string().nullable().optional(),
  address_line_2: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  administrative_area: z.string().nullable().optional(),
  postal_code: z.string().nullable().optional(),
});

export type ProfileFormValues = z.infer<ReturnType<typeof getProfileSchema>>;

// ----------------------------
// Helpers de mapeamento
// ----------------------------
const mapProfileToForm = (profile: ProfileResponse): ProfileFormValues => ({
  name: profile.name ?? "",
  date_of_birth: profile.date_of_birth
    ? profile.date_of_birth.slice(0, 10)
    : null,
  gender: profile.gender,
  phone: profile.phone,
  phone_type: profile.phone_type,
  country: profile.country,
  address_line_1: profile.address_line_1,
  address_line_2: profile.address_line_2,
  city: profile.city,
  administrative_area: profile.administrative_area,
  postal_code: profile.postal_code,
});

export const useSettingsForm = () => {
  const dispatch = useAppDispatch();

  const {
    data: profile,
    isLoading: isLoadingProfile,
  } = useProfileQuery();

  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();

  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { t } = useTranslation();

  const schema = getProfileSchema(t);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(schema),
    defaultValues: useMemo<ProfileFormValues>(
      () =>
        profile
          ? mapProfileToForm(profile)
          : {
              name: "",
              date_of_birth: null,
              gender: null,
              phone: null,
              phone_type: null,
              country: null,
              address_line_1: null,
              address_line_2: null,
              city: null,
              administrative_area: null,
              postal_code: null,
            },
      [profile]
    ),
  });

  // Quando o profile chega/atualiza, reseta o form
  useEffect(() => {
    if (profile) {
      form.reset(mapProfileToForm(profile));
    }
  }, [profile, form]);

  const handleSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const payload: UpdateProfileRequest = {
        name: values.name,
        date_of_birth: values.date_of_birth ?? null,
        gender: values.gender ?? null,
        phone: values.phone ?? null,
        phone_type: values.phone_type ?? null,
        country: values.country ?? null,
        address_line_1: values.address_line_1 ?? null,
        address_line_2: values.address_line_2 ?? null,
        city: values.city ?? null,
        administrative_area: values.administrative_area ?? null,
        postal_code: values.postal_code ?? null,
      };

      const updated = await updateProfile(payload).unwrap();

      // Atualiza o cache da query "profile" sem disparar novo GET
      updateCache(dispatch, authApi, "profile", undefined, updated);

      setSubmitSuccess(t('var_updated_successfully', {var:t('profile')}));
    } catch (err) {
      setSubmitError(t("update_profile_error_message"));
    }
  });

  return {
    form,
    handleSubmit,
    isLoadingProfile,
    isSaving,
    submitSuccess,
    submitError,
    profile
  };
};
