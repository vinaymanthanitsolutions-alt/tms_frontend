import { useState } from "react";
import { X } from "lucide-react";

const CreateTask = ({ isOpen, onClose, onAddTask }) => {
  const [taskID, setTaskID] = useState("");
  const [taskName, setTaskName] = useState("");
  const [teamLeader, setTeamLeader] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const teamLeaders = [
    "John Doe",
    "Jane Smith",
    "Mike Johnson",
    "Sarah Williams",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddTask({
      taskID,
      taskName,
      teamLeader,
      description,
      deadline,
    });

    alert("Task Added Successfully 🎉");

    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTaskID("");
    setTaskName("");
    setTeamLeader("");
    setDescription("");
    setDeadline("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4 py-6">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-2xl p-6 sm:p-8 max-h-[95vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Create New Task
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Task ID */}
            <div>
              <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Task ID
              </label>
              <input
                type="text"
                value={taskID}
                onChange={(e) => setTaskID(e.target.value)}
                required
                className="w-full mt-2 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Team Leader */}
            <div>
              <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Team Leader
              </label>
              <select
                value={teamLeader}
                onChange={(e) => setTeamLeader(e.target.value)}
                required
                className="w-full mt-2 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="">Select Leader</option>
                {teamLeaders.map((leader) => (
                  <option key={leader} value={leader}>
                    {leader}
                  </option>
                ))}
              </select>
            </div>

            {/* Deadline */}
            <div>
              <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Deadline
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
                className="w-full mt-2 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

          </div>

          {/* Task Name */}
          <div>
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              Task Name
            </label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
              className="w-full mt-2 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              required
              className="w-full mt-2 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 text-sm rounded-md bg-emerald-500 text-white hover:bg-emerald-600 transition"
            >
              Add Task
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateTask;