import React, { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { validateTeamId } from "../../validation/validators";

const CreateTeam = ({ onClose }) => {
  const [teamTitle, setTeamTitle] = useState("");
  const [teamId, setTeamId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");

  const [projects, setProjects] = useState([]);
  const [teamLeads, setTeamLeads] = useState([]);
  const [developers, setDevelopers] = useState([]);

  const [selectedTL, setSelectedTL] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [showTLDropdown, setShowTLDropdown] = useState(false);
  const [teamIdError, setTeamIdError] = useState("");

  useEffect(() => {
    setProjects([
      { id: "PR101", name: "E-Commerce Platform" },
      { id: "PR102", name: "CRM System" },
      { id: "PR103", name: "HR Management Tool" }
    ]);

    setTeamLeads([
      { id: 1, name: "Rahul Sharma", email: "rahul@email.com" },
      { id: 2, name: "Ankit Verma", email: "ankit@email.com" }
    ]);

    setDevelopers([
      { id: 3, name: "Priya Singh", email: "priya@email.com", role: "Developer" },
      { id: 4, name: "Aman Gupta", email: "aman@email.com", role: "Developer" },
      { id: 5, name: "Sneha Jain", email: "sneha@email.com", role: "Tester" }
    ]);
  }, []);

  const handleSelectTL = (tl) => {
    setSelectedTL(tl);
    setShowTLDropdown(false);
  };

  const handleSelectMember = (member) => {
    if (!selectedMembers.find((m) => m.id === member.id)) {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const handleRemoveMember = (id) => {
    setSelectedMembers(selectedMembers.filter((m) => m.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateTeamId(teamId)) {
      setTeamIdError(
        "Team ID must start with 'T' followed by 3-5 digits (e.g. T123)"
      );
      return;
    } else {
      setTeamIdError("");
    }

    if (!projectId) {
      alert("Please select a Project");
      return;
    }

    if (!selectedTL) {
      alert("Please select a Team Leader");
      return;
    }

    if (selectedMembers.length === 0) {
      alert("Please select at least one Developer or Tester");
      return;
    }

    alert("Team Created Successfully 🎉");
    onClose();
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
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">

        {/* Team Title */}
        <div>
          <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
            Team Title
          </label>
          <input
            type="text"
            required
            value={teamTitle}
            onChange={(e) => setTeamTitle(e.target.value)}
            className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

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
              <option key={project.id} value={project.id}>
                {project.id} - {project.name}
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
            required
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

      </div>

      {/* Description */}
      <div>
        <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
          Description
        </label>
        <textarea
          required
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
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
                key={tl.id}
                onClick={() => handleSelectTL(tl)}
                className="cursor-pointer hover:bg-gray-100 p-2 rounded text-sm text-gray-600"
              >
                {tl.name}
              </div>
            ))}
          </div>
        )}

        {selectedTL && (
          <div className="mt-3 bg-emerald-100 text-emerald-700 px-3 py-2 rounded-md text-sm inline-block">
            <div className="font-medium">{selectedTL.name}</div>
            <div className="text-xs">{selectedTL.email}</div>
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
              key={member.id}
              onClick={() => handleSelectMember(member)}
              className="cursor-pointer hover:bg-gray-100 p-2 rounded text-sm text-gray-600"
            >
              {member.name} ({member.role})
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-3">
          {selectedMembers.map((member) => (
            <div
              key={member.id}
              className="bg-blue-100 text-blue-700 px-3 py-2 rounded-md text-sm flex items-center gap-2"
            >
              <div>
                <div className="font-medium">{member.name}</div>
                <div className="text-xs">{member.email}</div>
              </div>
              <X
                size={14}
                className="cursor-pointer"
                onClick={() => handleRemoveMember(member.id)}
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