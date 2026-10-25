import { Route, Routes } from "react-router";

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";

const App = () => {
  return (
    <div className="relative min-h-screen w-full bg-black text-white">
      {/* Background Radial Glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 min-h-screen w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D25_100%)]" />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;