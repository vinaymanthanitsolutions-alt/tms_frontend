import { Children, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AdminTeam from "./adminPages/AdminTeam";
import AdminReport from "./adminPages/AdminReport";
import AdminDashboard from "./adminPages/AdminDashboard";
import Dashboard from "./superadminPages/Dashboard";
import AddAdmin from "./superadminPages/AddAdmin";
import Report from "./superadminPages/Report";


export default function Home({ children }) {
  const [currentPage, setCurrentPage] = useState("Dashboard");

  const renderContent = () => {
    switch (currentPage) {
      case "Dashboard":
        return children;
      case "Add":
        return <AddAdmin />;
      case "Report":
        return <Report />;
      
        
    }
  };

  return (
    <div className="flex">
      <Sidebar onNavigate={setCurrentPage} />
      <div className="flex-1">
        <Navbar />
        {renderContent()}
      </div>
    </div>
  );
}
