import { BrowserRouter, Routes, Route } from "react-router-dom";

import Registration from "./pages/Registration";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Employee from "./pages/Employee";
import EmployeeCalendar from "./pages/EmployeeCalendar";
import AvailableShifts from "./pages/AvailableShifts";
import TodayLogs from "./pages/TodayLogs";
import HoursPage from "./pages/HoursPage";
import ShiftAssignment from "./pages/ShiftAssignment";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route path="/" element={<Registration />} />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/employees" element={<Employee />} />
        <Route path="/admin/calendar" element={<EmployeeCalendar />} />
        <Route path="/admin/shift-assignment" element={<ShiftAssignment />} />

        {/* EMPLOYEE */}
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/employee/shifts" element={<AvailableShifts />} />
        <Route path="/employee/logs" element={<TodayLogs />} />
        <Route path="/employee/hours" element={<HoursPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;