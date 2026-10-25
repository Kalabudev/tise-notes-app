import { Link } from "react-router";
import { PlusIcon, Sparkles } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-3.5">
        <div className="flex items-center justify-between">
          
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary/20 transition-all">
              <Sparkles className="size-5" />
            </div>
            <h1 className="text-2xl font-bold text-white font-mono tracking-tight">
              Think<span className="text-primary">Board</span>
            </h1>
          </Link>

          {/* Action */}
          <div className="flex items-center gap-4">
            <Link 
              to="/create" 
              className="btn btn-primary gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all transform hover:-translate-y-0.5"
            >
              <PlusIcon className="size-4" />
              <span>New Note</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;