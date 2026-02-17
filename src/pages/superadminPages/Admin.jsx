import React, { useState, useEffect } from "react";

import { Pencil, Trash2, X, Search } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Filter, ChevronDown } from "lucide-react";
import { useRef } from "react";


{/*const initialAdmins = [
  {
    adminCode: "ADM001",
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "9876543210",
    status: "ACTIVE",
  },
  {
    adminCode: "ADM002",
    name: "Neha Singh",
    email: "neha@gmail.com",
    phone: "9123456780",
    status: "INACTIVE",
  },
];*/}

const Admin = () => {
 const [admins, setAdmins] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editAdmin, setEditAdmin] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
const [statusFilter, setStatusFilter] = useState("ALL");
const [showFilterDropdown, setShowFilterDropdown] = useState(false);
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


  const validateAdminCode = (code) => /^A\d{3}$/.test(code);
  const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);

  const openEditModal = (admin) => {
    setEditAdmin({ ...admin });
    setIsEditOpen(true);
  };

  const handleEditChange = (e) => {
    setEditAdmin({ ...editAdmin, [e.target.name]: e.target.value });
  };

 
 const handleUpdate = async () => {
  try {
    if (!editAdmin) return;

    const response = await fetch(
      `http://localhost:8080/emp/${editAdmin.adminCode}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          
  emp_id: editAdmin.adminCode,
  emp_name: editAdmin.name,
  email: editAdmin.email,
  phone: editAdmin.phone,
  password: editAdmin.password || "Default@123",
  department: editAdmin.department || "HEAD",
  role: "ADMIN",
  manager_id: editAdmin.manager_id || "SA001",
  status : editAdmin.status,
}),
        
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to update employee");
    }

    const data = await response.json();
    console.log("UPDATE RESPONSE:", data);

    alert("Admin Updated Successfully ✅");

    fetchAdmins();
    setIsEditOpen(false);

  } catch (error) {
    console.error("Update Error:", error);
    alert("Update Failed ❌");
  }
};



  const handleAddChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

 
 const handleAddAdmin = async () => {
  try {
    const response = await fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emp_id: newAdmin.adminCode,
        emp_name: newAdmin.name,
        email: newAdmin.email,
        phone: newAdmin.phone,
        password: newAdmin.password,
        department: newAdmin.department,
        role: "ADMIN",
        manager_id: newAdmin.manager_id || "SA001",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to register admin");
    }

    const data = await response.json();
    console.log("SIGNUP RESPONSE:", data);

    alert("Admin Registered Successfully ✅");

    fetchAdmins();   
    setIsAddOpen(false);

  } catch (error) {
    console.error("Signup Error:", error);
    alert("Registration Failed ❌");
  }
};



useEffect(() => {
  fetchAdmins();
}, [currentPage, search, statusFilter]);

const fetchAdmins = async () => {
  try {
    const managerID = "SA001";

    const response = await fetch(
      `http://localhost:8080/emp?emp_id=${managerID}&status=${statusFilter}&page=${currentPage}&limit=${adminsPerPage}&search=${search}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch admins");
    }

    console.log("API RESPONSE:", data);

    const adminArray = data.data || [];

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

   
    setTotalPages(data.pagination?.total_pages || 1);

  } catch (error) {
    console.error(error);
    toast.error("Failed to load admins");
  }
};

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



  return (
    <div className=" min-h-screen bg-gray-50 p-4 sm:p-6">
      <Toaster position="top-right" />

      {/*  HEADER SECTION */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Admin Details</h1>
        <p className="text-sm text-emerald-600 mt-1">Admin</p>
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
      placeholder="Search Admin..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
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
          {statusFilter === "ALL" ? "All Admins" : statusFilter}
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
            All Admins
          </button>
          <button
            onClick={() => {
              setStatusFilter("ACTIVE");
              setCurrentPage(1);
              setShowFilterDropdown(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Active
          </button>
          <button
            onClick={() => {
              setStatusFilter("INACTIVE");
              setCurrentPage(1);
              setShowFilterDropdown(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Inactive
          </button>
          <button
            onClick={() => {
              setStatusFilter("SUSPENDED");
              setCurrentPage(1);
              setShowFilterDropdown(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Suspended
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
            {admins.map((admin, index) => (
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

    //  Refresh list from backend
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
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
<div className="flex justify-end mt-4 gap-2">
  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      onClick={() => setCurrentPage(index + 1)}
      className={`px-3 rounded border border-gray-200 ${
        currentPage === index + 1
          ? "bg-emerald-500 text-white"
          : "bg-white text-gray-700"
      }`}
    >
      {index + 1}
    </button>
  ))}
</div>




{/*  ADD ADMIN POPUP */}
{isAddOpen && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50 overflow-y-auto">
    <div className="bg-white w-full max-w-4xl rounded-2xl border border-gray-200 shadow-md p-6 sm:p-8 relative">

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
        <p className="text-gray-400 text-sm">
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
          <p className="text-xs text-gray-400 mt-1">
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
          <p className="text-xs text-gray-400 mt-1">
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
    <div className="bg-white w-full max-w-2xl rounded-xl p-6 relative">

      <button
        onClick={() => setIsEditOpen(false)}
        className="absolute top-3 right-3 cursor-pointer"
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
