import React, { useState } from 'react';
import {
  Eye, Link as LinkIcon, Code, MessageCircle, Cookie, FileText,
  ChevronRight, Facebook, Linkedin, BarChart3, Globe, MonitorPlay,
  Flame, Video, LucideIcon
} from 'lucide-react';
import { CookiePolicyForm } from '@/components/Tags/CookiesPolicyForm';
import { TbArrowLeft } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';

interface TagItemData {
  id: string;
  title: string;
  desc?: string;
  icon: LucideIcon;
  color: string;
}

interface SelectedTagState {
  id: string;
  title: string;
}

interface TagOptionItemProps {
  icon: LucideIcon;
  colorClass?: string;
  title: string;
  description?: string;
  onClick: () => void;
  isSpecial?: boolean;
}

interface ModalCreateTagProps {
  onClose: () => void;
}

const TAG_FORMS: Record<string, React.ElementType> = {
  'cookies': CookiePolicyForm,
};

const TagOptionItem = ({
  icon: Icon,
  colorClass,
  title,
  description,
  onClick,
  isSpecial = false
}: TagOptionItemProps) => (
  <div
    onClick={onClick}
    className={`group flex items-start gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 border border-transparent
      ${isSpecial ? 'bg-blue-50 border-blue-100 hover:bg-blue-100' : 'hover:bg-gray-50 hover:border-gray-100'}
    `}
  >
    <div className={`
      flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center 
      ${isSpecial ? 'bg-blue-500 text-white' : (colorClass || '')} 
    `}>
      <Icon size={20} className={isSpecial ? 'fill-current' : ''} />
    </div>

    <div className="flex-1">
      <div className="flex items-center justify-between">
        <h3 className={`text-sm font-semibold ${isSpecial ? 'text-blue-900' : 'text-gray-900'}`}>
          {title}
        </h3>
        {isSpecial && <LinkIcon size={14} className="text-blue-500" />}
      </div>
      {description && (
        <p className={`text-xs mt-0.5 leading-relaxed ${isSpecial ? 'text-blue-700' : 'text-gray-500'}`}>
          {description}
        </p>
      )}
    </div>

    {!isSpecial && (
      <ChevronRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity self-center" />
    )}
  </div>
);

