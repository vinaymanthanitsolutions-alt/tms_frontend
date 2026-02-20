import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPassword({ email, onDone, onClose }) {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
    console.log(email)
  const handleReset = async () => {
    if (!otp || !newPassword) {
      toast.error("OTP and new password are required ");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8080/updatePassword", {
        email: email,
        otp: otp,
        new_password: newPassword,
      });

      if (res.data?.success) {
        toast.success("Password reset successfully ");
        if (onDone) onDone();
      } else {
        toast.error(res.data?.message || "OTP invalid or expired ");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Password reset failed ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
      <button
        onClick={onClose}
        className="absolute top-3 right-4 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>
      <h2 className="text-xl font-semibold mb-4 text-center">Reset Password</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />
      <button
        onClick={handleReset}
        disabled={loading}
        className="w-full bg-gray-900 text-white py-2 rounded"
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </div>
  );
}
