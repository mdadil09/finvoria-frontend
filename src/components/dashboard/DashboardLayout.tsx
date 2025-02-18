import { Landmark, PiggyBank, ReceiptText } from "lucide-react";
import { Chart } from "./Chart";
import { LineChartLayout } from "../charts/LineChart";
import { DataTable } from "../table/DataTable";
import { transactions } from "../../lib/db";
import { columns } from "../table/column";
import RightSection from "./RIghtSection";

const DashboardLayout = () => {
  return (
    <div className="pr-0 pl-0">
      <div className="sub-header mb-4">Dashboard</div>
      <div className="flex flex-wrap lg:flex-nowrap items-start justify-between w-full">
        <div className="w-full lg:w-[60%]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between mb-4 sm:w-full">
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
            <div className="mb-4 w-[calc(100%-1rem)]">
              <DataTable
                columns={columns()}
                data={transactions}
                isPaginationEnabled={false}
                isHeaderTrue={false}
              />
            </div>
          </div>
        </div>
        {/* Right section */}
        <div className="w-full lg:w-[40%]">
          <RightSection />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
