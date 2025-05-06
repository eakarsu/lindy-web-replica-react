import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout
import MainLayout from "./layouts/MainLayout";

// Main pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PricingPage from "./pages/PricingPage";
import ContactPage from "./pages/ContactPage";

// Footer pages
import TermsPage from "./pages/FooterPages/TermsPage";
import PrivacyPage from "./pages/FooterPages/PrivacyPage";
import FaqPage from "./pages/FooterPages/FaqPage";
import CareersPage from "./pages/FooterPages/CareersPage";
import BlogPage from "./pages/FooterPages/BlogPage";
import TrustCenterPage from "./pages/FooterPages/TrustCenterPage";
import SecurityPage from "./pages/FooterPages/SecurityPage";
import AcademyPage from "./pages/FooterPages/AcademyPage";
import CommunityPage from "./pages/FooterPages/CommunityPage";
import HelpCenterPage from "./pages/FooterPages/HelpCenterPage";
import IntegrationsPage from "./pages/FooterPages/IntegrationsPage";
import PartnersPage from "./pages/FooterPages/PartnersPage";
import ChangelogPage from "./pages/FooterPages/ChangelogPage";

// Other
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            {/* Main pages */}
            <Route index element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Footer pages */}
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/trust-center" element={<TrustCenterPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/academy" element={<AcademyPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/help-center" element={<HelpCenterPage />} />
            <Route path="/integrations" element={<IntegrationsPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/changelog" element={<ChangelogPage />} />
            
            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
