import {
  Search,
  Edit,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import {
  getEmployeesByRole,
  createProject,
  getAllProjects,
  deleteProject,
  reassignProjectManager,
} from "../../services/AdminServices";
import toast from "react-hot-toast";
import {
  validateProjectCode,
  validateProjectTitle,
  validateProjectDescription,
  validateProjectDeadline,
} from "../../validation/validators";
import {
  IconBoltFilled,
  IconStarFilled,
  IconTriangleFilled,
  IconUserOff,
} from "@tabler/icons-react";

import { Rocket } from "lucide-react";

import { Plus } from "lucide-react";
import OrangeButton from "../../components/OrangeButton";

const AdminProject = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [projectManagers, setProjectManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState("");
  const [managerId, setManagerId] = useState("");
  const [loadingManagers, setLoadingManagers] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [adminId] = useState("A001");

  // Projects state
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [openReassignDropdown, setOpenReassignDropdown] = useState(null);
  const [reassignManagerId, setReassignManagerId] = useState("");
  const reassignDropdownRef = useRef(null);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    projectId: "",
    name: "",
    description: "",
    deadline: "",
  });

  // Error state
  const [errors, setErrors] = useState({
    projectId: "",
    name: "",
    description: "",
    deadline: "",
  });

  const wrapperStyle =
    "flex gap-2 items-center px-3 py-1 text-gray-700 rounded border border-gray-300 text-sm font-medium cursor-pointer transition-all";
  const filterButtonStyle = " text-sm";

  const activeButtonStyle = {
    active:
      "flex gap-2 items-center px-3 py-1 rounded border border-green-400 text-sm font-medium bg-green-200 text-green-700 cursor-pointer transition-all",
    overdue:
      "flex gap-2 items-center px-3 py-1 rounded border border-red-400 text-sm font-medium bg-red-200 text-red-700 cursor-pointer transition-all",
    noManager:
      "flex gap-2 items-center px-3 py-1 rounded border border-orange-400 text-sm font-medium bg-orange-200 text-orange-700 cursor-pointer transition-all",
    highPriority:
      "flex gap-2 items-center px-3 py-1 rounded border border-purple-400 text-sm font-medium bg-purple-200 text-purple-700 cursor-pointer transition-all",
  };

  const handleFilterClick = (filterName) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      fetchProjectManagers();
    }
  }, [isSidebarOpen]);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    // Reset to page 1 when search changes
    if (debouncedSearch !== "") {
      setPage(1);
    }
    fetchProjects();
  }, [page, debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        reassignDropdownRef.current &&
        !reassignDropdownRef.current.contains(event.target)
      ) {
        setOpenReassignDropdown(null);
        setReassignManagerId("");
      }
    };

    if (openReassignDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openReassignDropdown]);

  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const response = await getAllProjects(
        adminId,
        page,
        limit,
        debouncedSearch,
      );

      console.log("Fetch projects response:", response);
      console.log("Response success:", response.success);
      console.log("Response data:", response.data);
      console.log("Response data length:", response.data?.length);

      if (response.success) {
        setProjects(response.data);
        setTotalProjects(response.total);
        setTotalPages(Math.ceil(response.total / limit));
      } else {
        toast.error(response.error || "Failed to fetch projects");
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      toast.error("Failed to fetch projects");
    } finally {
      setLoadingProjects(false);
    }
  };

  const getProjectStatus = (project) => {
    // If no manager, return "No Manager"
    if (!project.pm_id || project.pm_id === "") {
      return {
        label: "No Manager",
        className: "bg-orange-200 text-orange-700",
      };
    }

    // If deadline exists, check for overdue or high priority
    if (project.deadline) {
      const deadlineDate = new Date(project.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      deadlineDate.setHours(0, 0, 0, 0);

      // Check if overdue
      if (deadlineDate < today) {
        return {
          label: "Overdue",
          className: "bg-red-200 text-red-700",
        };
      }

      // Check if high priority (within 1 month)
      const oneMonthFromNow = new Date();
      oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
      oneMonthFromNow.setHours(0, 0, 0, 0);

      if (deadlineDate <= oneMonthFromNow) {
        return {
          label: "High Priority",
          className: "bg-purple-200 text-purple-700",
        };
      }
    }

    // Default: Active
    return {
      label: "Active",
      className: "bg-green-200 text-green-700",
    };
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA"); // YYYY-MM-DD format
  };

  const getFilteredProjects = () => {
    if (!activeFilter) {
      return projects;
    }

    return projects.filter((project) => {
      const status = getProjectStatus(project);

      switch (activeFilter) {
        case "active":
          return status.label === "Active";
        case "overdue":
          return status.label === "Overdue";
        case "noManager":
          return status.label === "No Manager";
        case "highPriority":
          return status.label === "High Priority";
        default:
          return true;
      }
    });
  };

  const fetchProjectManagers = async () => {
    setLoadingManagers(true);
    try {
      const response = await getEmployeesByRole(
        "A001", // Replace with actual admin ID from context/auth
        "PROJECT_MANAGER",
        "ACTIVE",
      );

      if (response.success) {
        setProjectManagers(response.data?.data);
      } else {
        console.error("Failed to fetch project managers:", response.error);
      }
    } catch (error) {
      console.error("Failed to fetch project managers:", error);
    } finally {
      setLoadingManagers(false);
    }
  };

  const handleManagerChange = (e) => {
    const selectedEmpId = e.target.value;
    setSelectedManager(selectedEmpId);

    // Automatically set the manager ID
    if (selectedEmpId) {
      setManagerId(selectedEmpId);
    } else {
      setManagerId("");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const resetForm = () => {
    setFormData({
      projectId: "",
      name: "",
      description: "",
      deadline: "",
    });
    setSelectedManager("");
    setManagerId("");
    setErrors({
      projectId: "",
      name: "",
      description: "",
      deadline: "",
    });
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const result = await deleteProject(projectId);

      if (result.success) {
        toast.success("Project deleted successfully!");
        fetchProjects(); // Refresh project list
      } else {
        toast.error(result.error || "Failed to delete project");
      }
    } catch (error) {
      console.error("Failed to delete project:", error);
      toast.error("Failed to delete project");
    }
  };

  const toggleReassignDropdown = (projectId) => {
    const isOpening = openReassignDropdown !== projectId;
    setOpenReassignDropdown(isOpening ? projectId : null);
    setReassignManagerId(""); // Reset selected manager when opening/closing

    // Fetch managers when opening if not already loaded
    if (isOpening && projectManagers.length === 0) {
      fetchProjectManagers();
    }
  };

  const handleReassign = (projectId, newManagerId) => {
    if (!newManagerId) {
      return;
    }

    // Update project in local state
    setProjects((prevProjects) =>
      prevProjects.map((proj) =>
        proj.project_id === projectId ? { ...proj, pm_id: newManagerId } : proj,
      ),
    );

    setOpenReassignDropdown(null);
    setReassignManagerId("");
  };

  const handleSaveManagerAssignment = async (project) => {
    if (!project.pm_id) {
      toast.error("No manager assigned to save");
      return;
    }

    try {
      const result = await reassignProjectManager(
        project.project_id,
        project.pm_id,
      );

      if (result.success) {
        toast.success("Manager assignment saved successfully!");
        fetchProjects(); // Refresh to get updated data from server
      } else {
        toast.error(result.error || "Failed to save manager assignment");
      }
    } catch (error) {
      console.error("Failed to save manager assignment:", error);
      toast.error("Failed to save manager assignment");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {
      projectId: validateProjectCode(formData.projectId),
      name: validateProjectTitle(formData.name),
      description: validateProjectDescription(formData.description),
      deadline: validateProjectDeadline(formData.deadline),
    };

    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) {
      toast.error("Please fix all validation errors");
      return;
    }

    setSubmitting(true);

    const projectData = {
      projectId: formData.projectId,
      name: formData.name,
      description: formData.description,
      deadline: formData.deadline,
      pmId: managerId,
      createdBy: "A001", // Replace with actual admin ID from context/auth
    };

    const result = await createProject(projectData);

    if (result.success) {
      toast.success("Project created successfully!");
      resetForm();
      setIsSidebarOpen(false);
      fetchProjects(); // Refresh project list
    } else {
      toast.error(result.error || "Failed to create project");
    }

    setSubmitting(false);
  };

  return (
    <div className="py-4 px-5 xxs:p-5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Project Mangement</h1>
          <p className="text-sm text-orange-600">Project</p>
        </div>
        {/* <div
          className="px-4 py-2 text-[0.900rem] bg-orange-500 text-white font-light rounded hover:bg-orange-600 flex items-center gap-1 cursor-pointer"
          onClick={() => setIsSidebarOpen(true)}
        >
         
        </div> */}
        <OrangeButton onClickFunction={() => setIsSidebarOpen(true)} style={{display:"flex", alignItems:"center", gap:"0.25rem"}}>
          <Plus size={16} />
          <button className="tracking-wide hidden xxs:block">
            Add Project
          </button>
        </OrangeButton>
      </div>

      <div>
        <div className="flex  flex-col xxs:flex-row gap-3 xxs:border-2 rounded-md xxs:border-gray-200 justify-between xxs:px-3 xxs:py-4 my-3">
          <div className="border-2 border-gray-200 rounded-md w-full xxs:w-fit flex items-center gap-2 px-3 py-2">
            <Search size={20} className="text-gray-500 cursor-pointer" />
            <input
              type="text"
              placeholder="Search by project name or id"
              className="outline-none text-sm flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <X
                size={18}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
                onClick={() => setSearchTerm("")}
              />
            )}
          </div>
          <div className="flex gap-2 items-center">
            <div className="hidden md:block text-gray-600 uppercase font-medium text-sm tracking-wide mr-2">
              smart filters :{" "}
            </div>
            <div
              className={
                activeFilter === "active"
                  ? activeButtonStyle.active
                  : wrapperStyle
              }
              onClick={() => handleFilterClick("active")}
            >
              <IconBoltFilled size={16} className="text-green-500" />
              <button className={`${filterButtonStyle} hidden xl:block`}>
                Active
              </button>
            </div>
            <div
              className={
                activeFilter === "overdue"
                  ? activeButtonStyle.overdue
                  : wrapperStyle
              }
              onClick={() => handleFilterClick("overdue")}
            >
              <IconTriangleFilled size={16} className="text-red-500" />
              <button className={`${filterButtonStyle} hidden xl:block`}>
                Overdue
              </button>
            </div>
            <div
              className={
                activeFilter === "noManager"
                  ? activeButtonStyle.noManager
                  : wrapperStyle
              }
              onClick={() => handleFilterClick("noManager")}
            >
              <IconUserOff size={16} className="text-orange-500" />
              <button className={`${filterButtonStyle} hidden xl:block`}>
                No Manager
              </button>
            </div>
            <div
              className={
                activeFilter === "highPriority"
                  ? activeButtonStyle.highPriority
                  : wrapperStyle
              }
              onClick={() => handleFilterClick("highPriority")}
            >
              <IconStarFilled size={16} className="text-purple-500" />
              <button className={`${filterButtonStyle} hidden xl:block`}>
                High Priority
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-5">
        <table className="min-w-full border-separate border-spacing-0 border border-gray-200 rounded-md overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="uppercase text-gray-500 pl-8 py-3 text-left text-xs font-medium border-b border-gray-200 whitespace-nowrap">
                Project Name
              </th>
              <th className="uppercase text-gray-500 px-4 py-3 text-left text-xs font-medium border-b border-gray-200 whitespace-nowrap">
                Status
              </th>
              <th className="uppercase text-gray-500 px-4 py-3 text-left text-xs font-medium border-b border-gray-200 whitespace-nowrap">
                Manager
              </th>
              <th className="uppercase text-gray-500 px-4 py-3 text-left text-xs font-medium border-b border-gray-200 whitespace-nowrap">
                Deadline
              </th>
              <th className="uppercase text-gray-500 px-4 py-3 text-left text-xs font-medium border-b border-gray-200 whitespace-nowrap">
                Progress
              </th>
              <th className="uppercase text-gray-500 px-4 py-3 text-center text-xs font-medium border-b border-gray-200 whitespace-nowrap">
                Reassign PM
              </th>
              <th className="uppercase text-gray-500 px-4 py-3 text-center text-xs font-medium border-b border-gray-200 whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loadingProjects ? (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                  Loading projects...
                </td>
              </tr>
            ) : getFilteredProjects().length === 0 ? (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                  No projects found
                </td>
              </tr>
            ) : (
              getFilteredProjects().map((project) => {
                const status = getProjectStatus(project);
                return (
                  <tr key={project.project_id}>
                    <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-200 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Rocket
                          size={30}
                          className="px-2 py-2 rounded bg-orange-200 text-orange-500 shrink-0"
                        />
                        <div>
                          <div>{project.name}</div>
                          <div className="text-[0.60rem] text-gray-500 mt-1">
                            ID: {project.project_id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm border-b border-gray-200 whitespace-nowrap">
                      <span
                        className={`${status.className} px-2 py-1 rounded-xl text-xs font-medium`}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-200 whitespace-nowrap">
                      {project.pm_id || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-200 whitespace-nowrap">
                      {formatDate(project.deadline)}
                    </td>
                    <td className="px-4 py-3 text-sm border-b border-gray-200 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gray-400 h-2 rounded-full"
                          style={{ width: "0%" }}
                        ></div>
                      </div>
                      <div className="text-[0.60rem] text-gray-500 mt-1">
                        0%
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm border-b border-gray-200 whitespace-nowrap">
                      <div
                        className="flex justify-center relative"
                        ref={reassignDropdownRef}
                      >
                        <button
                          onClick={() =>
                            toggleReassignDropdown(project.project_id)
                          }
                          className="text-orange-500 tracking-wide text-xs cursor-pointer"
                        >
                          Reassign
                        </button>
                        {openReassignDropdown === project.project_id && (
                          <div
                            className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1 w-56 bg-white border border-gray-300 rounded-md shadow-lg z-50 p-2"
                            onMouseDown={(e) => e.stopPropagation()}
                          >
                            <select
                              value={reassignManagerId}
                              onChange={(e) => {
                                const newManagerId = e.target.value;
                                setReassignManagerId(newManagerId);
                                handleReassign(
                                  project.project_id,
                                  newManagerId,
                                );
                              }}
                              className="w-full px-2 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-emerald-600"
                            >
                              <option value="">Select new manager</option>
                              {projectManagers.map((manager) => (
                                <option
                                  key={manager.emp_id}
                                  value={manager.emp_id}
                                >
                                  {manager.emp_name} ({manager.emp_id})
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm border-b border-gray-200 whitespace-nowrap">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleSaveManagerAssignment(project)}
                          className="text-black border border-gray-300 p-2 rounded hover:text-gray-500 transition"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteProject(project.project_id)
                          }
                          className="bg-red-300 text-red-700 border border-red-700 p-2 rounded transition hover:bg-red-400"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-600">
          Showing {getFilteredProjects().length}{" "}
          {activeFilter || debouncedSearch ? "filtered" : ""} project
          {getFilteredProjects().length !== 1 ? "s" : ""}
          {!activeFilter && !debouncedSearch && ` of ${totalProjects} total`}
          {debouncedSearch && (
            <span className="ml-1 text-emerald-600">
              for "{debouncedSearch}"
            </span>
          )}
        </div>

        <div className="flex gap-2 items-center ml-2">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded-md border ${
              page === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
            }`}
          >
            <span className="hidden xxs:block">Previous</span>
            <ChevronLeft size={16} className="xxs:hidden" />
          </button>

          <div className="text-sm text-gray-700">
            Page {page} of {totalPages}
          </div>

          <button
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-md border ${
              page === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
            }`}
          >
            <span className="hidden xxs:block">Next</span>
            <ChevronRight size={16} className="xxs:hidden" />
          </button>
        </div>
      </div>

      {/* Right Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full xxs:w-96 bg-white z-60 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center pl-6 pr-4 py-4 border-b border-gray-200">
          <div className="text-black">
            <h2 className="text-xl font-semibold">Create Project</h2>
            <p className="text-xs text-gray-500">
              Create a new project for your team.
            </p>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-black hover:text-gray-300 transition"
          >
            <X size={35} className="text-gray-500 px-2 py-2" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="projectId"
                placeholder="e.g., P001"
                value={formData.projectId}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${
                  errors.projectId ? "border-red-500" : "border-gray-300"
                } rounded-md outline-none focus:border-emerald-600`}
              />
              {errors.projectId && (
                <p className="text-red-500 text-xs mt-1">{errors.projectId}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter project title (max 8 words)"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md outline-none focus:border-emerald-600`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                placeholder="Enter project description (minimum 80 words)"
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } rounded-md outline-none focus:border-emerald-600`}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deadline Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${
                  errors.deadline ? "border-red-500" : "border-gray-300"
                } rounded-md outline-none focus:border-emerald-600 text-gray-500`}
              />
              {errors.deadline && (
                <p className="text-red-500 text-xs mt-1">{errors.deadline}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Project Manager
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-emerald-600 text-gray-500"
                value={selectedManager}
                onChange={handleManagerChange}
                disabled={loadingManagers}
              >
                <option value="">
                  {loadingManagers
                    ? "Loading managers..."
                    : "Select a project manager"}
                </option>
                {projectManagers.map((manager) => (
                  <option key={manager.emp_id} value={manager.emp_id}>
                    {manager.emp_name} ({manager.emp_id})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Manager ID
              </label>
              <input
                type="text"
                placeholder="Auto-populated when manager is selected"
                value={managerId}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none bg-gray-50 text-gray-500"
              />
            </div>
          </form>
        </div>

        {/* Fixed Bottom Buttons */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setIsSidebarOpen(false);
                resetForm();
              }}
              className="w-full bg-gray-300 text-gray-700 py-2 rounded-md font-medium hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-emerald-600 text-white py-2 rounded-md font-medium hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Creating..." : "Create Project"}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminProject;
