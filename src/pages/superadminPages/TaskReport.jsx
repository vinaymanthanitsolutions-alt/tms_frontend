import { useState,useEffect } from "react";
import { Search , Eye ,  X} from "lucide-react";



const TaskReport = () => {
   
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRole, setSelectedRole] = useState({});
  const [showModal, setShowModal] = useState(false);
const [selectedTask, setSelectedTask] = useState(null);
const [selectedTeamType, setSelectedTeamType] = useState("");
const [showTeamDropdown, setShowTeamDropdown] = useState(false);
 const [tasks, setTasks] = useState([]); 
 



  const itemsPerPage = 5;
  const projectId = "PR030";

const fetchTasks = async () => {
  try {
    const response = await fetch(
      `http://localhost:8080/tasks/project/?project_id=${projectId}&page=${currentPage}&search=${searchTerm}&limit=20`

    );

    const result = await response.json();

    console.log("FULL RESPONSE:", result);

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    // ✅ Correct array path
    const apiTasks = result?.data?.data || [];

    const formattedTasks = apiTasks.map((task) => ({
      projectId: task.project_id || "",
      teamId: task.teamID || "",
      teamLeader: task.teamLeaderName || "",
      managerId: task.createdBy || "",
      task: task.title || "",
      department: task.department || "",
    }));

    setTasks(formattedTasks);
  } catch (error) {
    console.error("Fetch Error:", error);
  }
};


  useEffect(() => {
    fetchTasks();
  }, [currentPage, searchTerm]);


  // const [tasks] = useState([
  //   {
  //     projectId: "PRJ-001",
  //     teamId: "TM001",
  //     teamLeader: "Rahul Sharma",
  //     managerId: "PM001",
  //     task: "Login Module UI",
  //     department: "IT",
  //      developer: [
  //   { id: "D01", name: "Aman", subtask: "Login UI", status: "COMPLETED" },
  //   { id: "D02", name: "naman", subtask: "logout UI", status: "PENDING" },
  //   { id: "D03", name: "Kunal", subtask: "Dashboard", status: "IN PROGRESS" }
  // ],
  // tester: [
  //   { id: "T01", name: "Priya" },
  //   { id: "T02", name: "Riya" }
  // ]
  //   },
  //   {
  //     projectId: "PRJ-002",
  //     teamId: "TM002",
  //     teamLeader: "Neha Verma",
  //     managerId: "PM002",
  //     task: "API Development",
  //     department: "IT",
  //       developer: [
  //   { id: "D01", name: "ujjawal", subtask: "Login UI", status: "IN PROGRESS" },
  //    { id: "D02", name: "raman", subtask: "reset password UI", status: "COMPLETED" },
  //   { id: "D03", name: "Kumar", subtask: "Dashboard", status: "PENDING" }
  // ],
  // tester: [
  //   { id: "T01", name: "Priya" },
  //   { id: "T02", name: "Riya" }
  // ]
  //   },

  //    {
  //     projectId: "PRJ-001",
  //     teamId: "TM003",
  //     teamLeader: "vanshika Sharma",
  //     managerId: "PM001",
  //     task: "Dashboard Module UI",
  //     department: "IT",
  //       developer: [
  //   { id: "D01", name: "Manisha", subtask: "Report", status: "IN PROGRESS" },
  //    { id: "D02", name: "rama", subtask: "Task", status: "COMPLETED" },
  //   { id: "D03", name: "Krishna", subtask: "Dashboard", status: " IN PROGRESS" }
  // ],
  // tester: [
  //   { id: "T01", name: "Priyanka" },
  //   { id: "T02", name: "Riyansh" }
  // ]
  //   },
  //    {
  //     projectId: "PRJ-002",
  //     teamId: "TM002",
  //     teamLeader: "Neha Verma",
  //     managerId: "PM002",
  //     task: "API Development",
  //     department: "IT",
  //       developer: [
  //   { id: "D01", name: "ujjawal", subtask: "Login UI", status: "IN PROGRESS" },
  //    { id: "D02", name: "raman", subtask: "reset password UI", status: "COMPLETED" },
  //   { id: "D03", name: "Kumar", subtask: "Dashboard", status: "PENDING" }
  // ],
  // tester: [
  //   { id: "T01", name: "Priya" },
  //   { id: "T02", name: "Riya" }
  // ]
  //   },
  //    {
  //     projectId: "PRJ-002",
  //     teamId: "TM002",
  //     teamLeader: "Neha Verma",
  //     managerId: "PM002",
  //     task: "API Development",
  //     department: "IT",
  //       developer: [
  //   { id: "D01", name: "ujjawal", subtask: "Login UI", status: "IN PROGRESS" },
  //    { id: "D02", name: "raman", subtask: "reset password UI", status: "COMPLETED" },
  //   { id: "D03", name: "Kumar", subtask: "Dashboard", status: "PENDING" }
  // ],
  // tester: [
  //   { id: "T01", name: "Priya" },
  //   { id: "T02", name: "Riya" }
  // ]
  //   },
  //    {
  //     projectId: "PRJ-002",
  //     teamId: "TM002",
  //     teamLeader: "Neha Verma",
  //     managerId: "PM002",
  //     task: "API Development",
  //     department: "IT",
  //       developer: [
  //   { id: "D01", name: "ujjawal", subtask: "Login UI", status: "IN PROGRESS" },
  //    { id: "D02", name: "raman", subtask: "reset password UI", status: "COMPLETED" },
  //   { id: "D03", name: "Kumar", subtask: "Dashboard", status: "PENDING" }
  // ],
  // tester: [
  //   { id: "T01", name: "Priya" },
  //   { id: "T02", name: "Riya" }
  // ]
  //   },
  // ]);


  
  // Filter Logic
  const filteredTasks = tasks.filter((task) => {
  const search = searchTerm?.toLowerCase() || "";

  return (
    (task.teamId || "").toLowerCase().includes(search) ||
    (task.projectId || "").toLowerCase().includes(search)
  );
});







  // Pagination Logic
