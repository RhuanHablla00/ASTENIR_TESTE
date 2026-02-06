import { useForm } from "react-hook-form";
import clsx from "clsx";

import Button from "@/components/Base/Button";
import Lucide from "@/components/Base/Lucide";
import { FormInput, FormHelp } from "@/components/Base/Form";
import { useSendInviteMutation } from "@/api/inviteApi";
import { useAppSelector } from "@/stores/hooks";
import { useTranslation } from "react-i18next";
import { useGetEntitiesApiQuery } from "@/api/workspaceApi";
import { useParams } from "react-router-dom";
import { useState } from "react";

type FormData = {
  email: string;
};

export default function ModalSendTeamInvite({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const workspaceId = useAppSelector((state) => state.workspace.selectedWorkspace?.id!);
  const workspaceMe = useAppSelector((state) => state.workspace?.workspaceMe);
  const [selectedEntities, setSelectedEntities] = useState<string[]>([]);
  const [entitiesError, setEntitiesError] = useState<string | null>(null);

  const { t } = useTranslation();
  const [sendInvite, { isLoading }] = useSendInviteMutation();
  const { workspace_id } = useParams();


  const { data } = useGetEntitiesApiQuery(workspace_id!);
  const shouldShowEntities = Boolean(workspaceMe?.entity) && Boolean(data?.results?.length);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
    },
  });

  const handleFormSubmit = async (formData: FormData) => {
    if (data?.results?.length && selectedEntities.length === 0) {
      setEntitiesError(t("select_at_least_one_entity"));
      return;
    }

    setEntitiesError(null);

    try {
      await sendInvite({
        entities: selectedEntities,
        workspaceId,
        email: formData.email,
      }).unwrap();

      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleEntitiesSelection = (entityId: string) => {
    setSelectedEntities(prev =>
      prev.includes(entityId)
        ? prev.filter(id => id !== entityId)
        : [...prev, entityId]
    );

    setEntitiesError(null);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="">
      <div>
        <label className="font-medium mb-1 block">{t('user_email')}</label>
        <FormInput
          {...register("email", {
            required: t('email_is_required'),
            pattern: {
              value: /^\S+@\S+$/i,
              message: t('invalid_email'),
            },
          })}
          placeholder="exemplo@email.com"
          className={clsx({ "border-danger": errors.email })}
          disabled={isLoading}
        />
        {errors.email && (
          <FormHelp className="text-danger mt-2">
            {errors.email.message}
          </FormHelp>
        )}
      </div>

      {shouldShowEntities && (
        <>
          <label className="font-medium block mt-4 mb-1">
            {t("entities_availables_to_invite")}
          </label>

          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {data!.results.map((entity: any) => {
              const isSelected = selectedEntities.includes(entity.id);

              return (
                <div
                  key={entity.id}
                  onClick={() => toggleEntitiesSelection(entity.id)}
                  className={clsx(
                    "p-4 border rounded-md shadow-sm bg-white dark:bg-darkmode-800 cursor-pointer relative transition-all duration-200",
                    isSelected
                      ? "border-2 border-primary shadow-lg"
                      : "border-slate-200 dark:border-darkmode-600"
                  )}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                  )}

                  <div className="font-semibold text-sm text-slate-700 dark:text-slate-300">
                    {t("name")}: {entity.name}
                  </div>

                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {t("description")}: {entity.description}
                  </div>
                </div>
              );
            })}
          </div>

          {entitiesError && (
            <FormHelp className="text-danger mt-2">
              {entitiesError}
            </FormHelp>
          )}
        </>
      )}

      <div className="flex justify-end pt-2 mt-4">
        <Button type="submit" variant="primary" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? (
            <Lucide icon="Loader2" className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Lucide icon="MailPlus" className="w-4 h-4 mr-2" />
          )}
          {t('send_invite')}
        </Button>
      </div>
    </form>
  );
}