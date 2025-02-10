import { PrimaryButtonProps } from "./types/types";

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { type = "button", children, handleClick } = props;
  return (
    <button
      type={type}
      className="bg-gray-200 rounded-lg px-3 py-2 hover:opacity-75"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
export default PrimaryButton;
