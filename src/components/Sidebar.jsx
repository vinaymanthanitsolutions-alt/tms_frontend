import React from "react";
import manthanLogo from "/manthanlogo.png";
import { House } from "lucide-react";
import { ChartNoAxesCombined } from "lucide-react";
import { ClipboardList } from "lucide-react";
import { Users } from "lucide-react";
import { Settings } from "lucide-react";
import { MessageCircleQuestionMark } from "lucide-react";

const Sidebar = ({ onNavigate }) => {
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
  }

  const clickStyle = "bg-gray-200 text-black";

  const menuItemsStyle =
    "flex gap-2 items-center text-gray-600 hover:text-black hover:bg-gray-100 px-3 py-2 rounded cursor-pointer transition ease-in-out duration-200 text-[1rem]";

  const selectedButtonStyle = "bg-gray-200 text-black";

  return (
    <aside className="w-[15%] h-200 px-5 py-4 border-r-2 border-gray-200">
      <div className="flex gap-2 items-center ">
        <img src={manthanLogo} alt="Manthan Logo" className="w-8 h-auto " />
        <div className="text-xl font-semibold">Manthan</div>
      </div>
      <div className="text-xs mt-7 text-gray-600 mb-4">Menu</div>
      <div className="flex flex-col gap-1">
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
          className={`${menuItemsStyle} ${activeButton.Team ? selectedButtonStyle : ""}`}
          onClick={() => handleButtonClick("Team")}
        >
          <Users size={20} />
          <span>Team</span>
        </div>
        <div
          className={`${menuItemsStyle} ${activeButton.Task ? selectedButtonStyle : ""}`}
          onClick={() => handleButtonClick("Task")}
        >
          <ClipboardList size={20} />
          <span>Task</span>
        </div>
      </div>
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
  );
};

export default Sidebar;
