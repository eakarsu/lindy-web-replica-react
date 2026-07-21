
import { Outlet } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-lindy-secondary px-4 py-2 text-center text-sm text-white">
        Verified scope: demo-request intake and sales review. Broader AI product claims are not part of this build.
      </div>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
