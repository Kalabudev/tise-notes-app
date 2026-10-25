import { AlertTriangle } from "lucide-react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-base-100/90 backdrop-blur-md p-6 shadow-2xl space-y-6 border-t-4 border-t-error">
        
        {/* Header / Icon */}
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-error/10 border border-error/20 text-error flex-shrink-0">
            <AlertTriangle className="size-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
            <p className="text-sm text-base-content/70 leading-relaxed">{message}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="btn btn-ghost text-base-content/70 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="btn btn-error shadow-lg shadow-error/20 hover:shadow-error/40 transition-all px-5"
          >
            {loading ? "Deleting..." : "Delete Note"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmationModal;