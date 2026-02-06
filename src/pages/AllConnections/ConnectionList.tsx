import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FaFacebook, FaGlobe, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { TbApiOff } from "react-icons/tb";
import { useTranslation } from "react-i18next";

import Button from "@/components/Base/Button";
import Lucide from "@/components/Base/Lucide";
import SearchBar from "@/components/SearchBar";
import { showSuccessNotification, showErrorNotification } from "@/components/Base/Notification";
import GenericModal from "@/components/Modals/GenericModal";

import ModalCreateConnectionWhatsapp from "@/components/Modals/ModalCreateConnectionWhatsApp";
import ModalCreateConnectionInstagram from "@/components/Modals/ModalCreateConnectionInstagram";
import ModalCreateTemplateWhatsapp from "@/components/Modals/ModalCreateTemplateWhatsapp";

import {
  UseCaseType,
  useDeleteConnectionIdMutation,
  useGetAllConnectionsQuery
} from "@/api/connectionsApi";
import ModalCreateConnectionWebsite from "@/components/Modals/ModalCreateConnectionWebsite";
import ModalCreateConnectionFacebookAds from "@/components/Modals/ModalCreateConnectionFacebookAds";


const CONNECTION_CONFIG: Record<string, {
  icon: JSX.Element;
  color: string;
  type: string;
  getModal: (onSuccess: () => void) => JSX.Element
}> = {
  INSTAGRAM: {
    icon: <FaInstagram className="w-6 h-6" />,
    color: "text-pink-500",
    type: 'instagram',
    getModal: (cb) => <ModalCreateConnectionInstagram onSuccess={cb} />,
  },
  WHATSAPP_MESSAGING: {
    icon: <FaWhatsapp className="w-6 h-6" />,
    color: "text-green-500",
    type: 'whatsapp',
    getModal: (cb) => <ModalCreateConnectionWhatsapp onSuccess={cb} />,
  },
  FACEBOOK_ADS: {
    icon: <FaFacebook className="w-6 h-6" />,
    color: "text-blue-500",
    type: 'facebook_ads',
    getModal: (cb) => <ModalCreateConnectionFacebookAds onSuccess={cb} />,
  },
  WEBSITE: {
    icon: <FaGlobe className="w-6 h-6" />,
    color: "text-gray-400",
    type: 'website',
    getModal: (cb) => <ModalCreateConnectionWebsite onSuccess={cb} />,
  },
};

export default function ConnectionList() {
  const navigate = useNavigate();
  const { connection_type } = useParams();
  const { t }: any = useTranslation();

  const [search, setSearch] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [deleteConnection] = useDeleteConnectionIdMutation();

  const { data, isLoading, refetch } = useGetAllConnectionsQuery({
    scope: connection_type ? (connection_type.toUpperCase() as UseCaseType) : undefined,
    search,
  }, { refetchOnMountOrArgChange: true });

  const connections = data?.results ?? [];

  const openModal = searchParams.get("action") === "create";

  const handleOpenModal = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("action", "create");
    setSearchParams(newParams);
  };

  const handleCloseModal = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("action");
    setSearchParams(newParams);
  };

  const handleSuccess = () => {
    refetch();
    handleCloseModal();
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteConnection(deleteId).unwrap();
      showSuccessNotification(t("connection_deleted_successfully"));
      refetch();
      setDeleteId(null);
    } catch (error) {
      console.error("Erro ao deletar conexão", error);
      showErrorNotification(t("error_deleting_connection"));
    }
  };

  const renderActiveModal = () => {
    const scopeKey = connection_type?.toUpperCase();
    if (scopeKey && CONNECTION_CONFIG[scopeKey]) {
      return CONNECTION_CONFIG[scopeKey].getModal(handleSuccess);
    }
    return null;
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-semibold text-white">
          {connection_type ? t(connection_type) : t('all')}
        </h1>

        <Button type="button" className="text-white" onClick={handleOpenModal}>
          {t('create_new_connection')}
        </Button>
      </div>

      <SearchBar onSearch={(value) => setSearch(value)} placeholder={t('search_connections')} />

      {isLoading && <span className="text-white">{t('loading')}...</span>}

      {!isLoading && connections.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {connections.map((conn) => {
            const config = CONNECTION_CONFIG[conn.scope] || {
              icon: <Lucide icon="Play" className="w-6 h-6" />,
              color: "text-slate-400"
            };

            function getConnectionNavigatePath(conn: any) {
              switch (conn.scope) {
                case "WHATSAPP_MESSAGING":
                  return `${conn.id}`;

                case "INSTAGRAM":
                  return `${conn.id}/${conn.additional_info?.page_id}`;

                default:
                  return `${conn.id}`;
              }
            }

            return (
              <div
                key={conn.id}
                className="box box--stacked flex items-center justify-between bg-white rounded-xl shadow-md border border-slate-200 dark:border-gray-600 p-4 hover:cursor-pointer"
                onClick={() => navigate(getConnectionNavigatePath(conn))}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                    {conn.scope === 'WHATSAPP_MESSAGING' ? (
                      <div className="w-full h-full flex items-center justify-center bg-green-100 text-green-700 font-bold text-lg select-none">
                        {conn.std_name?.charAt(0).toUpperCase() || "W"}
                      </div>
                    ) : (
                      conn.additional_info?.page_picture ? (
                        <img
                          alt={conn.name}
                          src={conn.additional_info.page_picture}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-50">
                          <Lucide icon="Image" className="w-6 h-6 opacity-50 text-slate-500" />
                        </div>
                      )
                    )}
                  </div>

                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-800 dark:text-white text-lg">
                      {conn.name}
                    </span>
                    <span className="text-sm text-slate-500">
                      {conn.scope === 'INSTAGRAM'
                        ? `Page ID: ${conn.additional_info?.page_id}`
                        : conn.scope}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline-danger"
                    className="flex items-center gap-2 py-2"
                    onClick={(e: any) => {
                      e.stopPropagation();
                      setDeleteId(conn.id);
                    }}
                  >
                    <Lucide icon="Trash" className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        !isLoading && (
          <div className="flex flex-col items-center justify-center py-16 text-center gap-4 box box--stacked mt-6">
            <TbApiOff className="w-10 h-10" />
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
              {t('no_connections_founded')}
            </h3>
            <p className="text-slate-500 max-w-sm">
              {t('no_connections_founded_description')}
            </p>
          </div>
        )
      )}

      <GenericModal
        open={openModal}
        onClose={handleCloseModal}
        title={""}
        closeOnBackdrop={false}
        subtitle={""}
        size="giant"
        content={renderActiveModal()}
      />

      <GenericModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title={t("delete")}
        size="default"
        content={
          <div className="flex flex-col gap-4 p-2">
            <p className="text-slate-600 dark:text-slate-300">
              {t("are_you_sure_delete_connection")}
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