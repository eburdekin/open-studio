import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const toastColor = type === "SUCCESS" ? "bg-green-600" : "bg-red-600";

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 text-white rounded-md max-w-md ${toastColor}`}
    >
      <div className="flex justify-center items-center">
        <span className="text-lg font-bold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
