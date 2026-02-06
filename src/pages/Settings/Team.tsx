import Button from "@/components/Base/Button";
import Lucide from "@/components/Base/Lucide";
import { FormInput } from "@/components/Base/Form";
import Table from "@/components/Base/Table";
import Tippy from "@/components/Base/Tippy";
import { Menu, Tab } from "@/components/Base/Headless";
import { useEffect, useState } from "react";
import GenericModal from "@/components/Modals/GenericModal";
import ModalSendTeamInvite from "@/components/Modals/ModalSendTeamInvite";
import { useParams } from "react-router-dom";
import LoadingIcon from "@/components/Base/LoadingIcon";
import { useGetWorkspaceUsersQuery } from "@/api/userApi";
import { useGetWorkspaceInvitesQuery, useRevokeInviteMutation } from "@/api/inviteApi";
import { useTranslation } from "react-i18next";
import { useGetEntitiesApiQuery } from "@/api/workspaceApi";

export default function Team() {
  const { workspace_id } = useParams();
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: usersData,
    isLoading: isLoadingUsers
  } = useGetWorkspaceUsersQuery({
    workspace: workspace_id || "",
    search: searchTerm
  }, {
    skip: !workspace_id
  });

  const {
    data: invitesData,
    isLoading: isLoadingInvites
  } = useGetWorkspaceInvitesQuery({
    workspaceId: workspace_id || ""
  }, {
    skip: !workspace_id
  });

  const [revokeInvite, { isLoading: isRevoking }] = useRevokeInviteMutation();

  const handleRevokeInvite = async (inviteId: string) => {
    if (!workspace_id) return;
    try {
      await revokeInvite({ workspaceId: workspace_id, inviteId }).unwrap();
    } catch (error) {
      console.error("Erro ao revogar convite:", error);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString();
};

  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col box box--stacked ">
            <div className="py-5  pl-5 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">
              {t('team')}
            </div>
            <div className="flex flex-col p-5 sm:items-center sm:flex-row gap-y-2">
              <div className="flex w-full justify-between">
                <div className="relative">
                  <Lucide
                    icon="Search"
                    className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3] text-slate-500"
                  />
                  <FormInput
                    type="text"
                    placeholder={`${t('search_users')}...`}
                    className="pl-9 sm:w-64 rounded-[0.5rem]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
                  <Button
                    variant="primary"
                    className="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent dark:group-[.mode--light]:!bg-darkmode-900/30 dark:!box"
                    onClick={() => setOpenModal(true)}
                  >
                    <Lucide icon="MailPlus" className="stroke-[1.3] w-4 h-4 mr-2" />
                    {t('send_invite')}
                  </Button>
                  <GenericModal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    title={t("invite_to_team")}
                    closeOnBackdrop={false}
                    size="giant"
                    content={
                      <ModalSendTeamInvite
                        onSuccess={() => {
                          setOpenModal(false);
                        }}
                      />
                    }
                  />
                </div>
              </div>
            </div>

            <Tab.Group
              //   className="mt-2"
              selectedIndex={selectedIndex}
              onChange={setSelectedIndex}
            >
              <div className="flex flex-col 2xl:items-center 2xl:flex-row gap-y-3 p-6 pt-0">
                <Tab.List
                  variant="boxed-tabs"
                  className="flex-col sm:flex-row w-full 2xl:w-auto mr-auto box rounded-[0.6rem] border-slate-200"
                >
                  <Tab className="first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current">
                    <Tab.Button
                      className="w-full xl:w-40 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]"
                      as="button"
                    >
                      {t('team')}
                      <span className="ml-2 text-xs bg-slate-200 dark:bg-slate-700 px-1.5 rounded-md text-slate-600 dark:text-slate-400">
                        {usersData?.results?.length || 0}
                      </span>
                    </Tab.Button>
                  </Tab>
                  <Tab className="first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current">
                    <Tab.Button
                      className="w-full text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]"
                      as="button"
                    >
                      {t('pending_invitations')}
                      <span className="ml-2 text-xs bg-slate-200 dark:bg-slate-700 px-1.5 rounded-md text-slate-600 dark:text-slate-400">
                        {invitesData?.results?.filter(i => i.status === 'active').length || 0}                      </span>
                    </Tab.Button>
                  </Tab>
                </Tab.List>
              </div>

              <Tab.Panels className="border border-t-0 rounded-xl shadow-lg 0-mt-px pt-px box box--stacked mt-2">
                {/* --- ABA USUÁRIOS --- */}
                <Tab.Panel>
                  <div className="overflow-auto xl:overflow-visible">
                    {isLoadingUsers ? (
                      <div className="p-10 flex justify-center text-slate-500">
                        <LoadingIcon icon="oval" className="w-8 h-8" />
                      </div>
                    ) : (
                      <Table className="border-b border-slate-200/60">
                        <Table.Thead>
                          <Table.Tr>
                            <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 dark:bg-darkmode-400">
                              {t('name')}
                            </Table.Td>
                            <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 dark:bg-darkmode-400">
                              {t('joined_date')}
                            </Table.Td>
                            <Table.Td className="w-20 py-4 font-medium text-center border-t bg-slate-50 border-slate-200/60 text-slate-500 dark:bg-darkmode-400">
                              {t('actions')}
                            </Table.Td>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {usersData?.results?.map((user, index) => (
                            <Table.Tr key={user.id || index} className="[&_td]:last:border-b-0">
                              <Table.Td className="py-4 border-dashed w-80 dark:bg-darkmode-600">
                                <div className="flex items-center">
                                  <div className="ml-3.5">
                                    <div className="font-medium whitespace-nowrap">
                                      {user.user.name}
                                    </div>
                                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                      {user.user.email}
                                    </div>
                                  </div>
                                </div>
                              </Table.Td>
                              <Table.Td className="py-4 border-dashed dark:bg-darkmode-600">
                                <div className="whitespace-nowrap">
                                  {formatDate(user.created_at)}
                                </div>
                              </Table.Td>
                              <Table.Td className="relative py-4 border-dashed dark:bg-darkmode-600">
                                <div className="flex items-center justify-center">
                                  <Menu className="h-5">
                                    <Menu.Button className="w-5 h-5 text-slate-500">
                                      <Lucide
                                        icon="MoreVertical"
                                        className="w-5 h-5 stroke-slate-400/70 fill-slate-400/70"
                                      />
                                    </Menu.Button>
                                    <Menu.Items className="w-40">
                                      <Menu.Item>
                                        <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                                        {t('edit')}
                                      </Menu.Item>
                                      <Menu.Item className="text-danger">
                                        <Lucide icon="Trash2" className="w-4 h-4 mr-2" />
                                        {t('delete')}
                                      </Menu.Item>
                                    </Menu.Items>
                                  </Menu>
                                </div>
                              </Table.Td>
                            </Table.Tr>
                          )
                          )}
                          {(!usersData?.results || usersData.results.length === 0) && (
                            <Table.Tr>
                              <Table.Td colSpan={3} className="text-center py-8 text-slate-500">
                                {t("no_users_found")}
                              </Table.Td>
                            </Table.Tr>
                          )}
                        </Table.Tbody>
                      </Table>
                    )}
                  </div>
                </Tab.Panel>

                {/* --- ABA CONVITES --- */}
                <Tab.Panel>
                  <div className="overflow-auto xl:overflow-visible">
                    {isLoadingInvites ? (
                      <div className="p-10 flex justify-center text-slate-500">
                        <LoadingIcon icon="oval" className="w-8 h-8" />
                      </div>
                    ) : (
                      <Table className="border-b border-slate-200/60">
                        <Table.Thead>
                          <Table.Tr>
                            {/* <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 dark:bg-darkmode-400">
                            {t('name')}
                          </Table.Td> */}

                            <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 dark:bg-darkmode-400">
                              E-mail
                            </Table.Td>

                            <Table.Td className="py-4 font-medium text-center border-t bg-slate-50 border-slate-200/60 text-slate-500 dark:bg-darkmode-400">
                              {t('status')}
                            </Table.Td>

                            <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 dark:bg-darkmode-400">
                              {t('sent_in')}
                            </Table.Td>

                            <Table.Td className="w-20 py-4 font-medium text-center border-t bg-slate-50 border-slate-200/60 text-slate-500 dark:bg-darkmode-400">
                              {t('actions')}
                            </Table.Td>
                          </Table.Tr>
                        </Table.Thead>

                        <Table.Tbody>
                          {invitesData?.results?.map((invite) => (
                            <Table.Tr key={invite.id} className="[&_td]:last:border-b-0">
                              {/* <Table.Td className="py-4 border-dashed dark:bg-darkmode-600">
                              <div className="font-medium whitespace-nowrap">
                                {(invite as any).name || t("waiting_registration")}
                              </div>
                            </Table.Td> */}

                              <Table.Td className="py-4 border-dashed dark:bg-darkmode-600">
                                <div className="text-slate-500 text-sm whitespace-nowrap">
                                  {invite.email}
                                </div>
                              </Table.Td>

                              <Table.Td className="py-4 border-dashed dark:bg-darkmode-600">
                                <div className="flex items-center justify-center text-warning">
                                  <Lucide icon="Clock" className="w-4 h-4 mr-1.5" />
                                  {t(invite.status) || "Pendente"}
                                </div>
                              </Table.Td>

                              <Table.Td className="py-4 border-dashed dark:bg-darkmode-600">
                                <div className="whitespace-nowrap">
                                  {formatDate(invite.created_at)}
                                </div>
                              </Table.Td>

                              <Table.Td className="relative py-4 border-dashed dark:bg-darkmode-600">
                                <div className="flex items-center justify-center">
                                  <Menu className="h-5">
                                    <Menu.Button className="w-5 h-5 text-slate-500">
                                      <Lucide icon="MoreVertical" className="w-5 h-5 stroke-slate-400/70 fill-slate-400/70" />
                                    </Menu.Button>

                                    <Menu.Items className="w-44">
                                      <Menu.Item>
                                        <Lucide icon="Mail" className="w-4 h-4 mr-2" />
                                        {t('resend_invitation')}
                                      </Menu.Item>

                                      <Menu.Item
                                        className="text-danger"
                                        onClick={() => handleRevokeInvite(invite.id)}
                                      >
                                        <Lucide icon="XCircle" className="w-4 h-4 mr-2" />
                                        {t('cancel_invitation')}
                                      </Menu.Item>
                                    </Menu.Items>
                                  </Menu>
                                </div>
                              </Table.Td>
                            </Table.Tr>
                          ))}
                          {(!invitesData?.results || invitesData.results.length === 0) && (
                            <Table.Tr>
                              <Table.Td colSpan={5} className="text-center py-8 text-slate-500">
                                {t("no_pending_invites")}
                              </Table.Td>
                            </Table.Tr>
                          )}
                        </Table.Tbody>
                      </Table>
                    )}
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </div>
  );
}