import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AdminTeam from "./adminPages/AdminTeam";
import AdminReport from "./adminPages/AdminReport";
import AdminDashboard from "./adminPages/AdminDashboard";
import Dashboard from "./superadminPages/Dashboard";

import UsersReport from "./superadminPages/UsersReport";
import TaskReport from "./superadminPages/TaskReport";
import ProjectReport from "./superadminPages/ProjectReport";
import Admin from "./superadminPages/Admin"

import ProjectManagerDashboard from "./ProjectManagerPages/ProjectManagerDashboard";
import TeamLeadDashboard from "./teamleadPages/TeamLeadDashboard";
import RegisterEmployee from "../components/AdminComponents/RegisterEmployee";
import { DEMODATA } from "../data";
import { Menu } from "lucide-react";
import ProjectManagerProject from "./ProjectManagerPages/ProjectManagerProject";
import PMTask from "./ProjectManagerPages/PMTask";
// import ProjectReport from "./ProjectManagerPages/ProjectReport";
import AdminProject from "./adminPages/AdminProject";
import AdminRiskOverview from "./adminPages/AdminRiskOverview";
import AdminProjectInsight from "./adminPages/AdminProjectInsight";

export default function Home() {
  const [isOpenAdminRegister, setIsOpenAdminRegister] = useState(false);
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [refreshEmployees, setRefreshEmployees] = useState(0);
  const [editEmployee, setEditEmployee] = useState(null);

  const handleRegistrationSuccess = () => {
    setRefreshEmployees((prev) => prev + 1);
    setEditEmployee(null);
  };

  const adminPages = {
    Dashboard: () => <AdminDashboard />,
    Team: () => (
      <AdminTeam
        setIsOpenAdminRegister={setIsOpenAdminRegister}
        setEditEmployee={setEditEmployee}
        refreshKey={refreshEmployees}
      />
    ),
    Report: () => <AdminReport />,
    RiskOverview: () => <AdminRiskOverview />,
    ProjectInsight: () => <AdminProjectInsight />,
    Project: () => (
      <AdminProject/>
    ),
    default: () => (
      <div className="p-4">
        <h2 className="text-xl font-semibold">Page Under Construction</h2>
      </div>
    ),
  };

  // Project Manager
  const projectManagerPages = {
    Dashboard: () => <ProjectManagerDashboard />,
    Project: () => (
      <ProjectManagerProject />
    ),
    Report: () => <div></div>,
    Task: () => (
     <PMTask/>
    ),
    default: () => (
      <div className="p-4">
        <h2 className="text-xl font-semibold">Page Under Construction</h2>
      </div>
    ),
  };

  // Super Admin
  const superAdminPages = {
    Dashboard: () => <Dashboard />,
    UsersReport: () => <UsersReport />,
    ProjectReport: () => <ProjectReport />,
    TaskReport: () => <TaskReport />,
    Admin: () => <Admin />,
    default: () => (
      <div className="p-4">
        <h2 className="text-xl font-semibold">Page Under Construction</h2>
      </div>
    ),
  };

  // Team Lead
  const teamLeadPages = {
    Dashboard: () => <TeamLeadDashboard />,
    Task: () => (
      <div className="p-4">
        <h2 className="text-xl font-semibold">Team Lead Tasks</h2>
        <p className="text-gray-600 mt-2">Manage your team's tasks.</p>
      </div>
    ),
    Report: () => (
      <div className="p-4">
        <h2 className="text-xl font-semibold">Team Lead Reports</h2>
        <p className="text-gray-600 mt-2">View team performance reports.</p>
      </div>
    ),
    default: () => (
      <div className="p-4">
        <h2 className="text-xl font-semibold">Page Under Construction</h2>
      </div>
    ),
  };

  // Default page mapping
  const defaultPages = {
    default: () => (
      <div className="p-4">
        <h2 className="text-xl font-semibold">Unknown Role</h2>
        <p className="text-gray-600 mt-2">Please contact administrator.</p>
      </div>
    ),
  };

  const rolePageMap = {
    admin: adminPages,
    projectmanager: projectManagerPages,
    superadmin: superAdminPages,
    teamlead: teamLeadPages,
    default: defaultPages,
  };

  const renderContent = () => {
    const userRole = DEMODATA.role || "default";
    const pageMap = rolePageMap[userRole] || rolePageMap.default;
    const pageComponent = pageMap[currentPage] || pageMap.default;

    return pageComponent();
  };

  return (
    <div className="flex">
      <Sidebar
        onNavigate={setCurrentPage}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex-1 w-full relative ">
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
            onClose={() => {
              setIsOpenAdminRegister(false);
              setEditEmployee(null);
            }}
            onSuccess={handleRegistrationSuccess}
            editData={editEmployee}
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