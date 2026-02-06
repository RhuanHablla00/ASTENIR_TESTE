import { z } from "zod";

export const templateNameSchema = z
  .string()
  .transform((value) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z_\s]/g, "")
      .trim()
      .replace(/[_\s]+/g, "_")
  )
  .refine(
    (value) => /^[a-z]+(_[a-z]+)*$/.test(value),
    "O nome do template deve conter apenas letras minúsculas e underline"
  );

export type Category = "MARKETING" | "UTILITY" | "AUTHENTICATION";
export type MarketingType = "DEFAULT" | "CATALOG" | "CALL_PERMISSION" | "FLOWS" | "ORDER_DETAILS" | "ORDER_STATUS";
export type HeaderType = "NONE" | "TEXT" | "IMAGE" | "VIDEO" | "DOCUMENT";
export type ButtonType = "QUICK_REPLY" | "PHONE_NUMBER" | "URL" | "COPY_CODE" | "VOICE_CALL" | "CALL_PERMISSION_VIEW" | "OTP_COPY";
export type CatalogFormat = "CATALOG_MESSAGE" | "MULTI_PRODUCT_MESSAGE";
export interface TemplateData {
  category: Category;
  marketingType: MarketingType;
  name: string;
  language: string;
  headerType: "none" | "text" | "image" | "video" | "document";
  headerText: string;
  body: string;
  footer: string;
  buttonType: ButtonType;
  quickReplies: string[];
  ctaType: string;
  ctaText: string;
  ctaValue: string;
  buttons: TemplateButton[];
  catalogFormat?: CatalogFormat;
  codeDeliveryMethod?: "COPY_CODE" | "ONE_TAP" | "ZERO_TAP";
  parameter_format?: "positional" | "named",
  variableExamples: {
    header: string[];
    body: string[];
  };
}


export interface TemplateButton {
  type: ButtonType;
  text: string;
  urlType?: "STATIC" | "DYNAMIC";
  url?: string;
  phoneNumber?: string;
  countryCode?: string;
  offerCode?: string;
}