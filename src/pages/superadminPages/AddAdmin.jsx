import { useState } from "react";

export default function AddAdmin() {
  const [task, setTask] = useState({
    AdminCode: "",
    Name: "",
    Email: "",
    Contact: "",
    Password: "",
    Department: "",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword(task.Password)) {
      alert(
        "Password must contain:\n• 1 Capital Letter\n• 1 Number\n• 1 Special Character\n• Min 8 characters"
      );
      return;
    }

    console.log("Admin Data:", task);
    alert("Admin Added Successfully ✅");

    setTask({
      AdminCode: "",
      Name: "",
      Email: "",
      Contact: "",
      Password: "",
      Department: "",
    });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white rounded-2xl border border-gray-200 shadow-md p-6 sm:p-8 flex flex-col gap-8">
        {/* HEADER */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Add Admin
          </h2>
          <p className="text-gray-400 text-sm">
            Add new admin details
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Admin Code */}
          <div>
            <label className="block mb-1 text-sm text-gray-600">
              Admin Code
            </label>
            <input
              type="text"
              name="AdminCode"
              placeholder="A001"
              value={task.AdminCode}
              onChange={handleChange}
              className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
          </div>

          {/* Name */}
          <div>
            <label className="block mb-1 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="Name"
              placeholder="Admin Name"
              value={task.Name}
              onChange={handleChange}
              className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="Email"
              placeholder="Admin123@gmail.com"
              value={task.Email}
              onChange={handleChange}
              className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block mb-1 text-sm text-gray-600">
              Contact
            </label>
            <input
              type="text"
              name="Contact"
              placeholder="0123456789"
              value={task.Contact}
              onChange={handleChange}
              inputMode="numeric"
              pattern="[0-9]*"
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) e.preventDefault();
              }}
              className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="Password"
              placeholder="password"
              value={task.Password}
              onChange={handleChange}
              className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block mb-1 text-sm text-gray-600">
              Department
            </label>
            <select
              name="Department"
              value={task.Department}
              placeholder="select department"
              onChange={handleChange}
              className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            >
              <option value="Head">Head</option>
              <option value="IT">IT</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          {/* Button */}
          <div className="md:col-span-2 flex justify-center md:justify-end">
            <button
              type="submit"
              className="w-full sm:w-1/2 md:w-auto bg-emerald-500 text-white px-8 py-2.5 rounded-lg hover:bg-emerald-600 transition"
            >
              Add Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
