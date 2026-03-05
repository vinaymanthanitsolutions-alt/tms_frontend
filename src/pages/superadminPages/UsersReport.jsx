import React, { useState, useRef, useEffect } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";

const itemsPerPage = 5;

const User = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [debouncedSearch, setDebouncedSearch] = useState("");
   

  

  // ✅ Fetch Data From API
 useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/emp?role=SUPER_ADMIN&limit=50&search=${search}&page=${currentPage}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      console.log("API Response:", result);

      // ✅ CORRECT PATH
      const employeeArray = result?.data?.data || [];

      setUsers(employeeArray);   // No need to re-map, keys already match

      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  fetchUsers();
}, []);


//debouncing logic
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 500); // delay

  return () => clearTimeout(timer);
}, [search]);


useEffect(() => {
  setCurrentPage(1);
}, [debouncedSearch, roleFilter]);


  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFilterDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Filter Logic
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.emp_name
      ?.toLowerCase()
      .includes(debouncedSearch.toLowerCase())

    const matchesRole =
      roleFilter === "ALL" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  // ✅ Pagination Based on Filtered Users
const totalPages = Math.max(
  1,
  Math.ceil(filteredUsers.length / itemsPerPage)
);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  // ✅ Auto reset page if filter reduces data
  useEffect(() => {
  if (currentPage > totalPages) {
    setCurrentPage(1);
  }
}, [filteredUsers, totalPages, currentPage]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }


  

 

  return (
  <div className="p-6 bg-gray-50 min-h-screen">
    <h2 className="text-2xl font-semibold">Employee's Detail</h2>
    <h2 className="text-sm text-gray-500 mb-6">Employee's</h2>

    {/* SEARCH + FILTER */}
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 bg-white border border-gray-200 p-4 rounded-lg">
      <div className="relative w-full sm:w-1/3 lg:w-1/4">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search Employee..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-200 pl-10 pr-3 py-2 rounded w-full focus:outline-none"
        />
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
        >
          <Filter size={16} />
          <span className="text-sm font-medium">
            {roleFilter === "ALL" ? "All employee's" : roleFilter}
          </span>
          <ChevronDown
            size={16}
            className={`transition-transform ${
              showFilterDropdown ? "rotate-180" : ""
            }`}
          />
        </button>

        {showFilterDropdown && (
          <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            {["ALL", "ADMIN", "PROJECT_MANAGER", "TEAM_LEADER", "DEVELOPER", "TESTER"].map(
              (role) => (
                <button
                  key={role}
                  onClick={() => {
                    setRoleFilter(role);
                    setCurrentPage(1);
                    setShowFilterDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  {role === "ALL" ? "All employee's" : role}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </div>

    {/* TABLE */}
    <div className="bg-white rounded-xl  border border-gray-200 overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
          <tr>
            <th className="p-4">Emp ID</th>
            <th className="p-4 px-20">Name</th>
            <th className="p-4">Phone</th>
            <th className="p-4">Department</th>
            <th className="p-4">Role</th>
            <th className="p-4">Manager ID</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition border-gray-200"
              >
                <td className="p-4 font-medium">{user.emp_id}</td>

                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold  flex items-center justify-center text-sm font-semibold">
                      {user.emp_name
                        ?.match(/\b\w/g)
                        ?.join("")
                        ?.toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium">{user.emp_name}</div>
                      <div className="text-sm text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="p-4">{user.phone}</td>

                <td className="px-2 py-2 text-lg text-center">
                  <div className="px-2 py-0.5 bg-blue-100 text-sm mx-auto rounded-2xl w-20 text-center text-blue-500">
                    {user.department}
                  </div>
                </td>

                <td className="p-4">{user.role}</td>
                <td className="p-4">{user.manager_id}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-xl ${
                      user.status === "ACTIVE"
                        ? "bg-green-100 text-green-600"
                        : user.status === "INACTIVE"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-6 text-gray-500">
                No Employees Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  


      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-6">
  {/* LEFT TEXT */}
  <div className="text-sm text-gray-600">
    Showing {filteredUsers.length} employee
    {filteredUsers.length !== 1 ? "s" : ""}
    {debouncedSearch && (
      <span className="ml-1 text-emerald-600">
        for "{debouncedSearch}"
      </span>
    )}
  </div>

  {/* RIGHT BUTTONS */}
  <div className="flex gap-2 items-center">
    <button
      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
      disabled={currentPage <= 1}
      className={`px-4 py-2 rounded-md border ${
        currentPage <= 1
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
      }`}
    >
      Prev
    </button>

    <div className="text-sm text-gray-700">
      Page {currentPage} of {totalPages}
    </div>

    <button
      onClick={() =>
        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
      }
      disabled={currentPage >= totalPages}
      className={`px-4 py-2 rounded-md border ${
        currentPage >= totalPages
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
      }`}
    >
      Next
    </button>
  </div>
</div>
    </div>
  );
};

export default User;
