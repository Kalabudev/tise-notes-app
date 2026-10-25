import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon, Edit3 } from "lucide-react";
import ConfirmationModal from "../components/ConfirmationModal";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    } finally {
      setDeleting(false);
      setIsModalOpen(false);
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-primary">
        <LoaderIcon className="animate-spin size-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Top Navigation & Actions */}
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm text-base-content/70 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
            >
              <ArrowLeftIcon className="size-4" />
              Back to Notes
            </Link>
            
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="btn btn-sm btn-error btn-outline gap-2 hover:bg-error hover:text-white transition-all"
            >
              <Trash2Icon className="size-4" />
              Delete Note
            </button>
          </div>

          {/* Edit Card Form */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                <Edit3 className="size-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">Edit Note</h2>
                <p className="text-xs text-base-content/60">Update your thoughts and changes.</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="form-control space-y-2">
                <label className="label text-sm font-medium text-base-content/80">Title</label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered w-full bg-black/30 border-white/10 focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder:text-base-content/40"
                  value={note?.title || ""}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control space-y-2">
                <label className="label text-sm font-medium text-base-content/80">Content</label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered w-full h-40 bg-black/30 border-white/10 focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder:text-base-content/40 resize-none leading-relaxed"
                  value={note?.content || ""}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <Link to="/" className="btn btn-ghost text-base-content/70 hover:text-white">
                  Cancel
                </Link>
                <button 
                  className="btn btn-primary px-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all" 
                  disabled={saving} 
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Custom Glassmorphic Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Note"
        message="Are you sure you want to delete this note? This action cannot be undone."
        loading={deleting}
      />
    </div>
  );
};

export default NoteDetailPage;