import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WorkspaceSettings {
  timezone: string;
  currency: string;
  date_format: string;
}

export interface Workspace {
  id: string;
  owner?: string;
  name: string;
  entity: string;
  business_email: string;
  industry: string;
  website: string | null;
  address_line: string;
  city: string;
  administrative_area: string | null;
  postal_code: string | null;
  phone: string | null;
  photo_url: string;
  description: string;
  settings: WorkspaceSettings;
  created_at: string;
  updated_at: string;
}

interface WorkspaceState {
  selectedWorkspace: Workspace | null;
  workspaceMe: Workspace | null;
}

const initialState: WorkspaceState = {
  selectedWorkspace: null,
  workspaceMe: null,
};

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setWorkspace: (state, action: PayloadAction<Workspace>) => {
      state.selectedWorkspace = action.payload;
    },

    setWorkspaceMe: (state, action: PayloadAction<Workspace>) => {
      state.workspaceMe = action.payload;
    },

    clearWorkspace: (state) => {
      state.selectedWorkspace = null;
      state.workspaceMe = null;
    },

    updateWorkspace: (state, action: PayloadAction<Partial<Workspace>>) => {
      if (!state.selectedWorkspace) return;

      state.selectedWorkspace = {
        ...state.selectedWorkspace,
        ...action.payload,
      };
    },
  },
});

export const {
  setWorkspace,
  setWorkspaceMe,
  clearWorkspace,
  updateWorkspace,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
