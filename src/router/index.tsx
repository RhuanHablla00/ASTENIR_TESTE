import { useRoutes, Navigate } from "react-router-dom";

// Public
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/Login/ForgotPassword";
import VerifyEmail from "@/pages/VerifyEmail";
import PublicRoute from "./PublicRoute";

// Auth / Guards
import AuthGuard from "./AuthGuard";
import WorkspaceGuard from "./WorkspaceGuard";

// Layouts
import Layout from "@/themes";
import SetupLayout from "@/themes/SetupLayout";

// Workspace Pages
import WorkspaceCreate from "@/pages/Workspace/Create";
import WorkspacesList from "@/pages/Workspace/List";
import Onboarding from "@/pages/Onboarding";
import WorkspaceSettings from "@/pages/Workspace/WorkspaceSettings";
import WorkspaceInfo from "@/pages/Workspace/WorkspaceSettings/WorkspaceInfo";

// Pages dentro do workspace
import AllConnections from "@/pages/AllConnections";
import ConnectionList from "@/pages/AllConnections/ConnectionList";

// User Settings
import Settings from "@/pages/Settings";
import ProfileInfo from "@/pages/Settings/ProfileInfo";
import EmailSettings from "@/pages/Settings/EmailSettings";
import Security from "@/pages/Settings/Security";
import Preferences from "@/pages/Settings/Preferences";
import TwoFactorAuthentication from "@/pages/Settings/TwoFactorAuthentication";
import DeviceHistory from "@/pages/Settings/DeviceHistory";
import NotificationSettings from "@/pages/Settings/NotificationSettings";
import ConnectedDevices from "@/pages/Settings/ConnectedDevices";
import SocialMediaLinks from "@/pages/Settings/SocialMediaLinks";
import AccountDeactivation from "@/pages/Settings/AccountDeactivation";

//Post
import PostCreate from "@/pages/Post/Create";

// Other
import Logout from "@/pages/Logout";
import FanpagePosts from "@/pages/DashboardInstagram/FanpagePosts";
import InstagramPosts from "@/pages/DashboardInstagram/InstagramPosts";
import PostDetails from "@/pages/DashboardInstagram/PostDetails";
import MetaOauthCallback from "@/pages/MetaOauthCallback";
import Team from "@/pages/Settings/Team";
import Sessions from "@/pages/Settings/Sessions";
import WhatsappPosts from "@/pages/DashboardWhatsapp/WhatsappPosts";
import Leads from "@/pages/Leads";
import RedirectGate from "./RedirectGate";
import Permissions from "@/pages/Settings/Permissions";
import WebsitePage from "@/pages/DashboardWebsite/WebsitePage";
import Tags from "@/pages/Tags";
import Dashboard from "@/pages/Dashboard";
import Conversions from "@/pages/Conversions";
import WorkspaceGeneralSettings from "@/pages/Workspace/WorkspaceSettings/WorkspaceGeneralSettings";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import DeleteDataPolicy from "@/pages/DeleteDataPolicy";

function Router() {
  const routes = [
    { path: "/logout", element: <Logout /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/privacy", element: <PrivacyPolicy /> },
    { path: "/data-deletion", element: <DeleteDataPolicy /> },
    {
      element: <PublicRoute />,
      children: [
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
      ],
    },
    {
      element: <AuthGuard />,
      children: [
        {
          path: "/verify-email",
          element: <SetupLayout />,
          children: [{ index: true, element: <VerifyEmail /> }],
        },
        {
          path: "/integrations/meta/callback",
          element: <SetupLayout />,
          children: [{ index: true, element: <MetaOauthCallback /> }],
        },
        {
          path: "/workspace",
          element: <SetupLayout />,
          children: [
            { path: "create", element: <WorkspaceCreate /> },
            { path: "list", element: <WorkspacesList /> },
            { path: "onboarding", element: <Onboarding /> },
          ],
        },
        {
          element: <WorkspaceGuard />,
          children: [
            {
              path: "/workspace/:workspace_id",
              element: <Layout />,
              children: [
                {
                  index: true,
                  element: <AllConnections />
                },
                {
                  path: "workspace-settings",
                  element: <WorkspaceSettings />,
                  children: [
                    {
                      index: true,
                      element: <WorkspaceGeneralSettings />
                    },
                    {
                      path: "workspace-info",
                      element: <WorkspaceInfo />
                    }
                  ],
                },
                {
                  path: "dashboard",
                  children: [
                    {
                      index: true,
                      element: <Dashboard />,
                    },
                  ]
                },
                {
                  path: "leads",
                  children: [
                    {
                      index: true,
                      element: <Leads />,
                    },
                  ]
                },
                {
                  path: "tags",
                  children: [
                    {
                      index: true,
                      element: <Tags />,
                    },
                  ]
                },
                {
                  path: "conversions",
                  children: [
                    {
                      index: true,
                      element: <Conversions />,
                    },
                  ]
                },
                {
                  path: "settings",
                  element: <Settings />,
                  children: [
                    { index: true, element: <ProfileInfo /> },
                    { path: "email-settings", element: <EmailSettings /> },
                    { path: "security", element: <Security /> },
                    { path: "preferences", element: <Preferences /> },
                    { path: "sessions", element: <Sessions /> },
                    { path: "two-factor-authentication", element: <TwoFactorAuthentication /> },
                    { path: "device-history", element: <DeviceHistory /> },
                    { path: "notification-settings", element: <NotificationSettings /> },
                    { path: "connected-services", element: <ConnectedDevices /> },
                    { path: "social-media-links", element: <SocialMediaLinks /> },
                    { path: "team", element: <Team /> },
                    { path: "account-deactivation", element: <AccountDeactivation /> },
                    { path: "permissions", element: <Permissions /> },
                  ],
                },
                {
                  path: "connections/website/:connection_id",
                  element: <WebsitePage />,
                },
                {
                  path: "connections/:connection_type",
                  children: [
                    {
                      index: true,
                      element: <ConnectionList />,
                    },
                    {
                      path: ":connection_id/post/create",
                      element: <PostCreate />,
                    },
                    {
                      path: ":connection_id/fanpage/:fanpage_id",
                      element: <FanpagePosts />,
                    },
                    {
                      path: ":connection_id/:external_id",
                      element: <InstagramPosts />,
                    },
                    {
                      path: ":connection_id/:external_id/post/:post_id",
                      element: <PostDetails />,
                    },
                    {
                      path: ":connection_id",
                      element: <WhatsappPosts />,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    { path: "*", element: <RedirectGate /> },
  ];

  return useRoutes(routes);
}

export default Router;
