import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminRequestsPage from "./pages/AdminRequestsPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/FooterPages/PrivacyPage";
import SecurityPage from "./pages/FooterPages/SecurityPage";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/requests" element={<AdminRequestsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
