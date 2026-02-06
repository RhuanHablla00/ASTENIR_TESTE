import { useState, useMemo } from 'react';
import { CheckCircle2, AlertCircle, Copy, RefreshCw, Check, Settings } from 'lucide-react';
import Button from '@/components/Base/Button';
import { CodeBlock } from './Codeblock';
import { ApiKeyManager } from './ApiKeyManager';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import GenericModal from '@/components/Modals/GenericModal';
import { t } from 'i18next';
import { useUpdateWorkspaceApiMutation } from '@/api/workspaceApi';
import { updateWorkspace } from '@/stores/workspaceSlice';
import { showSuccessNotification, showErrorNotification } from '@/components/Base/Notification';
import { ProjectForm, ProjectFormData } from './ProjectForm';
import { useGetConnectionIdQuery } from '@/api/connectionsApi';
import { useParams } from 'react-router-dom';
import Breadcrumb from '@/components/Base/Breadcrumb';

interface DnsRecord {
  id: string;
  record_type: string;
  name: string;
  value: string;
  ttl: string;
  status: 'verified' | 'pending';
}

interface Project {
  id: string;
  name: string;
  website: string;
  timezone: string;
  dns_status: 'verified' | 'pending';
  credential_id?: string;
}

export default function WebsitePage() {
  const [copiedField, setCopiedField] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const workspace = useAppSelector((state) => state.workspace?.selectedWorkspace);
  const [updateWorkspaceApi] = useUpdateWorkspaceApiMutation();
  const dispatch = useAppDispatch();
  const params = useParams();

  const connection_id = params.connection_id!;
  const { data, isLoading, isFetching, refetch } = useGetConnectionIdQuery(connection_id);

  const currentProject: Project | null = useMemo(() => {
    if (!data) return null;

    return {
      id: data.id,
      name: data.name,
      website: data.additional_info?.hostname || '',
      timezone: workspace?.settings.timezone || 'UTC',
      dns_status: data.status === 'active' ? 'verified' : 'pending',
      credential_id: data.credential
    };
  }, [data, workspace]);

  const dnsRecords: DnsRecord[] = useMemo(() => {
    if (!data) return [];

    const isVerified = data.status === 'active';
    const status = isVerified ? 'verified' : 'pending';

    return [
      {
        id: 'dns_txt',
        record_type: 'TXT',
        name: data.additional_info?.hostname?.split('.')?.[0],
        value: data.additional_info?.txt || 'N/A',
        ttl: 'Auto',
        status: status
      },
      {
        id: 'dns_cname',
        record_type: 'CNAME',
        name: 'tracking',
        value: 'ingress.hablla.com',
        ttl: 'Auto',
        status: status
      }
    ];
  }, [data]);

  const [projectApiKey, setProjectApiKey] = useState<string | null>("4c4764fd061e45e6555e1e03da1ed94b4fbd69f42c50115388c4dbe99359813c");

  const handleVerifyDns = async () => {
    await refetch();

    if (data?.status === 'active') {
      showSuccessNotification('DNS Verificado com sucesso!');
    }
  };

  const handleProjectUpdated = async (formData: ProjectFormData) => {
    try {
      const payload = {
        name: formData.name,
        website: formData.website,
        settings: {
          ...workspace?.settings,
          timezone: formData.timezone
        }
      };

      const updated = await updateWorkspaceApi({
        id: workspace?.id!,
        data: payload,
      }).unwrap();

      dispatch(updateWorkspace(updated));
      showSuccessNotification("Sucesso ao atualizar o workspace!");
      setShowEditDialog(false);
    } catch (error: any) {
      showErrorNotification(t(`errors:${error?.data?.error_code}`) || "Erro ao salvar!");
    }
  };

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);

      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const isConnected = currentProject?.dns_status === 'verified';

  const snippetCode = currentProject ? `<!-- Hablla Tag Manager - START -->
  <script>
    window.htmConfig = { 
      projectId: '${currentProject.id}',${projectApiKey ? `
      apiKey: '${projectApiKey}',` : ''}
      debug: false 
    };
  </script>
  <script src="https://htm.hablla.com/htm.js" async></script>
<!-- Hablla Tag Manager - END -->  ` : '';

  const ecommerceExamples = `// Identificar um lead
htm.identify({
  name: 'João Silva',
  email: 'joao@email.com',
  phone: '+5511999887766'
});

// Compra realizada
htm.purchase({
  orderId: 'ORDER-12345',
  total: 997.00,
  currency: 'BRL',
  products: [
    { id: 'SKU123', name: 'Curso Completo', price: 997.00, quantity: 1 }
  ]
});`;

  const dataLayerExamples = `// Usando dataLayer estilo GTM
htmDataLayer.push({
  event: 'custom_conversion',
  value: 1500.00,
  currency: 'BRL',
  product_name: 'Mentoria VIP'
});`;


  if (isLoading || !currentProject) {
    return (
      <div className="flex items-center justify-center h-96">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }


  return (
    <div className="flex flex-col gap-4">
      <div className='flex flex-col gap-8'>
        <Breadcrumb light className="flex-1 hidden xl:block">
          <Breadcrumb.Link
            className="dark:before:bg-chevron-white"
            to={`/workspace/${params?.workspace_id}`}
          >
            Home
          </Breadcrumb.Link>
          <Breadcrumb.Link
            className="dark:before:bg-chevron-white"
            to={`/workspace/${params?.workspace_id}/connections/website`}
          >
            Website
          </Breadcrumb.Link>
          <Breadcrumb.Link
            className="dark:before:bg-chevron-white"
            to={`/workspace/${params?.workspace_id}/connections/${params?.connection_type}/${params?.connection_id}`}
          >
            {params?.connection_id}
          </Breadcrumb.Link>
        </Breadcrumb>
        <div className='flex flex-col'>
          <h1 className="text-2xl font-bold text-foreground text-white">
            Conexão com Site
          </h1>
          <p className="text-muted-foreground text-gray-100">
            Conecte seu domínio com o Hablla Tag Manager para ter o rastreamento completo das suas campanhas.
          </p>
        </div>
      </div>
      <div className='animate-fade-in space-y-6 p-6 box box--stacked'>
        <div className="border rounded-lg p-6 bg-card shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Projeto Atual</h3>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => setShowEditDialog(true)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Editar Projeto
            </Button>

            <GenericModal
              open={showEditDialog}
              onClose={() => setShowEditDialog(false)}
              title="Editar Projeto"
              closeOnBackdrop={false}
              size="big"
              content={
                <div className="pt-2">
                  <p className="text-slate-500 mb-5 text-sm">
                    Atualize as configurações do seu projeto.
                  </p>

                  <ProjectForm
                    project={currentProject}
                    onSuccess={handleProjectUpdated}
                  />
                </div>
              }
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-muted/50 border">
              <p className="text-sm text-muted-foreground mb-1">Nome</p>
              <p className="font-medium">{currentProject.name}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 border">
              <p className="text-sm text-muted-foreground mb-1">Domínio</p>
              <p className="font-medium">{currentProject.website}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 border">
              <p className="text-sm text-muted-foreground mb-1">Fuso Horário</p>
              <p className="font-medium">{currentProject.timezone}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 border">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-muted-foreground">Project ID</p>
                <button onClick={() => copyToClipboard(currentProject.id, 'project-id')}>
                  {copiedId === 'project-id' ? (
                    <Check className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
              <p className=" text-xs break-all">{currentProject.id}</p>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6 bg-card shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Conexão do Domínio</h3>

          <div className="flex flex-col items-center py-8">
            {isConnected ? (
              <>
                <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
                <h4 className="text-xl font-semibold text-green-600 mb-2">
                  Rastreando os seus leads ao máximo! 🚀✨
                </h4>
                <p className="text-muted-foreground text-center">
                  Os DNS estão ativos e funcionando. Utilize o código abaixo em todas as suas páginas.
                </p>
              </>
            ) : (
              <>
                <AlertCircle className="h-12 w-12 text-yellow-500 mb-4" />
                <h4 className="text-xl font-semibold mb-2">
                  Os DNS da Hablla ainda não foram configurados!
                </h4>
                <p className="text-muted-foreground text-center max-w-xl">
                  Configure os registros DNS abaixo para ativar o rastreamento completo.
                  Caso já tenha feito, aguarde a propagação dos DNS.
                </p>
              </>
            )}
          </div>

          {dnsRecords.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-4">Configure os DNS em seu domínio</h4>
              <div className="overflow-hidden rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Tipo</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Nome</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Valor</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">TTL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    {dnsRecords.map((record) => (
                      <tr key={record.id}>
                        <td className="px-4 py-3">
                          {record.status === 'verified' ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                              <CheckCircle2 className="h-3.5 w-3.5" /> Verificado
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
                              <AlertCircle className="h-3.5 w-3.5" /> Pendente
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3  text-xs">{record.record_type}</td>
                        <td className="px-4 py-3 text-xs flex items-center gap-2">
                          {record.name}
                          {copiedId === record.id + 'name' ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <Copy
                              className="h-3 w-3 cursor-pointer text-muted-foreground"
                              onClick={() => copyToClipboard(record.name, record.id + 'name')}
                            />
                          )}
                        </td>
                        <td className="px-4 py-3  text-xs">
                          <div className="flex items-center gap-2 max-w-[300px] truncate">
                            <span className="truncate" title={record.value}>{record.value}</span>
                            <Copy className="h-3 w-3 cursor-pointer text-muted-foreground flex-shrink-0" onClick={() => copyToClipboard(record.value, record.id + 'val')} />
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs">{record.ttl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={handleVerifyDns}
              disabled={isFetching || isConnected}
              className={isConnected ? "bg-green-600 hover:bg-green-700 text-white" : "text-white"}
            >
              {isFetching ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : isConnected ? (
                <CheckCircle2 className="h-4 w-4 mr-2" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              {isFetching ? 'Verificando...' : isConnected ? 'DNS Conectado' : 'Verificar DNS'}
            </Button>
          </div>
        </div>

        <div className="border rounded-lg p-6 bg-card shadow-sm">
          <ApiKeyManager
            projectId={currentProject.id}
            apiKey={projectApiKey}
            onKeyRegenerated={(newKey: string) => setProjectApiKey(newKey)}
          />
        </div>

        <div className="border rounded-lg p-6 bg-card shadow-sm">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Código de Rastreamento</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Insira este código na tag {'<head>'} de todas as páginas.
              </p>
              <CodeBlock code={snippetCode} language="html" />
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">Modo de Teste</h4>
              <p className="text-sm text-muted-foreground mb-6">
                Adicione <code className="bg-muted px-1.5 py-0.5 rounded text-xs">debug: true</code> na configuração.
              </p>

              <div className="bg-green-50 dark:bg-green-900 border border-green-100 rounded-lg p-4 mb-6">
                <h5 className="font-semibold text-green-700 mb-2">Coleta Automática Ativa</h5>
                <ul className="text-sm text-green-600 space-y-1 list-disc list-inside">
                  <li>Page Views e navegação</li>
                  <li>UTMs e parâmetros de URL</li>
                  <li>Cliques em links e botões</li>
                  <li>Submissão de formulários</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6 bg-card shadow-sm">
            <h4 className="text-lg font-semibold mb-2">E-commerce</h4>
            <p className="text-sm text-muted-foreground mb-4">Exemplos de eventos de compra.</p>
            <CodeBlock code={ecommerceExamples} language="javascript" />
          </div>
          <div className="border rounded-lg p-6 bg-card shadow-sm">
            <h4 className="text-lg font-semibold mb-2">DataLayer</h4>
            <p className="text-sm text-muted-foreground mb-4">Uso avançado estilo GTM.</p>
            <CodeBlock code={dataLayerExamples} language="javascript" />
          </div>
        </div>
      </div>
    </div>
  );
}