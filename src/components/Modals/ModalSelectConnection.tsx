import { useTranslation } from "react-i18next";
import clsx from "clsx";
import Lucide from "@/components/Base/Lucide";
import { useGetAllConnectionsQuery } from "@/api/connectionsApi";
import { useAppSelector } from "@/stores/hooks";

interface ModalSelectConnectionProps {
  onClose: () => void;
  onConfirm: (connection: any) => void; 
}

export default function ModalSelectConnection({ 
  onClose, 
  onConfirm, 
}: ModalSelectConnectionProps) {
  const { t } = useTranslation();
  const workspaceId = useAppSelector((state) => state.workspace.selectedWorkspace?.id);

  const { data, isLoading } = useGetAllConnectionsQuery({ 
    workspace: workspaceId,
  });

  const handleSelectConnection = (connection: any) => {
    onConfirm(connection);
    onClose();
  };

  return (
    <div className="flex flex-col gap-y-4">
      {isLoading && (
        <div className="flex justify-center items-center py-10">
           <Lucide icon="Loader2" className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {!isLoading && (!data?.results || data.results.length === 0) && (
        <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-md border border-dashed dark:bg-darkmode-400 border-slate-200 dark:border-darkmode-400">
          {t('no_connections_found')}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto p-1">
        {data?.results?.map((connection: any) => (
          <div
            key={connection.id}
            onClick={() => handleSelectConnection(connection)}
            className={clsx(
              "p-4 border rounded-lg cursor-pointer transition-all duration-200",
              "hover:border-primary hover:shadow-md hover:bg-slate-50 dark:hover:bg-darkmode-700",
              "bg-white dark:bg-darkmode-600 border-slate-200 dark:border-darkmode-400",
              "flex items-center gap-4"
            )}
          >
            <div className="w-12 h-12 flex-shrink-0 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
              {connection?.additional_info?.page_picture ? (
                 <img src={connection.additional_info.page_picture} alt={connection.name} className="w-full h-full object-cover" />
              ) : (
                 <Lucide icon="Instagram" className="w-6 h-6 text-slate-400" /> 
              )}
            </div>

            <div className="flex flex-col overflow-hidden">
              <span className="font-medium text-slate-700 dark:text-slate-200 truncate">
                {connection.name}
              </span>
              <span className="text-xs text-slate-500 capitalize">
                {connection.scope || "Instagram"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}