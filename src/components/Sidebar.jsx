import React, { useState } from "react";

import manthanLogo from "/manthanlogo.png";
import { House } from "lucide-react";
import { ChartNoAxesCombined } from "lucide-react";
import { ClipboardList } from "lucide-react";
import { Users } from "lucide-react";
import { Settings } from "lucide-react";
import { MessageCircleQuestionMark } from "lucide-react";
import { X } from "lucide-react";
import {ChevronDown, ChevronRight, AlertTriangle, TrendingUp, FileText } from "lucide-react";
import { DEMODATA } from "../data";
import { FolderKanban } from "lucide-react";


const Sidebar = ({ onNavigate, isOpen, onClose }) => {
  const [activeButton, setActiveButton] = React.useState({
  Dashboard: true,
  Report: false,
  UsersReport: false,    // for superadmin
  ProjectReport: false,    // for superadmin
  TaskReport: false,     // for superadmin
  RiskOverview: false,   // for admin report
  ProjectInsight: false, // for admin report
  AuditHistory: false,   // for admin report
  Team: false,
  Task: false,
  Project: false,
  Admin: false,
  Settings: false,
  Help: false,
  Logout: false,
});


  const [showReportDropdown, setShowReportDropdown] = useState(false);
  const [showAdminReportDropdown, setShowAdminReportDropdown] = useState(false);

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

        {/* Admin Report with subbuttons */}
        <div>
          <div
            className={`${menuItemsStyle} ${
              activeButton.RiskOverview || activeButton.ProjectInsight || activeButton.AuditHistory
                ? selectedButtonStyle
                : ""
            } flex items-center justify-between`}
            onClick={() => setShowAdminReportDropdown(!showAdminReportDropdown)}
          >
            <div className="flex items-center gap-2">
              <ChartNoAxesCombined size={20} />
              <span>Report</span>
            </div>
            <ChevronDown size={16} />
          </div>

          {showAdminReportDropdown && (
            <div className="ml-8 mt-2 space-y-1">
              <div
                className={`px-4 py-2 text-sm rounded cursor-pointer flex items-center gap-2 text-gray-500 ${
                  activeButton.RiskOverview ? "bg-gray-200 text-gray-600" : "hover:bg-gray-100 hover:text-black"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleButtonClick("RiskOverview");
                }}
              >
                <AlertTriangle size={16} />
                Risk Overview
              </div>
              <div
                className={`px-4 py-2 text-sm rounded cursor-pointer flex items-center gap-2 text-gray-600 ${
                  activeButton.ProjectInsight ? "bg-gray-200 text-gray-600" : "hover:bg-gray-100 hover:text-black"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleButtonClick("ProjectInsight");
                }}
              >
                <TrendingUp size={16} />
                Project Insight
              </div>
              <div
                className={`px-4 py-2 text-sm rounded cursor-pointer flex items-center gap-2 text-gray-600 ${
                  activeButton.AuditHistory ? "bg-gray-200 text-gray-600" : "hover:bg-gray-100 hover:text-black"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleButtonClick("AuditHistory");
                }}
              >
                <FileText size={16} />
                Audit History
              </div>
            </div>
          )}
        </div>

        <div
          className={`${menuItemsStyle} ${activeButton.Team ? selectedButtonStyle : ""}`}
          onClick={() => handleButtonClick("Team")}
        >
          <Users size={20} />
          <span>Employee's</span>
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

  // SuperAdmin menu rendering function
  const renderSuperAdminMenu = () => {
  return (
    <>
      <div
        className={`${menuItemsStyle} ${
          activeButton.Dashboard ? selectedButtonStyle : ""
        }`}
        onClick={() => handleButtonClick("Dashboard")}
      >
        <House size={20} />
        <span>Dashboard</span>
      </div>

      
{/* REPORT MENU */}
<div>
  <div
    className={`${menuItemsStyle} ${
      activeButton.UsersReport ||
      activeButton.ProjectReport ||
      activeButton.TaskReport
        ? selectedButtonStyle
        : ""
    } flex items-center justify-between`}
    onClick={() => { 
      setShowReportDropdown(!showReportDropdown);
    }}
  >
    <div className="flex items-center gap-2">
      <ChartNoAxesCombined size={20} />
      <span>Report</span>
    </div>
    <ChevronDown size={16} />
  </div>

  {showReportDropdown && (
    <div className="ml-8 mt-2 space-y-1">

      {/* USERS REPORT */}
      <div
        className={`px-4 py-2 text-sm rounded cursor-pointer flex items-center gap-2
        ${
          activeButton.UsersReport
            ? "bg-gray-200 font-medium"
            : "hover:bg-gray-100"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          handleButtonClick("UsersReport");
        }}
      >
        <Users size={16} />
        Users
      </div>

      {/* PROJECT REPORT */}
      <div
        className={`px-4 py-2 text-sm rounded cursor-pointer flex items-center gap-2
        ${
          activeButton.ProjectReport
            ? "bg-gray-200 font-medium"
            : "hover:bg-gray-100"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          handleButtonClick("ProjectReport");
        }}
      >
        <FolderKanban size={16} />
        Project
      </div>

      {/* TASK REPORT */}
      <div
        className={`px-4 py-2 text-sm rounded cursor-pointer flex items-center gap-2
        ${
          activeButton.TaskReport
            ? "bg-gray-200 font-medium"
            : "hover:bg-gray-100"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          handleButtonClick("TaskReport");
        }}
      >
        <ClipboardList size={16} />
        Task
      </div>

    </div>
  )}
</div>

      {/* ADMIN MENU */}
      <div
        className={`${menuItemsStyle} ${
          activeButton.Admin ? selectedButtonStyle : ""
        }`}
        onClick={() => handleButtonClick("Admin")}
      >
        <Users size={20} />
        <span>Admin's</span>
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
