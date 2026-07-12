import { useEffect } from "react";
import type { ReactNode } from "react";


type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ open, onClose, children }: ModalProps) => {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-[fadeIn_.2s_ease-out] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}

        <div className="sticky top-0 flex items-center justify-between border-b bg-white px-6 py-4 rounded-t-2xl">
          <h2 className="text-xl font-bold text-slate-800">
            Workflow Details
          </h2>

          <button
            onClick={onClose}
            className="h-10 w-10 rounded-full hover:bg-gray-100 transition text-gray-500 hover:text-red-500 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Body */}

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;