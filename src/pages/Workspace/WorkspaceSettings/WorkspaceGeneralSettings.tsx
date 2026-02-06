import React, { useState, useMemo, useCallback } from 'react';
import { AlertTriangle, Facebook, BarChart3, Megaphone, Search, Video, ExternalLink, Check, RefreshCw, Trash2, Unlink, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import GenericModal from '@/components/Modals/GenericModal';
import ModalCreateConnectionFacebookAds from '@/components/Modals/ModalCreateConnectionFacebookAds';
import { useGetAllConnectionsQuery } from '@/api/connectionsApi';
import Button from '@/components/Base/Button';
import { showErrorNotification, showSuccessNotification } from '@/components/Base/Notification';
import { useFacebookBusinessDisconnectMutation } from '@/api/authApi';

type ServiceId = 'meta' | 'google_analytics' | 'google_ads' | 'google_search_console' | 'tiktok_ads';

interface IntegrationConfig {
  id: ServiceId;
  title: string;
  description: string;
  icon: React.ReactNode;
  warningText: string;
  buttonLabel: string;
  status: 'connected' | 'disconnected';
}

export default function WorkspaceGeneralSettings() {
  const { t } = useTranslation();
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [disconnectTarget, setDisconnectTarget] = useState<ServiceId | null>(null); 
  const [isDisconnecting, setIsDisconnecting] = useState(false); 
  const { data, refetch } = useGetAllConnectionsQuery({ scope: 'META_USER' });
  const [disconnectMeta] = useFacebookBusinessDisconnectMutation();

  const isMetaConnected = useMemo(() => {
    return data?.results?.some((conn: any) => conn.scope === 'META_USER') ?? false;
  }, [data]);

  const integrations: IntegrationConfig[] = useMemo(() => [
    {
      id: 'meta',
      title: 'Meta (Facebook & Instagram)',
      description: 'Conecte sua conta do Meta Business para acessar pixels, formulários de lead e dados de anúncios.',
      icon: <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400"><Facebook size={20} /></div>,
      warningText: isMetaConnected
        ? 'A conta está conectada e sincronizando dados.'
        : 'Você será redirecionado para o Meta Business para autorizar o acesso.',
      buttonLabel: 'Conectar com Meta',
      status: isMetaConnected ? 'connected' : 'disconnected'
    },
    {
      id: 'google_analytics',
      title: 'Google Analytics 4',
      description: 'Conecte sua conta do Google Analytics para leitura de dados e eventos.',
      icon: <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center text-orange-600 dark:text-orange-400"><BarChart3 size={20} /></div>,
      warningText: 'Você será redirecionado para o Google para autorizar o acesso.',
      buttonLabel: 'Conectar com Google Analytics',
      status: 'disconnected'
    },
    {
      id: 'google_ads',
      title: 'Google Ads',
      description: 'Conecte sua conta do Google Ads para conversões enhanced e dados de campanhas.',
      icon: <div className="w-10 h-10 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center text-yellow-600 dark:text-yellow-500"><Megaphone size={20} /></div>,
      warningText: 'Você será redirecionado para o Google para autorizar o acesso.',
      buttonLabel: 'Conectar com Google Ads',
      status: 'disconnected'
    },
    {
      id: 'google_search_console',
      title: 'Google Search Console',
      description: 'Monitore palavras-chave, posições de indexação e desempenho de busca.',
      icon: <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400"><Search size={20} /></div>,
      warningText: 'Você será redirecionado para o Google para autorizar o acesso.',
      buttonLabel: 'Conectar com Search Console',
      status: 'disconnected'
    },
    {
      id: 'tiktok_ads',
      title: 'TikTok Ads',
      description: 'Conecte sua conta do TikTok para rastreamento de conversões via Events API.',
      icon: <div className="w-10 h-10 bg-black dark:bg-slate-800 rounded-lg flex items-center justify-center text-white"><Video size={20} /></div>,
      warningText: 'Você será redirecionado para o TikTok Business para autorizar o acesso.',
      buttonLabel: 'Conectar com TikTok',
      status: 'disconnected'
    }
  ], [isMetaConnected]);

  const handleCloseModal = useCallback(() => {
    setModalContent(null);
    refetch();
  }, [refetch]);

  const handleConnect = useCallback((serviceType: ServiceId) => {
    const modalMap: Record<string, React.ReactNode> = {
      meta: <ModalCreateConnectionFacebookAds onSuccess={handleCloseModal} />,
    };

    const content = modalMap[serviceType];

    if (content) {
      setModalContent(content);
    }
  }, [handleCloseModal]);

  const handleRequestDisconnect = (id: ServiceId) => {
    setDisconnectTarget(id);
  };

  const handleConfirmDisconnect = async () => {
    if (!disconnectTarget) return;

    setIsDisconnecting(true);

    try {
      if (disconnectTarget === 'meta') {
        await disconnectMeta().unwrap();

        if (window.FB) {
          window.FB.logout((response: any) => {
            console.log("FB SDK Logout:", response);
          });
        }
      }

      showSuccessNotification(t("disconnected_successfully") || "Desconectado com sucesso");
      refetch();
      setDisconnectTarget(null);
    } catch (err: any) {
      console.error("Erro ao desconectar:", err);
      showErrorNotification(t("error_disconnecting") || "Erro ao desconectar");
    } finally {
      setIsDisconnecting(false);
    }
  };

  return (
    <div className="min-h-screen p-5 font-sans box box--stacked">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t('settings')}</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Configure seu projeto e integrações</p>
      </div>

      <div className="space-y-6 max-w-6xl">
        {integrations.map((integration) => (
          <IntegrationItem
            key={integration.id}
            config={integration}
            onConnect={() => handleConnect(integration.id)}
            onDisconnect={() => handleRequestDisconnect(integration.id)}
          />
        ))}

        <GenericModal
          open={!!modalContent}
          onClose={handleCloseModal}
          title={""}
          closeOnBackdrop={false}
          size="giant"
          content={modalContent}
        />

        <GenericModal
          open={!!disconnectTarget}
          onClose={() => !isDisconnecting && setDisconnectTarget(null)}
          title={t("disconnect_account")}
          size="default"
          content={
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center justify-center text-center gap-3 py-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500 mb-2">
                  <Unlink size={24} />
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                  {t("are_you_sure")}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 max-w-xs">
                  {t("are_you_sure_do_you_want_disconnect_meta")}
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  variant="secondary"
                  disabled={isDisconnecting}
                  onClick={() => setDisconnectTarget(null)}
                >
                  {t("cancel")}
                </Button>
                <Button
                  variant="danger"
                  onClick={handleConfirmDisconnect}
                  disabled={isDisconnecting}
                  className="min-w-[100px]"
                >
                  {isDisconnecting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (t("disconnect"))}
                </Button>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}
interface IntegrationItemProps {
  config: IntegrationConfig;
  onConnect: () => void;
  onDisconnect: () => void;
}

const IntegrationItem = React.memo(({ config, onConnect, onDisconnect }: IntegrationItemProps) => {
  return (
    <div className="bg-white dark:bg-darkmode-600 border border-slate-200 dark:border-darkmode-400 rounded-xl p-6 shadow-sm transition-all">
      <CardHeader
        icon={config.icon}
        title={config.title}
        status={config.status}
        description={config.description}
      />

      <div className="pl-0 sm:pl-14 mt-4 space-y-4">
        <WarningBox text={config.warningText} status={config.status} />

        {config.status === 'connected' ? (
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className='flex gap-2' variant='outline-secondary' onClick={onConnect}>
              <RefreshCw size={16} />
              Reconectar / Trocar Conta
            </Button>

            <Button className='flex gap-2' variant='outline-danger' onClick={onDisconnect}>
              <Unlink size={16} />
              Desconectar
            </Button>
          </div>
        ) : (
          <LargeConnectButton label={config.buttonLabel} onClick={onConnect} />
        )}
      </div>
    </div>
  );
});
IntegrationItem.displayName = 'IntegrationItem';

interface CardHeaderProps {
  icon: React.ReactNode;
  title: string;
  status: 'connected' | 'disconnected';
  description: string;
}

function CardHeader({ icon, title, status, description }: CardHeaderProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="shrink-0">{icon}</div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">{title}</h3>
          <StatusBadge status={status} />
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: 'connected' | 'disconnected' }) {
  if (status === 'connected') {
    return (
      <span className="bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
        <Check size={10} strokeWidth={4} /> Conectado
      </span>
    );
  }
  return (
    <span className="bg-slate-100 dark:bg-darkmode-400 text-slate-600 dark:text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
      <AlertTriangle size={10} className="text-orange-500" /> Não conectado
    </span>
  );
}

function WarningBox({ text, status }: { text: string; status?: 'connected' | 'disconnected' }) {
  const isConnected = status === 'connected';

  return (
    <div className={`border p-2 rounded flex gap-2 items-center transition-colors ${
      isConnected 
        ? 'bg-green-50 dark:bg-green-500/10 border-green-100 dark:border-green-500/20' 
        : 'bg-slate-50 dark:bg-darkmode-400 border-slate-100 dark:border-darkmode-400'
    }`}>
      {isConnected ? (
        <Check size={16} className="text-green-500 dark:text-green-400 shrink-0" />
      ) : (
        <AlertTriangle size={16} className="text-orange-400 shrink-0" />
      )}
      <p className={`text-xs ${
        isConnected 
          ? 'text-green-700 dark:text-green-400' 
          : 'text-slate-600 dark:text-slate-400'
      }`}>{text}</p>
    </div>
  );
}

interface LargeConnectButtonProps {
  label: string;
  onClick?: () => void;
}

function LargeConnectButton({ label, onClick }: LargeConnectButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-md shadow-sm transition-all flex items-center justify-center gap-2 text-sm active:scale-[0.99]"
    >
      <ExternalLink size={16} />
      {label}
    </button>
  );
}