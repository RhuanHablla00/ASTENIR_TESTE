import { useTranslation } from "react-i18next";
import Table from "@/components/Base/Table";
import LoadingIcon from "@/components/Base/LoadingIcon";
import Lucide from "@/components/Base/Lucide";
import { Menu } from "@/components/Base/Headless";

interface TemplatesListTabProps {
  templates: any[];
  loading: boolean;
}

export default function TemplatesListTab({ templates, loading }: TemplatesListTabProps) {
  const { t } = useTranslation();

  const renderStatus = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <div className="flex items-center text-success"><Lucide icon="CheckCircle" className="w-4 h-4 mr-1.5" />{t('approved')}</div>;
      case "REJECTED":
        return <div className="flex items-center text-danger"><Lucide icon="XCircle" className="w-4 h-4 mr-1.5" />{t('rejected')}</div>;
      default:
        return <div className="flex items-center text-warning"><Lucide icon="Clock" className="w-4 h-4 mr-1.5" />{t('pending')}</div>;
    }
  };

  if (loading) {
    return <div className="p-10 flex justify-center text-slate-500"><LoadingIcon icon="oval" className="w-8 h-8" /></div>;
  }

  return (
    <div className="overflow-auto xl:overflow-visible">
      <Table className="border-b border-slate-200/60">
        <Table.Thead>
          <Table.Tr>
            <Table.Td className="py-4 font-medium border-t bg-slate-50 dark:bg-darkmode-400 text-slate-500">{t("name")}</Table.Td>
            <Table.Td className="py-4 font-medium border-t bg-slate-50 dark:bg-darkmode-400 text-slate-500">{t("category")}</Table.Td>
            <Table.Td className="py-4 font-medium border-t bg-slate-50 dark:bg-darkmode-400 text-slate-500">{t("language")}</Table.Td>
            <Table.Td className="py-4 font-medium text-center border-t bg-slate-50 dark:bg-darkmode-400 text-slate-500">Status</Table.Td>
            <Table.Td className="w-20 py-4 font-medium text-center border-t bg-slate-50 dark:bg-darkmode-400 text-slate-500">{t("actions")}</Table.Td>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {templates?.map((item: any) => (
            <Table.Tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-darkmode-400/50 transition-colors">
              <Table.Td className="py-4 border-dashed"><div className="font-medium text-slate-700">{item.name}</div></Table.Td>
              <Table.Td className="py-4 border-dashed"><span className="capitalize text-slate-600">{item.category.toLowerCase().replace("_", " ")}</span></Table.Td>
              <Table.Td className="py-4 border-dashed"><div className="flex items-center text-slate-600"><Lucide icon="Globe" className="w-3.5 h-3.5 mr-2" />{item.language}</div></Table.Td>
              <Table.Td className="py-4 border-dashed"><div className="flex justify-center">{renderStatus(item.status)}</div></Table.Td>
              <Table.Td className="relative py-4 border-dashed">
                <div className="flex items-center justify-center">
                  <Menu className="h-5">
                    <Menu.Button className="w-5 h-5 text-slate-500 hover:text-slate-700"><Lucide icon="MoreVertical" className="w-5 h-5" /></Menu.Button>
                    <Menu.Items className="w-40">
                      <Menu.Item><Lucide icon="Eye" className="w-4 h-4 mr-2" />{t("view_details")}</Menu.Item>
                      <Menu.Item className="text-danger"><Lucide icon="Trash2" className="w-4 h-4 mr-2" />{t("delete")}</Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}