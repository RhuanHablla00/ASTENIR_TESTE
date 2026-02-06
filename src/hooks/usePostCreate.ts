import { showErrorNotification, showSuccessNotification } from "@/components/Base/Notification";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateInstagramPostMutation } from "@/api/instagramApi";
import { useTranslation } from "react-i18next";

const postCreateSchema = z.object({
  publish_in: z
    .array(z.string())
    .min(1, "Selecione pelo menos uma rede social"),

  post: z.object({
    base: z.string().optional(),

    instagram: z
      .object({
        text: z.string().optional(),
        images: z
          .array(z.instanceof(File))
          .max(4, "Máximo de 4 imagens")
          .optional(),
      })
      .optional(),

    facebook: z
      .object({
        text: z.string().optional(),
        images: z
          .array(z.instanceof(File))
          .max(4, "Máximo de 4 imagens")
          .optional(),
      })
      .optional(),
  }),
});
export type PostCreateFormValues = z.infer<typeof postCreateSchema>;


export const usePostCreate = ({ connection_id }: { connection_id: string; }) => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [createInstagramPost, { isLoading }] = useCreateInstagramPostMutation();
  const { t } = useTranslation();

  const form = useForm<PostCreateFormValues>({
    resolver: zodResolver(postCreateSchema),
    mode: "onChange",
    defaultValues: {
      publish_in: [],
      post: {
        base: "",
        instagram: {
          text: "",
          images: [],
        },
        facebook: {
          text: "",
          images: [],
        },
      },
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const instagram = values.post.instagram;

      if (!instagram) {
        throw new Error("Dados do Instagram não encontrados");
      }

      const { text, images } = instagram;

      if (!images || images.length === 0) {
        throw new Error("Selecione ao menos uma mídia para o Instagram");
      }

      const caption = text && text.trim() !== "" ? text : "";

      const formData = new FormData();
      formData.append("connection_id", connection_id);

      if (caption) {
        formData.append("caption", caption);
      }

      if (images.length > 1) {
        formData.append("media_type", "CAROUSEL");

        images.forEach((file) => {
          formData.append("files", file); 
        });
      }
      else {
        formData.append("file", images[0]);
      }

      await createInstagramPost(formData).unwrap();

      showSuccessNotification(t("post_created_successfully"));
    } catch (err: any) {
      console.error(err);
      showErrorNotification(
        t(`errors:${err?.data.error_code}`) || "Erro ao criar post"
      );
      setSubmitError(
        t(`errors:${err?.data.error_code}`) || "Erro ao criar post"
      );
    }
  });


  return {
    form,
    handleSubmit,
    submitError,
    submitSuccess,
    isSubmitting: isLoading,
  };
};
