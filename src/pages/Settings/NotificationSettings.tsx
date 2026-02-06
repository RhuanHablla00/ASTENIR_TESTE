import Alert from "@/components/Base/Alert";
import Button from "@/components/Base/Button";
import { FormCheck, FormSelect } from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";
import Table from "@/components/Base/Table";
import { useTranslation } from "react-i18next";

export default function NotificationSettings() {

  const { t } = useTranslation();

  return (
    <div className="flex flex-col p-5 box box--stacked">
      <div className="flex items-center pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">
        {t('notification_settings')}
      </div>
      <div>
        <Alert
          variant="outline-primary"
          className="flex items-center px-4 mb-2 bg-primary/5 border-primary/20"
        >
          {({ dismiss }) => (
            <>
              <div>
                <Lucide
                  icon="AlertCircle"
                  className="stroke-[1.3] w-4 h-4 mr-3 md:mr-2"
                />
              </div>
              <div className="mr-5 leading-relaxed">
                {t('request_permission_message')}
                <a
                  href=""
                  className="ml-1 font-medium underline decoration-dotted decoration-warning/50 underline-offset-[3px]"
                >
                  {t('request_permission')}
                </a>
                <Alert.DismissButton
                  type="button"
                  className="inset-y-0 btn-close"
                  onClick={dismiss}
                  aria-label="Close"
                >
                  <Lucide icon="X" className="w-4 h-4" />
                </Alert.DismissButton>
              </div>
            </>
          )}
        </Alert>
        <div className="mt-5 border rounded-lg border-slate-200/80">
          <div className="overflow-auto xl:overflow-visible">
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Td className="py-4 font-medium first:rounded-tl-lg border-slate-200/80 last:rounded-tr-lg bg-slate-50 text-slate-500 dark:bg-darkmode-400">
                    {t('type')}
                  </Table.Td>
                  <Table.Td className="py-4 font-medium first:rounded-tl-lg border-slate-200/80 last:rounded-tr-lg bg-slate-50 text-slate-500 dark:bg-darkmode-400">
                    <div className="flex flex-col items-center">
                      <Lucide icon="MailCheck" className="w-6 h-6" />
                      <div className="mt-1.5">{t('email')}</div>
                    </div>
                  </Table.Td>
                  <Table.Td className="py-4 font-medium first:rounded-tl-lg border-slate-200/80 last:rounded-tr-lg bg-slate-50 text-slate-500 dark:bg-darkmode-400">
                    <div className="flex flex-col items-center">
                      <Lucide icon="Globe" className="w-6 h-6" />
                      <div className="mt-1.5">{t('browser')}</div>
                    </div>
                  </Table.Td>
                  <Table.Td className="py-4 font-medium first:rounded-tl-lg border-slate-200/80 last:rounded-tr-lg bg-slate-50 text-slate-500 dark:bg-darkmode-400">
                    <div className="flex flex-col items-center">
                      <Lucide icon="Smartphone" className="w-6 h-6" />
                      <div className="mt-1.5">{t('app')}</div>
                    </div>
                  </Table.Td>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr className="[&_td]:last:border-b-0">
                  <Table.Td className="py-4 border-dashed border-slate-300/70 dark:bg-darkmode-600">
                    <div className="whitespace-nowrap">
                      {t('unusual_login_activity_detected')}
                    </div>
                  </Table.Td>
                  <Table.Td className="py-4 border-dashed border-slate-300/70 dark:bg-darkmode-600">
                    <div className="text-center">
                      <FormCheck.Input
                        id="checkbox-switch-3"
                        type="checkbox"
                        value=""
                      />
                    </div>
                  </Table.Td>
                  <Table.Td className="py-4 border-dashed border-slate-300/70 dark:bg-darkmode-600">
                    <div className="text-center">
                      <FormCheck.Input
                        id="checkbox-switch-3"
                        type="checkbox"
                        value=""
                      />
                    </div>
                  </Table.Td>
                  <Table.Td className="py-4 border-dashed border-slate-300/70 dark:bg-darkmode-600">
                    <div className="text-center">
                      <FormCheck.Input
                        id="checkbox-switch-3"
                        type="checkbox"
                        value=""
                      />
                    </div>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr className="[&_td]:last:border-b-0">
                  <Table.Td className="py-4 border-dashed border-slate-300/70 dark:bg-darkmode-600">
                    <div className="flex items-center whitespace-nowrap">
                      {t('password_change_request')}
                      <Lucide
                        className="w-4 h-4 ml-1.5 text-slate-400 stroke-[1.3]"
                        icon="Info"
                      />
                    </div>
                  </Table.Td>
                  <Table.Td className="py-4 border-dashed border-slate-300/70 dark:bg-darkmode-600">
                    <div className="text-center">
                      <FormCheck.Input
                        id="checkbox-switch-3"
                        type="checkbox"
                        value=""
                      />
                    </div>
                  </Table.Td>
                  <Table.Td className="py-4 border-dashed border-slate-300/70 dark:bg-darkmode-600">
                    <div className="text-center">
                      <FormCheck.Input
                        id="checkbox-switch-3"
                        type="checkbox"
                        value=""
                      />
                    </div>
                  </Table.Td>
                  <Table.Td className="py-4 border-dashed border-slate-300/70 dark:bg-darkmode-600">
                    <div className="text-center">
                      <FormCheck.Input
                        id="checkbox-switch-3"
                        type="checkbox"
                        value=""
                      />
                    </div>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr className="[&_td]:last:border-b-0">
                  <Table.Td className="py-4 border-dashed border-slate-300/70 dark:bg-darkmode-600">
                    <div className="whitespace-nowrap">
                      {t('new_message_received')}
                    </div>
                  </Table.Td>
                  <Table.Td className="py-4 border-dashed border-slate-300/70 dark:bg-darkmode-600">
                    <div className="text-center">
                      <FormCheck.Input
                        id="checkbox-switch-3"
                        type="checkbox"
                        value=""
                      />
                    </div>
                  </Table.Td>
                  <Table.Td className="py-4 border-dashed border-slate-300/70 dark:bg-darkmode-600">
                    <div className="text-center">
                      <FormCheck.Input
                        id="checkbox-switch-3"
                        type="checkbox"
                        value=""
                      />
                    </div>
                  </Table.Td>
                  <Table.Td className="py-4 border-dashed border-slate-300/70 dark:bg-darkmode-600">
                    <div className="text-center">
                      <FormCheck.Input
                        id="checkbox-switch-3"
                        type="checkbox"
                        value=""
                      />
                    </div>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr className="[&_td]:last:border-b-0">
                  <Table.Td className="py-4 border-dashed border-slate-300/70 dark:bg-darkmode-600">
                    <div className="whitespace-nowrap">
                      {t('account_activity_summary')}
                    </div>
                  </Table.Td>
                  <Table.Td className="py-4 border-dashed border-slate-300/70 dark:bg-darkmode-600">
                    <div className="text-center">
                      <FormCheck.Input
                        id="checkbox-switch-3"
                        type="checkbox"
                        value=""
                      />
                    </div>
                  </Table.Td>
                  <Table.Td className="py-4 border-dashed border-slate-300/70 dark:bg-darkmode-600">
                    <div className="text-center">
                      <FormCheck.Input
                        id="checkbox-switch-3"
                        type="checkbox"
                        value=""
                      />
                    </div>
                  </Table.Td>
                  <Table.Td className="py-4 border-dashed border-slate-300/70 dark:bg-darkmode-600">
                    <div className="text-center">
                      <FormCheck.Input
                        id="checkbox-switch-3"
                        type="checkbox"
                        value=""
                      />
                    </div>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr className="[&_td]:last:border-b-0">
                  <Table.Td className="py-4 border-dashed border-slate-300/70 dark:bg-darkmode-600">
                    <div className="flex items-center whitespace-nowrap">
                      {t('security_alert_unrecognized_device')}
                      <Lucide
                        className="w-4 h-4 ml-1.5 text-slate-400 stroke-[1.3]"
                        icon="Info"
                      />
                    </div>
                  </Table.Td>
                  <Table.Td className="py-4 border-dashed border-slate-300/70 dark:bg-darkmode-600">
                    <div className="text-center">
                      <FormCheck.Input
                        id="checkbox-switch-3"
                        type="checkbox"
                        value=""
                      />
                    </div>
                  </Table.Td>
                  <Table.Td className="py-4 border-dashed border-slate-300/70 dark:bg-darkmode-600">
                    <div className="text-center">
                      <FormCheck.Input
                        id="checkbox-switch-3"
                        type="checkbox"
                        value=""
                      />
                    </div>
                  </Table.Td>
                  <Table.Td className="py-4 border-dashed border-slate-300/70 dark:bg-darkmode-600">
                    <div className="text-center">
                      <FormCheck.Input
                        id="checkbox-switch-3"
                        type="checkbox"
                        value=""
                      />
                    </div>
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </div>
        </div>
        <div className="flex-col block pt-5 mt-3 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
          <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-1/2 xl:mr-14">
            <div className="text-left">
              <div className="flex items-center">
                <div className="font-medium">
                  {t('when_would_you_prefer_to_receive_notifications')}
                </div>
              </div>
            </div>
          </label>
          <div className="flex-1 w-full mt-3 xl:mt-0">
            <FormSelect>
              <option value="Immediately">{t('immediately')}</option>
              <option value="In the morning">{t('in_the_morning')}</option>
              <option value="At noon">{t('at_noon')}</option>
              <option value="In the afternoon">
                {t('in_the_afternoon')}
              </option>
              <option value="In the evening">{t('in_the_evening')}</option>
              <option value="At night">{t('at_night')}</option>
              <option value="Once a day">{t('once_a_day')}</option>
              <option value="Twice a day">{t('twice_a_day')}</option>
              <option value="Custom schedule">{t('custom_schedule')}</option>
              <option value="Don't send notifications">
                {t('dont_send_notifications')}
              </option>
            </FormSelect>
          </div>
        </div>
        <div className="flex-col block pt-5 mt-3 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
          <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-1/2 xl:mr-14">
            <div className="text-left">
              <div className="flex items-center">
                <div className="font-medium">
                  {t('daily_overview_task_activity')}
                </div>
              </div>
            </div>
          </label>
          <div className="flex-1 w-full mt-3 xl:mt-0">
            <div className="flex flex-col items-center md:flex-row">
              <FormSelect className="first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10">
                <option value="Every day">{t('every_day')}</option>
                <option value="Once a day">{t('once_a_day')}</option>
                <option value="Twice a day">{t('twice_a_day')}</option>
                <option value="No daily overview (disable Daily Digest)">
                  {t('no_daily_overview')}
                </option>
              </FormSelect>
              <FormSelect className="first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10">
                <option value="at 8:00 AM">at 8:00 AM</option>
                <option value="at 12:00 PM">at 12:00 PM</option>
                <option value="at 4:00 PM">at 4:00 PM</option>
                <option value="at 8:00 PM">at 8:00 PM</option>
              </FormSelect>
            </div>
          </div>
        </div>
        <div className="mt-7 text-slate-500">
          {t('email_notifications_message')}
        </div>
      </div>
      <div className="flex pt-5 mt-6 border-t border-dashed md:justify-end border-slate-300/70">
        <Button
          variant="outline-primary"
          className="w-full px-4 border-primary/50 md:w-auto"
        >
          {t('save_changes')}
        </Button>
      </div>
    </div>
  )
}