import React, { useState, useEffect, useRef } from "react";
import { Pencil, Trash2, X, Search, Filter, ChevronDown } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import {
  
  validatePassword,
  validateEmail ,
  validatePhoneNumber,
} from "../../validation/validators";

const Admin = () => {
  const [admins, setAdmins] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editAdmin, setEditAdmin] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  

  const addRef = useRef(null);
  const editRef = useRef(null);

  const dropdownRef = useRef(null);
  const adminsPerPage = 5;

  const [newAdmin, setNewAdmin] = useState({
    adminCode: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    department: "",
    status: "ACTIVE",
  });

  //  // Form state
  //   const [formData, setFormData] = useState({
  //     email: "",
  //     contact: "",
  //     password: "",
     
  //   });

     // Error state
      const [error, setError] = useState({
  email: "",
  phone: "",
  password: "",
});

  /*  FETCH ADMINS  */

  const fetchAdmins = async () => {
    try {
      const managerID = "SA001";

      const response = await fetch(
        `http://localhost:8080/emp?emp_id=${managerID}&status=${statusFilter}&page=${currentPage}&limit=${adminsPerPage}&search=${search}`
      );

      const data = await response.json();

      if (!response.ok) throw new Error("Failed to fetch admins");

      const adminArray = data?.data?.data || [];

      const formattedData = adminArray.map((emp) => ({
        adminCode: emp.emp_id,
        name: emp.emp_name,
        email: emp.email,
        phone: emp.phone,
        status: emp.status,
        department: emp.department,
        role: emp.role,
      }));

      setAdmins(formattedData);

      // backend se total count 
    const total = data?.data?.total || 0;

setTotalCount(total); 
setTotalPages(Math.ceil(total / adminsPerPage) || 1);
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to fetch admins");
    }
  };

  /*  EFFECTS */

  useEffect(() => {
    fetchAdmins();
  }, [currentPage, debouncedSearch, statusFilter]);

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

  /* ADD  */

  const handleAddChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };


  const handleAddAdmin = async (e) => {
  e.preventDefault();

  const emailValid = validateEmail(newAdmin.email);
const phoneValid = validatePhoneNumber(newAdmin.phone);
const passwordResult = validatePassword(newAdmin.password);

const newError = {
  email: emailValid,
  phone: phoneValid,
  password: passwordResult.isValid,
};

  setError(newError);

 const hasError = Object.values(newError).some((err) => err === false);

  if (hasError) {
    // console.log("Validation Errors:", newError);
    toast.error("Please fix all validation errors");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emp_id: newAdmin.adminCode,
        emp_name: newAdmin.name,
        email: newAdmin.email,
        phone: newAdmin.phone,
        password: newAdmin.password,
        department: newAdmin.department,
        role: "ADMIN",
        manager_id: "SA001",
      }),
    });

    if (!response.ok) throw new Error("Failed");

    toast.success("Admin Registered Successfully");
    fetchAdmins();
    setIsAddOpen(false);

  } catch (error) {
    toast.error("Registration Failed");
  }
};

  /* UPDATE  */

  const openEditModal = (admin) => {
    setEditAdmin({ ...admin });
    setIsEditOpen(true);
  };

  const handleEditChange = (e) => {
    setEditAdmin({ ...editAdmin, [e.target.name]: e.target.value });
  };

 const handleUpdate = async () => {
  if (!editAdmin) return;

 const emailValid = validateEmail(editAdmin.email);
const phoneValid = validatePhoneNumber(editAdmin.phone);

const newError = {
  email: emailValid,
  phone: phoneValid,
};

  setError(newError);

  const hasError = Object.values(newError).some((err) => err === false);

  if (hasError) {
    // console.log("Validation Errors:", newError);
    toast.error("Please fix all validation errors");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8080/emp/${editAdmin.adminCode}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emp_id: editAdmin.adminCode,
          emp_name: editAdmin.name,
          email: editAdmin.email,
          phone: editAdmin.phone,
          password: editAdmin.password || "Default@123",
          department: editAdmin.department || "HEAD",
          role: "ADMIN",
          manager_id: "SA001",
          status: editAdmin.status,
        }),
      }
    );

    if (!response.ok) throw new Error("Update failed");

    toast.success("Admin updated successfully");
    fetchAdmins();
    setIsEditOpen(false);

  } catch (error) {
    toast.error("Update failed");
  }
};

  /*  DELETE  */

  const handleDelete = async (code) => {
    try {
      const response = await fetch(
        `http://localhost:8080/emp/${code}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Delete failed");

      toast.success("Admin deleted successfully");
      fetchAdmins();

    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const resetForm = () => {
  setNewAdmin({
    adminCode: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    department: "",
    status: "ACTIVE",
  });

  setError({
    email: "",
    phone: "",
    password: "",
  });
};

      

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (addRef.current && !addRef.current.contains(e.target)) {
      setIsAddOpen(false);
    }

    if (editRef.current && !editRef.current.contains(e.target)) {
      setIsEditOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);



//debounce
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 500);

  return () => clearTimeout(timer);
}, [search]);

useEffect(() => {
  setCurrentPage(1);
}, [debouncedSearch, statusFilter]);


  return (
    <div className=" min-h-screen bg-gray-50 p-4 sm:p-6">
      <Toaster position="top-right" />

      {/*  HEADER SECTION */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Admin Details</h1>
        <p className="text-sm text-gray-500 mt-1">Admin</p>
      </div>

    
      {/*  SEARCH + FILTER + ADD BUTTON */}
<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 bg-white border border-gray-200 p-4 rounded-lg">

  {/* SEARCH */}
  <div className="relative w-full sm:w-1/3 lg:w-1/4">
    <Search
      size={18}
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
    />
    <input
      type="text"
      placeholder="Search Admin..
      ."
      value={search}
      onChange={(e) => {
  setSearch(e.target.value);
  setCurrentPage(1);
}}
      className="border border-gray-200 pl-10 pr-3 py-2 rounded w-full focus:outline-none"
    />
  </div>

  <div className="flex items-center gap-3">

    {/* FILTER DROPDOWN */}
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowFilterDropdown(!showFilterDropdown)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
      >
        <Filter size={16} />
        <span className="text-sm font-medium">
          {statusFilter === "ALL" ? "ALL ADMINS" : statusFilter}
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
          <button
            onClick={() => {
              setStatusFilter("ALL");
              setCurrentPage(1);
              setShowFilterDropdown(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            ALL ADMINS
          </button>
          <button
            onClick={() => {
              setStatusFilter("ACTIVE");
              setCurrentPage(1);
              setShowFilterDropdown(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            ACTIVE
          </button>
          <button
            onClick={() => {
              setStatusFilter("INACTIVE");
              setCurrentPage(1);
              setShowFilterDropdown(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            INACTIVE
          </button>
          <button
            onClick={() => {
              setStatusFilter("SUSPENDED");
              setCurrentPage(1);
              setShowFilterDropdown(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            SUSPENDED
          </button>
        </div>
      )}
    </div>

    {/* ADD BUTTON */}
    <button
      onClick={() => setIsAddOpen(true)}
      className="bg-emerald-500 text-white px-5 py-2 rounded-lg"
    >
      + Add Admin
    </button>
  </div>
</div>




      {/*  TABLE */}
      <div className="w-full overflow-x-auto bg-white rounded-lg shadow">
       <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-200 text-center">
            <tr>
              <th className="px-4 py-3 text-sm text-gray-600">ADMIN CODE</th>
              <th className="px-4 py-3 text-sm text-gray-600">ADMIN NAME</th>
              <th className="px-4 py-3 text-sm text-gray-600">EMAIL</th>
              <th className="px-4 py-3 text-sm text-gray-600">PHONE</th>
              <th className="px-4 py-3 text-sm text-gray-600">STATUS</th>
            
              <th className="px-4 py-3 text-sm text-gray-700">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {admins.length > 0 ? (
            admins.map((admin, index) => (
              <tr key={index} className="text-center border-b border border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">{admin.adminCode}</td>
                <td className="px-4 py-3">{admin.name}</td>
                <td className="px-4 py-3">{admin.email}</td>
                <td className="px-4 py-3">{admin.phone}</td>
                <td className="px-4 py-3">
                  <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                 admin.status === "ACTIVE"
                ? "bg-green-100 text-green-700"
                 : admin.status === "SUSPENDED"
                ? "bg-yellow-100 text-yellow-700"
               : "bg-red-100 text-red-700"
                    }`}
                  >

                    {admin.status}
                  </span>
                </td>
               

                <td className="px-4 py-3 flex justify-center gap-3">
                  <button
                    onClick={() => openEditModal(admin)}
                    className="text-gray-500 p-2"
                  >
                    <Pencil size={16} />
                  </button>

                  
             <button
  onClick={async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this admin?");

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:8080/emp/${admin.adminCode}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete admin");
      }

      toast.success("Admin deleted successfully ✅");
      fetchAdmins();

    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  }}
  className="text-gray-500 p-2"