// --- Componente Principal ---
export default function ModalCreateTag({ onClose }: ModalCreateTagProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedTag, setSelectedTag] = useState<SelectedTagState | null>(null);
  const { t } = useTranslation()

  const handleSelect = (tag: SelectedTagState) => {
    setSelectedTag(tag);
    setStep(2);
  };

  const htmFunctions: TagItemData[] = [
    { id: 'access_tracking', title: 'Rastreamento de acesso', desc: 'Monitore visitas e interações dos usuários no site.', icon: Eye, color: 'bg-purple-100 text-purple-600' },
    { id: 'campaign_tracking', title: 'Rastreamento de campanha', desc: 'Capture e analise parâmetros UTM.', icon: LinkIcon, color: 'bg-blue-100 text-blue-600' },
    { id: 'custom_code', title: 'Código personalizado', desc: 'Permite adicionar um script JavaScript externo.', icon: Code, color: 'bg-gray-800 text-white' },
    { id: 'whatsapp', title: 'Formulário de WhatsApp', desc: 'Exiba um formulário pop-up interativo.', icon: MessageCircle, color: 'bg-green-100 text-green-600' },
    { id: 'cookies', title: 'Política de cookies', desc: 'Informe aos visitantes como suas políticas funcionam.', icon: Cookie, color: 'bg-orange-100 text-orange-600' },
    { id: 'form_tracking', title: 'Rastreamento de formulário', desc: 'Envie dados de formulários para webhook.', icon: FileText, color: 'bg-pink-100 text-pink-600' }
  ];

  const adPlatforms: TagItemData[] = [
    { id: 'google_ads', title: 'Google Ads', icon: Globe, color: 'bg-white border border-gray-200 text-blue-500' },
    { id: 'ga4', title: 'Google Analytics', icon: BarChart3, color: 'bg-orange-50 text-orange-500' },
    { id: 'gtm', title: 'Google Tag Manager', icon: Code, color: 'bg-blue-50 text-blue-500' },
    { id: 'tiktok', title: 'TikTok', icon: Video, color: 'bg-black text-white' },
    { id: 'linkedin', title: 'LinkedIn', icon: Linkedin, color: 'bg-blue-100 text-blue-700' },
    { id: 'clarity', title: 'Clarity', icon: MonitorPlay, color: 'bg-indigo-50 text-indigo-600' },
    { id: 'hotjar', title: 'Hotjar', icon: Flame, color: 'bg-red-50 text-red-500' },
  ];

  // --- RENDERIZAÇÃO: STEP 1 (SELEÇÃO) ---
  if (step === 1) {
    return (
      <div className="flex flex-col h-[65vh] overflow-y-auto pr-2 custom-scrollbar">
        {/* Seção 1: Funções do HTM */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">Funções do HTM</h4>
          <div className="space-y-1">
            {htmFunctions.map((item) => (
              <TagOptionItem
                key={item.id}
                title={item.title}
                description={item.desc}
                icon={item.icon}
                colorClass={item.color}
                onClick={() => handleSelect(item)}
              />
            ))}
          </div>
        </div>

        <hr className="border-gray-100 mb-6" />

        {/* Seção 2: Plataformas */}
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">Plataformas de Anúncios</h4>
          <div className="space-y-2">
            {/* Facebook (Especial) */}
            <div>
              <TagOptionItem
                isSpecial={true}
                title="Facebook Ads (Conectar)"
                description="Importar pixel automaticamente via OAuth"
                icon={Facebook}
                onClick={() => handleSelect({ id: 'facebook_oauth', title: 'Facebook Ads' })}
              />
              <div
                onClick={() => handleSelect({ id: 'facebook_manual', title: 'Facebook Manual' })}
                className="ml-14 mt-1 text-xs text-gray-500 hover:text-purple-600 cursor-pointer flex items-center gap-1 pl-1"
              >
                Configurar manualmente <ChevronRight size={12} />
              </div>
            </div>

            {/* Outras Plataformas */}
            {adPlatforms.map((item) => (
              <div key={item.id} onClick={() => handleSelect(item)} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                    <item.icon size={16} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{item.title}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const SelectedFormComponent = selectedTag ? TAG_FORMS[selectedTag.id] : null;

  return (
    <div className="flex flex-col h-[65vh] animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="mb-4 flex-shrink-0">
        <button
          onClick={() => setStep(1)}
          className="text-xs text-gray-400 font-semibold hover:text-gray-800 flex items-center gap-1 mb-4 transition-colors"
        >
          <TbArrowLeft className='w-5 h-5' /> {t('back')}
        </button>
        <h2 className="text-xl font-bold text-gray-900">
          {selectedTag?.id === 'cookies' ? 'Política de Cookies' : `Configurar ${selectedTag?.title}`}
        </h2>
        {selectedTag?.id !== 'cookies' && (
          <p className="text-sm text-gray-500">Preencha os dados abaixo para ativar esta tag.</p>
        )}
      </div>

      <div className="flex-1 overflow-hidden">
        {SelectedFormComponent ? (
          <SelectedFormComponent onClose={onClose} />
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-6 border border-dashed border-gray-300 rounded-lg bg-gray-50 text-center">
            <Code className="text-gray-400 mb-2 w-10 h-10" />
            <p className="text-gray-700 font-medium">Em desenvolvimento</p>
            <p className="text-gray-400 text-sm mt-1">O formulário para <strong>{selectedTag?.title}</strong> será implementado em breve.</p>
            <button onClick={onClose} className="mt-4 text-sm text-gray-500 hover:text-gray-900 underline">Fechar</button>
          </div>
        )}
      </div>
    </div>
  );
}