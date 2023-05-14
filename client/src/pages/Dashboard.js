import React from "react";
import { Outlet} from "react-router-dom";
import Sidebar from "./Dashboard/Sidebar";


const Dashboard = () => {
  

  document.title = "Dashboard";
  document.getElementsByTagName("META")[3].content = "Your description about the page or site here to set dynamically";
  
  return(
    <main>
    
      <Sidebar />
      <Outlet/>
    </main>
  )
};

export default Dashboard;
