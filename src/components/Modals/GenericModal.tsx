import React, { useRef } from "react";
import { createPortal } from "react-dom";
import { Transition } from "react-transition-group";
import Button, { Variant } from "../Base/Button";
import { TbX } from "react-icons/tb";

type ModalButton = {
  label: string;
  onClick?: () => void;
  variant?: Variant;
  disabled?: boolean;
  className?: string;
};

type GenericModalProps = {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  content?: React.ReactNode;
  modalButtons?: ModalButton[];
  size?: "default" | "big" | "giant";
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
};


const TRANSITION_DURATION = 300;

export default function GenericModal({
  open,
  onClose,
  title,
  subtitle,
  content,
  modalButtons = [],
  size = "default",
  closeOnBackdrop = true,
  showCloseButton = true,
}: GenericModalProps) {
  const nodeRef = useRef(null);

  const widthClass = size === "big" ? "max-w-xl" : size === "giant" ? "max-w-7xl" : "max-w-xl";

  const transitionStyles = {
    entered: { opacity: "opacity-100", transform: "translate-y-0 scale-100" },
    exited: { opacity: "opacity-0", transform: "translate-y-4 scale-95" },
    entering: { opacity: "opacity-100", transform: "translate-y-0 scale-100" },
    exiting: { opacity: "opacity-0", transform: "translate-y-4 scale-95" },
    unmounted: { opacity: "opacity-0", transform: "translate-y-4 scale-95" },
  };

  return (
    <Transition
      in={open}
      nodeRef={nodeRef}
      timeout={TRANSITION_DURATION}
      mountOnEnter
      unmountOnExit
    >
      {(state) => {
        const stateClasses =
          transitionStyles[state as keyof typeof transitionStyles];

        const backdropOpacityClass = stateClasses.opacity;
        const modalContentClasses = `${stateClasses.transform} ${stateClasses.opacity}`;

        if (state === "entering" || state === "entered") {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }

        return createPortal(
          <div
            className={`fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 z-50 transition-opacity duration-${TRANSITION_DURATION} ${backdropOpacityClass}`}
            aria-modal="true"
            role="dialog"
            onClick={(e) => {
              if (!closeOnBackdrop) return;
              if (e.target === e.currentTarget) onClose?.();
            }}
          >
            <div
              className={`w-full ${widthClass} transition-all duration-${TRANSITION_DURATION} ease-out ${modalContentClasses}`}
            >
              <div className="rounded-xl shadow-xl box box--stacked dark:border dark:border-gray-600 max-h-[90vh] flex flex-col overflow-hidden">                <div className="flex justify-between items-start p-6 pb-3">
                <div className="flex-1 text-center">
                  {title && (
                    <h2 className="text-xl font-semibold leading-none">
                      {title}
                    </h2>
                  )}
                  {subtitle && (
                    <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
                  )}
                </div>

                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="ml-4 text-gray-400 hover:text-gray-300 transition"
                    aria-label="Fechar modal"
                  >
                    <TbX className="w-5 h-5" />
                  </button>
                )}
              </div>

                <div className="flex-1 min-h-0 px-6 pb-6 overflow-y-auto">
                  <div className="space-y-6">
                    {content}

                    {modalButtons?.length > 0 && (
                      <div className="flex justify-end gap-3 pt-4">
                        {modalButtons.map((button, idx) => (
                          <Button
                            key={idx}
                            onClick={button.onClick}
                            disabled={button.disabled}
                            className={button.className}
                            variant={button.variant}
                          >
                            {button.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        );
      }}
    </Transition>
  );
}
