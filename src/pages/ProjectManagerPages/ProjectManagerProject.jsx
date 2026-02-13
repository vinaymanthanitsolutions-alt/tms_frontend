import React, { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import AddProject from './AddProject'

const ProjectManagerProject = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)

  const [projects] = useState([
    {
      projectId: "P001",
      title: "Sample Project",
      teamId: "T001",
      teamHead: { name: "John Doe", email: "john@email.com" },
      employees: [
        { name: "Alice Johnson", email: "alice@email.com", role: "Frontend Developer", department: "Developer" },
        { name: "Bob Wilson", email: "bob@email.com", role: "Backend Developer", department: "Developer" }
      ]
    },
    {
      projectId: "P002",
      title: "Mobile App",
      teamId: "T002",
      teamHead: { name: "Jane Smith", email: "jane@email.com" },
      employees: [
        { name: "Sarah Lee", email: "sarah@email.com", role: "QA Engineer", department: "Tester" },
        { name: "Mike Chen", email: "mike@email.com", role: "Mobile Developer", department: "Developer" }
      ]
    },
    {
      projectId: "P003",
      title: "AI Dashboard",
      teamId: "T003",
      teamHead: { name: "Robert King", email: "robert@email.com" },
      employees: [
        { name: "Emma Watson", email: "emma@email.com", role: "Data Scientist", department: "Developer" },
        { name: "David Miller", email: "david@email.com", role: "ML Engineer", department: "Developer" },
        { name: "Sophia Brown", email: "sophia@email.com", role: "UI Developer", department: "Developer" }
      ]
    }
  ])

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.projectId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-4 sm:p-6">

      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div className="flex items-center bg-white rounded-lg shadow px-4 py-2 w-full sm:w-72 border border-gray-200">
          <Search size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search project"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none flex-1 ml-2 text-sm"
          />
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition w-full sm:w-auto"
        >
          <Plus size={20} />
          Add Project
        </button>
      </div>

      {/* Table Section */}
      <div className="mt-6 bg-white rounded-lg shadow">

        <div className="overflow-x-auto overflow-y-auto max-h-96 ">

          <table className="min-w-[900px] w-full text-sm text-gray-600">

            <thead className="  bg-gray-200 sticky top-0 z-10">
              <tr className="border-b border-gray-300">
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-600 uppercase">Project ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-600 uppercase">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-600 uppercase">Team ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-600 uppercase">Team Head</th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-600 uppercase">Employee</th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-600 uppercase">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-600 uppercase">Department</th>
              </tr>
            </thead>

            <tbody>
              {filteredProjects.map((project) =>
                project.employees.map((employee, index) => (
                  <tr
                    key={`${project.projectId}-${index}`}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2 font-medium text-gray-600">
                      {index === 0 ? project.projectId : ""}
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-600">
                      {index === 0 ? project.title : ""}
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-600">
                       {index === 0 ? project.teamId   : ""}
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-600">
                      {index === 0 && (
                        <>
                          <div>{project.teamHead.name}</div>
                          <div className="text-xs text-gray-500">
                            {project.teamHead.email}
                          </div>
                        </>
                      )}
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-600">
                      <div>{employee.name}</div>
                      <div className="text-xs text-gray-500">
                        {employee.email}
                      </div>
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-600">
                      {employee.role}
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-600">
                      {employee.department}
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>

        </div>
      </div>

      {/* 🔥 Modal Popup */}
     {showModal && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="relative w-full max-w-4xl px-4">

            {/* Close Button */}
            {/* <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-10 text-gray-600 hover:text-black text-xl"
            >
              ✕
            </button> */}

            <AddProject onClose={() => setShowModal(false)} />

          </div>
        </div>
      )}

    </div>
  )
}

export default ProjectManagerProject