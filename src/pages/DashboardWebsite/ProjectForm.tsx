import Button from '@/components/Base/Button';
import { useState } from 'react';

export interface ProjectFormData {
  name: string;
  website: string;
  timezone: string;
}

interface ProjectFormProps {
  project: any; 
  onSuccess: (data: ProjectFormData) => Promise<void>;
}

export function ProjectForm({ project, onSuccess }: ProjectFormProps) {
  console.log("project", project)
  const [formData, setFormData] = useState<ProjectFormData>({
    name: project?.name || '',
    website: project?.website || '', 
    timezone: project?.settings?.timezone || 'America/Sao_Paulo',
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await onSuccess(formData);
    } catch (error) {
      console.error("Erro ao submeter form", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none">Nome do Workspace</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none">Website / Domínio</label>
        <input
          type="url"
          placeholder="https://seu-site.com"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none">Fuso Horário</label>
        <select
          value={formData.timezone}
          onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="America/Sao_Paulo">America/Sao_Paulo (GMT-3)</option>
          <option value="America/New_York">America/New_York (GMT-5)</option>
          <option value="Europe/London">Europe/London (GMT+0)</option>
        </select>
        <p className="text-xs text-slate-500">
          Utilizado para relatórios e exibição de dados.
        </p>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={saving}>
          {saving ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </div>
    </form>
  );
}