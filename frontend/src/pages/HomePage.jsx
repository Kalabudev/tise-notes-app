import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import { LoaderIcon, StickyNote } from "lucide-react";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error.response);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen text-white">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        
        {/* Section Header */}
        {!isRateLimited && !loading && notes.length > 0 && (
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                <StickyNote className="size-5" />
              </div>
              <h2 className="text-xl font-bold tracking-tight">Your Notes</h2>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-base-content/70">
              {notes.length} {notes.length === 1 ? "Note" : "Notes"}
            </span>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-primary space-y-3">
            <LoaderIcon className="animate-spin size-8" />
            <p className="text-sm text-base-content/60">Fetching your notes...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {/* Notes Grid */}
        {!loading && notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}

      </main>
    </div>
  );
};

export default HomePage;