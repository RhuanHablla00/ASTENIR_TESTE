import { Lead } from "@/api/leadApi";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateLeadMutation,
  useUpdateLeadApiMutation,
} from "@/api/leadApi";
import {
  showErrorNotification,
  showSuccessNotification,
} from "@/components/Base/Notification";
import { useTranslation } from "react-i18next";

interface Phone {
  phone: string;
  is_whatsapp?: boolean;
}

interface Email {
  email: string;
  subscribe?: boolean;
}

const leadSchema = z.object({
  name: z
    .string()
    .min(3, "Lead name must be at least 3 characters")
    .max(100, "Name is too long"),

  phones: z.array(
    z.object({
      phone: z.string(), 
      is_whatsapp: z.boolean().default(false).optional(),
    })
  ).optional(), 

  emails: z.array(
    z.object({
      email: z.union([z.literal(""), z.string().email("Invalid email address")]),
      subscribed: z.boolean().default(false).optional(),
    })
  ).optional(),
});

export type LeadFormValues = z.infer<typeof leadSchema>;

interface UseLeadFormProps {
  workspaceId: string;
  initialData?: Lead | null;
  onSuccess?: () => void;
}

export const useLeadForm = ({
  workspaceId,
  initialData,
  onSuccess,
}: UseLeadFormProps) => {
  const [createLead, { isLoading: isCreating }] =
    useCreateLeadMutation();
  const [updateLead, { isLoading: isUpdating }] =
    useUpdateLeadApiMutation();

  const { t } = useTranslation();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    mode: "onChange",
    defaultValues: {
      name: initialData?.name ?? "",
      phones: initialData?.phones ?? [{ phone: "", is_whatsapp: false }],
      emails: initialData?.emails ?? [{ email: "", subscribed: false }],
    },
  });

  const phonesFieldArray = useFieldArray({
    control: form.control,
    name: "phones",
  });

  const emailsFieldArray = useFieldArray({
    control: form.control,
    name: "emails",
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null);

    try {
      const payload = {
        name: values.name,
        phones:
          values.phones?.filter((p: Phone) => p.phone?.trim()) ?? [],
        emails:
          values.emails?.filter((e: Email) => e.email?.trim()) ?? [],
      };

      if (initialData?.id) {
        await updateLead({
          workspace: workspaceId,
          id: initialData.id,
          data: payload,
        }).unwrap();

        showSuccessNotification(t("lead_updated_successfully"));
      } else {
        await createLead({
          workspace: workspaceId,
          data: payload,
        }).unwrap();

        showSuccessNotification(t("lead_created_successfully"));
        form.reset();
      }

      onSuccess?.();
    } catch (err: any) {
      showErrorNotification(t(`errors:${err?.data?.error_code}`));
      setSubmitError(t(`errors:${err?.data?.error_code}`) ?? "Error saving lead");
    }
  });

  return {
    form,
    phonesFieldArray,
    emailsFieldArray,
    handleSubmit,
    isSaving: isCreating || isUpdating,
    submitError,
  };
};
