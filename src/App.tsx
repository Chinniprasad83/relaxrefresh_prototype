import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Stalls from "./pages/Stalls";
import Interest from "./pages/Interest";
import Queries from "./pages/Queries";
import Profile from "./pages/Profile";
import StallSearch from "./pages/StallSearch";
import StallDetails from "./pages/StallDetails";
import BottomTabs from "./components/ui/bottom-tabs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route element={<BottomTabs showTabs={true} />}>
            <Route path="home" element={<Home />} />
            <Route path="stalls" element={<Stalls />} />
            <Route path="interest" element={<Interest />} />
            <Route path="queries" element={<Queries />} />
            <Route path="stall-search" element={<StallSearch showBackToStall={false} />} />
          </Route>
          <Route path="/stall-search/from-stalls" element={<StallSearch showBackToStall={true} />} />
          <Route path="/stall-details/:id" element={<StallDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;