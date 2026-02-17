import React, { useEffect, useRef, useState } from "react";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { getEmployeeById, deleteEmployee } from "../../services/AdminServices";
import toast from "react-hot-toast";
import Confirmation from "../../components/AdminComponents/Confirmation";

const AdminTeam = ({ setIsOpenAdminRegister, setEditEmployee, refreshKey }) => {
  const [openRegister, setOpenRegister] = React.useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const inputRef = useRef(null);

  const handleSearchClick = () => {
    inputRef.current?.focus();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.emp_id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const fetchEmployees = async () => {
    setLoading(true);
    const response = await getEmployeeById("A001");
    console.log("Full response:", response);
    if (response.success) {
      console.log("Employee data:", response.data);
      console.log("Number of employees:", response.data.length);
      setEmployees(response.data);
    } else {
      console.error("Error fetching employee:", response.error);
      toast.error(response.error || "Failed to fetch employees");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, [refreshKey]);

  const handleDeleteEmployee = (empId) => {
    setEmployeeToDelete(empId);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    if (!employeeToDelete) return;

    const result = await deleteEmployee(employeeToDelete);

    if (result.success) {
      toast.success("Employee deleted successfully!");
      fetchEmployees();
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

  return (
    <>
      {showConfirmation && (
        <Confirmation
          message={`Are you sure you want to delete employee ${employeeToDelete}?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      <div className="p-5">
        <h1 className="text-2xl font-semibold">Employee Management List</h1>
        <p className="text-sm text-emerald-600">Team</p>

        <div className="flex border-2 rounded-md border-gray-200 justify-between px-3 py-4 my-3">
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
          <div>
            <button
              className="bg-emerald-600 text-white px-4 py-2 rounded-md font-light hover:bg-emerald-700 transition flex gap-1 items-center"
              onClick={() => {
                setIsOpenAdminRegister(true);
              }}
            >
              <Plus size={19} />
              <div className="hidden md:block">Add Employee</div>
            </button>
          </div>
        </div>
        <div className="mt-6 overflow-x-auto rounded-xl max-h-96 overflow-y-auto">
          <table className="w-full border-x-2 border-gray-200">
            <thead className="bg-gray-200 text-black">
              <tr>
                <th className="border-b border-gray-300 px-4 py-3 font-medium text-left">
                  Emp Code
                </th>
                <th className="border-b border-gray-300 px-4 py-3 font-medium text-left">
                  Emp Name
                </th>
                <th className="border-b border-gray-300 px-4 py-3 font-medium text-left">
                  Emp Phone No
                </th>
                <th className="border-b border-gray-300 px-4 py-3 font-medium text-left">
                  Department
                </th>
                <th className="border-b border-gray-300 px-4 py-3 font-medium text-left">
                  Role
                </th>
                <th className="border-b border-gray-300 px-4 py-3 font-medium text-left">
                  Status
                </th>
                <th className="border-b border-gray-300 px-4 py-3 font-medium text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="border-b border-gray-300 px-4 py-3 text-center"
                  >
                    Loading employees...
                  </td>
                </tr>
              ) : filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.emp_id}>
                    <td className="border-b border-gray-300 px-4 py-3 uppercase">
                      {employee.emp_id}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-3">
                      <div>
                        <div className="font-medium">{employee.emp_name}</div>
                        <div className="text-sm text-gray-500">
                          {employee.email || "N/A"}
                        </div>
                      </div>
                    </td>
                    <td className="border-b border-gray-300 px-4 py-3">
                      {employee.phone}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-3">
                      {employee.department}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-3">
                      {employee.role}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          employee.status === "ACTIVE"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {employee.status}
                      </span>
                    </td>
                    <td className="border-b border-gray-300 px-4 py-3">
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
                    className="border-b border-gray-300 px-4 py-3 text-center"
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
      </div>
    </>
  );
};

export default AdminTeam;
