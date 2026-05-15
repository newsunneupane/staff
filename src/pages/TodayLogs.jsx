import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TodayLogs = () => {
  const userId = localStorage.getItem("userId");
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://newsun.kesug.com/backend/get_employee_logs.php?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => setLogs(Array.isArray(data) ? data : []));
  }, [userId]);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Activity Logs</h1>
            <p className="text-slate-500 text-sm">Your shift history for today.</p>
          </div>
          <button
            onClick={() => navigate("/employee")}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-xs uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all"
          >
            <svg xmlns="http://w3.org" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Dashboard
          </button>
        </div>

        {/* LOGS LIST */}
        <div className="space-y-4">
          {logs.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-200">
              <div className="inline-flex p-4 rounded-full bg-slate-50 text-slate-400 mb-4">
                <svg xmlns="http://w3.org" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
              </div>
              <p className="text-slate-500 font-medium">No logs recorded for today yet.</p>
            </div>
          ) : (
            logs.map((log, i) => {
              const isRunning = !log.clock_out;
              return (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden">
                  {/* Status Indicator Bar */}
                  <div className={`absolute top-0 left-0 w-1.5 h-full ${isRunning ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                          {log.shift_name}
                        </span>
                        {isRunning && (
                          <span className="flex items-center gap-1.5 text-[10px] font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                            Active Now
                          </span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Clock In</p>
                          <p className="font-bold text-slate-700">{log.clock_in}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Clock Out</p>
                          <p className={`font-bold ${isRunning ? 'text-slate-300 italic' : 'text-slate-700'}`}>
                            {log.clock_out || "In Progress..."}
                          </p>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Hours</p>
                          <p className="font-black text-slate-800 text-lg">
                            {log.work_hours || "0.0"} <span className="text-xs font-medium text-slate-400">hrs</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:block">
                      <div className={`p-3 rounded-2xl ${isRunning ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-500'}`}>
                        <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* SUMMARY FOOTER */}
        {logs.length > 0 && (
          <p className="mt-8 text-center text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
            End of daily activity
          </p>
        )}
      </div>
    </div>
  );
};

export default TodayLogs;
