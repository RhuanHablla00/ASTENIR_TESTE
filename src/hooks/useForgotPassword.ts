import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

export const passwordSchema = z
  .object({
    newPassword: z
      .string()
      .min(12, "A senha deve ter no mínimo 12 caracteres")
      .regex(/[A-Z]/, "A senha deve conter pelo menos 1 letra maiúscula")
      .regex(/[0-9]/, "A senha deve conter pelo menos 1 número")
      .regex(/[^A-Za-z0-9]/, "A senha deve conter pelo menos 1 símbolo"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type ForgotPasswordFormData = z.infer<typeof passwordSchema>;

export const useForgotPassword = () => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { t } = useTranslation();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSubmitForm = (onSubmit: (data: ForgotPasswordFormData) => Promise<void>) =>
    form.handleSubmit(async (data) => {
      try {
        setSubmitError(null); 
        await onSubmit(data);
      } catch (err: any) {
        setSubmitError(t(`errors:${err?.error_code}`) || "Ocorreu um erro ao enviar o formulário");
      }
    });

  return {
    form,
    handleSubmit: handleSubmitForm,
    isLoading: false,
    submitError,
  };
};
