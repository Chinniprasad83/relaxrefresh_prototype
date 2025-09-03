import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RefreshCw, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const navigate = useNavigate();

  return (
    <motion.header
      className="bg-gradient-primary text-white px-6 py-4 shadow-elevated"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ paddingTop: '48px' }} /* Account for Dynamic Island */
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <RefreshCw className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight">Relax Refresh</h1>
            <p className="text-xs text-white/80">Partner</p>
          </div>
        </div>

        {/* Avatar */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/app/profile")}
          className="p-0 rounded-full hover:bg-white/10"
        >
          <Avatar className="w-10 h-10 border-2 border-white/30">
            <AvatarImage src="/api/placeholder/40/40" alt="Profile" />
            <AvatarFallback className="bg-white/20 text-white border-0">
              <User className="w-5 h-5" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </motion.header>
  );
};

export default Header;