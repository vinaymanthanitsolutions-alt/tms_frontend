import React, { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { validateTeamId } from "../../validation/validators";
import { getProjectsByPM ,getEmployeesByPM} from "../../services/ManagerServices/projectService";
import {
  createTeam,
  addTeamMember,
} from "../../services/ManagerServices/teamService";
import toast from "react-hot-toast";

const CreateTeam = ({ onClose }) => {
  const [teamId, setTeamId] = useState("");
  const [projectId, setProjectId] = useState("");

  const [projects, setProjects] = useState([]);
  const [teamLeads, setTeamLeads] = useState([]);
  const [developers, setDevelopers] = useState([]);

  const [selectedTL, setSelectedTL] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [showTLDropdown, setShowTLDropdown] = useState(false);
  const [teamIdError, setTeamIdError] = useState("");


  useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const pmId = "PM010";  // use correct PM ID

      const employees = await getEmployeesByPM(pmId);

      // Separate by role
      const teamLeaders = employees.filter(
        (emp) => emp.role === "TEAM_LEADER"
      );

      const devAndTesters = employees.filter(
        (emp) =>
          emp.role === "DEVELOPER" ||
          emp.role === "TESTER"
      );

      setTeamLeads(teamLeaders);
      setDevelopers(devAndTesters);

    } catch (error) {
      console.log("Failed to load employees");
    }
  };

  fetchEmployees();
}, []);

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

  const handleSelectTL = (tl) => {
    setSelectedTL(tl);
    setShowTLDropdown(false);
  };

  const handleSelectMember = (member) => {
    if (!selectedMembers.find((m) => m.emp_id === member.emp_id)) {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

 const handleRemoveMember = (empId) => {
  setSelectedMembers(
    selectedMembers.filter((m) => m.emp_id !== empId)
  );
};

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (!validateTeamId(teamId)) {
      setTeamIdError(
        "Team ID must start with TM followed by digits"
      );
      return;
    }

    if (!projectId)
      return toast.error("Select Project");

    if (!selectedTL)
      return toast.error("Select Team Leader");

    if (selectedMembers.length === 0)
      return toast.error("Add team members");

    // =========================
    // ✅ STEP 1: CREATE TEAM
    // =========================
    const teamPayload = {
      project_id: projectId,
      team_id: teamId,
      team_leader_id: selectedTL.emp_id,
    };

    console.log("Creating Team:", teamPayload);

    await createTeam(teamPayload);

    // =========================
    // ✅ STEP 2: ADD MEMBERS
    // =========================
    for (const member of selectedMembers) {
      console.log(
        "Adding Member:",
        member.emp_id
      );

      await addTeamMember(
        teamId,
        member.emp_id
      );
    }

    toast.success("Team Created Successfully 🎉");

    onClose();

  } catch (error) {
    console.error(error);
    toast.error("Team creation failed ❌");
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-sm space-y-6 max-h-[85vh] overflow-y-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Create New Team
        </h2>

        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 transition"
        >
          <X size={18} />
        </button>
      </div>

      {/* Top Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* Team ID */}
        <div>
          <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
            Team ID
          </label>
          <input
            type="text"
            required
            value={teamId}
            onChange={(e) => {
              const value = e.target.value.toUpperCase();
              setTeamId(value);
              setTeamIdError("");
            }}
            className={`w-full mt-1 border rounded-md p-2 text-sm focus:outline-none focus:ring-1 ${
              teamIdError
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-emerald-500"
            }`}
          />
          {teamIdError && (
            <p className="text-xs text-red-500 mt-1">{teamIdError}</p>
          )}
        </div>

        {/* Project Dropdown */}
        <div>
          <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
            Project
          </label>
          <select
            required
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="">Select Project</option>
            {projects.map((project) => (
              <option key={project.project_id} value={project.project_id}>
                {project.project_id} - {project.name}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Team Leader */}
      <div>
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
            Team Leader
          </label>
          <Plus
            size={18}
            className="cursor-pointer text-emerald-500 hover:text-emerald-600"
            onClick={() => setShowTLDropdown(!showTLDropdown)}
          />
        </div>

        {showTLDropdown && (
          <div className="mt-2 border border-gray-200 rounded-md p-2 bg-gray-50">
            {teamLeads.map((tl) => (
              <div
                key={tl.emp_id}
                onClick={() => handleSelectTL(tl)}
                className="cursor-pointer hover:bg-gray-100 p-2 rounded text-sm text-gray-600"
              >
                {tl.emp_name}
              </div>
            ))}
          </div>
        )}

        {selectedTL && (
          <div className="mt-3 bg-emerald-100 text-emerald-700 px-3 py-2 rounded-md text-sm inline-block">
            <div className="font-medium">{selectedTL.emp_name}</div>
            <div className="text-xs">{selectedTL.emp_id}</div>
          </div>
        )}
      </div>

      {/* Developers & Testers */}
      <div>
        <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
          Developers & Testers
        </label>

        <div className="mt-2 border border-gray-200 rounded-md p-2 bg-gray-50 max-h-40 overflow-y-auto">
          {developers.map((member) => (
            <div
            key={member.emp_id}
              onClick={() => handleSelectMember(member)}
              className="cursor-pointer hover:bg-gray-100 p-2 rounded text-sm text-gray-600"
            >
              {member.emp_name} ({member.role})
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-3">
          {selectedMembers.map((member) => (
            <div
              key={member.emp_id}
              className="bg-blue-100 text-blue-700 px-3 py-2 rounded-md text-sm flex items-center gap-2"
            >
              <div>
                <div className="font-medium">{member.emp_name}</div>
                <div className="text-xs">{member.emp_id}</div>
              </div>
              <X
                size={14}
                className="cursor-pointer"
                onClick={() => handleRemoveMember(member.emp_id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
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
          Create Team
        </button>
      </div>
    </form>
  );
};

export default CreateTeam;