import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import LoginScreen from "./pages/LoginScreen";
import HomeLayout from "./layouts/HomeLayout";
import Home from "./pages/Home";
import Interest from "./pages/Interest";
import StallsList from "./pages/StallsList";
import StallDetail from "./pages/StallDetail";
import FollowUp from "./pages/FollowUp";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="mobile-container">
        <Toaster />
        <Sonner />
        <div className="desktop-mobile-container">
        <div className="mobile-viewport">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/app" element={<HomeLayout />}>
              <Route index element={<Home />} />
              <Route path="interest" element={<Interest />} />
              <Route path="stalls" element={<StallsList />} />
              <Route path="stall/:id" element={<StallDetail />} />
              <Route path="follow-up/:id" element={<FollowUp />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </div>
        </div>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;