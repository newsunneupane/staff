import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HoursPage = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [h, setH] = useState({
    own_today: 0,
    own_weekly: 0,
    own_monthly: 0,
    other_today: 0,
    other_weekly: 0,
    other_monthly: 0,
  });

  const fetchHours = async () => {
    try {
      const res = await fetch(
        `http://localhost/backend/get_hours_summary.php?user_id=${userId}`
      );
      const text = await res.text();
      const data = JSON.parse(text);

      if (data.status === "success") {
        setH(data);
      }
    } catch (err) {
      console.error("Hours fetch error:", err);
    }
  };

  useEffect(() => {
    fetchHours();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Hours Report</h1>
            <p className="text-slate-500 text-sm">Comparison of your hours vs. other shifts.</p>
          </div>
          <button
            onClick={() => navigate("/employee")}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-xs uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all"
          >
            <svg xmlns="http://w3.org" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Back
          </button>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* DAILY CARD */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            <h3 className="text-xs  text-slate-400 uppercase tracking-widest mb-4 ">Today</h3>
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-black text-slate-800">{h.own_today}<span className="text-sm font-medium text-slate-400 ml-1">hrs</span></p>
                <p className="text-xs font-bold text-blue-600">Your Shift</p>
              </div>
              <div className="pt-4 border-t border-slate-50">
                <p className="text-xl font-bold text-slate-700">{h.other_today}<span className="text-xs font-medium text-slate-400 ml-1">hrs</span></p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Others shift worked</p>
              </div>
            </div>
          </div>

          {/* WEEKLY CARD */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">This Week</h3>
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-black text-slate-800">{h.own_weekly}<span className="text-sm font-medium text-slate-400 ml-1">hrs</span></p>
                <p className="text-xs font-bold text-emerald-600">Your Shift</p>
              </div>
              <div className="pt-4 border-t border-slate-50">
                <p className="text-xl font-bold text-slate-700">{h.other_weekly}<span className="text-xs font-medium text-slate-400 ml-1">hrs</span></p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Others shift worked</p>
              </div>
            </div>
          </div>

          {/* MONTHLY CARD */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
            <h3 className="text-xs  text-slate-400 uppercase tracking-widest mb-4 font-bold">This Month</h3>
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-black text-slate-800">{h.own_monthly}<span className="text-sm font-medium text-slate-400 ml-1">hrs</span></p>
                <p className="text-xs font-bold text-purple-600">Your Shift</p>
              </div>
              <div className="pt-4 border-t border-slate-50">
                <p className="text-xl font-bold text-slate-700">{h.other_monthly}<span className="text-xs font-medium text-slate-400 ml-1">hrs</span></p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Others shift worked</p>
              </div>
            </div>
          </div>

        </div>

        {/* SUMMARY INFO */}
        <div className="mt-8 bg-slate-900 rounded-2xl p-6 text-white flex items-center gap-4 shadow-xl shadow-slate-200">
           <div className="p-3 bg-white/10 rounded-xl text-blue-400">
             <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
           </div>
           <div>
             <p className="font-bold">Workload Insights</p>
             <p className="text-slate-400 text-sm">Compare your contribution with the total hours logged by other shifts in the system.</p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default HoursPage;
