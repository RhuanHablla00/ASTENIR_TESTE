import { useEffect, useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import TomSelect from "@/components/Base/TomSelect";
import { FormInput, FormLabel } from "@/components/Base/Form";
import Button from "@/components/Base/Button";
import Lucide from "@/components/Base/Lucide";
import { useSendWhatsappTemplateMutation } from "@/api/whatsappApi";
import { showErrorNotification, showSuccessNotification } from "@/components/Base/Notification";

interface MessageSenderTabProps {
  connectionId: string;
  templates: any[];
  selectTemplate: (id: string) => void;
  selectedTemplate: any;
}

export default function MessageSenderTab({ connectionId, templates, selectTemplate, selectedTemplate }: MessageSenderTabProps) {
  const { t } = useTranslation();
  const [detectedVariables, setDetectedVariables] = useState<string[]>([]);
  const [sendTemplate] = useSendWhatsappTemplateMutation();

  // --- LÓGICA (Mantida igual) ---

  const schema = useMemo(() => {
    return z.object({
      phone: z.string()
        .min(1, t("field_required") || "Telefone é obrigatório")
        .regex(/^[0-9]+$/, t("only_numbers") || "Apenas números são permitidos"),

      templateId: z.string().min(1, t("select_template_required") || "Selecione um modelo"),

      variables: z.record(z.string(), z.string()).superRefine((val, ctx) => {
        if (detectedVariables.length > 0) {
          detectedVariables.forEach((variable) => {
            if (!val || !val[variable] || val[variable].trim() === "") {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: t("field_required") || "Campo obrigatório",
                path: [variable],
              });
            }
          });
        }
      }),
    });
  }, [detectedVariables, t]);

  type MessageFormValues = z.infer<typeof schema>;

  const { control, register, handleSubmit, setValue, watch, formState: { errors } } = useForm<MessageFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { templateId: "", phone: '', variables: {} },
    mode: "onChange"
  });

  const watchedVariables = watch("variables");
  const watchedTemplateId = watch("templateId");

  useEffect(() => {
    if (watchedTemplateId) {
      selectTemplate(watchedTemplateId);
      setValue("variables", {});
    }
  }, [watchedTemplateId]);

  useEffect(() => {
    if (selectedTemplate && selectedTemplate.data && selectedTemplate.data.components) {
      const allMatches: string[] = [];
      const regex = /{{(.*?)}}/g;

      const headerComponent = selectedTemplate.data.components.find((c: any) => c.type === "HEADER" && c.format === "TEXT");
      if (headerComponent && headerComponent.text) {
        const headerMatches = [...headerComponent.text.matchAll(regex)].map(match => match[1]);
        allMatches.push(...headerMatches);
      }

      const bodyComponent = selectedTemplate.data.components.find((c: any) => c.type === "BODY");
      if (bodyComponent && bodyComponent.text) {
        const bodyMatches = [...bodyComponent.text.matchAll(regex)].map(match => match[1]);
        allMatches.push(...bodyMatches);
      }

      const uniqueVars = [...new Set(allMatches)];
      setDetectedVariables(uniqueVars);
    }
  }, [selectedTemplate]);

  const formatTextWithVariables = (text: string | undefined) => {
    if (!text) return "";
    let formattedText = text;
    detectedVariables.forEach(variable => {
      const value = watchedVariables?.[variable];
      const placeholder = `{{${variable}}}`;
      formattedText = formattedText.split(placeholder).join(value ? `**${value}**` : placeholder);
    });
    return formattedText;
  };

  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts?.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const onSubmit = async (data: MessageFormValues) => {
    try {
      await sendTemplate({
        connection_id: connectionId,
        template_id: data.templateId,
        phone: data.phone,
        variables: data.variables,
      }).unwrap();
      showSuccessNotification("Mensagem enviada com sucesso!");
    } catch (error) {
      showErrorNotification("Erro ao enviar mensagem.");
    }
  };

  const getHeader = () => selectedTemplate?.data?.components?.find((c: any) => c.type === "HEADER");
  const getFooter = () => selectedTemplate?.data?.components?.find((c: any) => c.type === "FOOTER");

  return (
    <div className="grid grid-cols-12 gap-6 p-4 w-full h-full"> {/* Adicionado h-full aqui se necessário, mas o grid já ajuda */}
      
      {/* Coluna da Esquerda: Inputs */}
      {/* min-h-full garante que a coluna estique se a da direita for maior */}
      <div className="col-span-12 lg:col-span-6 flex flex-col gap-6 min-h-full">
        
        {/* Input Modelo */}
        <div>
          <label className="w-full mb-2 block">
            <div className="text-left">
              <div className="flex items-center">
                <div className="font-medium">Modelo de mensagem</div>
              </div>
              <div className="mt-1.5 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                {t('select_a_template_for_send_message')}
              </div>
            </div>
          </label>
          <div className="w-full">
            <Controller
              control={control}
              name="templateId"
              render={({ field }) => (
                <div className="flex flex-col">
                  <TomSelect
                    value={field.value}
                    onChange={(e: any) => {
                      const val = e?.target ? e.target.value : e;
                      field.onChange(val);
                    }}
                    options={{
                      placeholder: t("select_a_template"),
                    }}
                    className={clsx("w-full", { "border-danger": errors.templateId })}
                  >
                    <option value="">{t("select_a_template")}</option>
                    {templates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </TomSelect>
                  {errors.templateId && <span className="text-danger text-xs mt-1">{errors.templateId.message}</span>}
                </div>
              )}
            />
          </div>
        </div>

        {/* Input Telefone */}
        <label className="w-full mb-2 block">
          <div className="text-left">
            <div className="flex items-center">
              <div className="font-medium">Telefone do Destinatário *</div>
            </div>
            <div className="mt-1.5 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
              Insira o número no formato DDI + DDD + Número (ex: 5511999999999)
            </div>
          </div>
          <FormInput
            type="text"
            className={clsx("w-full mt-2", { "border-danger": errors.phone })}
            placeholder="5511999999999"
            {...register("phone")}
          />
          {errors.phone && <span className="text-danger text-xs mt-1">{errors.phone.message}</span>}
        </label>

        {/* Inputs Variáveis e Botão */}
        {selectedTemplate && (
          // flex-1 aqui é o segredo: faz esse bloco ocupar todo o espaço restante vertical
          <div className="flex flex-col gap-6 flex-1"> 
            <div>
              <h3 className="font-medium text-base text-slate-800 dark:text-white mb-4">{t('variables')}</h3>

              {detectedVariables.length > 0 ? (
                <div className="space-y-4">
                  {detectedVariables.map((variable, index) => (
                    <div key={index} className="flex flex-col gap-2">
                      <FormLabel className="font-bold text-slate-700">
                        {`{{${variable}}}`}
                      </FormLabel>
                      <FormInput
                        type="text"
                        className={clsx("w-full", { "border-danger": errors.variables?.[variable] })}
                        placeholder={t('insert_variable')}
                        {...register(`variables.${variable}`)}
                      />
                      {errors.variables?.[variable] && (
                        <span className="text-danger text-xs mt-1">
                          {errors.variables[variable]?.message}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-slate-400 text-sm italic">
                  Este modelo não possui variáveis.
                </div>
              )}
            </div>

            {/* mt-auto empurra este botão para o fundo do container pai (que agora tem flex-1) */}
            <div className="mt-auto pt-6 border-t border-dashed border-slate-200">
              <Button variant="primary" className="w-full lg:w-auto" onClick={handleSubmit(onSubmit)}>
                <Lucide icon="Send" className="w-4 h-4 mr-2" />
                {t('send_message')}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Coluna da Direita: Preview Sticky */}
      <div className="col-span-12 lg:col-span-6">
        {selectedTemplate && (
          <div className="sticky top-4">
            <h3 className="font-medium text-base text-slate-800 dark:text-slate-200 mb-4">
              {t('template_preview')}
            </h3>
            
            <div className="relative w-full rounded-lg overflow-hidden bg-[#f3efe8] dark:bg-[#0b141a] min-h-[450px] flex flex-col p-4 shadow-inner transition-colors">
              <div 
                className="absolute inset-0 opacity-[0.06] dark:opacity-[0.03] pointer-events-none grayscale dark:invert" 
                style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')" }}
              >
              </div>

              <div className="bg-white dark:bg-[#202c33] rounded-lg p-3 rounded-tl-none shadow-sm relative self-start w-full max-w-[85%] z-10 transition-colors">
                
                {getHeader() && getHeader()?.format === 'TEXT' && (
                  <div className="font-bold text-black dark:text-slate-100 mb-1.5 text-sm">
                    {renderFormattedText?.(formatTextWithVariables(getHeader()?.text))}
                  </div>
                )}

                {getHeader() && getHeader()?.format === 'IMAGE' && (
                  <div className="w-full h-32 bg-slate-200 dark:bg-slate-700 rounded mb-2 flex items-center justify-center text-slate-400 dark:text-slate-500 text-xs">
                    <Lucide icon="Image" className="w-8 h-8 opacity-50" />
                  </div>
                )}

                <div className="text-[15px] text-gray-800 dark:text-gray-300 whitespace-pre-line leading-snug">
                  {renderFormattedText?.(formatTextWithVariables(selectedTemplate?.data?.components?.find((c: any) => c.type === "BODY")?.text))}
                </div>

                {getFooter() && (
                  <div className="text-[11px] text-gray-500 dark:text-slate-400 mt-2 pt-1">
                    {getFooter()?.text}
                  </div>
                )}

                <div className="flex justify-end items-center mt-1 gap-1 select-none">
                  <span className="text-[11px] text-gray-500/80 dark:text-[#8696a0]/80">00:00</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}