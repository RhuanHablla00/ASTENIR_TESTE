import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useLazyGetWorkspaceApiQuery } from "@/api/workspaceApi";
import { useAppSelector } from "@/stores/hooks";
import { setWorkspace } from "@/stores/workspaceSlice";

export default function WorkspaceGuard() {
  const { workspace_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const selectedWorkspaceId = useAppSelector(
    (state) => state.workspace.selectedWorkspace?.id
  );

  const [fetchWorkspace, { data, isFetching, isSuccess, isError }] =
    useLazyGetWorkspaceApiQuery();

  useEffect(() => {
    if (!workspace_id) {
      setLoading(false);
      return;
    }

    if (selectedWorkspaceId === workspace_id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchWorkspace(workspace_id);
  }, [workspace_id, selectedWorkspaceId, fetchWorkspace]);

  useEffect(() => {
    if (isFetching) {
      setLoading(true);
      return;
    }

    if (isSuccess && data) {
      dispatch(setWorkspace(data));
      setLoading(false);
      return;
    }

    if (isError) {
      setLoading(false);
      navigate("/workspace/list", { replace: true });
    }
  }, [isFetching, isSuccess, isError, data, dispatch, navigate]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="flex items-center justify-center flex-col">
          Loading...
        </div>
      </div>
    );
  }

  return <Outlet />;
}
