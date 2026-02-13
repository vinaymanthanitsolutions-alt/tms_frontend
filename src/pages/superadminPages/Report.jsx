import React, { useState, useEffect } from "react";

import { Pencil, Trash2, X, Search } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

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

const Report = () => {
 const [admins, setAdmins] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editAdmin, setEditAdmin] = useState(null);
  const [search, setSearch] = useState("");

  const [newAdmin, setNewAdmin] = useState({
    adminCode: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    department: "",
    status: "ACTIVE",
  });

  /* 🔐 VALIDATIONS */
  const validateAdminCode = (code) => /^A\d{3}$/.test(code);
  const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);

  const openEditModal = (admin) => {
    setEditAdmin({ ...admin });
    setIsEditOpen(true);
  };

  const handleEditChange = (e) => {
    setEditAdmin({ ...editAdmin, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    setAdmins((prev) =>
      prev.map((a) =>
        a.adminCode === editAdmin.adminCode ? editAdmin : a
      )
    );
    toast.success("Admin updated successfully ✅");
    setIsEditOpen(false);
  };

  const handleAddChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

 
  const handleAddAdmin = async (e) => {
  e.preventDefault();

  const { adminCode, name, email, phone, password, department } = newAdmin;

  if (!adminCode || !name || !email || !phone || !password || !department) {
    toast.error("Please fill all details");
    return;
  }

  if (!validateAdminCode(adminCode)) {
    toast.error("Admin Code must be like A001");
    return;
  }

  if (!validatePhone(phone)) {
    toast.error("Phone must start from 6-9 & be 10 digits");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emp_id: adminCode,
        emp_name: name,
        email: email,
        phone: phone,
        password: password,
        department: department,
        role: "ADMIN",
        manager_id: "SA001"   // keep static or change if dynamic
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to register admin");
    }

    // ✅ Add admin after successful API call
    fetchAdmins();


    toast.success("Admin added successfully ✅");

    setIsAddOpen(false);

    setNewAdmin({
      adminCode: "",
      name: "",
      email: "",
      phone: "",
      password: "",
      department: "",
      status: "ACTIVE",
      
    });

  } catch (error) {
    console.error(error);
    toast.error(error.message || "Something went wrong");
  }
};


useEffect(() => {
  fetchAdmins();
}, []);

const fetchAdmins = async () => {
  try {
    const response = await fetch("http://localhost:8080/emp/SA001");
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch admins");
    }

    console.log("API RESPONSE:", data); // 🔥 keep this to check structure

    // 🔥 Handle all possible backend formats
    let adminArray = [];

    if (Array.isArray(data)) {
      adminArray = data;
    } else if (Array.isArray(data.employees)) {
      adminArray = data.employees;
    } else if (Array.isArray(data.subordinates)) {
      adminArray = data.subordinates;
    } else if (data.emp_id) {
      adminArray = [data];
    }

    const formattedData = adminArray.map((emp) => ({
      adminCode: emp.emp_id || "",
      name: emp.emp_name || "",
      email: emp.email || "",
      phone: emp.phone || "",
      status: emp.status || "ACTIVE",
    }));

    setAdmins(formattedData);

  } catch (error) {
    console.error(error);
    toast.error("Failed to load admins");
  }
};




 const filteredAdmins = admins.filter((admin) =>
  (admin.name || "").toLowerCase().includes((search || "").toLowerCase())
);


  return (
    <div className="min-h-screen bg-white p-6">
      <Toaster position="top-right" />

      {/* 🔥 HEADER SECTION */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Admin Report</h1>
        <p className="text-sm text-emerald-600 mt-1">Admin</p>
      </div>

      {/* 🔥 SEARCH + ADD BUTTON */}
      <div className="flex justify-between items-center mb-4 bg-white border border-gray-200 p-4 rounded-lg">
        <div className="relative w-1/4">
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

        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-emerald-500 text-white px-5 py-2 rounded-lg"
        >
          + Add Admin
        </button>
      </div>


      {/* 🔥 TABLE */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-sm">Admin Code</th>
              <th className="px-4 py-3 text-sm">Admin Name</th>
              <th className="px-4 py-3 text-sm">Email</th>
              <th className="px-4 py-3 text-sm">Phone</th>
              <th className="px-4 py-3 text-sm">Status</th>
            
              <th className="px-4 py-3 text-sm">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredAdmins.map((admin, index) => (
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
                onClick={() => {
                setAdmins(admins.filter((a) => a.adminCode !== admin.adminCode));
                toast.success("Admin deleted successfully ✅");
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


{/* 🔥 ADD ADMIN POPUP */}
{isAddOpen && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    <div className="bg-white w-200 max-w-4xl rounded-2xl border border-gray-200 shadow-md p-6 sm:p-8 relative">

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
            <option value="Head">HEAD</option>
            <option value="IT">IT</option>
            <option value="Sales">SALES</option>
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


      {/* 🔥 EDIT POPUP */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center ">
          <div className="bg-white w-full max-w-lg rounded-xl p-6 relative">
            <button
              onClick={() => setIsEditOpen(false)}
              className="absolute top-3 right-3"
            >
              <X />
            </button>

            <h2 className="text-lg font-semibold mb-4">Edit Admin</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
              <label className="block mb-1 text-sm ">
            Admin Code *
          </label>
              <input name="adminCode" value={editAdmin.adminCode} disabled className="border border-gray-200 p-2 rounded bg-gray-100" />
              </div>
               <div>
              <label className="block mb-1 text-sm ">
            Admin Name *
          </label>
              <input name="name" value={editAdmin.name} onChange={handleEditChange} className="border border-gray-200 p-2 rounded " />
              </div>
               <div>
              <label className="block mb-1 text-sm ">
            Email *
          </label>
              <input name="email" value={editAdmin.email} onChange={handleEditChange} className="border border-gray-200 p-2 rounded" />
              </div>
               <div>
              <label className="block mb-1 text-sm ">
            Contact *
          </label>
              <input name="phone" value={editAdmin.phone} onChange={handleEditChange} className="border border-gray-200 p-2 rounded" />
              </div>
               <div>
              <label className="block mb-1 text-sm ">
           Status *
          </label>
              <select name="status" value={editAdmin.status} onChange={handleEditChange} className="border border-gray-200 p-2 rounded">
                <option>ACTIVE</option>
                <option>INACTIVE</option>
                <option>SUSPENDED</option>
              </select>
              </div>
              <div>
              <label className="block mb-1 text-sm ">
            Role *
          </label>
              <input type="text" name="role" value="ADMIN" disabled className="border border-gray-200 p-2 rounded bg-gray-100" />
              </div>
            </div>

            <button
              onClick={handleUpdate}
              className="mt-5 w-full bg-emerald-500 text-white py-2 rounded-lg"
            >
              Update Admin
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;
