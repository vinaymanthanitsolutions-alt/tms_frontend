import { useState } from "react";
import { Plus, Search, Pencil, Trash2, X } from "lucide-react";
import CreateTask from "./CreateTask";
import toast from "react-hot-toast";

const PMTask = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const itemsPerPage = 5;

    const [tasks] = useState([
        { teamID: "TM001", title: "Design Login UI", project: "CRM System", assignedTo: "Alice", status: "In Progress" },
        { teamID: "TM002", title: "API Integration", project: "HR Portal", assignedTo: "Bob", status: "Pending" },
        { teamID: "TM003", title: "Fix Mobile Bug", project: "Mobile App", assignedTo: "Mike", status: "Completed" },
        { teamID: "TM004", title: "Create Dashboard", project: "AI Platform", assignedTo: "Emma", status: "In Progress" },
        { teamID: "TM005", title: "Testing Module", project: "ERP System", assignedTo: "David", status: "Pending" },
    ]);

    const filteredTasks = tasks.filter((task) => {
        const search = searchTerm.toLowerCase();
        return (
            task.teamID.toLowerCase().includes(search) ||
            task.title.toLowerCase().includes(search)
        );
    });

    const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirst, indexOfLast);

    const getStatusBadge = (status) => {
        switch (status) {
            case "Completed":
                return "bg-green-100 text-green-700 border border-green-300";
            case "In Progress":
                return "bg-blue-100 text-blue-700 border border-blue-300";
            case "Pending":
                return "bg-yellow-100 text-yellow-700 border border-yellow-300";
            default:
                return "bg-gray-100 text-gray-600 border border-gray-300";
        }
    };

   const handleEditTask = (e) => {
    e.preventDefault();
    toast.success("Task updated successfully ✅");
    setShowEditModal(false);
};

  const handleDeleteTask = () => {
    toast.success("Task deleted successfully 🗑️");
    setShowDeleteModal(false);
    setSelectedTask(null);
};

    return (
        <div className="bg-gray-200 h-[calc(100vh-4.35rem)] p-4 sm:p-6 font-geist text-gray-700">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center bg-white rounded-lg shadow px-4 py-2 w-full sm:w-72 border border-gray-200">
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
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center justify-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition w-full sm:w-auto"
                >
                    <Plus size={20} />
                    New Task
                </button>
            </div>

            <div className="mt-6 bg-white rounded-lg shadow">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-gray-600">
                        <thead className="bg-gray-200 sticky top-0 z-10 ">
                            <tr className="border-b border-gray-300">
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide">Team ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide">Task Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide">Project Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide">Assigned To</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide">Status</th>
                                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTasks.map((task, index) => (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition">
                                    <td className="px-6 py-3 font-medium">{task.teamID}</td>
                                    <td className="px-6 py-3 font-medium">{task.title}</td>
                                    <td className="px-6 py-3">{task.project}</td>
                                    <td className="px-6 py-3">{task.assignedTo}</td>
                                    <td className="px-6 py-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(task.status)}`}>
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 flex justify-center gap-3">
                                        <button
                                            className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition"
                                            onClick={() => {
                                                setSelectedTask(task);
                                                setShowEditModal(true);
                                            }}
                                        >
                                            <Pencil size={16} />
                                        </button>

                                        <button
                                            className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
                                            onClick={() => {
                                                setSelectedTask(task);
                                                setShowDeleteModal(true);
                                            }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center items-center gap-2 p-4 bg-gray-100">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-3 py-1 rounded ${currentPage === index + 1 ? "bg-emerald-500 text-white" : "bg-gray-200"}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
               <CreateTask isOpen={showModal} onClose={() => setShowModal(false)} onAddTask={() => { setShowModal(false); }} />

            {/* Edit Modal */}
            {showEditModal && selectedTask && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full mx-4 relative">
                        <button
                            onClick={() => setShowEditModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-lg font-bold mb-4">Edit Task</h2>
                        <form onSubmit={handleEditTask}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Team ID</label>
                                    <input type="text" defaultValue={selectedTask.teamID} disabled className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Title</label>
                                    <input type="text" defaultValue={selectedTask.title} className="w-full border border-gray-300 rounded px-3 py-2" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Project</label>
                                    <input type="text" defaultValue={selectedTask.project} className="w-full border border-gray-300 rounded px-3 py-2" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Assigned To</label>
                                    <input type="text" defaultValue={selectedTask.assignedTo} className="w-full border border-gray-300 rounded px-3 py-2" />
                                </div>
                                <div className="mb-4 col-span-2">
                                    <label className="block text-sm font-medium mb-2">Status</label>
                                    <select defaultValue={selectedTask.status} className="w-full border border-gray-300 rounded px-3 py-2">
                                        <option>Pending</option>
                                        <option>In Progress</option>
                                        <option>Completed</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-3 justify-end">
                                <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && selectedTask && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 relative">
                        <button
                            onClick={() => setShowDeleteModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-lg font-bold mb-4">Delete Task</h2>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete "{selectedTask.title}"?</p>
                        <div className="flex gap-3 justify-end">
                            <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                                Cancel
                            </button>
                            <button onClick={handleDeleteTask} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default PMTask;