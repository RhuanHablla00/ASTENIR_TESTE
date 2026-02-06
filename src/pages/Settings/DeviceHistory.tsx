import Table from "@/components/Base/Table";
import { useTranslation } from "react-i18next";

export default function DeviceHistory() {

  const { t } = useTranslation();

  return (
    <div className="flex flex-col p-5 box box--stacked">
      <div className="flex items-center pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">
        {t('device_history')}
      </div>
      <div>
        <div className="text-slate-500">
          {t('device_history_description')}
        </div>
        <div className="mt-5 border rounded-lg border-slate-200/80">
          <div className="overflow-auto xl:overflow-visible">
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Td className="py-4 font-medium whitespace-nowrap first:rounded-tl-lg border-slate-200/80 last:rounded-tr-lg bg-slate-50 text-slate-500 dark:bg-darkmode-400">
                    {t('browser')}
                  </Table.Td>
                  <Table.Td className="py-4 font-medium whitespace-nowrap first:rounded-tl-lg border-slate-200/80 last:rounded-tr-lg bg-slate-50 text-slate-500 dark:bg-darkmode-400">
                    {t('device')}
                  </Table.Td>
                  <Table.Td className="py-4 font-medium whitespace-nowrap first:rounded-tl-lg border-slate-200/80 last:rounded-tr-lg bg-slate-50 text-slate-500 dark:bg-darkmode-400">
                    {t('location')}
                  </Table.Td>
                  <Table.Td className="py-4 font-medium whitespace-nowrap first:rounded-tl-lg border-slate-200/80 last:rounded-tr-lg bg-slate-50 text-slate-500 dark:bg-darkmode-400">
                    {t('recent_activity')}
                  </Table.Td>
                </Table.Tr>
              </Table.Thead>
              {/* tbody omitted */}
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}