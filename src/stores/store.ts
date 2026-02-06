import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

import darkModeReducer from "./darkModeSlice";
import colorSchemeReducer from "./colorSchemeSlice";
import sideMenuReducer from "./sideMenuSlice";
import themeReducer from "./themeSlice";
import compactMenuReducer from "./compactMenuSlice";
import pageLoaderReducer from "./pageLoaderSlice";
import workspaceReducer from "./workspaceSlice";
import authReducer from "./authSlice";
import { baseApi } from "@/api/baseApi";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "accessToken", "refreshToken"],
};

const workspacePersistConfig = {
  key: "workspace",
  storage,
  whitelist: ["selectedWorkspace", "workspaceMe"],
};

const userPersistConfig = {
  key: "workspace",
  storage,
  whitelist: ["selectedUser"],
};

const rootReducer = combineReducers({
  darkMode: darkModeReducer,
  colorScheme: colorSchemeReducer,
  sideMenu: sideMenuReducer,
  theme: themeReducer,
  compactMenu: compactMenuReducer,
  pageLoader: pageLoaderReducer,

  auth: persistReducer(authPersistConfig, authReducer),
  workspace: persistReducer(workspacePersistConfig, workspaceReducer),
  
  [baseApi.reducerPath]: baseApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
