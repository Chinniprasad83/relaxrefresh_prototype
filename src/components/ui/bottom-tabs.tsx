import { Outlet, useNavigate } from "react-router-dom";
import BottomNav from "@/components/ui/bottom-nav";

type Props = {
  showTabs?: boolean;
};

export default function BottomTabs({ showTabs = true }: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
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
              onClick={() => navigate('/profile')} 
              className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
            >
              Partner User
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      {showTabs && <BottomNav />}
    </div>
  );
}