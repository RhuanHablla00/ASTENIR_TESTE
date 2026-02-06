import { useTranslation } from 'react-i18next';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useRequestEmailVerificationMutation } from "@/api/authApi";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";

const getLoginSchema = (t: any) => z.object({
  email: z
    .string()
    .min(1, t('var_required', { var: t('email') }))
    .email(t('invalid_email')),
  
  password: z
    .string()
    .min(1, t('var_required', { var: t('password') })),
  
  remember: z.boolean().optional(),
  otp: z.string().optional(),
});

export type LoginFormValues = z.infer<ReturnType<typeof getLoginSchema>>;

export const useLoginForm = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [requestEmailVerification] = useRequestEmailVerificationMutation();
  const workspace = useAppSelector((state) => state.workspace?.selectedWorkspace?.id);

  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const [showOtpInput, setShowOtpInput] = useState(false);

  const { t } = useTranslation();

  const schema = getLoginSchema(t);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
      otp: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null);

    if (showOtpInput && (!values.otp || values.otp.length < 6)) {
      form.setError("otp", { message: "Please enter the 6-digit code." });
      return;
    }

    try {
      const result = await login({
        email: values.email,
        password: values.password,
        otp: values.otp, 
      });

      if ("data" in result) {
        if (result?.data?.user?.email_verified === false) {
          await requestEmailVerification().unwrap();
          navigate('/verify-email');
        } else {
          if (workspace) {
            navigate(`/workspace/${workspace}`);
          }
        }

        if (values.remember) {
          localStorage.setItem("remember_email", values.email);
        } else {
          localStorage.removeItem("remember_email");
        }

      } else {
        const apiError: any = (result.error as any)?.data;

        if (apiError?.error_code === 71) {
          setShowOtpInput(true); 
          setSubmitError(null); 
          return;
        }

        const baseMessage = t(`errors:${apiError?.error_code}`) || "Authentication failed.";
        setSubmitError(baseMessage);
      }
    } catch (e) {
      setSubmitError("Unexpected error during authentication.");
    }
  });

  return {
    form,
    handleSubmit,
    isLoading,
    submitError,
    showOtpInput, 
  };
};