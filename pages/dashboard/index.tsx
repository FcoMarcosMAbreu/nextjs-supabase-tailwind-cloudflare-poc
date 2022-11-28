import React from "react";
import { getDashboardLayout } from "../../components/dashboard-layout";

const Dashboard = () => {
  return <div>If you can view this page you are logged in.</div>;
};

export default Dashboard;

Dashboard.getLayout = getDashboardLayout;
