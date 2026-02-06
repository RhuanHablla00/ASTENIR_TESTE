import "@/assets/css/vendors/toastify.css";
import { useRef, createRef, useEffect } from "react";
import { init, reInit } from "./notification";
import Toastify, { Options } from "toastify-js";
import clsx from "clsx";
import { createRoot } from "react-dom/client";

export interface NotificationElement extends HTMLDivElement {
  toastify: ReturnType<typeof Toastify>;
  showToast: () => void;
  hideToast: () => void;
}

export interface NotificationProps
  extends React.PropsWithChildren,
  React.ComponentPropsWithoutRef<"div"> {
  options?: Options;
  getRef?: (el: NotificationElement) => void;
}

function ShowNotification({
  className = "",
  options = {},
  getRef = () => { },
  children,
  ...computedProps
}: NotificationProps) {
  const props = {
    className: className,
    options: options,
    getRef: getRef,
  };
  const initialRender = useRef(true);
  const toastifyRef = createRef<NotificationElement>();

  useEffect(() => {
    if (toastifyRef.current) {
      if (initialRender.current) {
        props.getRef(toastifyRef.current);
        init(toastifyRef.current, props);
        initialRender.current = false;
      } else {
        reInit(toastifyRef.current);
      }
    }
  }, [props.options, children]);

  return (
    <div
      {...computedProps}
      className={clsx([
        "py-5 pl-5 pr-14 bg-white border border-slate-200/60 rounded-lg shadow-xl",
        "max-w-xl w-full break-words whitespace-pre-wrap",
        "dark:bg-darkmode-600 dark:text-slate-300 dark:border-darkmode-600 hidden",
        props.className,
      ])}

      ref={toastifyRef}
    >
      {children}
    </div>
  );
}

export default ShowNotification;

function showNotificationBase(
  message: string,
  className: string,
  duration = 3500
) {
  const wrapper = document.createElement("div");
  document.body.appendChild(wrapper);

  let refElement: NotificationElement | null = null;

  const root = createRoot(wrapper);

  root.render(
    <ShowNotification
      className={`box box--stacked ${className}`}
      options={{ duration }}
      getRef={(el) => (refElement = el)}
    >
      {message}
    </ShowNotification>
  );

  setTimeout(() => {
    refElement?.showToast();
  }, 20);

  setTimeout(() => {
    root.unmount();
    wrapper.remove();
  }, duration + 800);
}

export function showWarningNotification(message: string) {
  showNotificationBase(
    message,
    "border-warning bg-warning text-warning"
  );
}

export function showErrorNotification(message: string) {
  showNotificationBase(
    message,
    "border-danger bg-danger text-danger"
  );
}

export function showSuccessNotification(message: string) {
  showNotificationBase(
    message,
    ""
  );
}