>
  <Trash2 size={16} />
</button>

                </td>
              </tr>
            ))
          ): (
            <tr>
              <td colSpan="7" className="text-center p-6 text-gray-500">
                No Admins Found
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
    Showing {totalCount} admin{totalCount !== 1 ? "s" : ""}
   
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




{/*  ADD ADMIN POPUP */}
{isAddOpen && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50 overflow-y-auto">
     <div
      ref={addRef}
      className="bg-white w-full max-w-4xl rounded-2xl border border-gray-200 shadow-md p-6 sm:p-8 relative"
    >

      {/* CLOSE */}
      <button
        onClick={() => setIsAddOpen(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-black"
      >
        <X />
      </button>

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Add Admin
        </h2>
        <p className="text-gray-500 text-sm">
          Add new admin details
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleAddAdmin}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Admin Code */}
        <div>
          <label className="block mb-1 text-sm ">
            Admin Code *
          </label>
          <input
            type="text"
            name="adminCode"
            placeholder="e.g., A001"
            value={newAdmin.adminCode}
            onChange={handleAddChange}
            className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none"
            required
          />
        </div>

        {/* Name */}
        <div>
          <label className="block mb-1 text-sm ">
            Admin Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="e.g., John"
            value={newAdmin.name}
            onChange={handleAddChange}
            className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-sm ">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="John@example.com"
            value={newAdmin.email}
            onChange={handleAddChange}
            className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none"
            required
          />
        </div>

        {/* Contact */}
        <div>
          <label className="block mb-1 text-sm ">
            Contact
          </label>
          <input
            type="text"
            name="phone"
            placeholder="e.g., 6789......"
            value={newAdmin.phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 10) {
                handleAddChange({
                  target: { name: "phone", value },
                });
              }
            }}
            className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 text-sm ">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={newAdmin.password}
            onChange={handleAddChange}
            className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Min 8 chars, 1 capital, 1 number, 1 special symbol
          </p>
        </div>

        {/* Department */}
        <div>
          <label className="block mb-1 text-sm ">
            Department
          </label>
          <select
            name="department"
            value={newAdmin.department}
            onChange={handleAddChange}
            className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none"
            required
          >
            <option value="">Select Department</option>
            <option value="HEAD">HEAD</option>
            <option value="IT">IT</option>
            <option value="SALES">SALES</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Select a department first
          </p>
        </div>

        {/* BUTTON */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-emerald-500 text-white px-8 py-2.5 rounded-lg hover:bg-emerald-600 transition"
          >
            Add Admin
          </button>
        </div>
      </form>
    </div>
  </div>
)}


      {/*  EDIT POPUP */}
      {isEditOpen && (
   <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50 overflow-y-auto">
    
<div
  ref={editRef}
  className="bg-white w-full max-w-2xl rounded-2xl border border-gray-200 shadow-md p-6 sm:p-8 relative "
>
       {/* CLOSE */}
      <button
        onClick={() =>  setIsEditOpen(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-black"
      >
        <X />
      </button>

      <h2 className="text-lg font-semibold mb-4">Edit Admin</h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        <div>
          <label className="block mb-1 text-sm">Admin Code *</label>
          <input
            name="adminCode"
            value={editAdmin.adminCode}
            disabled
            className="border border-gray-200 p-2 rounded w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Admin Name *</label>
          <input
            name="name"
            value={editAdmin.name}
            onChange={handleEditChange}
            className="border border-gray-200 p-2 rounded w-full outline-gray-300"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Email *</label>
          <input
            name="email"
            value={editAdmin.email}
            onChange={handleEditChange}
            className="border border-gray-200 p-2 rounded w-full outline-gray-300"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Contact *</label>
          <input
            name="phone"
            value={editAdmin.phone}
            onChange={handleEditChange}
            className="border border-gray-200 p-2 rounded w-full outline-gray-300"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Status *</label>
          <select
            name="status"
            value={editAdmin.status}
            onChange={handleEditChange}
            className="border border-gray-200 p-2 rounded w-full outline-gray-300"
          >
            <option>ACTIVE</option>
            <option>INACTIVE</option>
            <option>SUSPENDED</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm">Role *</label>
          <input
            type="text"
            name="role"
            value="ADMIN"
            disabled
            className="border border-gray-200 p-2 rounded w-full bg-gray-100"
          />
        </div>

      </div>

      <button
        onClick={handleUpdate}
        className="mt-6 w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition"
      >
        Update Admin
      </button>

    </div>
  </div>
)}

    </div>
  );
};

export default Admin;
