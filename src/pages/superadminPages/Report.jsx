import React, { useState } from "react";
import { Search, Plus, X } from "lucide-react";

const Report = () => {

  // ✅ UPDATED DUMMY DATA (Hierarchy Structured Properly)
 const dummyAdmins = [
  {
    adminCode: "ADM001",
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    status: "COMPLETED",
    totalEmployee: 30 ,
   InMonth: 5,
    employee: [
      {
        projectManager: "Amit Verma",
        teamLeaders: [
          {
            name: "Rohit Singh",
            developers: ["Priya", "Karan"],
            testers: ["Sneha", "Tina", "Rashmi"],
          },
          {
            name: "Mohit Kapoor",
            developers: ["Riya", "Sahil", "Tarun"],
            testers: ["Nisha", "Garima"],
          },
        ],
      },
      {
        projectManager: "Vikas Mehta",
        teamLeaders: [
          {
            name: "Ankit Sharma",
            developers: ["Deepak", "Simran"],
            testers: ["Pooja", "Arjun", "Lalit"],
          },
          {
            name: "Kavita Kapoor",
            developers: ["Ayra", "Sohit" ],
            testers: ["Nishita", "Heena"],
          },
        ],
      },
      {
        projectManager: "Rajat Malhotra",
        teamLeaders: [
          {
            name: "Sandeep Rawat",
            developers: ["Rohini", "Anuj"],
            testers: ["Bhavna", "Isha"],
          },
        ],
      },
    ],
  },
  {
    adminCode: "ADM002",
    name: "Neha Singh",
    email: "neha@gmail.com",
    status: "PENDING",
     totalEmployee: 32 ,
    InMonth: 3,
    employee: [
      {
        projectManager: "Suresh Patel",
        teamLeaders: [
          {
            name: "Kunal Verma",
            developers: ["Aman", "Rohit"],
            testers: ["Ritu", "Aarti"],
          },
          {
            name: "Kuntal Singh",
            developers: ["Kamiyar", "Sohil", "Meenu"],
            testers: ["Ritika", "Saloni"],
          },
        ],
      },
      {
        projectManager: "Pankaj Yadav",
        teamLeaders: [
          {
            name: "Divya Sharma",
            developers: ["Varun", "Nikita"],
            testers: ["Sana", "Komal"],
          },
          {
            name: "Rajeev Kumar",
            developers: ["Harsh", "Anmol"],
            testers: ["Preeti", "Kirti"],
          },
        ],
      },
      {
        projectManager: "Anurag Sinha",
        teamLeaders: [
          {
            name: "Prakash Joshi",
            developers: ["Dev",  "Ravi"],
            testers: ["Mitali", "Sonam"],
          },
        ],
      },
    ],
  },
];



  const [admins] = useState(dummyAdmins);
  const [search, setSearch] = useState("");

  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [selectedPM, setSelectedPM] = useState("");
  const [selectedTL, setSelectedTL] = useState("");

  const filteredAdmins = admins.filter((admin) =>
    admin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">

  <h1 className="text-2xl font-bold mb-6">Admin Report</h1>

  {/* SEARCH */}
  <div className="relative w-full sm:w-1/3 mb-4">
    <Search
      size={18}
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
    />
    <input
      type="text"
      placeholder="Search Admin..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border border-gray-300 pl-10 pr-3 py-2 rounded w-full"
    />
  </div>

  {/* TABLE */}
  <div className="w-full overflow-x-auto bg-white rounded-lg shadow">
    <table className="min-w-[700px] border border-gray-200 w-full">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-3 text-sm">Admin Code</th>
          <th className="px-4 py-3 text-sm">Admin Name</th>
          
          <th className="px-4 py-3 text-sm">Status</th>
          <th className="px-4 py-3 text-sm">Total Employee</th>
          <th className="px-4 py-3 text-sm">Monthly Projects</th>
          <th className="px-4 py-3 text-sm">Project Manager</th>
        </tr>
      </thead>

      <tbody>
        {filteredAdmins.map((admin, index) => (
          <tr
            key={index}
            className="text-center border-b border-gray-200 hover:bg-gray-50"
          >
            <td className="px-4 py-3">{admin.adminCode}
            </td>
            <td className="px-2 py-2 text-left">
  <div className="flex flex-col gap-1">
    <span className="font-semibold">{admin.name}</span>
    <span className="text-gray-500 text-sm">{admin.email}</span>
  </div>
</td>

            
            <td className="px-4 py-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  admin.status === "COMPLETED"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {admin.status}
              </span>
            </td>
            <td className="px-4 py-3">{admin.totalEmployee}</td>
            <td className="px-4 py-3">{admin.InMonth}</td>

            <td className="px-4 py-3">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                <span>
                  Project Manager ({admin.employee.length})
                </span>

                <button
                  onClick={() => {
                    setSelectedAdmin(admin);
                    setSelectedPM("");
                    setSelectedTL("");
                  }}
                  className="bg-emerald-500 text-white p-1 rounded"
                >
                  <Plus size={14} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* POPUP MODAL */}
  {selectedAdmin && (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50 overflow-y-auto">
      <div className="bg-white w-full max-w-lg sm:max-w-2xl rounded-xl p-4 sm:p-6 relative">

        <button
          onClick={() => {
            setSelectedAdmin(null);
            setSelectedPM("");
            setSelectedTL("");
          }}
          className="absolute top-3 right-3"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-bold mb-4">View Detail</h2>

        {/* PROJECT MANAGER */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">Project Manager</label>
          <select
            className="w-full border p-2 rounded"
            value={selectedPM}
            onChange={(e) => {
              setSelectedPM(e.target.value);
              setSelectedTL("");   // reset TL
            }}
          >
            <option value="">Select Project Manager</option>
            {selectedAdmin.employee.map((pm, index) => (
              <option key={index} value={pm.projectManager}>
                {pm.projectManager}
              </option>
            ))}
          </select>
        </div>

        {/* TEAM LEADER */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">Team Leader</label>
          <select
            className="w-full border p-2 rounded"
            value={selectedTL}
            disabled={!selectedPM}
            onChange={(e) => setSelectedTL(e.target.value)}
          >
            <option value="">Select Team Leader</option>
            {selectedPM &&
              selectedAdmin.employee
                .find((pm) => pm.projectManager === selectedPM)
                ?.teamLeaders.map((tl, index) => (
                  <option key={index} value={tl.name}>
                    {tl.name}
                  </option>
                ))}
          </select>
        </div>

        {/* DEVELOPER FIELD */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">Developer</label>
          <div className="w-full border p-2 rounded bg-gray-100 min-h-[40px]">
            {selectedTL
              ? selectedAdmin.employee
                  .find((pm) => pm.projectManager === selectedPM)
                  ?.teamLeaders.find((tl) => tl.name === selectedTL)
                  ?.developers.join(", ")
              : "Select Team Leader first"}
          </div>
        </div>

        {/* TESTER FIELD */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">Tester</label>
          <div className="w-full border p-2 rounded bg-gray-100 min-h-[40px]">
            {selectedTL
              ? selectedAdmin.employee
                  .find((pm) => pm.projectManager === selectedPM)
                  ?.teamLeaders.find((tl) => tl.name === selectedTL)
                  ?.testers.join(", ")
              : "Select Team Leader first"}
          </div>
        </div>

      </div>
    </div>
  )}
</div>

  );
};

export default Report;
