import { X } from "lucide-react";
import { type IModalProps } from "../utils/types/ui";
import { useEffect, useRef, useState } from "react";

const ModalPopup: React.FC<IModalProps> = ({
  isOpen,
  onClose,
  title,
  size = "md",
  showCloseButton = true,
  closeOnEscape = true,
  closeOnOverlayClick = true,
  className = "",
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [isAnimating] = useState(false);

  // Handle keyboard events and cleanup
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, closeOnEscape]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-full m-4",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        ref={modalRef}
        className={`
                    w-full ${
                      sizeClasses[size]
                    } bg-white rounded-lg border shadow-lg 
                    transform 
                    ${
                      isOpen && !isAnimating
                        ? "opacity-100 transform-none"
                        : "opacity-0 scale-95 translate-y-4"
                    }
                    ${className}
                `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="relative flex items-center justify-center p-6 border-b">
            {title && (
              <h3
                id="modal-title"
                className="text-xl font-semibold text-gray-900 text-center"
              >
                {title}
              </h3>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="size-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-160px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalPopup;
