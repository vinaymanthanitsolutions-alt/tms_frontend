import React, { useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import { Search } from "lucide-react";


const initialAdmins = [
  {
    adminCode: "A001",
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "9876543210",
    status: "Active",
    total: 25,
  },
  {
    adminCode: "A002",
    name: "Neha Singh",
    email: "neha@gmail.com",
    phone: "9123456780",
    status: "Inactive",
    total: 10,
  },
];

const Report = () => {
  const [admins, setAdmins] = useState(initialAdmins);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editAdmin, setEditAdmin] = useState(null);
  const [search, setSearch] = useState("");

  const [newAdmin, setNewAdmin] = useState({
    adminCode: "",
    name: "",
    email: "",
    phone: "",
    status: "Active",
    total: "",
  });

  const openEditModal = (admin) => {
    setEditAdmin({ ...admin });
    setIsEditOpen(true);
  };

  const handleEditChange = (e) => {
    setEditAdmin({
      ...editAdmin,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    setAdmins((prev) =>
      prev.map((a) =>
        a.adminCode === editAdmin.adminCode ? editAdmin : a
      )
    );
    setIsEditOpen(false);
  };

  const handleAddChange = (e) => {
    setNewAdmin({
      ...newAdmin,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddAdmin = () => {
    setAdmins([...admins, newAdmin]);
    setIsAddOpen(false);
    setNewAdmin({
      adminCode: "",
      name: "",
      email: "",
      phone: "",
      status: "Active",
      total: "",
    });
  };

  const filteredAdmins = admins.filter((admin) =>
    admin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white p-6">

      {/* 🔥 HEADER SECTION */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Admin Report</h1>
        <p className="text-sm text-emerald-600 mt-1">Admin</p>
      </div>

      {/* 🔥 SEARCH + ADD BUTTON */}
<div className="flex justify-between items-center mb-4 bg-white border border-gray-200 p-4 rounded-lg">
  
  {/* 🔍 SEARCH WITH ICON */}
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
      className="border border-gray-200 pl-10 pr-3 py-2 rounded w-full focus:outline-none  "
    />
  </div>

  {/* ADD BUTTON (unchanged) */}
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
              <th className="px-4 py-3 text-sm">Total</th>
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
                      admin.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {admin.status}
                  </span>
                </td>
                <td className="px-4 py-3">{admin.total}</td>

                <td className="px-4 py-3 flex justify-center gap-3">
                  <button
                    onClick={() => openEditModal(admin)}
                    className="text-gray-500 p-2"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => alert("Delete dummy")}
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
          <label className="block mb-1 text-sm text-gray-600">
            Admin Code
          </label>
          <input
            type="text"
            name="AdminCode"
            placeholder="A001"
            value={newAdmin.AdminCode}
            onChange={handleAddChange}
            className="w-full h-11 px-3 border border-gray-300 rounded-lg  outline-none"
            required
          />
        
        </div>

        {/* Name */}
        <div>
          <label className="block mb-1 text-sm text-gray-600">
            Admin Name
          </label>
          <input
            type="text"
            name="Name"
            placeholder="Admin Name"
            value={newAdmin.Name}
            onChange={handleAddChange}
            className="w-full h-11 px-3 border border-gray-300 rounded-lg  outline-none"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-sm text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="Email"
            placeholder="admin@gmail.com"
            value={newAdmin.Email}
            onChange={handleAddChange}
            className="w-full h-11 px-3 border border-gray-300 rounded-lg  outline-none"
            required
          />
        </div>

        {/* Contact */}
        <div>
          <label className="block mb-1 text-sm text-gray-600">
            Contact
          </label>
          <input
            type="text"
            name="Contact"
            placeholder="0123456789"
            value={newAdmin.Contact}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 10) {
                handleAddChange({
                  target: { name: "Contact", value },
                });
              }
            }}
            className="w-full h-11 px-3 border border-gray-300 rounded-lg  outline-none"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 text-sm text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="Password"
            placeholder="Password"
            value={newAdmin.Password}
            onChange={handleAddChange}
            className="w-full h-11 px-3 border border-gray-300 rounded-lg  outline-none"
            required
          />
          <p className="text-xs text-gray-400 mt-1">
            Min 8 chars, 1 capital, 1 number, 1 special symbol
          </p>
        </div>

        {/* Department */}
        <div>
          <label className="block mb-1 text-sm text-gray-600">
            Department
          </label>
          <select
            name="Department"
            value={newAdmin.Department}
            onChange={handleAddChange}
            className="w-full h-11 px-3 border border-gray-300 rounded-lg  outline-none"
            required
          >
            <option value="">Select Department</option>
            <option value="Head">Head</option>
            <option value="IT">IT</option>
            <option value="Sales">Sales</option>
          </select>
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
              <input name="adminCode" value={editAdmin.adminCode} disabled className="border border-gray-200 p-2 rounded bg-gray-100" />
              <input name="name" value={editAdmin.name} onChange={handleEditChange} className="border border-gray-200 p-2 rounded " />
              <input name="email" value={editAdmin.email} onChange={handleEditChange} className="border border-gray-200 p-2 rounded" />
              <input name="phone" value={editAdmin.phone} onChange={handleEditChange} className="border border-gray-200 p-2 rounded" />
              <select name="status" value={editAdmin.status} onChange={handleEditChange} className="border border-gray-200 p-2 rounded">
                <option>Active</option>
                <option>Inactive</option>
                <option>Suspended</option>
              </select>
              <input name="total" value={editAdmin.total} onChange={handleEditChange} className="border border-gray-200 p-2 rounded" />
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
