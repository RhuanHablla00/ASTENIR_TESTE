import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function MetaOauthCallback() {
  const [params] = useSearchParams();

  useEffect(() => {
    const code = params.get("code") ?? "";
    const state = params.get("state") ?? undefined;

    const error = params.get("error") ?? undefined;
    const error_description = params.get("error_description") ?? undefined;

    const granted_scopes = params.get("granted_scopes") ?? undefined;
    const denied_scopes = params.get("denied_scopes") ?? undefined;

    try {
      if (window.opener) {
        if (error) {
          window.opener.postMessage(
            { type: "META_OAUTH_ERROR", error, error_description, state },
            window.location.origin
          );
        } else {
          window.opener.postMessage(
            { type: "META_OAUTH_SUCCESS", code, state, granted_scopes, denied_scopes },
            window.location.origin
          );
        }
      }
    } catch (e) {
      // noop
    } finally {
      // fecha o popup sozinho
      window.close();
    }
  }, [params]);

  return (
    <div className="p-6 text-center text-slate-600">
      Concluindo autenticação com a Meta...
    </div>
  );
}
