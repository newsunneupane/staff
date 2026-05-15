import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AvailableShifts = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [assignedShifts, setAssignedShifts] = useState([]);
  const [activeShift, setActiveShift] = useState(null);

  const shiftMap = {
    0: "4AM-8AM",
    1: "8AM-6PM",
    2: "6PM-12AM",
    3: "12AM-4AM",
  };

  const fetchShifts = async () => {
    try {
      const res = await fetch(`http://newsun.kesug.com/backend/get_today_shift.php?user_id=${userId}`);
      const data = await res.json();
      if (data.status === "success") {
        const shifts = (data.assigned_shifts || []).map((item) => {
          if (typeof item === "number") return { shift_idx: Number(item), type: "own" };
          return { shift_idx: Number(item.shift_idx), type: item.type || "own" };
        });
        setAssignedShifts(shifts);
      } else {
        setAssignedShifts([]);
      }
    } catch (err) {
      console.error("Fetch shifts error:", err);
      setAssignedShifts([]);
    }
  };

  const fetchActive = async () => {
    try {
      const res = await fetch(`http://newsun.kesug.com/backend/check_active_shift.php?user_id=${userId}`);
      const data = await res.json();
      if (data.status === "active") {
        setActiveShift(Number(data.shift_idx));
      } else {
        setActiveShift(null);
      }
    } catch (err) {
      console.error("Fetch active error:", err);
      setActiveShift(null);
    }
  };

  const startShift = async (shiftIndex) => {
    try {
      const res = await fetch("http://newsun.kesug.com/backend/start_shift.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, shift: shiftMap[shiftIndex] }),
      });
      const data = await res.json();
      if (data.status === "success" && !data.already_started) {
        setActiveShift(shiftIndex);
        return;
      }
      if (data.already_started) {
        setActiveShift(shiftIndex);
        alert("Shift already started today");
        return;
      }
      alert(data.message || "Unable to start shift");
    } catch (err) {
      console.error("Start shift error:", err);
    }
  };

  const endShift = async () => {
    try {
      const res = await fetch("http://newsun.kesug.com/backend/end_shift.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });
      const data = await res.json();
      if (data.status === "success") {
        setActiveShift(null);
        fetchActive();
      } else {
        alert(data.message || "Unable to end shift");
      }
    } catch (err) {
      console.error("End shift error:", err);
    }
  };

  useEffect(() => {
    fetchShifts();
    fetchActive();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Assigned Shifts</h1>
            <p className="text-slate-500 text-sm">Manage your clock-in/out for today.</p>
          </div>
          <button
            onClick={() => navigate("/employee")}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-xs uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all"
          >
            <svg xmlns="http://w3.org" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Back
          </button>
        </div>

        {/* SHIFTS LIST */}
        <div className="space-y-4">
          {assignedShifts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-200">
              <p className="text-slate-400 font-bold">No shifts assigned to you today.</p>
            </div>
          ) : (
            assignedShifts.map((item, i) => {
              const shiftIdx = item.shift_idx;
              const isReplacement = item.type === "replacement";
              const isThisActive = activeShift === shiftIdx;
              const isLocked = activeShift !== null && activeShift !== shiftIdx;

              return (
                <div key={i} className={`bg-white rounded-3xl p-6 border transition-all ${isThisActive ? 'border-emerald-200 shadow-lg shadow-emerald-50' : 'border-slate-100 shadow-sm'}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-[10px] font-black uppercase tracking-0.1em px-2.5 py-1 rounded-lg ${isReplacement ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                          {isReplacement ? "Replacement" : "Standard"}
                        </span>
                        {isThisActive && (
                          <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                            Live Now
                          </span>
                        )}
                      </div>
                      <h2 className="text-2xl font-black text-slate-800">{shiftMap[shiftIdx]}</h2>
                    </div>

                    <div className="flex items-center">
                      {activeShift === null ? (
                        <button
                          onClick={() => startShift(shiftIdx)}
                          className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-100"
                        >
                          Start Shift
                        </button>
                      ) : isThisActive ? (
                        <button
                          onClick={endShift}
                          className="w-full md:w-auto bg-red-500 text-white px-8 py-3 rounded-2xl font-bold hover:bg-red-600 active:scale-95 transition-all shadow-lg shadow-red-100"
                        >
                          End Shift
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 text-slate-400 bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100">
                          <svg xmlns="http://w3.org" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                          <span className="text-xs font-bold uppercase">Another Shift Running</span>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};

export default AvailableShifts;
