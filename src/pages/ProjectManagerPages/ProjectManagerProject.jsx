import React, { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import CreateTeam from './CreateTeam'

const ProjectManagerProject = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
const itemsPerPage = 3


  const [projects] = useState([
    {
      taskID: "TA001",
      title: "Sample Project",
      teamId: "T001",
      teamHead: { name: "John Doe", email: "john@email.com" },
      employees: [
        { name: "Alice Johnson", email: "alice@email.com", role: "Frontend Developer", department: "Developer" },
        { name: "Bob Wilson", email: "bob@email.com", role: "Backend Developer", department: "Developer" }
      ]
    },
    {
      taskID: "TA002",
      title: "Mobile App",
      teamId: "T002",
      teamHead: { name: "Jane Smith", email: "jane@email.com" },
      employees: [
        { name: "Sarah Lee", email: "sarah@email.com", role: "QA Engineer", department: "Tester" },
        { name: "Mike Chen", email: "mike@email.com", role: "Mobile Developer", department: "Developer" }
      ]
    },
     {
      taskID: "TA002",
      title: "Mobile App",
      teamId: "T002",
      teamHead: { name: "Jane Smith", email: "jane@email.com" },
      employees: [
        { name: "Sarah Lee", email: "sarah@email.com", role: "QA Engineer", department: "Tester" },
        { name: "Mike Chen", email: "mike@email.com", role: "Mobile Developer", department: "Developer" }
      ]
    },
     {
      taskID: "TA002",
      title: "Mobile App",
      teamId: "T002",
      teamHead: { name: "Jane Smith", email: "jane@email.com" },
      employees: [
        { name: "Sarah Lee", email: "sarah@email.com", role: "QA Engineer", department: "Tester" },
        { name: "Mike Chen", email: "mike@email.com", role: "Mobile Developer", department: "Developer" }
      ]
    },
     {
      taskID: "TA002",
      title: "Mobile App",
      teamId: "T002",
      teamHead: { name: "Jane Smith", email: "jane@email.com" },
      employees: [
        { name: "Sarah Lee", email: "sarah@email.com", role: "QA Engineer", department: "Tester" },
        { name: "Mike Chen", email: "mike@email.com", role: "Mobile Developer", department: "Developer" }
      ]
    },
    {
      taskID: "TA003",
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

  // ✅ FIXED SEARCH LOGIC
  const filteredProjects = projects.filter((project) => {
    const search = searchTerm.toLowerCase()

    return (
      project.taskID.toLowerCase().includes(search) ||
      project.title.toLowerCase().includes(search)
    )
  })

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)

const indexOfLastItem = currentPage * itemsPerPage
const indexOfFirstItem = indexOfLastItem - itemsPerPage

const currentProjects = filteredProjects.slice(
  indexOfFirstItem,
  indexOfLastItem
)

  return (
   <div className=" bg-gray-100 p-4 sm:p-6">

      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div className="flex items-center bg-white rounded-lg shadow px-4 py-2 w-full sm:w-72 border border-gray-200">
          <Search size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search by Task ID or Title"
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
          New Team
        </button>
      </div>

      {/* Table Section */}
      <div className="mt-6 bg-white rounded-lg shadow">
        <div className="overflow-x-auto ">

          <table className="min-w-225 w-full text-sm text-gray-600">



            <thead className="bg-gray-200 sticky top-0 z-10">
              <tr className="border-b border-gray-300">
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-600 uppercase">Task ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-600 uppercase">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-600 uppercase">Team ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-600 uppercase">Team Leader</th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-600 uppercase">Employee</th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-600 uppercase">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-600 uppercase">Department</th>
              </tr>
            </thead>

            <tbody>
              {currentProjects.map((project) =>
                project.employees.map((employee, index) => (
                  <tr
                    key={`${project.taskID}-${index}`}  // ✅ fixed key
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2 font-medium">
                      {index === 0 ? project.taskID : ""}
                    </td>

                    <td className="px-4 py-2 font-medium">
                      {index === 0 ? project.title : ""}
                    </td>

                    <td className="px-4 py-2 font-medium">
                      {index === 0 ? project.teamId : ""}
                    </td>

                    <td className="px-4 py-2 font-medium">
                      {index === 0 && (
                        <>
                          <div>{project.teamHead.name}</div>
                          <div className="text-xs text-gray-500">
                            {project.teamHead.email}
                          </div>
                        </>
                      )}
                    </td>

                    <td className="px-4 py-2">
                      <div>{employee.name}</div>
                      <div className="text-xs text-gray-500">
                        {employee.email}
                      </div>
                    </td>

                    <td className="px-4 py-2">
                      {employee.role}
                    </td>

                    <td className="px-4 py-2">
                      {employee.department}
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>

        </div>
        
        {/* Pagination */}
<div className="flex justify-center items-center gap-2 p-4">

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
    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
  >
    Next
  </button>

</div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl px-4">
            <CreateTeam onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}

    </div>
  )
}

export default ProjectManagerProject