import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireRole from "./components/layout/RequireRole";
import "./app.css";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";

import AdminDashboard from "./pages/adminPages/AdminDashboard";
import AdminProjectInsight from "./pages/adminPages/AdminProjectInsight";
import AdminRiskOverview from "./pages/adminPages/AdminRiskOverview";
import AdminTeam from "./pages/adminPages/AdminTeam"; 
import AdminProject from "./pages/adminPages/AdminProject";

import ProjectManagerDashboard from "./pages/ProjectManagerPages/ProjectManagerDashboard";
import PMTask from "./pages/ProjectManagerPages/PMTask";
import ProjectManagerProject from "./pages/ProjectManagerPages/ProjectManagerProject";
// import PmProject from "./pages/pmPages/PmProject";

import Dashboard from "./pages/superadminPages/Dashboard";
import UsersReport from "./pages/superadminPages/UsersReport";
import ProjectReport from "./pages/superadminPages/ProjectReport";
import TaskReport from "./pages/superAdminPages/TaskReport";
import Admin from "./pages/superadminPages/Admin";
import AdminAuditHistory from "./pages/adminPages/AdminAuditHistory";
import UserLogin from "./components/UserLogin";

import { Navigate } from "react-router-dom";
import PMProjectAnalysis from "./pages/ProjectManagerPages/PMProjectAnalysis";
import TeamAndTaskAnalysis from "./pages/ProjectManagerPages/TeamAndTaskAnalysis";



export default function App(){
  return (
    <>
    <Toaster position='top-right' reverseOrder={false} />
    <BrowserRouter>
    
      <Routes>
         <Route path="/" element={<UserLogin />} />

        <Route element={<MainLayout/>}>
          <Route element={<RequireRole allowedRole="admin"/>}>
            <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
            <Route path="/admin/riskoverview" element={<AdminRiskOverview/>}/>
            <Route path="/admin/projectinsight" element={<AdminProjectInsight/>}/>
            <Route path="/admin/employees" element={<AdminTeam/>}/>
            <Route path="/admin/projects" element={<AdminProject/>}/>
            <Route path="/admin/audithistory" element={<AdminAuditHistory/>}/>
          </Route>


          <Route element={<RequireRole allowedRole="project_manager"/>}>
            <Route path="/pm/dashboard" element={<ProjectManagerDashboard/>}/>
            <Route path="/pm/task" element={<PMTask/>}/>
            <Route path="/pm/projects" element={<ProjectManagerProject/>}/>
             <Route path="/pm/projectAnalysis" element={<PMProjectAnalysis/>}/>
               <Route path="/pm/teaminsight" element={<TeamAndTaskAnalysis/>}/>

            {/* <Route path="/pm/project" element={<PmProject/>}/> */}
          </Route>

          <Route element={<RequireRole allowedRole="super_admin"/>}>
            <Route path="/superadmin/dashboard" element={<Dashboard/>}/>
            <Route path="/superadmin/users" element={<UsersReport/>}/>
            <Route path="/superadmin/project" element={<ProjectReport/>}/>
            <Route path="/superadmin/task" element={<TaskReport/>}/>
            <Route path="/superadmin/admins" element={<Admin/>}/>

            {/* <Route path="/pm/project" element={<PmProject/>}/> */}
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}