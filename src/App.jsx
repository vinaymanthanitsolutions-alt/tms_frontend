import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireRole from "./components/layout/RequireRole";
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

import Dashboard from "./pages/superAdminPages/Dashboard";
import UsersReport from "./pages/superAdminPages/UsersReport";
import ProjectReport from "./pages/superAdminPages/ProjectReport";
import TaskReport from "./pages/superAdminPages/TaskReport";
import Admin from "./pages/superAdminPages/Admin";
import AdminAuditHistory from "./pages/adminPages/AdminAuditHistory";



export default function App(){
  return (
    <>
    <Toaster position='top-right' reverseOrder={false} />
    <BrowserRouter>
    
      <Routes>
         <Route path="/" element={<Home />} />
        <Route element={<MainLayout/>}>
          <Route element={<RequireRole allowedRole="admin"/>}>
            <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
            <Route path="/admin/riskoverview" element={<AdminRiskOverview/>}/>
            <Route path="/admin/projectinsight" element={<AdminProjectInsight/>}/>
            <Route path="/admin/employees" element={<AdminTeam/>}/>
            <Route path="/admin/projects" element={<AdminProject/>}/>
            <Route path="/admin/audithistory" element={<AdminAuditHistory/>}/>
          </Route>


          <Route element={<RequireRole allowedRole="pm"/>}>
            <Route path="/pm/dashboard" element={<ProjectManagerDashboard/>}/>
            <Route path="/pm/team" element={<PMTask/>}/>
            <Route path="/pm/projects" element={<ProjectManagerProject/>}/>

            {/* <Route path="/pm/project" element={<PmProject/>}/> */}
          </Route>

          <Route element={<RequireRole allowedRole="superadmin"/>}>
            <Route path="/superadmin/dashboard" element={<Dashboard/>}/>
            <Route path="/superadmin/users" element={<UsersReport/>}/>
            <Route path="/superadmin/project" element={<ProjectReport/>}/>
            <Route path="/superadmin/task" element={<TaskReport/>}/>
            <Route path="/superadmin/admins" element={<Admin/>}/>

            {/* <Route path="/pm/project" element={<PmProject/>}/> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}