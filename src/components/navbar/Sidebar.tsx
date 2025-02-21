import { AppSidebar } from "../ui/app-sidebar";
import Navbar from "./Navbar";

export default function NavigationLayout() {
  return (
    <div className="z-50 max-w-8xl flex flex-col">
      <Navbar />
      <AppSidebar />
    </div>
  );
}
