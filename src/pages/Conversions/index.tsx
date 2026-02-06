import { useState } from 'react';
import { MoreHorizontal, Plus, Flag, ArrowLeft, Settings, Package, Sliders, Zap, MousePointerClick } from 'lucide-react';
import { TbPlus } from 'react-icons/tb';
import Button from '@/components/Base/Button';
import { useTranslation } from 'react-i18next';

interface Conversion {
  id: number;
  name: string;
  category: string;
  trigger: string;
  isActive: boolean;
}

export default function Conversions() {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<'list' | 'create'>('list');
  const [conversions, setConversions] = useState<Conversion[]>([]);
  const [activeTab, setActiveTab] = useState<'config' | 'product' | 'advanced'>('config');
  const [formStatus, setFormStatus] = useState(true);
  const [loadLocation, setLoadLocation] = useState('Todas as páginas');
  const [selectedTrigger, setSelectedTrigger] = useState('Acessou à Página');

  const handleCreateClick = () => {
    setViewMode('create');
  };

  const handleCancelClick = () => {
    setViewMode('list');
  };

  const handleSaveClick = () => {
    const newConversion: Conversion = {
      id: Date.now(),
      name: "Lead Enviado",
      category: "Lead",
      trigger: selectedTrigger,
      isActive: true
    };
    setConversions([...conversions, newConversion]);
    setViewMode('list');
  };

  const toggleStatus = (id: number) => {
    setConversions(conversions.map(item =>
      item.id === id ? { ...item, isActive: !item.isActive } : item
    ));
  };

  if (viewMode === 'create') {
    return (
      <div className="font-sans text-gray-800 animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-white">Nova Conversão</h1>
          <div className="flex gap-3">
            <Button
              variant="outline-secondary"
              className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={handleCancelClick}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </div>
        </div>

        <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
              <div
                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${formStatus ? 'bg-primary' : 'bg-gray-300'}`}
                onClick={() => setFormStatus(!formStatus)}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${formStatus ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </div>
            </div>

            <div className="md:col-span-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome*</label>
              <input
                type="text"
                placeholder="Ex: Lead Enviado"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none dark:bg-gray-900 dark:text-white"
              />
              <p className="text-xs text-gray-400 mt-1">Indicamos que utilize um nome de fácil identificação ou padrão com nomenclaturas.</p>
            </div>

            <div className="md:col-span-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categoria</label>
              <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none dark:bg-gray-900 dark:text-white">
                <option>Captação</option>
                <option>Vendas</option>
                <option>Engajamento</option>
                <option>Remarketing</option>
              </select>
            </div>
          </div>

          <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('config')}
                className={`pb-4 px-4 border-b-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'config'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <Settings className="w-4 h-4" /> Configurações
              </button>
              <button
                onClick={() => setActiveTab('product')}
                className={`pb-4 px-4 border-b-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'product'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <Package className="w-4 h-4" /> Produto
              </button>
              <button
                onClick={() => setActiveTab('advanced')}
                className={`pb-4 px-4 border-b-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'advanced'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <Sliders className="w-4 h-4" /> Avançado
              </button>
            </nav>
          </div>

          {activeTab === 'config' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Carregar conversão em*</label>
                  <select
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-900"
                    value={loadLocation}
                    onChange={(e) => setLoadLocation(e.target.value)}
                  >
                    <option value="Todas as páginas">Todas as páginas</option>
                    <option value="Páginas Específicas">Páginas Específicas</option>
                  </select>
                  <p className="text-xs text-gray-400 mt-1">Em qual local deseja que a conversão ocorra.</p>
                </div>

                {loadLocation === 'Páginas Específicas' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Caminhos das Páginas*</label>
                      <input
                        type="text"
                        placeholder='Ex: "/pagina-de-vendas, /pagina-obrigado"'
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none dark:bg-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="pt-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Orientações sobre caminho da página</label>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Insira apenas os caminhos das páginas, sem domínio e sem parâmetros. Insira "HOME" ou "/" para conversões na página raiz do site. Pode ser inserido mais de um caminho de página.
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-green-100 text-green-600 rounded-md">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">Comportamento gatilho</h3>
                    <p className="text-xs text-gray-500">Defina qual será a ação ou comportamento do visitante na página, que será rastreada.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gatilho*</label>
                    <select
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary focus:outline-none"
                      value={selectedTrigger}
                      onChange={(e) => setSelectedTrigger(e.target.value)}
                    >
                      <option>Acessou à Página</option>
                      <option>Tempo de Permanência na Página</option>
                      <option>Formulário Enviado / Submetido</option>
                      <option>Clique no Botão / Elemento</option>
                      <option>Profundidade de Scroll</option>
                      <option>Evento Personalizado</option>
                    </select>
                  </div>

                  {selectedTrigger === 'Tempo de Permanência na Página' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tempo (segundos)</label>
                      <input
                        type="text"
                        placeholder="Ex: 30"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none dark:bg-gray-900 dark:text-white"
                      />
                    </div>
                  )}

                  {selectedTrigger === 'Clique no Botão / Elemento' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Seletor do Elemento</label>
                      <input
                        type="text"
                        placeholder="Ex: #btn-comprar, .cta-button"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none dark:bg-gray-900 dark:text-white"
                      />
                    </div>
                  )}

                  {selectedTrigger === 'Profundidade de Scroll' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Profundidade (%)</label>
                      <input
                        type="text"
                        placeholder="Ex: 75"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none dark:bg-gray-900 dark:text-white"
                      />
                    </div>
                  )}

                  {selectedTrigger === 'Evento Personalizado' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome do Evento</label>
                      <input
                        type="text"
                        placeholder="Ex: video_complete"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none dark:bg-gray-900 dark:text-white"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-gray-50 text-primary rounded-md">
                    <Flag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">Evento</h3>
                    <p className="text-xs text-gray-500">Defina qual será o evento a ser disparado e enviado para as plataformas de anúncio.</p>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Evento*</label>
                  <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary focus:outline-none">
                    <option>StartTrial - Iniciar período de avaliação</option>
                    <option>Lead - Cadastro</option>
                    <option>Donate - Fez uma Doação</option>
                    <option>AddToCart - Adicionar ao Carrinho</option>
                    <option>InitiateCheckout - Iniciar Checkout</option>
                    <option>AddPaymentInfo - Informações de Pagamento</option>
                    <option>Subscribe - Assinou um Plano</option>
                    <option>Purchase - Compra Confirmada</option>
                    <option>Custom - Evento Personalizado</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'product' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome do Produto</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none dark:bg-gray-900 dark:text-white"
                  />
                  <p className="text-xs text-gray-400 mt-1">Informe o nome do produto igual cadastrado na plataforma de pagamento.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ID do Produto</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none dark:bg-gray-900 dark:text-white"
                  />
                  <p className="text-xs text-gray-400 mt-1">Informe o ID do produto igual cadastrado na plataforma de pagamento.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">IDs da Oferta</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none dark:bg-gray-900 dark:text-white"
                  />
                  <p className="text-xs text-gray-400 mt-1">Separe os IDs das ofertas por ",", caso tenha mais de uma oferta na página.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Valor do Produto</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none dark:bg-gray-900 dark:text-white"
                  />
                  <p className="text-xs text-gray-400 mt-1">Informe o valor do produto ou oferta.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Moeda</label>
                  <input
                    type="text"
                    defaultValue="BRL"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none dark:bg-gray-900 dark:text-white"
                  />
                  <p className="text-xs text-gray-400 mt-1">Defina o código da moeda do produto conforme ISO 4217. <a href="#" className="text-primary hover:underline">Listagem de Moeda</a></p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'advanced' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pixel do Facebook Específico</label>
                <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary focus:outline-none mb-3">
                  <option>Selecione um pixel para adicionar</option>
                </select>
              </div>
            </div>
          )}

          <div className="mt-8 flex gap-3">
            <Button
              variant="primary"
              onClick={handleSaveClick}
            >
              Criar conversão
            </Button>
            <Button
              variant="outline-secondary"
              className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={handleCancelClick}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-800">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-xl font-bold text-white">Conversões</h1>
          <p className="text-gray-100 text-sm mt-1">
            Configure regras de gatilho para disparar eventos automaticamente
          </p>
        </div>

        {conversions.length > 0 && (
          <Button
            variant='primary'
            type="button"
            onClick={handleCreateClick}
          >
            <Plus className="text-white w-4 h-4 mr-2" />
            Nova Conversão
          </Button>
        )}
      </div>

      <div className="box box--stacked">
        {conversions.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-12 text-center rounded-xl bg-white dark:bg-gray-800">
            <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <Flag className="w-8 h-8 text-gray-400 dark:text-gray-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Nenhuma regra de conversão
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
              Crie regras para disparar eventos automaticamente quando visitantes realizarem ações no seu site.
            </p>
            <Button
              variant='primary'
              type="button"
              onClick={handleCreateClick}
            >
              <TbPlus className="text-white w-5 h-5 mr-2" />
              Criar primeira conversão
            </Button>
          </div>
        ) : (
          <div className="space-y-4 p-4">
            {conversions.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-center justify-between bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-primary dark:bg-primary/20 rounded-lg flex items-center justify-center`}>
                    <MousePointerClick className="text-primary dark:text-primary w-6 h-6" />
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 dark:text-white">{item.name}</span>
                      {item.isActive && (
                        <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                          Ativo
                        </span>
                      )}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-1 flex gap-1">
                      <span>{item.category}</span>
                      <span>•</span>
                      <span>{item.trigger}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{item.isActive ? 'Ativo' : 'Inativo'}</span>

                    <button
                      onClick={() => toggleStatus(item.id)}
                      className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${item.isActive ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${item.isActive ? 'translate-x-5' : 'translate-x-0'}`}
                      ></div>
                    </button>
                  </div>

                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}