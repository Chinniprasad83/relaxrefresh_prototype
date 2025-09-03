import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      path: "/app",
    },
    {
      id: "interest",
      label: "Interest",
      icon: Heart,
      path: "/app/interest",
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <motion.nav
      className="bottom-0 left-0 right-0 w-full bg-card border-t border-border shadow-floating z-50 safe-area-bottom"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.path);

          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className="relative flex flex-col items-center py-2 px-6 min-w-0 flex-1"
            >
              {/* Active Background */}
              {active && (
                <motion.div
                  className="absolute inset-0 bg-primary/10 rounded-2xl mx-8"
                  layoutId="activeTab"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  style={{ height: "50px" }}
                />
              )}

              {/* Icon */}
              <motion.div
                className="relative z-10"
                animate={{
                  scale: active ? 1.1 : 1,
                  y: active ? -2 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 transition-smooth",
                    active ? "text-primary" : "text-muted-foreground"
                  )}
                />
              </motion.div>

              {/* Label */}
              <motion.span
                className={cn(
                  "text-xs font-medium mt-1 relative z-10 transition-smooth",
                  active ? "text-primary" : "text-muted-foreground"
                )}
                animate={{
                  scale: active ? 1.05 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {tab.label}
              </motion.span>

              {/* Active Indicator */}
              {active && (
                <motion.div
                  className="absolute -bottom-1 w-8 h-1 bg-primary rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default BottomNavigation;