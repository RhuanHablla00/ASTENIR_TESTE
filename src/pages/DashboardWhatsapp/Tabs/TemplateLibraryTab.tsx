import WhatsAppTemplatesGrid from "@/components/TemplateWhatsapp/WhatsAppTemplatesGrid";

interface TemplateLibraryTabProps {
  onSelect: (template: any) => void;
}

export default function TemplateLibraryTab({ onSelect }: TemplateLibraryTabProps) {
  return <WhatsAppTemplatesGrid onSelect={onSelect} />;
}