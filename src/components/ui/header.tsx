import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header
      className="border-b px-6 py-4 shadow-elegant"
      style={{ background: "var(--gradient-finastra)" }}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">
          RelaxRefresh
        </h1>
        <div className="flex items-center gap-3">
          {/* Avatar + click handler */}
          <button
            onClick={() => navigate("/profile")}
            className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
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
