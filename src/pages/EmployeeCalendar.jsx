import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployeeCalendar() {
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState([]);
  const [assignment, setAssignment] = useState({});
  const [replacementMap, setReplacementMap] = useState({});

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const shiftLabels = ["4AM-8AM", "8AM-6PM", "6PM-12AM", "12AM-4AM"];

  const fetchData = async () => {
    try {
      const usersRes = await fetch("http://newsun.kesug.com/backend/get_all_users.php");
      const assignRes = await fetch("http://newsun.kesug.com/backend/get_shift_assignment.php");
      const users = await usersRes.json();
      const assignData = await assignRes.json();
      setStaffList(Array.isArray(users) ? users : []);
      setAssignment(assignData || {});
    } catch (err) {
      console.error(err);
    }
  };

  const fetchReplacement = async () => {
    try {
      const res = await fetch("http://newsun.kesug.com/backend/get_replacement.php");
      const data = await res.json();
      const map = {};
      data.forEach((r) => { map[`${r.day}-${r.shift_idx}`] = r; });
      setReplacementMap(map);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchReplacement();
  }, []);

  const getUser = (id) => staffList.find((u) => u.id == id)?.username || "Unassigned";

  const saveReplacement = async (day, shift_idx, replaced_user_id) => {
    if (!replaced_user_id) return;
    try {
      const res = await fetch("http://newsun.kesug.com/backend/save_replacement.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day, shift_idx, replaced_user_id }),
      });
      const data = await res.json();
      if (data.status === "success") {
        fetchReplacement();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Shift Routine</h1>
            <p className="text-slate-500 text-sm">Monitor assignments and manage staff replacements.</p>
          </div>
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 transition-all"
          >
            <svg xmlns="http://w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Back to Admin
          </button>
        </div>

        {/* CALENDAR TABLE CONTAINER */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="p-5 text-left text-xs font-black text-slate-400 uppercase tracking-widest border-r border-slate-100 w-32">
                    Timeline
                  </th>
                  {shiftLabels.map((s) => (
                    <th key={s} className="p-5 text-center text-xs font-black text-slate-500 uppercase tracking-widest min-w-200px">
                      {s}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {days.map((day) => (
                  <tr key={day} className="group hover:bg-slate-50/30 transition-colors">
                    <td className="p-5 font-bold text-slate-700 bg-slate-50/20 border-r border-slate-100 italic">
                      {day}
                    </td>
                    {[0, 1, 2, 3].map((idx) => {
                      const key = `${day}-${idx}`;
                      const rep = replacementMap[key];
                      const assignedUser = getUser(assignment[day]?.[idx]);

                      return (
                        <td key={idx} className="p-4 align-top">
                          <div className={`h-full rounded-2xl border p-4 transition-all ${rep ? 'bg-amber-50/50 border-amber-100' : 'bg-white border-slate-100'}`}>
                            
                            {/* STATUS ICON & ASSIGNMENT */}
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">Current Staff</p>
                                <p className={`text-sm font-bold ${rep ? 'text-slate-400 line-through' : 'text-blue-600'}`}>
                                  {assignedUser}
                                </p>
                              </div>
                              <div className={`p-1.5 rounded-lg ${rep ? 'bg-amber-500 text-white' : 'bg-blue-50 text-blue-500'}`}>
                                {rep ? (
                                  <svg xmlns="http://w3.org" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m7 21 0-4"/><path d="m20 3-8 8-4-4L3 12"/><path d="m7 17 0-4"/></svg>
                                ) : (
                                  <svg xmlns="http://w3.org" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                                )}
                              </div>
                            </div>

                            {/* REPLACEMENT INFO */}
                            {rep && (
                              <div className="mt-2 pt-2 border-t border-amber-200/50">
                                <p className="text-[10px] font-black text-amber-600 uppercase tracking-tighter mb-1">Replacement</p>
                                <p className="text-sm font-black text-amber-700">
                                  {getUser(rep.replaced_user_id)}
                                </p>
                              </div>
                            )}

                            {/* ACTIONS */}
                            <div className="mt-4">
                              <select
                                className="w-full bg-white border border-slate-200 text-xs font-bold py-2 px-2 rounded-xl outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer"
                                onChange={(e) => saveReplacement(day, idx, e.target.value)}
                                value=""
                              >
                                <option value="" disabled>Modify Shift...</option>
                                {staffList.map((u) => (
                                  <option key={u.id} value={u.id}>Change to {u.username}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* LEGEND */}
        <div className="mt-6 flex gap-6 px-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Normal Shift</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Modified / Replacement</span>
          </div>
        </div>

      </div>
    </div>
  );
}
