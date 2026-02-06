import { useCreateWhatsappTemplateMutation } from "@/api/whatsappApi";
import { ButtonType, MarketingType, TemplateButton, TemplateData } from "@/components/TemplateWhatsapp/templateTypes";
import { useState, useRef, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const getParamNames = (text: string) => {
  const matches = text.match(/{{(.*?)}}/g);
  if (!matches) return [];
  return matches.map(m => m.replace(/{{|}}/g, ''));
};

const VARIABLE_REGEX = /{{\s*([^{}]+?)\s*}}/g;
const META_NAMED_PATTERN = /^[a-z0-9_]+$/;

const BUTTON_LIMITS = {
  TOTAL: 10,
  URL: 2,
  PHONE_NUMBER: 1,
  COPY_CODE: 1,
};


const INITIAL_TEMPLATE_DATA: TemplateData = {
  category: "MARKETING",
  marketingType: "DEFAULT",
  name: "",
  language: "pt_BR",
  headerType: "none",
  headerText: "",
  body: "",
  footer: "",
  quickReplies: ["", "", ""],
  ctaType: "",
  ctaText: "",
  ctaValue: "",
  buttonType: "QUICK_REPLY",
  buttons: [],
  parameter_format: 'positional',
  variableExamples: {
    header: [],
    body: [],
  },
};
interface UseCreateTemplateProps {
  initialData?: TemplateData | null;
  initialStep?: number;
}

const mapButtonsToMeta = (buttons: TemplateButton[]) => {
  return buttons.map((btn) => {
    switch (btn.type) {
      case "QUICK_REPLY": return { type: "QUICK_REPLY", text: btn.text };
      case "URL": return { type: "URL", text: btn.text, url: btn.url, url_type: btn.urlType };
      case "PHONE_NUMBER": return { type: "PHONE_NUMBER", text: btn.text, phone_number: `+${btn.countryCode}${btn.phoneNumber}` };
      case "COPY_CODE": return { type: "COPY_CODE", text: btn.text, offer_code: btn.offerCode };
      default: throw new Error(`Unsupported button type: ${btn.type}`);
    }
  });
};

export const useCreateTemplate = ({ initialData, initialStep = 1 }: UseCreateTemplateProps = {}) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [templateData, setTemplateData] = useState<TemplateData>(initialData || INITIAL_TEMPLATE_DATA);
  const params = useParams();
  const connection_id = params.connection_id!;

  const refs = {
    header: useRef<HTMLInputElement>(null),
    body: useRef<HTMLTextAreaElement>(null),
  };

  const form = useForm({
    defaultValues: { connectionName: "", country: "pt_BR", templateName: "" },
  });

  const [createTemplateApi, { isLoading: creatingTemplate, isError, error, isSuccess }] = useCreateWhatsappTemplateMutation();

  const getVariables = (text: string) => {
    const matches = [...text.matchAll(VARIABLE_REGEX)];
    return matches.map(m => m[0]);
  };

  const variables = useMemo(() => ({
    header: getVariables(templateData.headerText),
    body: getVariables(templateData.body)
  }), [templateData.headerText, templateData.body]);

  const updateTemplateData = useCallback((patch: Partial<TemplateData>) => {
    setTemplateData((prev) => ({ ...prev, ...patch }));
  }, []);

  const addVariable = useCallback((type: "header" | "body") => {
    const format = templateData.parameter_format || "positional";
    const element = refs[type].current;

    if (validationErrors[type]) return;

    if (!element) return;

    const text = type === "header" ? templateData.headerText : templateData.body;
    const matches = [...text.matchAll(VARIABLE_REGEX)].map(m => m[1].trim());

    if (type === "header" && matches.length >= 1) return;

    let newVariable = "";
    let cursorOffset = 0;

    if (format === "named") {
      newVariable = "{{}}";
      cursorOffset = 2;
    } else {
      const existingNumbers = matches.filter(val => !isNaN(Number(val))).map(n => Number(n));
      const nextNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;
      newVariable = `{{${nextNumber}}}`;
      cursorOffset = newVariable.length;
    }

    const start = element.selectionStart ?? text.length;
    const end = element.selectionEnd ?? text.length;
    const updatedText = text.slice(0, start) + newVariable + text.slice(end);

    updateTemplateData(type === "header" ? { headerText: updatedText } : { body: updatedText });

    requestAnimationFrame(() => {
      element.focus();
      const newPos = start + cursorOffset;
      element.setSelectionRange(newPos, newPos);
    });
  }, [templateData.headerText, templateData.body, templateData.parameter_format, updateTemplateData, refs]);

  const handleExampleChange = useCallback((type: "header" | "body", index: number, value: string) => {
    setTemplateData(prev => {
      const newExamples = { ...prev.variableExamples };
      const list = [...(newExamples[type] || [])];
      list[index] = value;
      newExamples[type] = list;
      return { ...prev, variableExamples: newExamples };
    });
  }, []);

  const getValidationError = useCallback((text: string, format: "named" | "positional", type: "header" | "body") => {
    if (!text) return undefined;

    const matches = [...text.matchAll(VARIABLE_REGEX)].map(m => m[1].trim());
    if (matches.length === 0) return undefined;

    const hasPositional = matches.some(val => !isNaN(Number(val)));
    const hasNamed = matches.some(val => isNaN(Number(val)));
    const hasInvalidFormat = matches.some(val => isNaN(Number(val)) && !META_NAMED_PATTERN.test(val));

    if (format === "named" && hasPositional) {
      return t("error_cannot_add_named_with_numbers");
    }
    if (format === "positional" && hasNamed) {
      return t("error_cannot_add_number_with_text");
    }

    if (format === "named" && hasInvalidFormat) {
      return t("error_variable_format_invalid");
    }

    if (type === "header" && matches.length > 1) {
      return t("error_header_limit_reached");
    }

    return undefined;
  }, [t]);

  const validationErrors = useMemo(() => {
    const format = templateData.parameter_format || "positional";
    return {
      header: getValidationError(templateData.headerText, format, "header"),
      body: getValidationError(templateData.body, format, "body")
    };
  }, [templateData.headerText, templateData.body, templateData.parameter_format, getValidationError]);

  const steps = useMemo(() => [
    { id: 1, label: t('template_creation') },
    { id: 2, label: t('submit_for_review') },
  ], [t]);

  const handleNext = async (e?: React.MouseEvent) => {
    e?.preventDefault();

    if (validationErrors.header || validationErrors.body) {
      return;
    }

    if (currentStep === 1 && await form.trigger("connectionName")) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const buttonCounts = useMemo(() => {
    const counts = { URL: 0, PHONE_NUMBER: 0, COPY_CODE: 0, QUICK_REPLY: 0, TOTAL: templateData.buttons.length };
    templateData.buttons.forEach(b => { if (counts[b.type as keyof typeof counts] !== undefined) counts[b.type as keyof typeof counts]++; });
    return counts;
  }, [templateData.buttons]);

  const addButton = useCallback((type: ButtonType) => {
    if (buttonCounts.TOTAL >= BUTTON_LIMITS.TOTAL) return;
    const limit = BUTTON_LIMITS[type as keyof typeof BUTTON_LIMITS];

    if (limit !== undefined) {
      const currentCount = (buttonCounts as any)[type] || 0;
      if (currentCount >= limit) return;
    }

    const newButton: TemplateButton = {
      type,
      text: "",
      urlType: "STATIC",
      countryCode: "BR",
    };

    setTemplateData(prev => ({
      ...prev,
      buttons: [...prev.buttons, newButton]
    }));
  }, [buttonCounts]);

  const removeButton = useCallback((index: number) => {
    setTemplateData(prev => ({ ...prev, buttons: prev.buttons.filter((_, i) => i !== index) }));
  }, []);

  const updateButton = useCallback((index: number, field: keyof TemplateButton, value: any) => {
    setTemplateData(prev => {
      const newButtons = [...prev.buttons];
      newButtons[index] = { ...newButtons[index], [field]: value };
      return { ...prev, buttons: newButtons };
    });
  }, []);

  const changeMarketingType = useCallback((type: MarketingType) => {
    setTemplateData((prev: any) => {
      const base = { ...prev, marketingType: type };

      if (type === "CATALOG") {
        return { ...base, catalogFormat: "CATALOG_MESSAGE", headerType: "text", headerText: "Hello", buttons: [{ type: "CATALOG_VIEW", text: "View catalog", urlType: "STATIC" }] };
      }

      if (type === "CALL_PERMISSION") {
        return { ...base, catalogFormat: undefined, headerType: prev.headerType === 'none' ? 'none' : 'text', buttons: [{ type: "CALL_PERMISSION_VIEW", text: "Choose preference", urlType: "STATIC" }] };
      }

      if (["CATALOG", "CALL_PERMISSION"].includes(prev.marketingType)) {
        return { ...base, buttons: [], catalogFormat: undefined, headerType: prev.marketingType === "CATALOG" ? "none" : "text", headerText: prev.marketingType === "CATALOG" ? "" : prev.headerText };
      }

      return base;
    });
  }, []);

  const changeCategory = useCallback((newCategory: any) => {
    setTemplateData((prev) => {
      if (newCategory === "AUTHENTICATION") {
        return {
          ...prev, category: "AUTHENTICATION", marketingType: "DEFAULT", headerType: "none", headerText: "",
          body: "{{1}} is your verification code. For your security, do not share this code.",
          codeDeliveryMethod: "COPY_CODE", buttons: [{ type: "OTP_COPY", text: "Copy code", urlType: "STATIC" }]
        };
      }
      return prev.category === "AUTHENTICATION"
        ? { ...prev, category: newCategory, body: "", buttons: [], codeDeliveryMethod: undefined }
        : { ...prev, category: newCategory };
    });
  }, []);

  const submitTemplate = async () => {
    if (validationErrors.header || validationErrors.body) return;

    const { name, category, language, headerType, headerText, body, footer, buttons, parameter_format, variableExamples } = templateData;

    const isNamed = parameter_format === "named";

    const components: any[] = [
      {
        type: "BODY",
        text: body,
        ...(variableExamples.body.length > 0 && {
          example: {
            [isNamed ? "body_text_named_params" : "body_text"]: isNamed
              ? getParamNames(body).map((paramName, index) => ({
                param_name: paramName,
                example: variableExamples.body[index] || ""
              }))
              : [variableExamples.body]
          }
        })
      },
      ...(headerType !== "none"
        ? [{
          type: "HEADER",
          format: headerType.toUpperCase(),
          text: headerText,
          ...(headerType === "text" && variableExamples.header.length > 0 && {
            example: {
              [isNamed ? "header_text_named_params" : "header_text"]: isNamed
                ? getParamNames(headerText).map((paramName, index) => ({
                  param_name: paramName,
                  example: variableExamples.header[index] || ""
                }))
                : [variableExamples.header]
            }
          })
        }]
        : []),
      ...(footer ? [{ type: "FOOTER", text: footer }] : []),
      ...(buttons.length ? [{ type: "BUTTONS", buttons: mapButtonsToMeta(buttons) }] : []),
    ];

    return await createTemplateApi({
      connection_id,
      name,
      category,
      language,
      components,
      parameter_format: parameter_format || "positional"
    }).unwrap();
  };

  return {
    t,
    currentStep,
    steps,
    templateData,
    updateTemplateData,
    validationErrors,
    form,
    refs: { headerInputRef: refs.header, bodyTextareaRef: refs.body },
    variables: { headerVariables: variables.header, bodyVariables: variables.body },
    handlers: {
      addVariable,
      handleHeaderChange: (val: string) => updateTemplateData({ headerText: val }),
      handleBodyChange: (val: string) => updateTemplateData({ body: val }),
      handleNext,
      handlePrev,
      handleExampleChange,
      changeMarketingType,
      changeCategory,
    },
    buttonActions: { addButton, removeButton, updateButton, getButtonCounts: () => buttonCounts },
    submitTemplate,
    creatingTemplate,
    isSuccess,
    createError: isError ? error : null,
  };
}