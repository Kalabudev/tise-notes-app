import { PenSquareIcon, Trash2Icon, AlertTriangle } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";

const NoteCard = ({ note, setNotes }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteClick = (e) => {
    e.preventDefault(); // prevent navigating to detail page
    setShowModal(true);
  };

  const handleConfirmDelete = async (e) => {
    e.preventDefault();
    setDeleting(true);

    try {
      await api.delete(`/notes/${note._id}`);
      setNotes((prev) => prev.filter((n) => n._id !== note._id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    } finally {
      setDeleting(false);
      setShowModal(false);
    }
  };

  return (
    <>
      <Link
        to={`/note/${note._id}`}
        className="group relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 border-t-4 border-t-primary flex flex-col justify-between"
      >
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white tracking-tight group-hover:text-primary transition-colors">
            {note.title}
          </h3>
          <p className="text-sm text-base-content/70 line-clamp-3 leading-relaxed">
            {note.content}
          </p>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
          <span className="text-xs text-base-content/50 font-medium">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="p-1.5 rounded-lg bg-white/5 text-base-content/70 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <PenSquareIcon className="size-3.5" />
            </span>
            <button
              className="p-1.5 rounded-lg bg-white/5 text-error/80 hover:bg-error/20 hover:text-error transition-colors"
              onClick={handleDeleteClick}
              title="Delete Note"
            >
              <Trash2Icon className="size-3.5" />
            </button>
          </div>
        </div>
      </Link>

      {/* Inline Glassmorphic Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-black/90 backdrop-blur-md p-6 shadow-2xl space-y-6 border-t-4 border-t-error">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-error/10 border border-error/20 text-error flex-shrink-0">
                <AlertTriangle className="size-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white tracking-tight">Delete Note</h3>
                <p className="text-sm text-base-content/70 leading-relaxed">
                  Are you sure you want to delete <span className="text-white font-medium">"{note.title}"</span>? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(false);
                }}
                disabled={deleting}
                className="btn btn-ghost text-base-content/70 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="btn btn-error shadow-lg shadow-error/20 hover:shadow-error/40 transition-all px-5"
              >
                {deleting ? "Deleting..." : "Delete Note"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteCard;