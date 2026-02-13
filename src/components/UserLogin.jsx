import { useState } from "react";
import { loginUser } from "../../services/UserLoginServices";

export default function UserLogin() {
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!empId || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await loginUser({
        empId,
        password,
      });

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      alert("Login Successful ✅");
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center px-4 sm:px-6 md:px-8 py-6">

      {/* OUTER WRAPPER */}
      <div className="w-full max-w-7xl bg-transparent rounded-3xl overflow-hidden shadow-md">

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">

          {/* LEFT LOGIN CARD */}
          <div className="flex items-center justify-center bg-white px-5 sm:px-8 md:px-10 py-8 sm:py-10 rounded-3xl lg:rounded-l-3xl lg:rounded-r-none">

            <div className="w-full max-w-md">

              {/* Logo */}
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <img
                  src="/logo.png"
                  alt="Manthan IT Solutions"
                  className="h-9 sm:h-11 md:h-12 w-auto"
                />
                <span
                  className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wide text-gray-900"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Manthan IT Solutions
                </span>
              </div>

              <h1
                className="text-2xl sm:text-3xl text-gray-900 mb-2 sm:mb-3"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Sign in
              </h1>

              <p
                className="text-gray-500 mb-5 sm:mb-6 text-sm sm:text-base"
                style={{ fontFamily: "var(--font-unna)" }}
              >
                Welcome back! Please enter your credentials.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

                {/* Employee ID */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    placeholder="EMP12345"
                    value={empId}
                    onChange={(e) => setEmpId(e.target.value)}
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-3 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-3 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between text-sm flex-wrap gap-2">
                  <label className="flex items-center gap-2 text-gray-600">
                    <input type="checkbox" />
                    Remember me
                  </label>
                  <a href="#" className="text-gray-800 hover:underline">
                    Forgot password?
                  </a>
                </div>

                {/* Error */}
                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}

                {/* Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-black transition font-medium disabled:opacity-70"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>

              </form>
            </div>
          </div>

          {/* RIGHT IMAGE CARD */}
          <div className="relative hidden lg:flex items-center justify-center rounded-r-3xl overflow-hidden min-h-[500px]">

            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/login-wallpaper.jpg')" }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/65" />

            {/* Content */}
            <div className="relative z-10 h-full w-full flex flex-col justify-between p-8 xl:p-10 text-white">

              <div>
                <h2
                  className="text-3xl xl:text-4xl mb-3"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Welcome to Manthan
                </h2>

                <p
                  className="max-w-md text-gray-300 text-sm sm:text-base"
                  style={{ fontFamily: "var(--font-unna)" }}
                >
                  Secure employee access to internal systems and digital platforms.
                </p>
              </div>

              <div className="text-center">
                <span
                  className="text-3xl xl:text-4xl text-gray-200 opacity-80"
                  style={{ fontFamily: "var(--font-great)" }}
                >
                  Innovate
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 max-w-md">
                <h3
                  className="text-lg mb-2"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Build. Scale. Succeed.
                </h3>

                <p
                  className="text-sm text-gray-300"
                  style={{ fontFamily: "var(--font-unna)" }}
                >
                  Empowering teams with secure, scalable, and reliable technology solutions.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}