import { useState } from "react";
import { Navigate } from "react-router-dom";
import LoginPage from "@/components/ui/login-page";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <Navigate to="/stall-search" replace />;
};

export default Index;