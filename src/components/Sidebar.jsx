import { Link, useNavigate, useLocation } from "react-router-dom";

import { House } from "lucide-react";
import { ChartNoAxesCombined } from "lucide-react";
import { ClipboardList } from "lucide-react";
import { Users } from "lucide-react";
import { ClipboardMinus } from "lucide-react";
import { Settings } from "lucide-react";
import { MessageCircleQuestionMark } from "lucide-react";
import { X } from "lucide-react";
import { LogOut,BookOpenCheck } from "lucide-react";
import {
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  TrendingUp,
  FileText,
} from "lucide-react";
import { useState } from "react";
import manthanLogo from "/manthanlogo.png";

const SIDEBAR_LINKS = {
  admin: [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      logo: <House size={20} />,
    },
    {
      label: "Report",
      children: [
        {
          label: "Risk Overview",
          path: "/admin/riskoverview",
          logo: <TrendingUp size={16} />,
        },
        {
          label: "Project Insight",
          path: "/admin/projectinsight",
          logo: <Users size={16} />,
        },
        {
          label: "Audit History",
          path: "/admin/audithistory",
          logo: <FileText size={16} />,
        },
      ],
      logo: <ChartNoAxesCombined size={20} />,
    },
    {
      label: "Employee's",
      path: "/admin/employees",
      logo: <Users size={20} />,
    },
    {
      label: "Projects",
      path: "/admin/projects",
      logo: <ClipboardList size={20} />,
    },
  ],

  project_manager: [
    {
      label: "Dashboard",
      path: "/pm/dashboard",
      logo: <House size={20} />,
    },
    {
      label: "Report",
      logo: <Users size={20} />,
      children: [
        {
          label: "Project Analysis",
          path: "/pm/projectanalysis",
          logo: <Users size={16} />,
        },
        {
          label: "Task Team Insight",
          path: "/pm/teaminsight",
          logo:  <TrendingUp size={16} />,
        },
      ],
    },
    {
      label: "Task",
      path: "/pm/task",
      logo: <ClipboardList size={20} />,
    },
    {
      label: "Projects",
      path: "/pm/projects",
      logo: <ClipboardList size={20} />,
    },
  ],
  super_admin: [
    {
    label: "Dashboard",
      path: "/superadmin/dashboard",
      logo: <House size={20} />,
  },        
  {
      label: "Report",
      logo: < ClipboardMinus size={20} />,
      children: [
        {
          label: "Users",
          path: "/superadmin/users",
          logo: <Users size={16} />,
        },
        {
          label: "Project",
          path: "/superadmin/project",
          logo: <ClipboardList size={16} />,
        },
        {
          label: "Task",
          path: "/superadmin/task",
          logo: <BookOpenCheck size={16} />,
        },
      ],
    },
    {
      label: "Admin's",
      path: "/superadmin/admins",
      logo: <House size={20} />,
    },
],
};

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const role = localStorage.getItem("role")?.toLowerCase();
  const menu = SIDEBAR_LINKS[role] || [];
  const navigate = useNavigate();
  const location = useLocation();

  const clickStyle = "bg-gray-200 text-black";

  const menuItemsStyle =
    "flex gap-2 items-center text-gray-600 hover:text-black hover:bg-gray-100 px-3 py-2 rounded cursor-pointer transition ease-in-out duration-200 text-[1rem]";

  const selectedButtonStyle = "bg-gray-200 text-black";

  const [openSubMenu, setOpenSubMenu] = useState({});
  


  const toggleSubMenu = (label) => {
    setOpenSubMenu((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleLogOutClick = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside
      className={`fixed w-full md:w-64 lg:static inset-y-0 left-0 z-60 h-screen border-r-2 border-gray-200 bg-white transform transition-transform duration-300 ease-in-out flex flex-col ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="shrink-0 px-5 pt-4">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center justify-center">
            <img src={manthanLogo} alt="Manthan Logo" className="w-8 h-auto" />
            <div className="text-xl font-semibold">Manthan</div>
          </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded transition"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <div className="text-xs mt-7 text-gray-600 mb-4">Menu</div>
        {/* <div className="flex flex-col gap-1">{renderMenuItems()}</div> */}
        <div className="flex flex-col gap-1">
          {menu.map((item, index) => (
            <div key={index}>
              {/* ===== Parent ===== */}
              <div
                className={`${menuItemsStyle} ${
                  location.pathname === item.path ? selectedButtonStyle : ""
                } flex items-center justify-between`}
                onClick={() => {
                  if (item.children) {
                    toggleSubMenu(item.label);
                  } else if (item.path) {
                    // handleButtonClick(item.label);
                    navigate(item.path);
                    setIsSidebarOpen(false);
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  {item.logo}
                  <span className="flex-1">{item.label}</span>
                </div>

                {/* Arrow ONLY for parents with children */}
                {item.children &&
                  (openSubMenu[item.label] ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  ))}
              </div>

              {/* ===== Children ===== */}
              {item.children && openSubMenu[item.label] && (
                <div className="ml-6 flex flex-col gap-1 mt-1">
                  {item.children.map((child) => (
                    <div
                      key={child.path}
                      className={`flex items-center gap-2 px-3 py-2 text-sm rounded cursor-pointer transition ${
                        // activeButton[child.label]
                        location.pathname === child.path
                          ? "bg-gray-200 text-black"
                          : "text-gray-500 hover:bg-gray-100 hover:text-black"
                      }`}
                      onClick={() => {
                        navigate(child.path);
                        setIsSidebarOpen(false);
                        // handleButtonClick(child.label);
                      }}
                    >
                      {child.logo}
                      <Link>{child.label}</Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-xs mt-7 text-gray-600 mb-4">General</div>
        <div className="flex flex-col gap-1">
          <div
            className={`${menuItemsStyle} ${location.pathname === "/help" ? selectedButtonStyle : ""}`}
            // onClick={() => handleButtonClick("Help")}
          >
            <MessageCircleQuestionMark size={20} />
            <span>Help</span>
          </div>
          <div
            className={`${menuItemsStyle} ${location.pathname === "/settings" ? selectedButtonStyle : ""}`}
            // onClick={() => handleButtonClick("Settings")}
          >
            <Settings size={20} />
            <span>Settings</span>
          </div>
          <div
            className={`${menuItemsStyle} ${location.pathname === "/logout" ? selectedButtonStyle : ""}`}
            onClick={() => handleLogOutClick()}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
