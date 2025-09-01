import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-card border-b px-6 py-4 shadow-elegant">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          RelaxRefresh Partners
        </h1>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-full">
            <img
              src="/avatar.avif"
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full"
              loading="lazy"
            />
          </div>
          <button
            onClick={() => navigate("/profile")}
            className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
          >
            Partner User
          </button>
        </div>
      </div>
    </header>
  );
}