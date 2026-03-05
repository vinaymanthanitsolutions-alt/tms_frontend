import { useState, useEffect, useRef } from "react";
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
 const [teamMembers, setTeamMembers] = useState([]);
const [loadingTeam, setLoadingTeam] = useState(false);

const modalRef = useRef(null);

 



  const itemsPerPage = 5;
  

const fetchTasks = async () => {
  try {
    const response = await fetch(
      `http://localhost:8080/tasks/getAll`

    );

    const result = await response.json();

    console.log("FULL RESPONSE:", result);

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    // ✅ Correct array path
    const apiTasks = result?.data || [];

    const formattedTasks = apiTasks.map((task) => ({
      projectId: task.project_id || "",
      teamId: task.team_id || "",
      teamLeader: task.team_leader_name || "",
      managerId: task.created_by_id || "",
      task: task.task_title || "",
      status: task.status || "",
    }));

    setTasks(formattedTasks);
  } catch (error) {
    console.error("Fetch Error:", error);
  }
};


  useEffect(() => {
    fetchTasks();
  }, [currentPage, searchTerm]);




 const fetchTeamMembers = async (teamId, role) => {
  try {
    setLoadingTeam(true);

    const response = await fetch(
      `http://localhost:8080/team/members-subtasks?team_id=${teamId}&role=${role}`
    );

    const result = await response.json();

    console.log("TEAM API RESPONSE:", result);

    if (!response.ok) {
      throw new Error("Failed to fetch team members");
    }

    // ✅ Correct path
    setTeamMembers(result?.data?.members || []);
  } catch (error) {
    console.error("Team Fetch Error:", error);
  } finally {
    setLoadingTeam(false);
  }
};


 
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



  const handleView = (task) => {
  setSelectedTask(task);
  setSelectedTeamType("");
  setShowModal(true);
};

useEffect(() => {
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  if (showModal) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [showModal]);


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
              <th className="p-4">Status</th>
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

              

                <td className="p-4">{task.managerId}</td>
                <td className="p-4">{task.task}</td>

                 {/* {/* <td className="px-2 py-2 text-lg">
              <div className="px-2 py-0.5 bg-blue-100 text-sm mx-auto rounded-2xl w-20 text-center text-blue-500">
                {task.department}
           </div> 
               </td> */}


                <td className="p-2">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            task.status === "COMPLETED"
              ? "bg-green-100 text-green-700"
              : task.status === "IN_PROGRESS"
              ? "bg-yellow-100 text-yellow-700"
              
              : "bg-purple-100 text-purple-700"
          }`}
        >
          {task.status}
        </span>
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
    <div
  ref={modalRef}
  className="bg-white w-[700px] rounded-xl shadow-lg p-6 relative max-h-[80vh] overflow-y-auto"
>


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
  fetchTeamMembers(selectedTask.teamId, "Developer");
}}

        >
          Developer
        </div>

        <div
          className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm "
          onClick={() => {
  setSelectedTeamType("tester");
  setShowTeamDropdown(false);
  fetchTeamMembers(selectedTask.teamId, "Tester");
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
             {teamMembers.map((member, index) =>
  member.sub_tasks?.map((sub, i) => (
    <tr key={`${index}-${i}`} className="border border-gray-200">
      <td className="p-2">{member.emp_id}</td>
      <td className="p-2">{member.emp_name}</td>
      <td className="p-2">{sub.title}</td>
      <td className="p-2">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            sub.status === "COMPLETED"
              ? "bg-green-100 text-green-700"
              : sub.status === "TEST_DONE"
              ? "bg-yellow-100 text-yellow-700"
              : sub.status === "DEVELOPMENT_DONE"
              ? "bg-purple-100 text-purple-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {sub.status}
        </span>
      </td>
    </tr>
  ))
)}

                
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
             {teamMembers.map((member, index) => (
  <tr key={index} className="border border-gray-200">
    <td className="p-2">{member.emp_id}</td>
    <td className="p-2">{member.emp_name}</td>
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
      <div className="flex justify-self-end items-center gap-2 mt-6">
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
