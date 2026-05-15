import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        
        {/* TOP NAVIGATION / HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 bg-blue-600 rounded-lg text-white">
                <svg xmlns="http://w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
              </div>
              <span className="text-sm font-bold uppercase tracking-wider text-blue-600">Management Portal</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-800">Admin Dashboard</h1>
            <p className="text-slate-500 mt-1 text-sm">Welcome back. Here's what's happening with your team today.</p>
          </div>

          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all duration-200"
          >
            <svg xmlns="http://w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
            <span>Sign Out</span>
          </button>
        </header>

        {/* DASHBOARD CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* CARD: EMPLOYEES */}
          <div
            onClick={() => navigate("/admin/employees")}
            className="group relative bg-white p-8 rounded-2xl shadow-sm border border-slate-100 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="mb-5 inline-flex p-4 rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://w3.org" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Team Members</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Add new staff, update profiles, and manage employee credentials.
            </p>
            <div className="mt-6 flex items-center text-blue-600 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              Manage Staff →
            </div>
          </div>

          {/* CARD: SHIFT ASSIGNMENT */}
          <div
            onClick={() => navigate("/admin/shift-assignment")}
            className="group relative bg-white p-8 rounded-2xl shadow-sm border border-slate-100 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="mb-5 inline-flex p-4 rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://w3.org" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14h6"/><path d="M9 18h6"/><path d="M9 10h6"/></svg>
            </div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">Shift Assignment</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Allocate weekly shifts and distribute workloads across your team.
            </p>
            <div className="mt-6 flex items-center text-indigo-600 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              Assign Now →
            </div>
          </div>

          {/* CARD: SHIFT ROUTINE */}
          <div
            onClick={() => navigate("/admin/calendar")}
            className="group relative bg-white p-8 rounded-2xl shadow-sm border border-slate-100 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="mb-5 inline-flex p-4 rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://w3.org" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            </div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">Shift Routine</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              View the master calendar and track the full weekly schedule.
            </p>
            <div className="mt-6 flex items-center text-emerald-600 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              View Calendar →
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
