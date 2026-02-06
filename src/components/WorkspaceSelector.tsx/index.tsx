import { Link, useNavigate } from "react-router-dom";
import { TbArrowsLeftRight } from "react-icons/tb";
import { useAppSelector } from "@/stores/hooks";

export default function WorkspaceSelector() {
  const workspace = useAppSelector((state) => state.workspace.selectedWorkspace);
  const navigate = useNavigate();

  return (
    <Link
      to="workspace-settings"
      className="flex items-center justify-between p-1 min-w-40 max-w-40 h-10 rounded-lg bg-white/10 dark:bg-darkmode-900/30 border border-transparent shadow-sm gap-2 text-white/60 cursor-pointer hover:bg-white/15 transition-colors"
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <img
          src={workspace?.photo_url ?? "https://cdn-hablla-dev.nyc3.cdn.digitaloceanspaces.com/ws_660c476a7d6dde0750db5e4c/hablla-agent/astenir-832fc737-b675-4ba2-826d-6e287b529142.svghttps://cdn-hablla-dev.nyc3.cdn.digitaloceanspaces.com/ws_660c476a7d6dde0750db5e4c/hablla-agent/astenirLight-e5bb357f-0daa-410e-adc3-c85f6be710a6.svg"}
          alt=""
          className="w-8 h-8 rounded-md object-cover flex-shrink-0"
        />

        <div className="flex flex-col leading-tight min-w-0">
          <span className="font-medium text-white/60 text-sm truncate">
            {workspace?.name ?? "Sem workspace"}
          </span>
          <span className="text-white/40 text-[11px] truncate">
            {workspace?.description ?? "Sem descrição do workspace"}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          navigate('/workspace/list')
        }}
        className="h-7 w-7 flex items-center justify-center rounded-md border border-white/30 hover:bg-white/20 transition-colors flex-shrink-0"
      >
        <TbArrowsLeftRight className="w-4 h-4 text-gray-200/80" />
      </button>
    </Link>
  );
}
