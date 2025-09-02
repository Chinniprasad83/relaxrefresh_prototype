import { Outlet, useNavigate } from "react-router-dom";
import BottomNav from "@/components/ui/bottom-nav";
import Header from "./Header";

type Props = {
  showTabs?: boolean;
};

export default function BottomTabs({ showTabs = true }: Props) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col h-screen"
      style={{ background: "var(--gradient-finastra)" }}
    >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      {showTabs && <BottomNav />}
    </div>
  );
}
