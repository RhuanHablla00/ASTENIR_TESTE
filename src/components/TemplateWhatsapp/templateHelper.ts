import { TemplateExample } from "./templatesExamples";
import { TemplateButton, TemplateData } from "./templateTypes";

export const mapExampleToTemplateData = (example: TemplateExample): TemplateData => {
  const mappedButtons: TemplateButton[] = (example.buttons || []).map((btnText: string) => {
    const textLower = btnText.toLowerCase();

    if (textLower.includes("call") || textLower.includes("ligar")) {
      return { type: "PHONE_NUMBER", text: btnText, countryCode: "55", phoneNumber: "" };
    }
    if (textLower.includes("track") || textLower.includes("visit") || textLower.includes("site")) {
      return { type: "URL", text: btnText, url: "https://", urlType: "STATIC" };
    }
    return { type: "QUICK_REPLY", text: btnText };
  });

  return {
    category: example.category.toUpperCase(),
    marketingType: "DEFAULT",
    name: example.footerId || "",
    language: "pt_BR",
    parameter_format: "named",
    headerType: "text",
    headerText: example.title,
    body: example.body,
    footer: example.footerId,
    quickReplies: [],
    ctaType: "",
    ctaText: "",
    ctaValue: "",
    buttonType: mappedButtons.length > 0 ? mappedButtons[0].type : "QUICK_REPLY",
    buttons: mappedButtons,
    variableExamples: {
      header: [], 
      body: [] 
    },
  };
};