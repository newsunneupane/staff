import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ShiftAssignment() {
  const navigate = useNavigate();

  const [staffList, setStaffList] = useState([]);
  const [assignment, setAssignment] = useState({});

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const shiftLabels = ["4AM-8AM", "8AM-6PM", "6PM-12AM", "12AM-4AM"];

  const fetchUsers = async () => {
    const res = await fetch("http://newsun.kesug.com/backend/get_all_users.php");
    const data = await res.json();
    setStaffList(data);
  };

  const fetchAssignment = async () => {
    try {
      const res = await fetch("http://newsun.kesug.com/backend/get_shift_assignment.php");
      const data = await res.json();
      setAssignment(data || {});
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchAssignment();
  }, []);

  const updateAssign = (day, idx, userId) => {
    setAssignment((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [idx]: userId,
      },
    }));
  };

  const saveAssignment = async () => {
    try {
      const res = await fetch("http://newsun.kesug.com/backend/save_shift_assignment.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignment }),
      });

      const data = await res.json();

      if (data.status === "success") {
        alert("Saved successfully ✅");
        fetchUsers();
        fetchAssignment();
      } else {
        alert(data.message || "Save failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Master Assignment</h1>
            <p className="text-slate-500 text-sm font-medium">Initial setup for weekly employee rotations.</p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 transition-all"
            >
              <svg xmlns="http://w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              Back
            </button>
            <button
              onClick={saveAssignment}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all"
            >
              <svg xmlns="http://w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
              Save Assignment
            </button>
          </div>
        </div>

        {/* ASSIGNMENT TABLE CARD */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="p-5 text-left text-xs font-black text-slate-400 uppercase tracking-widest border-r border-slate-100 w-32">Day</th>
                  {shiftLabels.map((s) => (
                    <th key={s} className="p-5 text-center text-xs font-black text-slate-500 uppercase tracking-widest min-w-180px">
                      {s}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {days.map((day) => (
                  <tr key={day} className="group hover:bg-slate-50/30 transition-colors">
                    <td className="p-5 font-bold text-slate-700 bg-slate-50/20 border-r border-slate-100">
                      {day}
                    </td>
                    {[0, 1, 2, 3].map((idx) => (
                      <td key={idx} className="p-3">
                        <div className="relative rounded-2xl border-2 border-transparent bg-slate-50/50 hover:bg-white hover:border-blue-100 transition-all p-1">
                          <select
                            className="w-full bg-transparent px-3 py-3 text-sm font-bold text-slate-700 outline-none cursor-pointer appearance-none"
                            value={assignment[day]?.[idx] || ""}
                            onChange={(e) => updateAssign(day, idx, e.target.value)}
                          >
                            <option value="">Unassigned</option>
                            {staffList.map((u) => (
                              <option key={u.id} value={u.id}>
                                {u.username}
                              </option>
                            ))}
                          </select>
                          {/* Chevron Icon */}
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg xmlns="http://w3.org" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* TIP CARD */}
        <div className="mt-8 p-5 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-start gap-4">
          <div className="p-2 bg-white rounded-lg shadow-sm text-indigo-600">
             <svg xmlns="http://w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </div>
          <div>
            <p className="text-sm font-bold text-indigo-900">Setup Instructions</p>
            <p className="text-sm text-indigo-700 opacity-80 mt-0.5">Select an employee for each time block. Click "Save Assignment" to push changes to the live schedule.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
