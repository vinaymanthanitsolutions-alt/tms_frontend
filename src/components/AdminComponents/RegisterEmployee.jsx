import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import {
  validateEmail,
  validatePassword,
  validateEmployeeCode,
  validatePhoneNumber,
} from "../../validation/validators";
import { registerEmployee, updateEmployee } from "../../services/AdminServices";

export default function RegisterEmployee({
  isOpen,
  onClose,
  onSuccess,
  editData,
}) {
  const [formData, setFormData] = useState({
    empCode: "",
    empName: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    password: "",
    managerId: "A001",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setFormData({
        empCode: editData.emp_id || "",
        empName: editData.emp_name || "",
        email: editData.email || "",
        phone: editData.phone || "",
        department: editData.department || "",
        role: editData.role || "",
        password: "",
        managerId: editData.manager_id || "A001",
      });
    } else {
      setFormData({
        empCode: "",
        empName: "",
        email: "",
        phone: "",
        department: "",
        role: "",
        password: "",
        managerId: "A001",
      });
    }
  }, [editData]);

  const getRoleOptions = () => {
    switch (formData.department) {
      case "HEAD":
        return [{ value: "ADMIN", label: "Admin" }];
      case "IT":
        return [
          { value: "PROJECT_MANAGER", label: "Project Manager" },
          { value: "DEVELOPER", label: "Developer" },
          { value: "TESTER", label: "Tester" },
        ];
      case "SALES":
        return [{ value: "PROJECT_MANAGER", label: "Project Manager" }];
      default:
        return [];
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "department") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        role: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.empCode.trim()) {
      newErrors.empCode = "Employee code is required";
    } else if (!validateEmployeeCode(formData.empCode)) {
      newErrors.empCode = "Invalid employee code format (e.g., ABC1234)";
    }

    if (!formData.empName.trim()) {
      newErrors.empName = "Employee name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhoneNumber(formData.phone)) {
      newErrors.phone =
        "Phone number must be 10 digits starting with 6 or greater";
    }

    if (!formData.department.trim()) {
      newErrors.department = "Department is required";
    }

    if (!formData.role.trim()) {
      newErrors.role = "Role is required";
    }

    // Password is required for new employee, optional for edit
    if (!editData && !formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.trim()) {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.errors[0];
      }
    }

    if (Object.keys(newErrors).length > 0) {
      toast.error(Object.values(newErrors)[0]);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    let result;

    if (editData) {
      // Update existing employee
      console.log(
        "Updating employee with empCode:",
        formData.empCode,
        "and data:",
        formData,
      );
      result = await updateEmployee(formData.empCode, formData);
      if (result.success) {
        toast.success("Employee updated successfully!");
      }
    } else {
      // Register new employee
      result = await registerEmployee(formData);
      if (result.success) {
        toast.success(result.message || "Employee registered successfully!");
      }
    }

    if (result.success) {
      setFormData({
        empCode: "",
        empName: "",
        email: "",
        phone: "",
        department: "",
        role: "",
        password: "",
        managerId: "A001",
      });
      onClose();
      if (onSuccess) {
        onSuccess();
      }
    } else {
      toast.error(
        result.error ||
          `Failed to ${editData ? "update" : "register"} employee`,
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed lg:absolute  inset-0 w-full h-full bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-lg max-h-[90vh] overflow-y-auto m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {editData ? "Edit Employee" : "Add Employee"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employee Code *
              </label>
              <input
                type="text"
                name="empCode"
                value={formData.empCode}
                onChange={handleChange}
                disabled={editData ? true : false}
                className={`w-full px-3 py-2 border rounded-md outline-none focus:ring-1 focus:ring-black ${
                  errors.empCode ? "border-red-500" : "border-gray-300"
                } ${editData ? "bg-gray-100 cursor-not-allowed" : ""}`}
                placeholder="e.g., EMP001"
              />
              {errors.empCode && (
                <p className="text-red-500 text-xs mt-1">{errors.empCode}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employee Name *
              </label>
              <input
                type="text"
                name="empName"
                value={formData.empName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md outline-none focus:ring-1 focus:ring-black ${
                  errors.empName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g., John Doe"
              />
              {errors.empName && (
                <p className="text-red-500 text-xs mt-1">{errors.empName}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md outline-none focus:ring-1 focus:ring-black ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g., john.doe@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md outline-none focus:ring-1 focus:ring-black ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g., 62345....."
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department *
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md outline-none focus:ring-1 focus:ring-black ${
                  errors.department ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Department</option>
                <option value="HEAD">Head</option>
                <option value="IT">IT</option>
                <option value="SALES">Sales</option>
              </select>
              {errors.department && (
                <p className="text-red-500 text-xs mt-1">{errors.department}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={!formData.department}
                className={`w-full px-3 py-2 border rounded-md outline-none focus:ring-1 focus:ring-black ${
                  !formData.department
                    ? "bg-gray-100 cursor-not-allowed"
                    : errors.role
                      ? "border-red-500"
                      : "border-gray-300"
                }`}
              >
                <option value="">Select Role</option>
                {getRoleOptions().map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="text-red-500 text-xs mt-1">{errors.role}</p>
              )}
              {!formData.department && (
                <p className="text-gray-500 text-xs mt-1">
                  Please select a department first
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password{" "}
                {editData ? "(Optional - leave blank to keep current)" : "*"}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md outline-none focus:ring-1 focus:ring-black ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={
                  editData
                    ? "Leave blank to keep current password"
                    : "Enter password"
                }
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
            >
              {editData ? "Update" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
