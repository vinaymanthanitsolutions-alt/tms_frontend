import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AdminTeam from "./adminPages/AdminTeam";
import AdminReport from "./adminPages/AdminReport";
import AdminDashboard from "./adminPages/AdminDashboard";
import Dashboard from "./superadminPages/Dashboard";

import Report from "./superadminPages/Report";


import ProjectManagerDashboard from "./ProjectManagerPages/ProjectManagerDashboard";
import TeamLeadDashboard from "./teamleadPages/TeamLeadDashboard";
import RegisterEmployee from "../components/AdminComponents/RegisterEmployee";
import { DEMODATA } from "../data";
import { Menu } from "lucide-react";
import ProjectManagerProject from "./ProjectManagerPages/ProjectManagerProject";
import PMTask from "./ProjectManagerPages/PMTask";
import ProjectReport from "./ProjectManagerPages/ProjectReport";

export default function Home() {
  const [isOpenAdminRegister, setIsOpenAdminRegister] = useState(false);
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    if (DEMODATA.role === "admin") {
      switch (currentPage) {
        case "Dashboard":
          return <AdminDashboard />;
        case "Team":
          return <AdminTeam setIsOpenAdminRegister={setIsOpenAdminRegister} />;
        case "Report":
          return <AdminReport />;
        case "Task":
          return (
            <div className="p-4">
              <h2 className="text-xl font-semibold">Admin Tasks</h2>
              <p className="text-gray-600 mt-2">
                Task management for administrators.
              </p>
            </div>
          );
        default:
          return (
            <div className="p-4">
              <h2 className="text-xl font-semibold">Page Under Construction</h2>
            </div>
          );
      }
    } else if (DEMODATA.role === "projectmanager") {
      // Vansh will implement project manager specific content here
      switch (currentPage) {
        case "Dashboard":
          return <ProjectManagerDashboard />;
        // case "Team":
        //   return <AdminTeam setIsOpenAdminRegister={setIsOpenAdminRegister} />;
        case "Report":
          return <ProjectReport />;
        case "Project":
          return <ProjectManagerProject />;
        
        case "Task":
          return <PMTask />;
          // (
          //   <div className="p-4">
          //     <h2 className="text-xl font-semibold">Project Manager Tasks</h2>
          //     <p className="text-gray-600 mt-2">
          //       Task management for project managers.
          //     </p>
          //   </div>
          // );
        default:
          return (
            <div className="p-4">
              <h2 className="text-xl font-semibold">Page Under Construction</h2>
            </div>
          );
      }
    } else if (DEMODATA.role === "superadmin") {
      //divya will implement super admin specific content here
      switch (currentPage) {
        case "Dashboard":
          return <Dashboard />;
       
        case "Report":
          return <Report />;
        
        default:
          return (
            <div className="p-4">
              <h2 className="text-xl font-semibold">Page Under Construction</h2>
            </div>
          );
      }
    } else if (DEMODATA.role === "teamlead") {
      switch (currentPage) {
        case "Dashboard":
          return <TeamLeadDashboard />;
        case "Task":
          return (
            <div className="p-4">
              <h2 className="text-xl font-semibold">Team Lead Tasks</h2>
              <p className="text-gray-600 mt-2">Manage your team's tasks.</p>
            </div>
          );
        case "Report":
          return (
            <div className="p-4">
              <h2 className="text-xl font-semibold">Team Lead Reports</h2>
              <p className="text-gray-600 mt-2">
                View team performance reports.
              </p>
            </div>
          );
        default:
          return (
            <div className="p-4">
              <h2 className="text-xl font-semibold">Page Under Construction</h2>
            </div>
          );
      }
    } else {
      return (
        <div className="p-4">
          <h2 className="text-xl font-semibold">Unknown Role</h2>
          <p className="text-gray-600 mt-2">Please contact administrator.</p>
        </div>
      );
    }
  };

  return (
    <div className="flex">
      <Sidebar
        onNavigate={setCurrentPage}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex-1 w-full relative">
        {/* Mobile Header with Hamburger */}
        <div className="lg:hidden flex items-center gap-4 px-4 py-3 border-b-2 border-gray-200 bg-white">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded transition"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2">
            <img src="/manthanlogo.png" alt="Manthan" className="w-6 h-auto" />
            <span className="text-lg font-semibold">Manthan</span>
          </div>
        </div>

        {isOpenAdminRegister && (
          <RegisterEmployee
            isOpen={isOpenAdminRegister}
            onClose={() => setIsOpenAdminRegister(false)}
          />
        )}
        
        <div className="hidden lg:block">
          <Navbar />
        </div>

        {renderContent()}
      </div>
    </div>
  );
}
