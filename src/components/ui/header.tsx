import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header
      className="border-b px-4 py-3 shadow-elegant"
      style={{ background: "var(--gradient-finastra)" }}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-white truncate mr-2">
          RelaxRefresh
        </h1>
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Avatar + click handler */}
          <button
            onClick={() => navigate("/profile")}
            className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-2 border-white/20"
            style={{ background: "var(--gradient-finastra-pink)" }}
          >
            <img
              src="/avatar.avif"
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full"
              loading="lazy"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
