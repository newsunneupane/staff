import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost/backend/login.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.status === "success") {
        localStorage.setItem("userId", result.user_id);
        localStorage.setItem("role", result.role);
        localStorage.setItem("username", result.username);

        navigate(result.role === "admin" ? "/admin" : "/employee");
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Unable to connect to server");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-600 p-8 text-white text-center">
          <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
          <p className="text-blue-100 text-sm mt-2">Please sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <span className="text-xs text-blue-600 hover:underline cursor-pointer">Forgot?</span>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-100 mt-2"
          >
            Sign In
          </button>
          
          {/* Footer Text */}
          <p className="text-center text-xs text-gray-400 mt-6 uppercase tracking-widest font-medium">
            Secured Corporate Access
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
