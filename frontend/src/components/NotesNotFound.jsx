import { NotebookIcon, PlusCircle } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="relative w-full max-w-md p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md text-center shadow-2xl flex flex-col items-center space-y-6">
        
        {/* Soft Background Glow Behind Icon */}
        <div className="relative">
          <div className="absolute -inset-2 rounded-full bg-primary/20 blur-lg" />
          <div className="relative bg-primary/10 border border-primary/30 rounded-full p-6 text-primary">
            <NotebookIcon className="size-10 stroke-[1.5]" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold tracking-tight text-white">
            No notes found
          </h3>
          <p className="text-sm text-base-content/70 leading-relaxed">
            Ready to organize your thoughts? Create your first note to get started on your journey.
          </p>
        </div>

        {/* CTA Button */}
        <Link
          to="/create"
          className="btn btn-primary gap-2 px-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <PlusCircle className="size-4" />
          Create Your First Note
        </Link>
      </div>
    </div>
  );
};

export default NotesNotFound;