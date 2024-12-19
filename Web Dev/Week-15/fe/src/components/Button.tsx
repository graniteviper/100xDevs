import { ReactElement } from "react";

type VariantTypes = "primary" | "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: VariantTypes;
  title: string;
  icon?: ReactElement;
}

const commonClasses: string =
  "before:rounded-lg before:z-5 z-10 before:transiton-all before:duration-300 flex items-center justify-center gap-2 before:-inset-1 before:absolute before:block relative inline-block before:hover:opacity-70 font-bold text-md";

const buttonVariants: { [k in VariantTypes]: string } = {
  primary: "before:bg-purple-600 text-white",
  secondary: "before:bg-purple-200 text-purple-600",
};

const Button = (props: ButtonProps) => {
  return (
    <>
      <button
        className={`${buttonVariants[props.variant]} ${
          props.className
        } ${commonClasses}`} onClick={props.onClick}
      >
        <div className="relative">{props.icon}</div>
        <div className="relative">{props.title}</div>
      </button>
    </>
  );
};

export default Button;
