import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { useRegisterMutation } from "@/api/authApi";
import { useTranslation } from "react-i18next";

export const useRegisterForm = () => {
  const navigate = useNavigate();

  const [registerUser, { isLoading }] = useRegisterMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { t } = useTranslation();

  const registerSchema = z
    .object({
      fullName: z
        .string()
        .min(3, "Full name must be at least 3 characters")
        .max(120, "Full name is too long"),

      email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email format"),

      password: z
        .string()
        .min(12, t("password_min_12_chars"))
        .regex(/[A-Z]/, t("password_uppercase"))
        .regex(/[0-9]/, t("password_number"))
        .regex(/[^A-Za-z0-9]/, t("password_symbol")),

      confirmation: z
        .string()
        .min(1, "Password confirmation is required"),

      agree: z
        .boolean()
        .refine((v) => v === true, {
          message: "You must accept the privacy policy.",
        }),
    })
    .refine((data) => data.password === data.confirmation, {
      path: ["confirmation"],
      message: "Passwords do not match.",
    });

  type RegisterFormValues = z.infer<typeof registerSchema>;

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmation: "",
      agree: false,
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null);

    try {
      const result = await registerUser({
        email: values.email,
        name: values.fullName,
        password: values.password,
      });

      if ("data" in result) {
        if (result?.data?.user?.email_verified === false) {
          navigate('/verify-email');
        } else {
          navigate("/workspace/list");
        }
        
      } else {
        const apiError = (result.error as any)?.data as
          | { error_code?: string }
          | undefined;
         
        setSubmitError(
          t(`errors:${apiError?.error_code}`) || "Registration failed. Please try again."
        );
      }
    } catch (e) {
      setSubmitError("Unexpected error during registration.");
    }
  });

  return {
    form,
    handleSubmit,
    isLoading,
    submitError,
  };
};
