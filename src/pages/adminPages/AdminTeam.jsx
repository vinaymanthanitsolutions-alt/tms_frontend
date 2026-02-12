import React, { useRef } from "react";
import { Search, Plus, Edit, Trash2 } from "lucide-react";

const AdminTeam = ({ setIsOpenAdminRegister }) => {
  const [openRegister, setOpenRegister] = React.useState(false);
  const inputRef = useRef(null);

  const handleSearchClick = () => {
    inputRef.current?.focus();
  };

  return (
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
            placeholder="Search employees..."
            className="outline-none text-sm flex-1"
          />
        </div>
        <div>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-md font-light hover:bg-emerald-700 transition flex gap-1 items-center" onClick={()=>{setIsOpenAdminRegister(true)}}>
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
            <tr>
              <td className="border-b border-gray-300 px-4 py-3">EMP001</td>
              <td className="border-b border-gray-300 px-4 py-3">
                <div>
                  <div className="font-medium">John Doe</div>
                  <div className="text-sm text-gray-500">
                    john.doe@example.com
                  </div>
                </div>
              </td>
              <td className="border-b border-gray-300 px-4 py-3">
                +1234567890
              </td>
              <td className="border-b border-gray-300 px-4 py-3">
                Engineering
              </td>
              <td className="border-b border-gray-300 px-4 py-3">
                Senior Developer
              </td>
              <td className="border-b border-gray-300 px-4 py-3">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  Active
                </span>
              </td>
              <td className="border-b border-gray-300 px-4 py-3">
                <div className="flex gap-2">
                  <button className=" text-black border border-gray-300 p-2 rounded hover:text-gray-500 transition">
                    <Edit size={16} />
                  </button>
                  <button className="bg-red-300 text-red-700 border border-red-700 p-2 rounded transition">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTeam;
