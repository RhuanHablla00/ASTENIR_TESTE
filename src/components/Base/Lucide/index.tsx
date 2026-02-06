import { twMerge } from "tailwind-merge";
import { IconName, icons } from "./icons";

interface LucideProps extends React.ComponentPropsWithoutRef<"svg"> {
  icon: IconName;
  title?: string;
}

function Lucide({ icon, className, ...props }: LucideProps) {
  const Component = icons[icon];

  return (
    <Component
      {...props}
      className={twMerge("stroke-[1] w-5 h-5", className)}
    />
  );
}

export default Lucide;
