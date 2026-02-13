import React, { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";

const AddProject = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");

  const [teamLeads, setTeamLeads] = useState([]);
  const [developers, setDevelopers] = useState([]);

  const [selectedTL, setSelectedTL] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [showTLDropdown, setShowTLDropdown] = useState(false);

  useEffect(() => {
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
    if (!selectedMembers.find((item) => item.id === member.id)) {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedTL) {
      alert("Please select a Team Leader");
      return;
    }

    if (selectedMembers.length === 0) {
      alert("Please select at least one Developer or Tester");
      return;
    }

    alert("Project Created Successfully 🎉");
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-sm space-y-6 max-h-[85vh] overflow-y-auto"
    >

      {/* Modal Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Add Project
        </h2>

        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 transition"
        >
          <X size={18} />
        </button>
      </div>

      {/* Title + Project ID + Deadline */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div>
          <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
            Title
          </label>
          <input
            type="text"
            required
            className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
            Project ID
          </label>
          <input
            type="text"
            required
            className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
            Deadline
          </label>
          <input
            type="date"
            required
            className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
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
          className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          <div className="mt-3 bg-emerald-100 text-emerald-700 px-3 py-2 rounded-md text-sm inline-block ">
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
              className="bg-blue-100 text-blue-700 px-3 py-2 rounded-md text-sm"
            >
              <div className="font-medium">{member.name}</div>
              <div className="text-xs">{member.email}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Buttons */}
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
          Create Project
        </button>

      </div>

    </form>
  );
};

export default AddProject;