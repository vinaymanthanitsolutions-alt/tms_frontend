import { useState } from "react";

export default function UserLogin() {
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ empId, password });
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6">
      
      {/* OUTER WRAPPER (SINGLE CARD) */}
      <div className="w-full max-w-7xl bg-transparent rounded-3xl overflow-hidden shadow-sm">
        
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* LEFT LOGIN CARD */}
          <div className="flex items-center justify-center bg-white px-6 sm:px-10 min-h-130 rounded-l-3xl">
            <div className="w-full max-w-md py-10 sm:py-12">

              {/* Logo */}
              <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
                <img
                  src="/logo.png"
                  alt="Manthan IT Solutions"
                  className="h-10 sm:h-12 w-auto"
                />
                <span
                  className="text-xl sm:text-2xl font-semibold tracking-wide text-gray-900"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Manthan IT Solutions
                </span>
              </div>

              <h1
                className="text-2xl sm:text-3xl text-gray-900 mb-3"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Sign in
              </h1>

              <p
                className="text-gray-500 mb-6 sm:mb-8"
                style={{ fontFamily: "var(--font-unna)" }}
              >
                Welcome back! Please enter your credentials.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    placeholder="EMP12345"
                    value={empId}
                    onChange={(e) => setEmpId(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-gray-600">
                    <input type="checkbox" />
                    Remember me
                  </label>
                  <a href="#" className="text-gray-800 hover:underline">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-black transition font-medium"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT IMAGE CARD */}
          <div className="relative hidden lg:block min-h-130 rounded-r-3xl overflow-hidden">

            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/login-wallpaper.jpg')" }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/65" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-10 text-white">

              <div>
                <h2
                  className="text-4xl mb-3"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Welcome to Manthan
                </h2>

                <p
                  className="max-w-md text-gray-300"
                  style={{ fontFamily: "var(--font-unna)" }}
                >
                  Secure employee access to Manthan IT Solutions’ internal systems
                  and digital platforms.
                </p>
              </div>

              <div className="text-center">
                <span
                  className="text-4xl text-gray-200 opacity-80"
                  style={{ fontFamily: "var(--font-great)" }}
                >
                  Innovate
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 max-w-md">
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
                  Empowering teams with secure, scalable, and reliable
                  technology solutions.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}