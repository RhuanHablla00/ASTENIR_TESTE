import { useCallback, useMemo, useState } from "react";

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

const ALL_OPERATIONS: PermOperation[] = [
  "create",
  "get_by_id",
  "get_all",
  "update",
  "delete",
];

const ALL_COLLECTIONS: CollectionKey[] = [
  "users",
  "workspaces",
  "workspacesusers",
  "workspacesentities",
  "connections",
  "credentials",
  "messages",
  "workspacesinvites",
  "insights",
  "posts",
  "metaadaccounts",
  "metapixels",
  "metaproductcatalogs",
  "whatsapptemplates",
  "leads",
  "events",
  "systemusers",
  "permissions",
];

export function useWorkspacePermissions(
  initial?: Partial<WorkspacePermissions>
) {
  const [permissions, setPermissions] = useState<WorkspacePermissions>(() => {
    return ALL_COLLECTIONS.reduce((acc, key) => {
      const initialConfig = initial?.[key];

      acc[key] = {
        allow_all: initialConfig?.allow_all ?? true,
        operations: initialConfig?.operations
          ? [...initialConfig.operations]
          : [...ALL_OPERATIONS],
      };

      return acc;
    }, {} as WorkspacePermissions);
  });

  const setMode = useCallback(
    (collection: CollectionKey, allowAll: boolean) => {
      setPermissions((prev) => ({
        ...prev,
        [collection]: {
          allow_all: allowAll,
          operations: allowAll ? [...ALL_OPERATIONS] : [],
        },
      }));
    },
    []
  );

  const toggleOperation = useCallback(
    (collection: CollectionKey, op: PermOperation) => {
      setPermissions((prev) => {
        const current = prev[collection];
        const exists = current.operations.includes(op);

        const nextOps = exists
          ? current.operations.filter((o) => o !== op)
          : [...current.operations, op];

        return {
          ...prev,
          [collection]: {
            allow_all: nextOps.length === ALL_OPERATIONS.length,
            operations: nextOps,
          },
        };
      });
    },
    []
  );

  const payload = useMemo<WorkspacePermissions>(() => {
    return permissions;
  }, [permissions]);

  return {
    permissions,
    setMode,
    toggleOperation,
    payload,
  };
}
