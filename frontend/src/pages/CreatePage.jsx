import { ArrowLeftIcon, Sparkles } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });

      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-base-content/70 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
          >
            <ArrowLeftIcon className="size-4" />
            Back to Notes
          </Link>

          {/* Form Card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl p-8">
            
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                <Sparkles className="size-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">Create New Note</h2>
                <p className="text-xs text-base-content/60">Capture your ideas before they slip away.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Title Input */}
              <div className="form-control space-y-2">
                <label className="label text-sm font-medium text-base-content/80">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  className="input input-bordered w-full bg-black/30 border-white/10 focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder:text-base-content/40"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Content Textarea */}
              <div className="form-control space-y-2">
                <label className="label text-sm font-medium text-base-content/80">
                  Content
                </label>
                <textarea
                  placeholder="Write your note details here..."
                  className="textarea textarea-bordered w-full h-40 bg-black/30 border-white/10 focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder:text-base-content/40 resize-none leading-relaxed"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <Link to="/" className="btn btn-ghost text-base-content/70 hover:text-white">
                  Cancel
                </Link>
                <button 
                  type="submit" 
                  className="btn btn-primary px-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all" 
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Note"}
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreatePage;