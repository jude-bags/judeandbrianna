
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import OurStory from "./pages/OurStory";
import TravelAndStay from "./pages/TravelAndStay";
import Registry from "./pages/Registry";
import FAQS from "./pages/FAQS";
import RSVP from "./pages/RSVP";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/travel-stay" element={<TravelAndStay />} />
            <Route path="/registry" element={<Registry />} />
            <Route path="/faqs" element={<FAQS />} />
            <Route path="/rsvp" element={<RSVP />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
