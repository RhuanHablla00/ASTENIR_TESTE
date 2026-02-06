import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { setWorkspace } from "@/stores/workspaceSlice";
import { useDispatch } from "react-redux";
import { useGetAllWorkspacesApiQuery, useGetWorkspaceMeApiQuery, useLazyGetWorkspaceMeApiQuery } from "@/api/workspaceApi";
import {
  useGetMyInvitesQuery,
  useAcceptInviteMutation,
  Invite,
} from "@/api/inviteApi";
import Button from "@/components/Base/Button";
import { useTranslation } from "react-i18next";
import EmptyState from "@/components/Base/EmptyState/EmptyState";
import SearchBar from "@/components/SearchBar";
import Lucide from "@/components/Base/Lucide";
import { Menu } from "@/components/Base/Headless"; 
import LanguageSelector from "@/components/LanguageSelector";
import ToggleDarkMode from "@/components/ToggleDarkMode";
import { useAppSelector } from "@/stores/hooks";
import { selectAuth } from "@/stores/authSlice";
import { useProfileQuery } from "@/api/authApi";

export default function WorkspacesList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const {
    data: workspacesData,
    isLoading: isLoadingWorkspaces,
    refetch: refetchWorkspaces,
  } = useGetAllWorkspacesApiQuery(
    { search },
    { refetchOnMountOrArgChange: true }
  );

  const {
    data: invitesData,
    isLoading: isLoadingInvites,
    refetch: refetchInvites,
  } = useGetMyInvitesQuery(undefined, { refetchOnMountOrArgChange: true });


  const [acceptInvite, { isLoading: isAccepting }] = useAcceptInviteMutation();

  const workspaces = workspacesData?.workspaces ?? [];
  const invites = invitesData?.results ?? [];

  const handleAcceptInvite = async (inviteId: string) => {
    try {
      await acceptInvite({ inviteId }).unwrap();
      refetchInvites();
      refetchWorkspaces();
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString();
  };

  const [getWorkspaceMe] =  useLazyGetWorkspaceMeApiQuery();

  const handleGetMe = (workspaceId: string) => {
    getWorkspaceMe(workspaceId);
  };
  
  if (isLoadingWorkspaces || isLoadingInvites) return <div>{`${t('loading')}...`}</div>;

  return (

      <div className="p-6 space-y-8">
        {/* Cabeçalho */}
        <div className="flex w-full items-center justify-between space-y-1">
          <div>
            <h1 className="text-2xl font-bold text-white">{t('select_a_workspace')}</h1>
            <p className="text-gray-100 max-w-md lg:max-w-none">
              {t('choose_environment_to_access')}
            </p>
          </div>
          <div>
            <Button type="button" className="text-white" onClick={() => navigate('/workspace/create')}>
              {t('create_new_workspace')}
            </Button>
          </div>
        </div>
        <SearchBar onSearch={(value) => setSearch(value)} />
        {invites.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-white flex items-center gap-2">
              <Lucide icon="Mail" className="w-5 h-5" />
              {t("pending_invitations")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {invites.map((item: Invite) => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-white dark:bg-darkmode-600 rounded-2xl shadow-sm border border-slate-200 dark:border-darkmode-400 p-4"
                >
                  <div className="flex flex-col flex-1 gap-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className=" text-gray-900 dark:text-white">
                        {t('invite_to_join_workspace')}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Lucide
                            icon="Building2"
                            className="w-4 h-4 text-slate-400"
                          />
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                            {item.workspace?.name}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 block mt-0.5">
                          {t("invited_on")}: {formatDate(item.created_at)}
                        </span>
                      </div>
                    </div>

                    <div className="flex mt-2">
                      <Button
                        variant="primary"
                        className="h-8 px-4 text-xs rounded-full shadow-md"
                        onClick={() => handleAcceptInvite(item.id)}
                        disabled={isAccepting}
                      >
                        {isAccepting ? (
                          <Lucide
                            icon="Loader2"
                            className="w-4 h-4 animate-spin mr-1"
                          />
                        ) : (
                          <Lucide icon="Check" className="w-4 h-4 mr-1" />
                        )}
                        {t("accept_invite")}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-b border-white/10 my-4" />
          </div>
        )}

        {/* Lista */}
        <div className="space-y-4">
          {workspaces.map((item) => (
            <button
              key={item.id}
              className="
                w-full flex items-center gap-4 p-4 text-left
                bg-white dark:bg-black box box--stacked rounded-xl border shadow-sm
                hover:shadow-md transition cursor-pointer
              "
              onClick={() => {
                handleGetMe(item?.workspace_id)
                dispatch(setWorkspace(item.workspace));
                navigate(`/workspace/${item.workspace_id}`);
              }}
            >
              {/* Foto */}
              <img
                src={item.workspace.photo_url ?? "https://cdn.hablla.com/ws_68767eaab483fe8a671396f8/hablla-agent/whats-4cebfec7-9ee6-4d8e-8df4-0cb3cb0a9ffc.png"}
                alt={item.workspace.name}
                className="w-16 h-16 rounded-xl object-cover border"
              />

              {/* Conteúdo */}
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {item.workspace.name}
                  </h3>

                  <span
                    className="
                      px-2 py-0.5 text-xs font-semibold rounded-full
                      bg-green-100 dark:bg-green-600/30 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-700
                    "
                  >
                    {t("active")}
                  </span>
                </div>

                <p className="text-sm text-gray-800 dark:text-gray-400 font-semibold">
                  {t('your_access')}: {item?.entity?.name ? `${t('manager_of_entity')} - ${item?.entity?.name}` : t('general_manager')}
                </p>
                
                <p className="text-sm text-gray-500 mt-0.5">
                  {t('click_to_access_this_workspace')}
                </p>


              </div>

              <ChevronRight className="w-6 h-6 text-gray-400" />
            </button>
          ))}

          {workspaces.length === 0 && invites.length === 0 && (
            <EmptyState
              title={t("no_workspace_found")}
              subtitle={t("we_didnt_find_any_workspace")}
            />
          )}
        </div>
      </div>
  );
}
