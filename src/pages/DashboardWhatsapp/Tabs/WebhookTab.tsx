import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useTranslation } from "react-i18next";
import Button from "@/components/Base/Button";
import { FormInput } from "@/components/Base/Form";
import { showErrorNotification, showSuccessNotification } from "@/components/Base/Notification";
import { useDeleteWebhookMutation, useGetConnectionIdQuery, useUpdateWebhookMutation } from "@/api/connectionsApi";

const webhookSchema = z.object({
  webhooks: z.array(
    z.object({
      id: z.string().optional(),
      url: z.string().min(1, "URL é obrigatória"),
      token: z.string().optional().or(z.literal("")),
    })
  ),
});

type WebhookFormValues = z.infer<typeof webhookSchema>;

interface WebhookTabProps {
  connectionId: string;
}

export default function WebhookTab({ connectionId }: WebhookTabProps) {
  const { t } = useTranslation();
  const { data, refetch } = useGetConnectionIdQuery(connectionId);
  const [updateWebhook] = useUpdateWebhookMutation();
  const [deleteWebhookApi] = useDeleteWebhookMutation();

  const { control, register, handleSubmit, reset, formState: { errors } } = useForm<WebhookFormValues>({
    resolver: zodResolver(webhookSchema),
    defaultValues: { webhooks: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "webhooks",
    keyName: "formId",
  });

  useEffect(() => {
    if (data?.webhooks) {
      const formatted = data.webhooks.length > 0
        ? data.webhooks.map((w: any) => ({ id: w.uuid, url: w.url, token: w.token ?? "" }))
        : [{ url: "", token: "" }];
      reset({ webhooks: formatted });
    }
  }, [data, reset]);

  const handleSaveWebhook = async (index: number, values: WebhookFormValues) => {
    const webhook = values.webhooks[index];
    if (!webhook.url?.trim()) {
      showErrorNotification("A URL é obrigatória");
      return;
    }
    try {
      await updateWebhook({
        connection_id: connectionId,
        webhook_id: webhook.id,
        body: { url: webhook.url, token: webhook.token },
      }).unwrap();
      await refetch();
      showSuccessNotification("Webhook salvo com sucesso!");
    } catch (err) {
      showErrorNotification("Erro ao salvar webhook");
    }
  };

  const handleDelete = async (index: number, field: any) => {
    if (!field.id) {
      remove(index);
      return;
    }
    try {
      await deleteWebhookApi({ connection_id: connectionId, webhook_id: field.id }).unwrap();
      remove(index);
      showSuccessNotification("Webhook deletado!");
    } catch {
      showErrorNotification("Erro ao deletar webhook");
    }
  };

  return (
    <div className="col-span-12">
      <div className="p-5 box box--stacked">
        <div className="text-base font-medium mb-4">{t('configured_webhooks')}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field, index) => (
            <div key={field.formId} className="p-4 border border-slate-300/70 rounded-lg bg-slate-50 box">
              <div className="font-medium text-slate-600 mb-3">Webhook #{index + 1}</div>

              <label className="text-xs text-slate-500">URL</label>
              <FormInput
                placeholder="https://meu-webhook.com/event"
                className="mt-1"
                {...register(`webhooks.${index}.url`)}
              />
              {errors.webhooks?.[index]?.url && <span className="text-danger text-xs">{errors.webhooks[index]?.url?.message}</span>}

              <label className="text-xs text-slate-500 mt-3 block">Token (opcional)</label>
              <FormInput
                placeholder="seu-token-aqui"
                className="mt-1"
                {...register(`webhooks.${index}.token`)}
              />

              <div className="flex w-full gap-4 mt-3">
                <Button variant="primary" className="w-full" onClick={handleSubmit((v) => handleSaveWebhook(index, v))}>
                  {t('save_webhook')}
                </Button>
                <Button variant="outline-danger" className="w-full" onClick={() => handleDelete(index, field)}>
                  {t('remove')}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline-secondary" className="w-1/2 mt-4" onClick={() => append({ url: "", token: "" })}>
          + {t('add_webhook')}
        </Button>
      </div>
    </div>
  );
}