const totalPages = Math.max(
  1,
  Math.ceil(filteredTasks.length / itemsPerPage)
);

const indexOfLast = currentPage * itemsPerPage;
const indexOfFirst = indexOfLast - itemsPerPage;
const currentTasks = filteredTasks.slice(indexOfFirst, indexOfLast);


useEffect(() => {
  if (currentPage > totalPages) {
    setCurrentPage(1);
  }
}, [filteredTasks, totalPages, currentPage]);



   // ✅ Auto reset page if filter reduces data
   
  

  const handleView = (task) => {
  setSelectedTask(task);
  setSelectedTeamType("");
  setShowModal(true);
};


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold">Task Report</h2>
      <h2 className="text-sm text-gray-500 mb-6">
        Task assign to team leader
      </h2>

      {/* Search */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 bg-white border border-gray-200 p-4 rounded-lg">
        <div className="relative w-full sm:w-1/3 lg:w-1/3">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by Team ID or Project ID..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-200 pl-10 pr-3 py-2 rounded w-full focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase text-center">
            <tr>
              <th className="p-4">Team ID</th>
              <th className="p-4">Project ID</th>
              <th className="p-4">Team Leader</th>
              {/* <th className="p-4">Team</th> */}
              {/* <th className="p-4">Member Name</th> */}
              <th className="p-4">Manager ID</th>
              <th className="p-4">Task</th>
              <th className="p-4">Department</th>
               <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentTasks.map((task, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition border-gray-200  text-center"
              >
                <td className="p-4">{task.teamId}</td>
                <td className="p-4 font-medium">{task.projectId}</td>
                <td className="p-4 font-medium">{task.teamLeader}</td>

                {/* Team Select
                <td className="p-4">
                  <select
                    className="border border-gray-300 rounded px-2 py-1 text-xs"
                    value={selectedRole[index] || ""}
                    onChange={(e) =>
                      setSelectedRole({
                        ...selectedRole,
                        [index]: e.target.value,
                      })
                    }
                  >
                    <option value="">Select</option>
                    <option value="developer">Developer</option>
                    <option value="tester">Tester</option>
                  </select>
                </td> */}

                {/* Member Display
                <td className="p-4 text-sm text-gray-700">
                  {selectedRole[index]
                    ? task[selectedRole[index]].join(", ")
                    : "-"}
                </td> */}

                <td className="p-4">{task.managerId}</td>
                <td className="p-4">{task.task}</td>

                 <td className="px-2 py-2 text-lg">
              <div className="px-2 py-0.5 bg-blue-100 text-sm mx-auto rounded-2xl w-20 text-center text-blue-500">
                {task.department}
           </div>
               </td>
                {/* <td className="p-4 ">{task.department}</td> */}
                   <td className="p-4">
                   <button
                onClick={() => handleView(task)}
               className="p-2 rounded hover:bg-gray-100"
                >
               <Eye size={18} className="text-blue-600" />
             </button>
        </td>

 

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    {showModal && selectedTask && (
  <div className="fixed inset-0 bg-black/40 bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white w-[700px] rounded-xl shadow-lg p-6 relative max-h-[80vh] overflow-y-auto">


      {/* Close Button */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-black"
      >
        <X size={18} />
      </button>
         <div className="w-auto  ">
      <h2 className="text-xl font-semibold mb-6   ">
        Team Detail's
      </h2>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-2 gap-8 mb-6 ">

        {/* Team Leader Name */}
        <div>
          <label className="block text-sm font-medium mb-1 ">
            Team Leader Name *
          </label>
          <input
            type="text"
            value={selectedTask.teamLeader}
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-100 outline-gray-300"
          />
        </div>

        {/* Team ID */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Team ID *
          </label>
          <input
            type="text"
            value={selectedTask.teamId}
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-100 outline-gray-300"
          />
        </div>

        {/* Task*/}
        <div>
          <label className="block text-sm font-medium mb-1">
            Task *
          </label>
          <input
            type="text"
            value={selectedTask.task}
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-100 outline-gray-300"
          />
        </div>

        {/* Manager ID */}
        <div>
          <label className="block text-sm font-medium mb-1">
           Manager Id *
          </label>
          <input
            type="text"
            value={selectedTask.managerId}
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-100 outline-gray-300"
          />
        </div>

      </div>

      {/* Team Dropdown */}
<div className="mb-6">
  <label className="block text-sm font-medium mb-2 ">
    Team
  </label>

  <div className="relative">
    <button
      type="button"
      onClick={() => setShowTeamDropdown(!showTeamDropdown)}
      className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-left bg-white "
    >
      {selectedTeamType
        ? selectedTeamType.charAt(0).toUpperCase() + selectedTeamType.slice(1)
        : "Select Team"}
    </button>

    {showTeamDropdown && (
      <div className="mt-2 border border-gray-200 rounded bg-white shadow">
        <div
          className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
          onClick={() => {
            setSelectedTeamType("developer");
            setShowTeamDropdown(false);
          }}
        >
          Developer
        </div>

        <div
          className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm "
          onClick={() => {
            setSelectedTeamType("tester");
            setShowTeamDropdown(false);
          }}
        >
          Tester
        </div>
      </div>
    )}
  </div>
</div>


        {/* Developer Table */}
      {selectedTeamType === "developer" && (
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">
            Developer Details
          </h3>

          <table className="w-full text-sm border border-gray-200 text-center">
            <thead className="bg-gray-100 text-gray-600  ">
              <tr>
                <th className="p-2 ">ID</th>
                <th className="p-2 ">Name</th>
                <th className="p-2 ">Sub Task</th>
                <th className="p-2 ">Status</th>
              </tr>
            </thead>
            <tbody>
              {selectedTask.developer.map((dev, index) => (
                <tr key={index} className="border border-gray-200">
                  <td className="p-2">{dev.id}</td>
                  <td className="p-2">{dev.name}</td>
                  <td className="p-2">{dev.subtask}</td>
                  <td className="px-4 py-3">
                  <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                 dev.status === "COMPLETED"
                ? "bg-green-100 text-green-700"
                 : dev.status === "IN PROGRESS"
                ? "bg-yellow-100 text-yellow-700"
               : "bg-red-100 text-red-700"
                    }`}
                  >

                    {dev.status}
                  </span>
                </td>

                  {/* <td className="p-2">{dev.status}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

       {/* Tester Table */}
      {selectedTeamType === "tester" && (
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">
            Tester Details
          </h3>

          <table className="w-full text-sm border border-gray-200">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-2 text-left">ID</th>
                <th className="p-2 text-left">Name</th>
              </tr>
            </thead>
            <tbody>
              {selectedTask.tester.map((test, index) => (
                <tr key={index} className="border border-gray-200">
                  <td className="p-2">{test.id}</td>
                  <td className="p-2">{test.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  </div>
)}



      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-emerald-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, totalPages)
            )
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskReport;
