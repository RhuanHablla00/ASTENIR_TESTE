import React, { useState } from 'react';
import { Check, X, ChevronDown } from 'lucide-react';

interface CookiePolicyFormProps {
  onClose: () => void;
}

export const CookiePolicyForm = ({ onClose }: CookiePolicyFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    isActive: true,
    position: 'bottom_right',
    theme: 'light',
    description: 'Utilizamos cookies para oferecer melhor experiência, melhorar o desempenho, analisar como você interage em nosso site e personalizar conteúdo. Ao utilizar este site, você concorda com o uso de cookies.',
    privacyUrl: ''
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-5 p-1">
        
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-end">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Nome<span className="text-red-500">*</span></label>
            <input 
              type="text" 
              placeholder="Ex: Conversão Principal"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">Status</span>
            <div className="flex items-center bg-gray-100 rounded-lg p-1 border border-gray-200">
              <button
                onClick={() => setFormData({...formData, isActive: true})}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  formData.isActive 
                    ? 'bg-green-500 text-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Check size={14} /> Ativo
              </button>
              <button
                onClick={() => setFormData({...formData, isActive: false})}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  !formData.isActive 
                    ? 'bg-gray-500 text-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <X size={14} /> Inativo
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Local do aviso</label>
          <div className="relative">
            <select 
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={formData.position}
              onChange={(e) => setFormData({...formData, position: e.target.value})}
            >
              <option value="bottom_right">Inferior direito</option>
              <option value="bottom_left">Inferior esquerdo</option>
              <option value="top_full">Topo (Faixa)</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Tema</label>
          <div className="grid grid-cols-2 gap-0 border border-gray-200 rounded-md overflow-hidden">
            <button
              onClick={() => setFormData({...formData, theme: 'light'})}
              className={`py-2 text-sm font-medium transition-colors ${
                formData.theme === 'light' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              ✓ Claro
            </button>
            <button
              onClick={() => setFormData({...formData, theme: 'dark'})}
              className={`py-2 text-sm font-medium transition-colors ${
                formData.theme === 'dark' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Escuro
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Descrição da política<span className="text-red-500">*</span></label>
          <textarea 
            rows={4}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">URL da política de privacidade<span className="text-red-500">*</span></label>
          <input 
            type="text" 
            placeholder="https://seusite.com/politica-de-privacidade"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={formData.privacyUrl}
            onChange={(e) => setFormData({...formData, privacyUrl: e.target.value})}
          />
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3 bg-white">
        <button className="bg-purple-400 hover:bg-purple-500 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors">
          Criar
        </button>
        <button className="bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 px-4 py-2 rounded-md text-sm font-medium transition-colors">
          Salvar e criar outro
        </button>
        <button 
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900 px-4 py-2 text-sm font-medium transition-colors ml-auto"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};