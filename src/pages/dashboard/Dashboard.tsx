import DashboardLayout from "../../components/dashboard/DashboardLayout";
import NavigationLayout from "../../components/navbar/Sidebar";
import { useSidebar } from "../../components/ui/sidebar";

const Dashboard = () => {
  const { open } = useSidebar();
  return (
    <div className="">
      <NavigationLayout />
      <div className={`${open ? "dashboard-layout" : "dashboard-layout-full"}`}>
        <DashboardLayout />
      </div>
    </div>
  );
};

export default Dashboard;
