import ScrollToTop from "@/components/Base/ScrollToTop";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./stores/store";
import Router from "./router";
import "./assets/css/app.css";
import "./i18n";
import { AuthSessionProvider } from "./providers/AuthSessionProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Provider store={store}>
      <AuthSessionProvider>
        <Router />
      </AuthSessionProvider>
    </Provider>
    <ScrollToTop />
  </BrowserRouter>
);