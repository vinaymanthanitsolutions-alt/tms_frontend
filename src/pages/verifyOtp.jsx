import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function VerifyOtp({ empId }) {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      const res = await axios.post("http://localhost:8080/verify-OTP", {
        emp_id: empId,
        otp: otp,
      });

      if (res.data.status === "SUCCESS") {
        toast.success("Login Successful 🎉");
        navigate("/dashboard");
      } else {
        toast.error("Invalid OTP ❌");
      }

    } catch (error) {
      toast.error("OTP verification failed ❌");
    }
  };

  return (
    <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">

      <h2 className="text-xl font-semibold mb-4 text-center">
        Verify OTP
      </h2>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />

      <button
        onClick={handleVerify}
        className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 transition"
      >
        Verify OTP
      </button>

    </div>
  );
}
