import { useContext, forwardRef } from "react";
import { formInlineContext } from "../FormInline";
import { inputGroupContext } from "../InputGroup";
import { twMerge } from "tailwind-merge";

interface FormInputProps extends React.ComponentPropsWithoutRef<"input"> {
  formInputSize?: "sm" | "lg";
  rounded?: boolean;
  label?: string;
}

type FormInputRef = React.ComponentPropsWithRef<"input">["ref"];

const FormInput = forwardRef((props: FormInputProps, ref: FormInputRef) => {
  const formInline = useContext(formInlineContext);
  const inputGroup = useContext(inputGroupContext);
  const { formInputSize, rounded, label, className, ...computedProps } = props;

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
          <div className="text-left">
            <div className="flex items-center">
              <div className="font-medium mb-1">{label}</div>
            </div>
          </div>
        </label>
      )}

      <input
        {...computedProps}
        ref={ref}
        className={twMerge([
          "disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-700/50",
          "[&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-700/50",
          "transition duration-200 ease-in-out w-full text-sm border-slate-300/60 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-700 dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80",
          formInputSize === "sm" && "text-xs py-1.5 px-2",
          formInputSize === "lg" && "text-lg py-1.5 px-4",
          rounded && "rounded-full",
          formInline && "flex-1",
          inputGroup &&
          "rounded-none [&:not(:first-child)]:border-l-transparent first:rounded-l last:rounded-r z-10",
          className,
        ])}
      />
    </div>
  );
});

export default FormInput;
