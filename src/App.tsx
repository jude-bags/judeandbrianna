
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
import AdminRSVPs from "./pages/AdminRSVPs";
import NotFound from "./pages/NotFound";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

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
            <Route path="/admin/rsvps" 
            element={
              <Authenticator loginMechanisms={['email']}>
                {({ signOut, user }) => (
                  <div className="p-4">
                    <div className="flex justify-between mb-4">
                      <span className="text-sm text-gray-600">Signed in as {user?.username}</span>
                      <button onClick={signOut} className="text-sm underline">
                        Sign out
                      </button>
                    </div>
                    <AdminRSVPs />
                  </div>
                )}
              </Authenticator>
            }
          />
            
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
