import { PrimaryButtonProps } from "@/types/types";

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  type = "button",
  children,
  handleClick,
}) => {
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
