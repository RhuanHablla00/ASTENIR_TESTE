import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useChangeEmailMutation } from "@/api/authApi";


export const changeEmailSchema = z.object({
  new_email: z.string().email("Insira um email válido"),
  password: z.string().min(3, "Senha obrigatória"),
});

export type ChangeEmailFormData = z.infer<typeof changeEmailSchema>;


export const useChangeEmailForm = () => {
  const [changeEmail, { isLoading }] = useChangeEmailMutation();

  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  
  const form = useForm<ChangeEmailFormData>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      new_email: "",
      password: ""
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      await changeEmail({ new_email: values.new_email, password: values.password }).unwrap();

      setSubmitSuccess("Your email has been updated successfully.");
    } catch (err) {
      setSubmitError("Failed to update email.");
    }
  });

  return {
    form,
    handleSubmit,
    isLoading,
    submitSuccess,
    submitError,
  };
};
