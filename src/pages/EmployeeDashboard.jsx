import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Team Member";

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
      <div className="max-w-xl mx-auto">
        
        {/* WELCOME HEADER */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 text-white rounded-full mb-4 shadow-lg shadow-blue-200">
            <span className="text-3xl font-black uppercase">
              {username.charAt(0)}
            </span>
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            Hello, {username}!
          </h1>
          <p className="text-slate-500 mt-1 font-medium">What would you like to check today?</p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="grid gap-4">
          
          {/* AVAILABLE SHIFTS */}
          <button
            onClick={() => navigate("/employee/shifts")}
            className="group flex items-center p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
          >
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            </div>
            <div className="ml-4 flex-1">
              <h3 className="font-bold text-slate-800">Available Shifts</h3>
              <p className="text-xs text-slate-500">View and pick your upcoming schedule</p>
            </div>
            <svg xmlns="http://w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300 group-hover:text-emerald-600 transition-colors"><path d="m9 18 6-6-6-6"/></svg>
          </button>

          {/* TODAY LOGS */}
          <button
            onClick={() => navigate("/employee/logs")}
            className="group flex items-center p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
          >
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
            </div>
            <div className="ml-4 flex-1">
              <h3 className="font-bold text-slate-800">Today's Logs</h3>
              <p className="text-xs text-slate-500">Check in/out and view daily activity</p>
            </div>
            <svg xmlns="http://w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300 group-hover:text-blue-600 transition-colors"><path d="m9 18 6-6-6-6"/></svg>
          </button>

          {/* HOURS REPORT */}
          <button
            onClick={() => navigate("/employee/hours")}
            className="group flex items-center p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
          >
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div className="ml-4 flex-1">
              <h3 className="font-bold text-slate-800">Hours Report</h3>
              <p className="text-xs text-slate-500">Summary of total hours worked this month</p>
            </div>
            <svg xmlns="http://w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300 group-hover:text-purple-600 transition-colors"><path d="m9 18 6-6-6-6"/></svg>
          </button>

        </div>

        {/* LOGOUT */}
        <div className="mt-12 flex justify-center">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
