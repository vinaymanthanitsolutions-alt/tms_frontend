import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPassword({ onOtpSent, onClose }) {
  const [email, setEmail] = useState("");
  

  const handleSendOtp = async () => {
  if (!email) {
    toast.error("Enter email ");
    return;
  }

  try {
    const res = await axios.post("http://localhost:8080/forgetPassword", {email});

          if (res.data) {
         toast.success("OTP sent 📩");
        onOtpSent(email);  
     }

 else {
      toast.error(res.data?.message || "Email not found ");
    }
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Something went wrong ");
  }
};


  return (
    <div className="bg-white p-6 rounded-xl w-full max-w-md">
      <h2 className="text-xl mb-4">Enter Employee Email</h2>

      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      <button
        onClick={handleSendOtp}
        className="w-full bg-black text-white py-2 rounded"
      >
        Send OTP
      </button>
    </div>
  );
}
