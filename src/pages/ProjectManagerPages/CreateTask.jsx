import { useState,useEffect } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { createTask,getTeamsByProject } from "../../services/ManagerServices/taskService";
import { getProjectsByPM } from "../../services/ManagerServices/projectService";

const CreateTask = ({ isOpen, onClose, onAddTask }) => {
  const [projectID, setProjectID] = useState("");
  const [projectName, setProjectName] = useState("");
  const [teamID, setTeamID] = useState("");
  const [taskName, setTaskName] = useState("");
  const [teamLeader, setTeamLeader] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  // Dummy Projects
const [projects, setProjects] = useState([]);

  // ✅ Team + Leader combined
  const [teamLeaders, setTeamLeaders] = useState([]);


  const resetForm = () => {
    setProjectID("");
    setProjectName("");
    setTeamID("");
    setTaskName("");
    setTeamLeader("");
    setDescription("");
    setDeadline("");
  };

 
   useEffect(() => {
      const fetchProjects = async () => {
        try {
          const pmId = "PM001";
          const data = await getProjectsByPM(pmId);
          setProjects(data);
        } catch (error) {
          console.log("Failed to load projects");
        }
      };
  
      fetchProjects();
    }, []);

  useEffect(() => {
  const fetchTeams = async () => {

    if (!projectID) {
      setTeamLeaders([]);
      return;
    }

    try {
      const teams = await getTeamsByProject(projectID);

      setTeamLeaders(teams || []);
      console.log(teams)

    } catch (error) {
      console.error("Error fetching teams:", error);
      setTeamLeaders([]);
    }
  };

  fetchTeams();
}, [projectID]);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!projectID || !teamID || !assignedTo || !deadline) {
    toast.error("Please fill all required fields");
    return;
  }

  try {
    const taskPayload = {
      project_id: projectID,
      team_id: teamID,
      title: taskName,
      description,
      assigned_to: assignedTo,
      created_by: "PM010",
      deadline: `${deadline}T00:00:00Z`
    };

    console.log("Sending Payload:", taskPayload);

    const response = await createTask(taskPayload);

    console.log("API Response:", response);

    toast.success("Task Added Successfully 🎉");

    resetForm();
    onClose();

  } catch (error) {
    console.error(
      "API ERROR:",
      error.response?.data || error.message
    );

    toast.error(
      error.response?.data?.message ||
      "Failed to create task ❌"
    );
  }
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
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* PROJECT + TEAM SECTION */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-5">
              Project & Team Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Project Dropdown */}
              <div>
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Select Project
                </label>
                <select
                  required
                  value={projectID}
                  onChange={(e) => {
                    const selected = projects.find(
  (proj) => proj.project_id === e.target.value
);
                  setProjectID(selected.project_id);
                    setProjectName(selected.name);
                     setAssignedTo("");
  setTeamID("");
  setTeamLeaders([]);
                  }}
                  className="w-full mt-2 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="">Choose Project</option>
                  {projects.map((project) => (
                    <option key={project.project_id} value={project.project_id}>
                {project.project_id} - {project.name}
              </option>
                  ))}
                </select>
              </div>

             {/* Team Leader Dropdown */}
<div>
  <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
    Select Team Leader
  </label>
<select
  required
  value={assignedTo}
  onChange={(e) => {
    const selectedTeam = teamLeaders.find(
      (team) => team.team_leader_id === e.target.value
    );
     if (!selectedTeam) return;

    setAssignedTo(selectedTeam.team_leader_id);
    setTeamID(selectedTeam.team_id);
  }}
  className="w-full mt-2 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
>
  <option value="">Choose Team Leader</option>

  {teamLeaders.map((team) => (
    <option
      key={team.team_id}
      value={team.team_leader_id}
    >
      {team.team_id} - {team.tl_name}
    </option>
  ))}
</select>
</div>

            </div>
          </div>

          {/* Task Name */}
{/* ================= TASK DETAILS ================= */}

<div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
  <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-5">
    Task Details
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* LEFT → Task Name */}
    <div className="md:col-span-1">
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

    {/* RIGHT → Deadline */}
    <div className="md:col-span-1">
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