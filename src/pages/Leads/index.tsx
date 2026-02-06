import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa";
import { TbPlus } from "react-icons/tb";

import Button from "@/components/Base/Button";
import Lucide from "@/components/Base/Lucide";
import SearchBar from "@/components/SearchBar";
import GenericModal from "@/components/Modals/GenericModal";
import Table from "@/components/Base/Table";
import { Menu } from "@/components/Base/Headless";
import { useGetLeadsQuery, useDeleteLeadApiMutation, Lead } from "@/api/leadApi";
import { useAppSelector } from "@/stores/hooks";
import ModalCreateLead from "@/components/Modals/ModalCreateLead";
import { showErrorNotification, showSuccessNotification } from "@/components/Base/Notification";

export default function Leads() {
  const navigate = useNavigate();
  const workspace = useAppSelector((state) => state.workspace?.selectedWorkspace?.id);
  const { t } = useTranslation();

  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading, refetch } = useGetLeadsQuery(
    {
        workspace: workspace!,
        search, 
    },
    { 
      refetchOnMountOrArgChange: true,
      skip: !workspace 
    }
  );

  const [deleteLeadApi] = useDeleteLeadApiMutation();

  const handleEditLead = (lead: Lead) => {
    setSelectedLead(lead);
    setOpenModal(true);
  };

  const handleSuccess = () => {
    refetch();
    setOpenModal(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString();
  };

  const handleConfirmDelete = async () => {
    if (!workspace || !deleteId) return;

    try {
      await deleteLeadApi({ 
        workspace, 
        id: deleteId 
      }).unwrap();

      showSuccessNotification(t("lead_successfully_deleted_"));
      refetch();
      setDeleteId(null);
    } catch (error: any) {
      showErrorNotification(error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-semibold text-white">{t("all_leads")}</h1>

        <Button
          type="button"
          className="text-white"
          onClick={() => {
            setSelectedLead(null);
            setOpenModal(true);
          }}
          
        >
          <TbPlus className="stroke-[1.3] w-4 h-4 mr-2" />
          {t("create_new_lead")}
        </Button>
      </div>

      <SearchBar
        onSearch={(value) => setSearch(value)}
        placeholder={t("search_leads")}
      />

      {isLoading && <span className="text-white p-4">{t("loading")}...</span>}

      <Table className="border-b border-slate-200/60 bg-white dark:bg-darkmode-600">
        <Table.Thead>
          <Table.Tr>
            <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 dark:bg-darkmode-400">
              {t("name")}
            </Table.Td>
            <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 dark:bg-darkmode-400">
              {t("email")}
            </Table.Td>
            <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 dark:bg-darkmode-400">
              {t("phone")}
            </Table.Td>
            <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 dark:bg-darkmode-400">
              {t("created_at")}
            </Table.Td>
            <Table.Td className="w-20 py-4 font-medium text-center border-t bg-slate-50 border-slate-200/60 text-slate-500 dark:bg-darkmode-400">
              {t("actions")}
            </Table.Td>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.results?.map((lead: Lead, index: number) => (
            <Table.Tr key={lead.id || index} className="[&_td]:last:border-b-0">
              
              <Table.Td className="py-4 border-dashed w-72 dark:bg-darkmode-600 align-top">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-darkmode-400 flex items-center justify-center text-slate-500 font-bold mr-3 shrink-0">
                    {lead.name?.substring(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-slate-700 dark:text-slate-300">
                      {lead.name}
                    </div>
                    <div className="text-slate-400 text-xs mt-0.5">
                      ID: {lead.id.substring(lead.id.length - 6)}
                    </div>
                  </div>
                </div>
              </Table.Td>

              <Table.Td className="py-4 border-dashed dark:bg-darkmode-600 align-top">
                <div className="flex flex-col gap-3">
                  {lead.emails && lead.emails.length > 0 && (
                    <div className="flex flex-col gap-1.5">
                      {lead.emails.map((emailItem, i) => (
                        <div key={i} className="flex items-center text-slate-600 dark:text-slate-400 text-sm">
                          <Lucide icon="Mail" className="w-3.5 h-3.5 mr-2 text-slate-400 shrink-0" />
                          <span className="truncate max-w-[220px]" title={emailItem.email}>
                            {emailItem.email}
                          </span>
                          {/* {!emailItem.subscribed && (
                             <span className="ml-2 text-[10px] bg-slate-200 px-1 rounded text-slate-500">Unsub</span>
                          )} */}
                        </div>
                      ))}
                    </div>
                  )}
                  {(!lead.emails?.length) && (
                     <span className="text-slate-400 italic text-xs">{t('no_emails_registered')}</span>
                  )}
                </div>
              </Table.Td>


              <Table.Td className="py-4 border-dashed dark:bg-darkmode-600 align-top">
                <div className="flex flex-col gap-3">
                  {lead.phones && lead.phones.length > 0 && (
                    <div className="flex flex-col gap-1.5">
                      {lead.phones.map((phoneItem, i) => (
                        <div key={i} className="flex items-center text-slate-600 dark:text-slate-400 text-sm">
                          <Lucide icon="Phone" className="w-3.5 h-3.5 mr-2 text-slate-400 shrink-0" />
                          <span className="font-mono text-xs">{phoneItem.phone}</span>
                          
                          {phoneItem.is_whatsapp && (
                             <FaWhatsapp 
                               className="ml-2 text-green-500 w-4 h-4" 
                               title="WhatsApp Enabled" 
                             />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {(!lead.phones?.length) && (
                     <span className="text-slate-400 italic text-xs">{t('no_phones_registered')}</span>
                  )}
                </div>
              </Table.Td>

              <Table.Td className="py-4 border-dashed dark:bg-darkmode-600 align-top">
                <div className="whitespace-nowrap text-slate-500">
                  {formatDate(lead.created_at)}
                </div>
              </Table.Td>

              <Table.Td className="relative py-4 dark:bg-darkmode-600 align-top">
                <div className="flex items-center justify-center">
                  <Menu className="h-5">
                    <Menu.Button className="w-5 h-5 text-slate-500 hover:text-slate-700 transition-colors">
                      <Lucide
                        icon="MoreVertical"
                        className="w-5 h-5 stroke-slate-400/70 fill-slate-400/70"
                      />
                    </Menu.Button>
                    <Menu.Items className="w-40">
                      <Menu.Item onClick={() => handleEditLead(lead)}>
                        <Lucide icon="CheckSquare" className="w-4 h-4 mr-2"/>
                        {t("edit")}
                      </Menu.Item>
                      <Menu.Item 
                        className="text-danger" 
                        onClick={() => setDeleteId(lead.id)}
                      >
                        <Lucide icon="Trash2" className="w-4 h-4 mr-2" />
                        {t("delete")}
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
              </Table.Td>
            </Table.Tr>
          ))}

          {(!data?.results || data.results.length === 0) && !isLoading && (
            <Table.Tr>
              <Table.Td colSpan={5} className="text-center py-8 text-slate-500">
                <div className="flex flex-col items-center justify-center">
                    {/* <Lucide icon="UserX" className="w-10 h-10 mb-2 text-slate-300" /> */}
                    {t("no_leads_found")}
                </div>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>

      <GenericModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedLead(null);
        }}
        title={selectedLead ? t("edit_lead") : t("create_lead")}
        size="default"
        content={
          <ModalCreateLead
            initialData={selectedLead}
            onSuccess={handleSuccess}
            onCancel={() => {
              setOpenModal(false);
              setSelectedLead(null);
            }}
          />
        }
      />
      <GenericModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title={t("delete")}
        size="default"
        content={
          <div className="flex flex-col gap-4 p-2">
            <p className="text-slate-600 dark:text-slate-300">
              {t("are_you_sure_delete_lead")}
            </p>
            <div className="flex justify-end gap-3 mt-4">
              <Button 
                variant="secondary" 
                onClick={() => setDeleteId(null)}
              >
                {t("cancel")}
              </Button>
              <Button 
                variant="danger" 
                onClick={handleConfirmDelete}
              >
                {t("delete")}
              </Button>
            </div>
          </div>
        }
      />
    </div>
  );
}