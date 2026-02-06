import { useCreatePermissionMutation, useGetPermissionsQuery } from "@/api/permissionsApi";
import { showSuccessNotification } from "@/components/Base/Notification";
import { useWorkspacePermissions } from "@/hooks/useWorkspacePermissions";
import { useAppSelector } from "@/stores/hooks";
import React from "react";
import { useTranslation } from "react-i18next";

export type CollectionKey =
  | "users"
  | "workspaces"
  | "workspacesusers"
  | "workspacesentities"
  | "connections"
  | "credentials"
  | "messages"
  | "workspacesinvites"
  | "insights"
  | "posts"
  | "metaadaccounts"
  | "metapixels"
  | "metaproductcatalogs"
  | "whatsapptemplates"
  | "leads"
  | "events"
  | "systemusers"
  | "permissions";

export type PermOperation =
  | "create"
  | "get_by_id"
  | "get_all"
  | "update"
  | "delete";

export interface WorkspacePermissionConfig {
  allow_all: boolean;
  operations: PermOperation[];
}

export type WorkspacePermissions = Record<
  CollectionKey,
  WorkspacePermissionConfig
>;

interface CollectionDef {
  key: CollectionKey;
  label: string;
  description: string;
}

interface OperationDef {
  key: PermOperation;
  label: string;
}

const COLLECTIONS: CollectionDef[] = [
  { key: "users", label: 'users', description: 'users_desc' },
  { key: "workspaces", label: 'organizations', description: 'organizations_desc' },
  { key: "workspacesusers", label: 'workspace_users', description: 'workspace_users_desc' },
  { key: "workspacesentities", label: 'entities', description: 'entities_desc' },
  { key: "connections", label: 'connections_title', description: 'connections_desc' },
  { key: "credentials", label: 'credentials', description: 'credentials_desc' },
  { key: "messages", label: 'messages', description: 'messages_desc' },
  { key: "workspacesinvites", label: 'invites', description: 'invites_desc' },
  { key: "insights", label: "Insights", description: 'insights_desc' },
  { key: "posts", label: 'posts', description: 'posts_desc' },
  { key: "metaadaccounts", label: 'meta_ad_accounts', description: 'meta_ad_accounts' },
  { key: "metapixels", label: "Meta Pixels", description: 'meta_pixels_desc' },
  { key: "metaproductcatalogs", label: 'catalogs', description: 'catalogs_desc' },
  { key: "whatsapptemplates", label: 'templates_whatsapp', description: 'templates_whatsapp' },
  { key: "leads", label: "Leads", description: 'leads_desc' },
  { key: "events", label: 'events', description: 'events_desc' },
  { key: "systemusers", label: 'system_users', description: 'system_users_desc' },
];

const OPERATIONS: OperationDef[] = [
  { key: "create", label: 'create' },
  { key: "get_by_id", label: 'view' },
  { key: "get_all", label: 'list' },
  { key: "update", label: 'edit' },
  { key: "delete", label: 'delete' },
];

interface PermissionCardProps {
  collection: CollectionDef;
  config: WorkspacePermissionConfig;
  onSetMode: (key: CollectionKey, allowAll: boolean) => void;
  onToggleOp: (key: CollectionKey, op: PermOperation) => void;
}

