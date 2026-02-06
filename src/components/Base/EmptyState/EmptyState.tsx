import React, { ReactNode } from "react";
import { TbApiOff } from "react-icons/tb";

interface EmptyStateProps {
  icon?: ReactNode;
  title?: string;
  subtitle?: string;
}

export default function EmptyState({ icon, title, subtitle }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center gap-4 box box--stacked mt-6">
      <div className="text-4xl">{icon ?? <TbApiOff className="w-10 h-10" />}</div>

      <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
        {title || "Nenhuma conexão encontrada"}
      </h3>

      {subtitle && (
        <p className="text-slate-500 max-w-sm">
          {subtitle}
        </p>
      )}
    </div>
  );
}
