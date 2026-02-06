import {
  useCreateWorkspaceApiMutation,
  type CreateWorkspaceRequest,
} from "@/api/workspaceApi";
import { showErrorNotification, showSuccessNotification } from "@/components/Base/Notification";
import { setWorkspace } from "@/stores/workspaceSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export const getWorkspaceSchema = (t: any) => z.object({
  // --- Step 1: Identidade ---
  name: z
    .string()
    .min(3, t('workspace_name_validation_var', { var: 3 }))
    .max(100, t('var_is_too_long', { var: t('name') })),

  description: z
    .string()
    .min(3, t('workspace_description_validation_var', { var: 3 }))
    .max(1000, t('var_is_too_long', { var: t('description') })),

  business_email: z
    .string()
    .email(t('invalid_email_validation')),

  industry: z
    .string()
    .min(1, t('select_industry')),

  website: z
    .string()
    .url(t('invalid_url_hint'))
    .optional()
    .or(z.literal("")),

  // --- Step 2: Localização ---
  country: z
    .string()
    .min(1, t('var_required', { var: t('country') })),

  address_line: z
    .string()
    .min(1, t('var_required', { var: t('address') })),

  city: z
    .string()
    .min(1, t('var_required', { var: t('city') })),

  administrative_area: z
    .string()
    .min(1, t('var_required', { var: t('state') })),

  postal_code: z
    .string()
    .min(1, t('var_required', { var: t('postal_code') })),

  phone: z
    .string()
    .min(1, t('var_required', { var: t('phone_number') })),

  // --- Step 3: Configurações Regionais ---
  timezone: z
    .string()
    .min(1, t('var_required', { var: t('timezone') })),

  type: z
    .enum(["default", "agency", "franchise"]),

  currency: z
    .string()
    .min(1, t('var_required', { var: t('currency') })),

  date_format: z
    .enum(["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]),
});

export type WorkspaceFormValues = z.infer<ReturnType<typeof getWorkspaceSchema>>;

export const useWorkspaceCreateForm = () => {
  const [createWorkspaceApi, { isLoading: isSaving }] = useCreateWorkspaceApiMutation();
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const schema = getWorkspaceSchema(t);
  const form = useForm<WorkspaceFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      business_email: "",
      industry: "",
      website: "",
      country: "",
      // RENOMEADO
      address_line: "",
      city: "",
      // ADICIONADO
      administrative_area: "",
      postal_code: "",
      phone: "",
      type: "default",
      timezone: "",
      currency: "",
      date_format: "DD/MM/YYYY" as const,
    },
  });

  const validateStep = async (step: number): Promise<boolean> => {
    let fields: any[] = [];

    switch (step) {
      case 1:
        fields = ["name", "business_email", "industry", "website"];
        break;
      case 2:
        // Atualizado com address_line e administrative_area
        fields = ["country", "address_line", "city", "administrative_area", "postal_code", "phone"];
        break;
      case 3:
        fields = ["timezone", "currency", "date_format"];
        break;
      default:
        return false;
    }

    return await form.trigger(fields);
  };

  const handleSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const payload: CreateWorkspaceRequest = {
        name: values.name,
        description: values.description,
        business_email: values.business_email,
        industry: values.industry,
        website: values.website || null,
        address_line: values.address_line,
        city: values.city,
        administrative_area: values.administrative_area || null,
        postal_code: values.postal_code || null,
        phone: values.phone || null,
        country: values.country,
        type: values.type,
        settings: {
          timezone: values.timezone,
          currency: values.currency,
          date_format: values.date_format,
        },
      };


      const result = await createWorkspaceApi(payload).unwrap();

      dispatch(setWorkspace(result));

      setSubmitSuccess(true)
      showSuccessNotification(t('workspace_created_successfully'));
    } catch (err: any) {
      const msg = t(`errors:${err?.data?.error_code}`) || "Failed to create workspace.";
      showErrorNotification(msg)
      setSubmitError(msg);
    }
  });

  return {
    form,
    handleSubmit,
    validateStep,
    isSaving,
    submitSuccess,
    submitError,
  };
};