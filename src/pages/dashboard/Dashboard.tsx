import DashboardLayout from "../../components/dashboard/DashboardLayout";
import NavigationLayout from "../../components/navbar/Sidebar";
import { useSidebar } from "../../components/ui/sidebar";

const Dashboard = () => {
  const { open } = useSidebar();
  return (
    <div className="">
      <NavigationLayout />
      <div
        className={`${
          open
            ? "dashboard-layout lg:w-[calc(100%-19rem)] xl:w-[calc(100%-19rem)] 2xl:w-[calc(100%-19rem)] md:w-[calc(100%-19rem)] sm:w-full"
            : "dashboard-layout-full"
        }`}
      >
        <DashboardLayout />
      </div>
    </div>
  );
};

export default Dashboard;
