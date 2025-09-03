import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";

const HomeLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-background-secondary">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="content-area flex-1 overflow-y-auto">
        <motion.main
          className="flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.main>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default HomeLayout;