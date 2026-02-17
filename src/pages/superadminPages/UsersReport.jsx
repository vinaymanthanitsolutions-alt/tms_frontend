import React from "react";

const User = () => {
  const users = [
    {
      emp_id: "A001",
      emp_name: "Ayu Sharma",
      email: "ayu.sharma@example.com",
      phone: "9876543210",
      department: "HEAD",
      role: "Admin",
      manager_id: "SA001",
      status: "ACTIVE",
    },
    {
      emp_id: "PM001",
      emp_name: "Rohit Verma",
      email: "rohit.verma@example.com",
      phone: "9123456780",
      department: "HEAD",
      role: "Project Manager",
      manager_id: "A001",
      status: "INACTIVE",
    },
    {
      emp_id: "D001",
      emp_name: "Neha Singh",
      email: "neha.singh@example.com",
      phone: "9988776655",
      department: "IT",
      role: "Developer",
      manager_id: "TL001",
      status: "SUSPENDED",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold ">Employee's Details</h2>
      <h2 className="text-sm text-gray-500  mb-6">Task assign to team leader</h2>

      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase ">
            <tr>
              <th className="p-4">Emp ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Department</th>
              <th className="p-4">Role</th>
              <th className="p-4">Manager ID</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition border-gray-200 "
              >
                <td className="p-4 font-medium">{user.emp_id}</td>

                {/* Name + Email */}
                <td className="p-4">
                  <div className="font-medium">{user.emp_name}</div>
                  <div className="text-sm  text-gray-500">
                    {user.email}
                  </div>
                </td>

                <td className="p-4">{user.phone}</td>
                <td className="p-4">{user.department}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">{user.manager_id}</td>

                <td className="p-4">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
