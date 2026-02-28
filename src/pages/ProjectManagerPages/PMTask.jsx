import { useState } from "react";
import { Plus, Search, Pencil, Trash2, X } from "lucide-react";
import CreateTask from "./CreateTask";
import { getTasksByProject,updateTask,deleteTask } from "../../services/ManagerServices/taskService";
import toast from "react-hot-toast";
import { Rocket } from "lucide-react";
import { useEffect } from "react";

const PMTask = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [totalTasks, setTotalTasks] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const itemsPerPage = 5;

   const [tasks, setTasks] = useState([]);

    const filteredTasks = tasks.filter((task) => {
        const search = debouncedSearch.toLowerCase();
        return (
            task.teamID.toLowerCase().includes(search) ||
            task.title.toLowerCase().includes(search)
        );
    });

    const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirst, indexOfLast);

const formatStatus = (status) => {
  switch (status) {
    case "IN_PROGRESS":
      return "In Progress";
    case "TODO":
      return "Pending";
    case "COMPLETED":
      return "Completed";
    default:
      return status;
  }
};

const getStatusBadge = (status) => {
  switch (status) {
    case "IN_PROGRESS":
      return "bg-blue-100 text-blue-700 border border-blue-300";
    case "COMPLETED":
      return "bg-green-100 text-green-700 border border-green-300";
    case "TODO":
      return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    default:
      return "bg-gray-100 text-gray-600 border border-gray-300";
  }
};

const formatMySQLDate = (date) => {
  return new Date(date)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
};

 const handleEditTask = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData(e.target);

    const updatedTask = {
      title: formData.get("title"),
      description: formData.get("description"),
      assigned_to: formData.get("assigned_to"),
      deadline: formatMySQLDate(formData.get("deadline")),
      status: formData.get("status"),
    };

    const taskId = selectedTask.id;

    // ✅ Backend Update
    await updateTask(taskId, updatedTask);

    // ✅ FRONTEND LIVE UPDATE
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, ...updatedTask }
          : task
      )
    );

    toast.success("Task updated successfully ✅");

    setShowEditModal(false);
    setSelectedTask(null);

  } catch (error) {
    toast.error("Failed to update task ❌");
  }
};

const handleDeleteTask = async () => {
  if (!selectedTask) return;

  try {
    setIsDeleting(true);

    const taskId = selectedTask.id;

    // ✅ Backend delete
    await deleteTask(taskId);

    // ✅ Instant UI update
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    );

    toast.success("Task deleted successfully 🗑️");

    setShowDeleteModal(false);
    setSelectedTask(null);

  } catch (error) {
    console.error(error);
    toast.error("Failed to delete task ❌");
  } finally {
    setIsDeleting(false);
  }
};

useEffect(() => {
  const fetchTasks = async () => {
    try {
      const projectCode = "PR001"; // ✅ Replace with dynamic project code as needed
      const data = await getTasksByProject(projectCode);
      console.log(data)

    const dummyTasks = Array.from({ length: 18 }, (_, i) => ({
  id: `dummy-${i}`,
  teamID: `TM${110 + i}`,
  title: `UI Enhancement Task ${i + 1}`,
  projectName: "Website Redesign",
  project_id: "PRJ-001",

  // 👇 NEW FIELD
  assigned_to: `TL${100 + i}`,

  teamLeaderName: i % 2 === 0 ? "David V." : "Aman S.",

  status:
    i % 3 === 0
      ? "COMPLETED"
      : i % 3 === 1
      ? "IN_PROGRESS"
      : "TODO",
}));

      // 🔥 Combine real API data + dummy
      const combinedTasks = [...data, ...dummyTasks];

      setTasks(combinedTasks);
      setTotalTasks(combinedTasks.length);

    } catch (error) {
      toast.error("Failed to load tasks ❌");
    }
  };

  fetchTasks();
}, []);

useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedSearch(searchTerm);
  }, 1000); // 1 second delay

  return () => {
    clearTimeout(handler);
  };
}, [searchTerm]);

    return (
        <div className="bg-gray-50 h-[calc(100vh-4.34px)] p-4 sm:p-6 font-geist text-gray-700">

            {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"> */}
                {/* <div className="flex items-center bg-white rounded-lg shadow px-4 py-2 w-full sm:w-72 border border-gray-200">
                    <Search size={20} className="text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search by Team ID or Title"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="outline-none flex-1 ml-2 text-sm bg-transparent"
                    />
                </div> */}

      

                {/* <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center justify-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition w-full sm:w-auto"
                >
                    <Plus size={20} />
                    New Task
                </button>
            </div> */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-6">

  {/* Left Section - Title */}
  <div>
    <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
      Task Management
    </h1>
    <p className="text-sm text-gray-500 mt-1">
      Manage and track project tasks efficiently
    </p>
  </div>

  {/* Right Section */}
  <div className="flex items-center gap-4">

    {/* Search */}
    <div className="flex items-center px-4 py-2.5 bg-white rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all duration-200 w-80">
      <Search size={18} className="text-gray-400 mr-3 " />
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        className="flex-1  text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
      />
    </div>

    {/* Button */}
    <button
      onClick={() => setShowModal(true)}
      className="flex items-center justify-center gap-2 bg-emerald-500 text-white px-5 py-2 rounded-lg hover:bg-emerald-600 transition shadow-sm w-full sm:w-auto"
    >
      <Plus size={18} />
      New Task
    </button>

     {/* <button
      onClick={() => setShowModal(true)}
      className="flex items-center justify-center gap-2 bg-emerald-500 text-white px-5 py-2 rounded-lg hover:bg-emerald-600 transition shadow-sm w-full sm:w-auto"
    ></button> */}

  </div>
</div>

            <div className="mt-6 bg-white rounded-lg shadow">
                <div className="overflow-x-auto">




                    <table className="min-w-full text-sm ">
                        <thead className="bg-gray-100 sticky top-0 z-10 ">
                           <tr className="border-b border-gray-100 text-gray-600">
  <th className="px-6 py-3 text-left font-medium uppercase tracking-wide">
    Project Name
  </th>
  <th className="px-6 py-3 text-left font-medium uppercase tracking-wide">
    Team ID
  </th>
  <th className="px-6 py-3 text-left font-medium uppercase tracking-wide">
    Task Title
  </th>
  <th className="px-6 py-3 text-left font-medium uppercase tracking-wide">
    Assigned To
  </th>
  <th className="px-6 py-3 text-left font-medium uppercase tracking-wide">
    Status
  </th>
  <th className="px-6 py-3 text-center font-medium uppercase tracking-wide">
    Actions
  </th>
</tr>
                        </thead>
                        <tbody>
                            {currentTasks.map((task, index) => (
                                <tr key={task.id} className="border-b border-gray-200">

  {/* Project Name */}
<td className="px-6 py-3">
  <div className="flex items-start gap-3">
    
    {/* Rocket Icon */}
    <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
      <Rocket size={18} />
    </div>

    {/* Project Info */}
    <div className="leading-tight">
      <p className="font-medium text-gray-1000">
        {task.projectName}
      </p>

      <p className="text-[11px] text-gray-400 mt-0.5 tracking-wide">
        ID: {task.project_id}
      </p>
    </div>

  </div>
</td>

  {/* Team ID */}
  <td className="px-6 py-2 text-slate-500">
    #{task.teamID}
  </td>

  {/* Task Title */}
  <td className="px-6 py-2 font-medium">
    {task.title}
  </td>

  {/* Assigned To */}
  {/* Assigned To */}
<td className="px-6 py-2">
  <div className="flex items-center gap-3">
    
    {/* Avatar */}
    <div className="h-9 w-9 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 text-sm font-semibold border border-emerald-100">
      {task.teamLeaderName?.slice(0, 2).toUpperCase()}
    </div>

    {/* Name + ID */}
    <div className="leading-tight">
      <p className="text-sm font-medium text-gray-800">
        {task.teamLeaderName}
      </p>
      <p className="text-xs text-gray-400">
        ID: {task.assigned_to}
      </p>
    </div>

  </div>
</td>

  {/* Status */}
  <td className="px-6 py-2 text-center">
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
        task.status === "COMPLETED"
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : task.status === "IN_PROGRESS"
          ? "bg-blue-50 text-blue-700 border-blue-200"
          : "bg-yellow-50 text-yellow-700 border-yellow-200"
      }`}
    >
      {formatStatus(task.status)}
    </span>
  </td>

  {/* Actions */}
  <td className="px-6 py-3">
  <div className="flex items-center justify-center gap-6">
    
    {/* Edit */}
    <button
      onClick={() => {
        setSelectedTask(task);
        setShowEditModal(true);
      }}
      className="text-gray-400 hover:text-gray-700 transition-colors duration-150"
    >
      <Pencil size={18} strokeWidth={1.8} />
    </button>

    {/* Delete */}
    <button
      onClick={() => {
        setSelectedTask(task);
        setShowDeleteModal(true);
      }}
      className="text-gray-400 hover:text-gray-700 transition-colors duration-150"
    >
      <Trash2 size={18} strokeWidth={1.8} />
    </button>

  </div>
</td>

</tr>
                            ))}
                        </tbody>
                    </table>
                </div>

              <div className="flex justify-center items-center gap-8 mt-6">

  {/* Previous */}
  <button
    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
    disabled={currentPage === 1}
    className={`px-5 py-2 mb-3 text-sm rounded-xl border transition-all duration-150 ${
      currentPage === 1
        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
    }`}
  >
    Previous
  </button>

  {/* Page Info */}
  <span className="text-sm text-gray-800 mb-2">
    Page <span className="font-medium">{currentPage}</span> of{" "}
    <span className="font-medium">{totalPages}</span>
  </span>

  {/* Next */}
  <button
    onClick={() =>
      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
    }
    disabled={currentPage === totalPages}
    className={`px-5 py-2 text-sm mb-3 rounded-xl border transition-all duration-150 ${
      currentPage === totalPages
        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
    }`}
  >
    Next
  </button>

</div>
               
            </div>
               <CreateTask  isOpen={showModal} onClose={() => setShowModal(false)} onAddTask={() => { setShowModal(false); }} />

            {/* Edit Modal */}
            {showEditModal && selectedTask && (
  <div className="fixed inset-0 bg-black/40  flex items-center justify-center z-50">

    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8 relative">

      {/* Close */}
      <button
        onClick={() => setShowEditModal(false)}
        className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition"
      >
        <X size={20} />
      </button>

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Edit Task
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Update task details below
        </p>
      </div>

      {/* Form */}
   <form onSubmit={handleEditTask} className="space-y-5">

  <div className="grid grid-cols-2 gap-5">

    {/* ✅ TASK ID (NEW FIELD REQUIRED) */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        Task ID
      </label>
      <input
        type="text"
        value={`TSK-${selectedTask.id}`}
        disabled
        className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm"
      />
    </div>

    {/* Team ID */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        Team ID
      </label>
      <input
        type="text"
        value={selectedTask.teamID}
        disabled
        className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm"
      />
    </div>

    {/* Title */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        Task Title
      </label>
      <input
        type="text"
        defaultValue={selectedTask.title}
        name="title"
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none"
      />
    </div>

    {/* Assigned To */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        Team Leader ID
      </label>
      <input
        type="text"
        defaultValue={selectedTask.assigned_to}
        name="assigned_to"
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none"
      />
    </div>

    {/* Description */}
    <div className="col-span-2">
      <label className="block text-sm font-medium text-gray-600 mb-2">
        Description
      </label>
      <textarea
        rows="3"
        defaultValue={selectedTask.description}
        name="description"
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none"
      />
    </div>

    {/* Deadline */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        Deadline
      </label>
      <input
        type="date"
        name="deadline"
        defaultValue={
          selectedTask.deadline
            ? selectedTask.deadline.split("T")[0]
            : ""
        }
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none"
      />
    </div>

    {/* Status */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        Status
      </label>
      <select
        name="status"
        defaultValue={selectedTask.status}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none"
      >
        <option value="TODO">Pending</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
      </select>
    </div>

  </div>

  {/* Footer */}
  <div className="flex justify-end gap-3 pt-4">
    <button
      type="button"
      onClick={() => setShowEditModal(false)}
      className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
    >
      Cancel
    </button>

    <button
      type="submit"
      className="px-5 py-2 text-sm rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
    >
      Update Details
    </button>
  </div>

</form>
</div>
  </div>
)}

            {/* Delete Modal */}
          {/* ================= DELETE MODAL ================= */}
{showDeleteModal && selectedTask && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative">

      {/* Close */}
      <button
        disabled={isDeleting}
        onClick={() => setShowDeleteModal(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 disabled:opacity-50"
      >
        <X size={18} />
      </button>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Delete Task
      </h2>

      {/* Message */}
      <p className="text-sm text-gray-500 mb-6">
        Are you sure you want to delete
        <span className="font-medium text-gray-800">
          {" "}“{selectedTask.title}”
        </span>? This action cannot be undone.
      </p>

      {/* Buttons */}
      <div className="flex justify-end gap-3">

        {/* Cancel */}
        <button
          disabled={isDeleting}
          onClick={() => setShowDeleteModal(false)}
          className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>

        {/* Delete */}
        <button
          onClick={handleDeleteTask}
          disabled={isDeleting}
          className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>

      </div>

    </div>
  </div>
)}

        </div>
    );
};

export default PMTask;