const PermissionCard = React.memo(
  ({ collection, config, onSetMode, onToggleOp }: PermissionCardProps) => {
    const isAllowAll = config.allow_all;
    const { t } = useTranslation();
    
    return (
      <div className="flex flex-col p-6 bg-slate-50 border border-slate-200/60 text-slate-500 rounded-2xl shadow-sm h-full 
      dark:bg-darkmode-600 dark:border-darkmode-400 dark:text-slate-300">
      
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {t(collection.label)}
        </h3>
        <p className="text-xs text-gray-500 dark:text-slate-400">
          {t(collection.description)}
        </p>
      </div>
    
      <div className="flex gap-3 mb-5">
        <label className={`flex-1 p-3 rounded-xl cursor-pointer border transition-colors 
          ${isAllowAll 
            ? "border-violet-600 bg-violet-50 dark:bg-violet-500/10 dark:border-violet-500" 
            : "border-gray-200 dark:border-darkmode-400 dark:bg-darkmode-400 hover:bg-white dark:hover:bg-darkmode-300"
          }`}>
          <div className="flex items-center">
            <input
              type="radio"
              checked={isAllowAll}
              onChange={() => onSetMode(collection.key, true)}
              className="accent-violet-600"
            />
            <span className={`pl-2 font-medium ${isAllowAll ? "text-violet-700 dark:text-violet-300" : "text-slate-600 dark:text-slate-400"}`}>
              {t('total_access')}
            </span>
          </div>
        </label>
    
        <label className={`flex-1 p-3 rounded-xl cursor-pointer border transition-colors 
          ${!isAllowAll 
            ? "border-violet-600 bg-violet-50 dark:bg-violet-500/10 dark:border-violet-500" 
            : "border-gray-200 dark:border-darkmode-400 dark:bg-darkmode-400 hover:bg-white dark:hover:bg-darkmode-300"
          }`}>
          <div className="flex items-center">
            <input
              type="radio"
              checked={!isAllowAll}
              onChange={() => onSetMode(collection.key, false)}
              className="accent-violet-600"
            />
            <span className={`pl-2 font-medium ${!isAllowAll ? "text-violet-700 dark:text-violet-300" : "text-slate-600 dark:text-slate-400"}`}>
              {t('personalize')}
            </span>
          </div>
        </label>
      </div>
    
      <div className={isAllowAll ? "opacity-40 pointer-events-none select-none filter grayscale transition-all" : "transition-all"}>
        <div className="flex flex-wrap gap-2">
          {OPERATIONS.map((op) => {
            const active = config.operations.includes(op.key);
            return (
              <button
                key={op.key}
                onClick={() => onToggleOp(collection.key, op.key)}
                className={`px-3 py-1.5 rounded-full text-xs border
                  ${active 
                    ? "bg-violet-100 border-violet-500 text-violet-700 font-medium dark:bg-violet-500/20 dark:border-violet-400 dark:text-violet-300" 
                    : "border-gray-200 text-gray-600 bg-white hover:bg-gray-50 dark:bg-transparent dark:border-slate-600 dark:text-slate-400 dark:hover:bg-darkmode-400"
                  }`}
              >
                {t(op.label)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
    );
  }
);

PermissionCard.displayName = "PermissionCard";

const Permissions: React.FC = () => {
  const { t } = useTranslation();
  const workspaceId = useAppSelector((state) => state.workspace!.selectedWorkspace!.id);

  const { 
    data, 
    isLoading: isLoadingGet,
    refetch
  } = useGetPermissionsQuery({workspaceId}, {refetchOnMountOrArgChange: true});

  const [createPermission, { isLoading: isSaving }] = useCreatePermissionMutation();

  const { permissions, setMode, toggleOperation } = useWorkspacePermissions(
  );

  const handleSave = async () => {
    try {
      await createPermission({
        workspaceId,
        body: {
          name: "Permissão customizada",
          description: "Criada via UI",
          permissions,
        },
      }).unwrap();
      refetch();
      showSuccessNotification(t('var_successfully_saved_pl', {var:t('permissions')}))
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <div className="flex flex-col box box--stacked">
          <div className="flex justify-between items-center p-3 px-5 border-b border-dashed border-slate-300/70">
          <div className="font-medium text-[0.94rem]">
            {t("permissions")}
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving || isLoadingGet}
            className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSaving ? t('saving') : t('save_permissions')}
          </button>
           </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6  p-5">
              {COLLECTIONS.map((col) => (
                <PermissionCard
                  key={col.key}
                  collection={col}
                  config={permissions[col.key]}
                  onSetMode={setMode}
                  onToggleOp={toggleOperation}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Permissions;
