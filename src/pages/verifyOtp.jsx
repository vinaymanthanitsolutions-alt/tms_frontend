import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function VerifyOtp({ empId, onClose, onVerified }) {
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    if (!otp) return toast.error("Enter OTP ");

    try {
      const res = await axios.post("http://localhost:8080/verify-OTP", {
        empID: empId,
        otp,
      });
      console.log(res.data.success)
      if (res.data.success) {
        toast.success("OTP verified ");
        if (res.data?.token) localStorage.setItem("token", res.data.token);
        if (res.data?.role) localStorage.setItem("role", res.data.role);

        onClose();       
        onVerified();    
      } else {
        toast.error(res.data?.message || "Invalid OTP ");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed ");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
      <button onClick={onClose} className="absolute top-3 right-4">✕</button>
      <h2 className="text-xl font-semibold mb-4 text-center">Verify OTP</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full border p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-gray-900"
      />
      <button
        onClick={handleVerify}
        className="w-full bg-gray-900 text-white py-2 rounded"
      >
        Verify OTP
      </button>
    </div>
  );
}

