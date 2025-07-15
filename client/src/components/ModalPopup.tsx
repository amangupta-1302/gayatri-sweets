import { X } from "lucide-react"
import { type ModalProps } from "../utils/interfaces"
import { useEffect, useRef } from "react"

export const ModalPopup: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    size ='md', 
    showCloseButton= true, 
    closeOnEscape= true, 
    closeOnOverlayClick= true,
    className = "",
    children    
}) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const previousActiveElement = useRef<HTMLElement | null>(null)

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (closeOnEscape && e.key === "Escape") {
                onClose()
            }
        }

        const handleTab = (e: KeyboardEvent) => {
            if (!modalRef.current) return

            const focusableElements = modalRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
            const firstElement = focusableElements[0] as HTMLElement
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus()
                    e.preventDefault()
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus()
                    e.preventDefault()
                }
            }
        }

        if (isOpen) {
            previousActiveElement.current = document.activeElement as HTMLElement
            document.addEventListener('keydown', handleEscape)
            document.addEventListener('keydown', handleTab)
            document.body.style.overflow = 'hidden'
            
            // Focus the modal after opening
            if (modalRef.current) {
                const focusableElement = modalRef.current.querySelector(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                ) as HTMLElement
                focusableElement?.focus()
            }
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.removeEventListener('keydown', handleTab)
            document.body.style.overflow = 'unset'
            
            // Restore focus when modal closes
            if (previousActiveElement.current) {
                previousActiveElement.current.focus()
            }
        }
    }, [isOpen, onClose, closeOnEscape])
    
    const handleOverlayClick = (e: React.MouseEvent) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
            onClose()
        }
    }

    if (!isOpen) return null
    
    const sizeClasses = {
        sm: 'max-w-sm', 
        md: 'max-w-md', 
        lg: 'max-w-lg', 
        xl: 'max-w-xl', 
        full: 'max-w-full m-4'
    }

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
                    relative w-full ${sizeClasses[size]} bg-white rounded-lg border shadow-lg 
                    transform transition-all duration-300 
                    animate-slideIn
                    ${className}
                `}
                tabIndex={-1}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between p-6 border-b">
                        {title && (
                            <h3 id="modal-title" className="text-xl font-semibold text-gray-900">
                                {title}
                            </h3>
                        )}
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 p-2 transition-colors"
                                aria-label="Close modal"
                            >
                                <X className="size-5" />
                            </button>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
                    {children}
                </div>
            </div>
        </div>
    )
}

