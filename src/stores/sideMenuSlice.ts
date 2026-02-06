import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { icons } from "@/components/Base/Lucide/icons";

export type UsageType = "whatsapp" | "instagram" | "default";

export interface Menu {
  icon: keyof typeof icons;
  title: string;
  badge?: number;
  pathname?: string;
  subMenu?: Menu[];
  ignore?: boolean;
  modalTrigger?: string;
  modalLink?: string;
  usageTypes?: UsageType[];
}

export interface SideMenuState {
  menu: Array<Menu | string>;
}

const getCurrentUsageType = (): string => {
  try {
    if (typeof window !== "undefined") {
      return localStorage.getItem("@astenir.usage_type") || "default";
    }
  } catch (e) {
    console.error("Erro ao acessar localStorage", e);
  }
  return "default";
};

const currentUsage = getCurrentUsageType();

const rawMenu: Array<Menu | string> = [
  "",
  {
    icon: "LayoutDashboard",
    title: 'GENERAL',
    subMenu: [
      {
        icon: "KanbanSquare",
        pathname: "/workspace/:workspaceId",
        title: "initial_page",
      },
    ]
  },
  {
    icon: "Cpu",
    title: "OPERATION",
    subMenu: [
      {
        icon: "KanbanSquare",
        pathname: "#",
        title: "Templates",
        modalTrigger: "select-connection",
        modalLink: "/workspace/:workspaceId/connections/whatsapp_messaging/:connectionId?tab=templates",
      },
      {
        icon: "Image",
        pathname: "#",
        title: "Posts",
        modalTrigger: "select-connection",
        modalLink: "/workspace/:workspaceId/connections/instagram/:connectionId/:external_id/?tab=posts",
      },
    ]
  },
  {
    icon: "Target", 
    title: "TRACKING & PIXELS",
    subMenu: [
      {
        icon: "LayoutDashboard",
        pathname: "/workspace/:workspaceId/dashboard",
        title: 'Dashboard',
      },
      {
        icon: "Link",
        pathname: "/workspace/:workspaceId/connections/website",
        title: "connections",
      },
      {
        icon: "Code",
        pathname: "/workspace/:workspaceId/tags",
        title: "Tags",
      },
      {
        icon: "ArrowLeftRight",
        pathname: "/workspace/:workspaceId/conversions",
        title: "Conversions",
      },
      {
        icon: "MessageCircle",
        pathname: "/workspace/:workspaceId/whatsapp-tracker",
        title: "WhatsApp Tracker",
      },
      {
        icon: "MessageSquare",
        pathname: "/workspace/:workspaceId/messenger-tracker",
        title: "Messenger Tracker",
      },
      {
        icon: "FlaskConical",
        pathname: "/workspace/:workspaceId/test-tracker",
        title: "Teste do Tracker",
      },
      {
        icon: "Bug",
        pathname: "/workspace/:workspaceId/debug-tracker",
        title: "Debug Cookies",
      },
    ]
  },
  {
    icon: "Settings",
    title: "WORKSPACE",
    subMenu: [
      {
        icon: "Settings",
        pathname: "/workspace/:workspaceId/workspace-settings",
        title: "general_settings",
      },
    ]
  },
  {
    icon: "BarChart3",
    title: "ANALYTICS & MARKETING",
    subMenu: [
      {
        icon: "Users",
        pathname: "/workspace/:workspaceId/leads",
        title: "Leads",
      },
      {
        icon: "Route",
        pathname: "/workspace/:workspaceId/journeys",
        title: "Journey Analytics",
      },
      {
        icon: "Share2",
        pathname: "/workspace/:workspaceId/social-media",
        title: "Mídias Sociais",
      },
      {
        icon: "FileText",
        pathname: "/workspace/:workspaceId/meta-leads",
        title: "Meta Lead Forms",
      },
      {
        icon: "Activity",
        pathname: "/workspace/:workspaceId/events",
        title: "Eventos",
      },
      {
        icon: "Globe",
        pathname: "/workspace/:workspaceId/attribution",
        title: "Atribuição",
      },
      {
        icon: "Search",
        pathname: "/workspace/:workspaceId/seo-analyser",
        title: "SEO Analyser",
      },
    ]
  },
  {
    icon: "Hammer",
    title: "BUILDERS",
    subMenu: [
      {
        icon: "Globe",
        pathname: "/workspace/:workspaceId/forms",
        title: "Formulários",
      },
      {
        icon: "Globe",
        pathname: "/workspace/:workspaceId/sites",
        title: "Site Builder",
      },
      {
        icon: "LayoutGrid",
        pathname: "/workspace/:workspaceId/sites-v2",
        title: "Site Builder V2",
      },
      {
        icon: "Map",
        pathname: "/workspace/:workspaceId/map",
        title: "Mapa",
      },
    ]
  },
  {
    icon: "Layers",
    title: "PLATFORM (BSP)",
    subMenu: [
      {
        icon: "Link",
        pathname: "/workspace/:workspaceId/connections",
        title: "connections",
      },
      {
        icon: "Webhook",
        pathname: "#",
        title: "Webhooks",
        modalTrigger: "select-connection",
        modalLink: "/workspace/:workspaceId/connections/instagram/:connectionId/:external_id/?tab=webhook",
      },
    ]
  },
  {
    icon: "ShieldCheck",
    title: "ADMIN",
    subMenu: [
      {
        icon: "Settings",
        pathname: "/workspace/:workspaceId/settings",
        title: "settings",
      },
      {
        icon: "Users",
        pathname: "/workspace/:workspaceId/settings/permissions",
        title: "user_and_permissions",
      },
      {
        icon: "Shield",
        pathname: "/workspace/:workspaceId/security",
        title: "Segurança",
      },
      {
        icon: "Settings2",
        pathname: "/workspace/:workspaceId/advanced-settings",
        title: "Configurações Avançadas",
      },
    ]
  },
];

const filteredMenu = rawMenu.filter((item) => {
    if (typeof item === "string") return true;
    
  if (!item.usageTypes) return true;
    
  return item.usageTypes.includes(currentUsage as UsageType);
  });

const initialState: SideMenuState = {
  menu: filteredMenu,
};

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {},
});

export const selectSideMenu = (state: RootState) => state.sideMenu.menu;

export default sideMenuSlice.reducer;