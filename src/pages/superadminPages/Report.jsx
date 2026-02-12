import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const admins = [
  {
    adminCode: "ADM001",
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "9876543210",
    status: "Active",
    total: 25,
   
  },
  {
    adminCode: "ADM002",
    name: "Neha Singh",
    email: "neha@gmail.com",
    phone: "9123456780",
    status: "Inactive",
    total: 10,
   
  },
  {
    adminCode: "ADM003",
    name: "Vikas Verma",
    email: "vikas@gmail.com",
    phone: "9988776655",
    status: "Active",
    total: 18,
    
  },
];

const Report = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Admin Report
      </h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-200 text-black">
            <tr>
              <th className="px-4 py-3 text-sm ">Admin Code</th>
              <th className="px-4 py-3 text-sm ">Admin Name</th>
              <th className="px-4 py-3 text-sm">Email</th>
              <th className="px-4 py-3  text-sm">Phone</th>
              <th className="px-4 py-3  text-sm">Status</th>
              <th className="px-4 py-3   text-sm">Total</th>
              <th className="px-4 py-3   text-sm">Action</th>
            </tr>
          </thead>

          <tbody>
            {admins.map((admin, index) => (
              <tr
                key={index}
                className="text-center border-b hover:bg-gray-50"
              >
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
    onClick={() => alert(`Edit ${admin.adminCode}`)}
    className="  text-gray-500 p-2 rounded"
    title="Edit"
  >
    <Pencil size={16} />
  </button>

  <button
    onClick={() =>
      alert(`Delete ${admin.adminCode} (dummy action)`)
    }
    className=" text-gray-500 p-2 rounded"
    title="Delete"
  >
    <Trash2 size={16} />
  </button>


                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
