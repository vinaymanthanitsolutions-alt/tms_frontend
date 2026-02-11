import React from "react";

const AdminTeam = () => {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Employee Management List</h1>
      <p className="text-sm text-emerald-600">Team</p>

      <div className="flex border-2 rounded-md border-gray-200 justify-between px-3 py-4 my-3">
        <div className="border-2 border-gray-200 rounded-md w-fit"> <Search /><input type="text" /></div>
        <div><button>Add Employee</button></div>
      </div>
    </div>
  );
};

export default AdminTeam;
