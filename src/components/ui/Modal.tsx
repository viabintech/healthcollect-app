interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-ink/50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-card shadow-xl p-6 max-w-md w-full">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-ink-soft hover:text-ink text-lg"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
