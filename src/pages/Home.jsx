import { Children, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AdminTeam from "./adminPages/AdminTeam";
import AdminReport from "./adminPages/AdminReport";
import AdminDashboard from "./adminPages/AdminDashboard";

export default function Home({ children }) {
  const [currentPage, setCurrentPage] = useState("Dashboard");

  const renderContent = () => {
    switch (currentPage) {
      case "Dashboard":
        return children;
      case "Team":
        return <AdminTeam />;
      case "Report":
        return <AdminReport />;
      default:
        return (
          <div className="p-4">
            <h2 className="text-xl font-semibold">Page Under Construction</h2>
          </div>
        );
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
