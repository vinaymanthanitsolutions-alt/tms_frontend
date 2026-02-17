import React from "react";
import manthanLogo from "/manthanlogo.png";
import { House } from "lucide-react";
import { ChartNoAxesCombined } from "lucide-react";
import { ClipboardList } from "lucide-react";
import { Users } from "lucide-react";
import { Settings } from "lucide-react";
import { MessageCircleQuestionMark } from "lucide-react";
import { X } from "lucide-react";
import { DEMODATA } from "../data";
import { ChevronRight } from "lucide-react";

const Sidebar = ({ onNavigate, isOpen, onClose }) => {
  const [isAdminTeamExpanded, setIsAdminTeamExpanded] = React.useState(false);
  const [activeButton, setActiveButton] = React.useState({
    Dashboard: true,
    Report: false,
    Team: false,
    Task: false,
    Settings: false,
    Help: false,
  });

  function handleButtonClick(buttonName) {
    setActiveButton((prevState) => {
      const newState = {};
      for (const key in prevState) {
        newState[key] = key === buttonName;
      }
      return newState;
    });

    // Call the navigation handler if provided
    if (onNavigate) {
      onNavigate(buttonName);
    }

    if (onClose) {
      onClose();
    }
  }

  const clickStyle = "bg-gray-200 text-black";

  const menuItemsStyle =
    "flex gap-2 items-center text-gray-600 hover:text-black hover:bg-gray-100 px-3 py-2 rounded cursor-pointer transition ease-in-out duration-200 text-[1rem]";

  const selectedButtonStyle = "bg-gray-200 text-black";

  const renderAdminMenu = () => {
    return (
      <>
        <div
          className={`${menuItemsStyle} ${activeButton.Dashboard ? selectedButtonStyle : ""}`}
          onClick={() => handleButtonClick("Dashboard")}
        >
          <House size={20} />
          <span>Dashboard</span>
        </div>
        <div
          className={`${menuItemsStyle} ${activeButton.Report ? selectedButtonStyle : ""}`}
          onClick={() => handleButtonClick("Report")}
        >
          <ChartNoAxesCombined size={20} />
          <span>Report</span>
        </div>
        <div
          className={`${menuItemsStyle}`}
          onClick={() => {
            setIsAdminTeamExpanded((prev) => !prev);
          }}
        >
          <Users size={20} />
          <span>Employee's</span>
        </div>
        {isAdminTeamExpanded && (
          <>
            <div
              className={`${menuItemsStyle} ml-8 ${activeButton.Team ? selectedButtonStyle : ""}`}
              onClick={() => handleButtonClick("Team")}
            >
              <ChevronRight size={15} />
              <span className="text-sm">Accounts</span>
            </div>
            <div className={`${menuItemsStyle} ml-8`}>
              <ChevronRight size={15} />
              <span className="text-sm">Suspended A/C</span>
            </div>
          </>
        )}
        <div
          className={`${menuItemsStyle} ${activeButton.Task ? selectedButtonStyle : ""}`}
          onClick={() => handleButtonClick("Task")}
        >
          <ClipboardList size={20} />
          <span>Task</span>
        </div>
      </>
    );
  };

  // SuperAdmin menu rendering function
  const renderSuperAdminMenu = () => {
    return (
      <>
        <div
          className={`${menuItemsStyle} ${activeButton.Dashboard ? selectedButtonStyle : ""}`}
          onClick={() => handleButtonClick("Dashboard")}
        >
          <House size={20} />
          <span>Dashboard</span>
        </div>
        <div
          className={`${menuItemsStyle} ${activeButton.Report ? selectedButtonStyle : ""}`}
          onClick={() => handleButtonClick("Report")}
        >
          <ChartNoAxesCombined size={20} />
          <span>Report</span>
        </div>
      </>
    );
  };

  // ProjectManager menu rendering function
  const renderProjectManagerMenu = () => {
    return (
      <>
        <div
          className={`${menuItemsStyle} ${activeButton.Dashboard ? selectedButtonStyle : ""}`}
          onClick={() => handleButtonClick("Dashboard")}
        >
          <House size={20} />
          <span>Dashboard</span>
        </div>
        <div
          className={`${menuItemsStyle} ${activeButton.Report ? selectedButtonStyle : ""}`}
          onClick={() => handleButtonClick("Report")}
        >
          <ChartNoAxesCombined size={20} />
          <span>Report</span>
        </div>

        <div
          className={`${menuItemsStyle} ${activeButton.Task ? selectedButtonStyle : ""}`}
          onClick={() => handleButtonClick("Task")}
        >
          <ClipboardList size={20} />
          <span>Task</span>
        </div>
        <div
          className={`${menuItemsStyle} ${activeButton.Project ? selectedButtonStyle : ""}`}
          onClick={() => handleButtonClick("Project")}
        >
          <ClipboardList size={20} />
          <span>Project</span>
        </div>
      </>
    );
  };

  // TeamLead menu rendering function
  const renderTeamLeadMenu = () => {
    return (
      <>
        <div
          className={`${menuItemsStyle} ${activeButton.Dashboard ? selectedButtonStyle : ""}`}
          onClick={() => handleButtonClick("Dashboard")}
        >
          <House size={20} />
          <span>Dashboard</span>
        </div>
        <div
          className={`${menuItemsStyle} ${activeButton.Task ? selectedButtonStyle : ""}`}
          onClick={() => handleButtonClick("Task")}
        >
          <ClipboardList size={20} />
          <span>Task</span>
        </div>
        <div
          className={`${menuItemsStyle} ${activeButton.Report ? selectedButtonStyle : ""}`}
          onClick={() => handleButtonClick("Report")}
        >
          <ChartNoAxesCombined size={20} />
          <span>Report</span>
        </div>
      </>
    );
  };

  // Default menu rendering function
  const renderDefaultMenu = () => {
    return (
      <div
        className={`${menuItemsStyle} ${activeButton.Dashboard ? selectedButtonStyle : ""}`}
        onClick={() => handleButtonClick("Dashboard")}
      >
        <House size={20} />
        <span>Dashboard</span>
      </div>
    );
  };

  const roleMenuMap = {
    admin: renderAdminMenu,
    superadmin: renderSuperAdminMenu,
    projectmanager: renderProjectManagerMenu,
    teamlead: renderTeamLeadMenu,
    default: renderDefaultMenu,
  };

  const renderMenuItems = () => {
    const userRole = DEMODATA.role || "default";
    const renderFunction = roleMenuMap[userRole] || roleMenuMap.default;

    return renderFunction();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-white/10  z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed w-full md:w-64 lg:static inset-y-0 left-0 z-50  h-screen px-5 py-4 border-r-2 border-gray-200 bg-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <img src={manthanLogo} alt="Manthan Logo" className="w-8 h-auto" />
            <div className="text-xl font-semibold">Manthan</div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded transition"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mt-4 px-3 py-2 bg-gray-100 rounded">
          <div className="text-xs text-gray-500">Role</div>
          <div className="text-sm font-medium capitalize">
            {DEMODATA.role || "Unknown"}
          </div>
        </div>

        <div className="text-xs mt-7 text-gray-600 mb-4">Menu</div>
        <div className="flex flex-col gap-1">{renderMenuItems()}</div>
        <div className="text-xs mt-7 text-gray-600 mb-4">General</div>
        <div className="flex flex-col gap-1">
          <div
            className={`${menuItemsStyle} ${activeButton.Help ? selectedButtonStyle : ""}`}
            onClick={() => handleButtonClick("Help")}
          >
            <MessageCircleQuestionMark size={20} />
            <span>Help</span>
          </div>
          <div
            className={`${menuItemsStyle} ${activeButton.Settings ? selectedButtonStyle : ""}`}
            onClick={() => handleButtonClick("Settings")}
          >
            <Settings size={20} />
            <span>Settings</span>
          </div>
          <div
            className={`${menuItemsStyle} ${activeButton.Logout ? selectedButtonStyle : ""}`}
            onClick={() => handleButtonClick("Logout")}
          >
            <MessageCircleQuestionMark size={20} />
            <span>Logout</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
