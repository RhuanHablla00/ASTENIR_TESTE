import React, { useState } from 'react';
import { MoreHorizontal, Plus, Search, BarChart3, Facebook } from 'lucide-react';
import { TbPlus } from 'react-icons/tb';
import Button from '@/components/Base/Button';
import { useTranslation } from 'react-i18next';
import GenericModal from '@/components/Modals/GenericModal';
import ModalCreateTag from '@/components/Modals/ModalCreateTag';

export default function Tags() {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [integrations, setIntegrations] = useState([
    {
      id: 1,
      name: "Search Console - https://hablla.com/",
      provider: "google_search_console",
      identifier: "ID: https://hablla.com/",
      isActive: true,
      icon: <span className="text-gray-500 font-medium text-lg">?</span>,
      iconBg: "bg-gray-100"
    },
    {
      id: 2,
      name: "hablla.com",
      provider: "Google Analytics",
      identifier: "ID: properties/383291588",
      isActive: true,
      icon: <BarChart3 className="text-yellow-500 w-6 h-6" />,
      iconBg: "bg-orange-50"
    },
    {
      id: 3,
      name: "Meta Integration - Hablla",
      provider: "Facebook Ads",
      identifier: "ID: 1182177690705982",
      isActive: true,
      icon: <Facebook className="text-blue-600 w-6 h-6 fill-current" />,
      iconBg: "bg-blue-50"
    }
  ]);

  const toggleStatus = (id: any) => {
    setIntegrations(integrations.map(item =>
      item.id === id ? { ...item, isActive: !item.isActive } : item
    ));
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Cabeçalho */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-xl font-semibold text-white">Tags & Rastreadores</h1>
          <p className="text-gray-200 text-sm">
            Configure tags de plataformas e rastreadores de atribuição
          </p>
        </div>
        <Button
          type="button"
          className="text-white"
          onClick={() => setOpenModal(true)}
        >
          <TbPlus className="text-white w-4 h-4 mr-2" />
          {t("add_tag")}
        </Button>

        <GenericModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          title={t("add_tag")}
          closeOnBackdrop={false}
          subtitle={"Selecione a plataforma para configurar sua tag"}
          size="default"
          content={
            <ModalCreateTag onClose={() => setOpenModal(false)} />
          }
        />
      </div>

      <div className="space-y-4 box box--stacked p-4 h-full">
        {integrations.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-xl p-4 flex items-center justify-between bg-white dark:bg-black shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${item.iconBg} rounded-lg flex items-center justify-center`}>
                {item.icon}
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 dark:text-white">{item.name}</span>
                  {item.isActive && (
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                      Ativo
                    </span>
                  )}
                </div>
                <div className="text-gray-500 text-xs mt-1 flex gap-1">
                  <span>{item.provider}</span>
                  <span>•</span>
                  <span>{item.identifier}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">Ativo</span>

                <button
                  onClick={() => toggleStatus(item.id)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${item.isActive ? 'bg-primary' : 'bg-gray-300'}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${item.isActive ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>

              <button className="text-gray-400 hover:text-gray-600 p-1">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}