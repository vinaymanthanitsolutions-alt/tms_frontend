import React, { useEffect, useRef, useState } from "react";
import { Search, Plus, Edit, Trash2, ChevronDown, Filter } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { getEmployeeById, deleteEmployee } from "../../services/AdminServices";
import toast from "react-hot-toast";
import Confirmation from "../../components/AdminComponents/Confirmation";
import RegisterEmployee from "../../components/AdminComponents/RegisterEmployee";
import OrangeButton from "../../components/OrangeButton";

// const AdminTeam = ({ setIsOpenAdminRegister, setEditEmployee, refreshKey }) => {
const AdminTeam = () => {
  const [openRegister, setOpenRegister] = React.useState(false);
  const [isOpenAdminRegister, setIsOpenAdminRegister] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [limit, setLimit] = useState(5);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleSearchClick = () => {
    inputRef.current?.focus();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchEmployees = async () => {
    setLoading(true);

    const response = await getEmployeeById(
      "A001",
      statusFilter,
      currentPage,
      limit,
      debouncedSearch,
    );

    console.log(
      "API Request - Status:",
      statusFilter,
      "Page:",
      currentPage,
      "Limit:",
      limit,
      "Search:",
      debouncedSearch,
    );
    console.log("API Response:", response);

    if (response.success) {
      console.log("Employees received:", response.data.length);
      console.log("Total employees:", response.totalEmployees);
      console.log("Total pages:", response.totalPages);

      setEmployees(response.data);
      setTotalPages(response.totalPages || 1);
      setTotalEmployees(response.totalEmployees || 0);
    } else {
      console.error("Error fetching employees:", response.error);
      toast.error(response.error || "Failed to fetch employees");
    }

    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    fetchEmployees();
  }, [refreshKey, currentPage, statusFilter, debouncedSearch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFilterDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDeleteEmployee = (empId) => {
    setEmployeeToDelete(empId);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    if (!employeeToDelete) return;

    const result = await deleteEmployee(employeeToDelete);

    if (result.success) {
      toast.success("Employee deleted successfully!");

      // If after deletion, current page would be empty, go to previous page
      if (employees.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        fetchEmployees();
      }
    } else {
      toast.error(result.error || "Failed to delete employee");
    }

    setShowConfirmation(false);
    setEmployeeToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setEmployeeToDelete(null);
  };

  function handleClickUpdate(employee) {
    setEditEmployee(employee);
    setIsOpenAdminRegister(true);
  }

  const getFilterLabel = () => {
    switch (statusFilter) {
      case "ALL":
        return "All Employees";
      case "ACTIVE":
        return "Active";
      case "INACTIVE":
        return "Inactive";
      case "SUSPENDED":
        return "Suspended";
      default:
        return "All Employees";
    }
  };

  const handleFilterChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
    setShowFilterDropdown(false);
  };

  return (
    <>
      {showConfirmation && (
        <Confirmation
          message={`Are you sure you want to delete employee ${employeeToDelete}?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      <RegisterEmployee
        isOpen={isOpenAdminRegister}
        onClose={() => {
          setIsOpenAdminRegister(false);
          setEditEmployee(null);
        }}
        editData={editEmployee}
        onSuccess={() => setRefreshKey((prev) => prev + 1)}
      />

      <div className="p-5">
        <div className="flex w-full justify-between items-center">
          <div>
          <h1 className="text-2xl font-semibold">Employee Management List</h1>
          <p className="text-sm text-gray-600">Team</p>
        </div>
        <OrangeButton
          onClickFunction={() => setIsOpenAdminRegister(true)}
          style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
        >
          <Plus size={16} />
          <button className="tracking-wide hidden xxs:block">
            Add Employee
          </button>
        </OrangeButton>
        </div>
        {/* Status Filter Tabs */}

        <div className="flex xxs:border-2 rounded-md border-gray-200 justify-between p-0 xxs:px-3 xxs:py-4 my-3 ">
          <div className="border-2 border-gray-200 rounded-md w-fit flex items-center gap-2 px-3 py-2">
            <Search
              size={20}
              className="text-gray-500 cursor-pointer"
              onClick={handleSearchClick}
            />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search by Emp code..."
              className="outline-none text-sm flex-1"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex items-center gap-1 xxs:gap-3">
            {/* Filter Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center gap-2 ml-1 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
              >
                <Filter size={18} className="text-gray-600" />
                <span className="hidden md:block text-sm font-medium">
                  {getFilterLabel()}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-gray-600 transition-transform ${
                    showFilterDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {showFilterDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <button
                      onClick={() => handleFilterChange("ALL")}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition ${
                        statusFilter === "ALL"
                          ? "bg-emerald-50 text-emerald-700 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      All Employees
                    </button>
                    <button
                      onClick={() => handleFilterChange("ACTIVE")}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition ${
                        statusFilter === "ACTIVE"
                          ? "bg-emerald-50 text-emerald-700 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      Active
                    </button>
                    <button
                      onClick={() => handleFilterChange("INACTIVE")}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition ${
                        statusFilter === "INACTIVE"
                          ? "bg-emerald-50 text-emerald-700 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      Inactive
                    </button>
                    <button
                      onClick={() => handleFilterChange("SUSPENDED")}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition ${
                        statusFilter === "SUSPENDED"
                          ? "bg-emerald-50 text-emerald-700 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      Suspended
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* <button
              className="bg-orange-400 text-white px-4 py-2 rounded-md font-light hover:bg-orange-500 transition flex gap-1 items-center"
              onClick={() => {
                setIsOpenAdminRegister(true);
              }}
            >
              <Plus size={19} />
              <div className="hidden md:block">Add Employee</div>
            </button> */}
          </div>
        </div>
        <div className=" overflow-x-auto rounded-xl">
          <table className="w-full border-separate border-spacing-0 border border-gray-200 mt-5 rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-100">
                <th className="uppercase text-gray-500 px-4 py-3 text-left text-xs font-medium border-b border-gray-200">
                  Emp Code
                </th>
                <th className="uppercase text-gray-500 px-4 py-3 text-left text-xs font-medium border-b border-gray-200">
                  Emp Name
                </th>
                <th className="uppercase text-gray-500 px-4 py-3 text-left text-xs font-medium border-b border-gray-200">
                  Emp Phone No
                </th>
                <th className="uppercase text-gray-500 px-4 py-3 text-left text-xs font-medium border-b border-gray-200">
                  Department
                </th>
                <th className="uppercase text-gray-500 px-4 py-3 text-left text-xs font-medium border-b border-gray-200">
                  Role
                </th>
                <th className="uppercase text-gray-500 px-4 py-3 text-left text-xs font-medium border-b border-gray-200">
                  Status
                </th>
                <th className="uppercase text-gray-500 px-4 py-3 text-left text-xs font-medium border-b border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-3 text-sm text-gray-800 border-b border-gray-200 text-center"
                  >
                    Loading employees...
                  </td>
                </tr>
              ) : employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee.emp_id}>
                    <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-200 uppercase">
                      {employee.emp_id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-200">
                      <div>
                        <div className="font-medium truncate w-40">{employee.emp_name}</div>
                        <div className="text-sm text-gray-500 truncate w-40">
                          {employee.email || "N/A"}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-200">
                      {employee.phone}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-200">
                      {employee.department}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-200">
                      {employee.role}
                    </td>
                    <td className="px-4 py-3 text-sm border-b border-gray-200">
                      <span
                        className={`px-2 py-1 rounded-xl text-xs font-medium ${
                          employee.status === "ACTIVE"
                            ? "bg-green-200 text-green-700"
                            : employee.status === "SUSPENDED"
                              ? "bg-red-200 text-red-700"
                              : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm border-b border-gray-200">
                      <div className="flex gap-2">
                        <button
                          className=" text-black border border-gray-300 p-2 rounded hover:text-gray-500 transition"
                          onClick={() => handleClickUpdate(employee)}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="bg-red-300 text-red-700 border border-red-700 p-2 rounded transition"
                          onClick={() => handleDeleteEmployee(employee.emp_id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-3 text-sm text-gray-800 border-b border-gray-200 text-center"
                  >
                    {searchQuery
                      ? "No employees match your search"
                      : "No employees found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            Showing {employees.length > 0 ? (currentPage - 1) * limit + 1 : 0}{" "}
            to {Math.min(currentPage * limit, totalEmployees)} of{" "}
            {totalEmployees} employees
          </div>

          <div className="flex gap-2 items-center">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md border ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
              }`}
            >
              <span className="hidden xxs:block">Previous</span>
              <ChevronLeft size={16} className="ml-2 xxs:hidden" />
            </button>

            <div className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md border ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
              }`}
            >
              <span className="hidden xxs:block">Next</span>
              <ChevronRight size={16} className="ml-2 xxs:hidden" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTeam;
