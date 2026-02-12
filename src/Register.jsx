import { useState } from "react";

export default function UserRegister() {
  const [formData, setFormData] = useState({
    empId: "",
    name: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      
      {/* CARD */}
      <div className="w-full max-w-md bg-white rounded-2xl px-8 py-6">

        {/* Header */}
        <div className="text-center mb-6">
          <h1
            className="text-2xl sm:text-3xl text-gray-900 mb-1"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Register
          </h1>
          <p
            className="text-gray-500 text-sm"
            style={{ fontFamily: "var(--font-unna)" }}
          >
            Create a new employee account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* EMP ID */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Employee ID
            </label>
            <input
              type="text"
              name="empId"
              placeholder="EMP12345"
              value={formData.empId}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>

          {/* NAME */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="eg. Abhishek Sharma"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            >
              <option value="">Select role</option>
              <option value="Project Manager">Project Manager</option>
              <option value="Team Leader">Team Leader</option>
              <option value="Developer">Developer</option>
              <option value="Tester">Tester</option>
            </select>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2.5 rounded-md hover:bg-black transition font-medium mt-2"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}