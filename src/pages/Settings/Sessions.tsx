import { useState } from "react";
import { useListSessionsQuery, useLogoutSessionMutation } from "@/api/authApi";
import Button from "@/components/Base/Button";
import Table from "@/components/Base/Table";
import GenericModal from "@/components/Modals/GenericModal";
import { useTranslation } from "react-i18next";
import { showErrorNotification, showSuccessNotification } from "@/components/Base/Notification";

export default function Sessions() {
  const { t } = useTranslation();

  const { data, refetch } = useListSessionsQuery();
  const [logoutSession, { isLoading }] = useLogoutSessionMutation();

  const [sessionToLogout, setSessionToLogout] = useState<string | null>(null);

  const handleConfirmLogout = async () => {
    if (!sessionToLogout) return;

    try {
      await logoutSession({
        session_id: sessionToLogout,
      }).unwrap();

      showSuccessNotification(t("session_logged_out_successfully"));
      refetch();
      setSessionToLogout(null);
    } catch (error) {
      console.error(error);
      showErrorNotification(t("error_logging_out_session"));
    }
  };

  return (
    <div className="flex flex-col p-5 box box--stacked">
      <div className="flex items-center pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">
        {t("active_sessions")}
      </div>

      <div>
        <div className="text-slate-500">
          {t("access_and_control_your_active_sessions")}
        </div>

        <div className="mt-5 border rounded-lg border-slate-200/80">
          <div className="overflow-auto xl:overflow-visible">
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Td className="py-4 font-medium whitespace-nowrap bg-slate-50 dark:bg-darkmode-400 text-slate-500">
                    {t("browser")}
                  </Table.Td>
                  <Table.Td className="py-4 font-medium whitespace-nowrap bg-slate-50 dark:bg-darkmode-400 text-slate-500">
                    {t("recent_activity")}
                  </Table.Td>
                  <Table.Td className="py-4 font-medium whitespace-nowrap bg-slate-50 dark:bg-darkmode-400 text-slate-500 text-right">
                    {t("actions")}
                  </Table.Td>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {data?.sessions?.map((session: any) => (
                  <Table.Tr
                    key={session.refresh_id}
                    className="[&_td]:last:border-b-0"
                  >
                    {/* Browser */}
                    <Table.Td className="py-4 border-dashed border-slate-300/70">
                      <div className="max-w-[420px] break-words text-sm text-slate-700 dark:text-slate-200">
                        {(() => {
                          if (!session.user_agent) return "-";

                          const ua = session.user_agent;
                          const browserMatch = ua.match(/(Chrome|Edg|Firefox|Safari)\//);
                          const windowsMatch = ua.match(/Windows NT ([\d.]+)/);

                          const browser = browserMatch
                            ? browserMatch[1] === "Edg"
                              ? "Edge"
                              : browserMatch[1]
                            : "Navegador desconhecido";

                          let windows = "-";
                          if (windowsMatch) {
                            windows =
                              windowsMatch[1] === "10.0"
                                ? "Windows 10/11"
                                : `Windows ${windowsMatch[1]}`;
                          }

                          return `${browser} • ${windows}`;
                        })()}
                      </div>
                    </Table.Td>

                    {/* Recent Activity */}
                    <Table.Td className="py-4 border-dashed border-slate-300/70 whitespace-nowrap">
                      {new Date(session.created_at).toLocaleString("pt-BR")}
                    </Table.Td>

                    {/* Actions */}
                    <Table.Td className="py-4 border-dashed border-slate-300/70 text-right">
                      {session.is_mine ? (
                        <span className="text-sm font-medium text-slate-400">
                          {t("current_session")}
                        </span>
                      ) : (
                        <Button
                          className="px-3 py-1 text-sm font-medium text-red-600 border border-red-200 rounded-md hover:bg-red-50 hover:border-red-300 transition disabled:opacity-50"
                          disabled={isLoading}
                          onClick={() => setSessionToLogout(session.refresh_id)}
                        >
                          {t("logout")}
                        </Button>
                      )}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>
        </div>
      </div>
      <GenericModal
        open={!!sessionToLogout}
        onClose={() => setSessionToLogout(null)}
        title={t("logout_session")}
        size="default"
        content={
          <div className="flex flex-col gap-4 p-2">
            <p className="text-slate-600 dark:text-slate-300">
              {t("confirm_logout_session")}
            </p>
            <div className="flex justify-end gap-3 mt-4">
              <Button 
                variant="secondary" 
                onClick={() => setSessionToLogout(null)}
              >
                {t("cancel")}
              </Button>
              <Button 
                variant="danger" 
                onClick={handleConfirmLogout}
              >
                {t("logout_session")}
              </Button>
            </div>
          </div>
        }
      />
    </div>
  );
}
