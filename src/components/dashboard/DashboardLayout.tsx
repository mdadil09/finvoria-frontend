import { Landmark, PiggyBank, ReceiptText } from "lucide-react";
import { Chart } from "./Chart";
import { LineChartLayout } from "../charts/LineCHart";

const DashboardLayout = () => {
  return (
    <div className="pr-0 pl-0 overflow-hidden">
      <div className="sub-header mb-4">Dashboard</div>
      <div className="dashboard-layout-content overflow-hidden">
        <div className="flex flex-row mb-4">
          <Chart
            title="Bussiness account"
            amount="₹24,098.00"
            icon={<Landmark className="h-4" />}
          />
          <Chart
            title="Tax Reserve"
            amount="₹24,056.00"
            icon={<ReceiptText className="h-4" />}
          />
          <Chart
            title="Savings"
            amount="₹19,080.00"
            icon={<PiggyBank className="h-4" />}
          />
        </div>
        <LineChartLayout />
      </div>
    </div>
  );
};

export default DashboardLayout;
