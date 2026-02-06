import { useState } from "react";
import { useGetWhatsappTemplatesQuery, useGetWhatsappTemplateByIdQuery} from "@/api/whatsappApi";

interface UseWhatsappTemplatesProps {
  connection_id: string;
}

export const useWhatsappTemplates = ({
  connection_id,
}: UseWhatsappTemplatesProps) => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetWhatsappTemplatesQuery(
    { connection_id },
    {
      skip: !connection_id,
      refetchOnMountOrArgChange: true,
    }
  );


  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);


  const {
    data: templateByIdData,
    isFetching: isTemplateFetching,
    isError: isTemplateError,
  } = useGetWhatsappTemplateByIdQuery(
    {
      connection_id,
      template_id: selectedTemplateId as string,
    },
    {
      skip: !connection_id || !selectedTemplateId,
    }
  );

  const selectTemplate = (template_id: string | null) => {
    setSelectedTemplateId((prev) =>
      prev === template_id ? null : template_id
    );
  };

  return {
    templates: data?.results || [],
    loading: isLoading,
    isFetching,
    isError,
    error,
    refetch,
    selectTemplate,
    selectedTemplateId,
    selectedTemplate: templateByIdData ?? null,
    selectedTemplateFetching: isTemplateFetching,
    selectedTemplateError: isTemplateError,
  };
};
