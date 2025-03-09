/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Landmark, PiggyBank, ReceiptText } from "lucide-react";
import { Chart } from "./Chart";
import { LineChartLayout } from "../charts/LineChart";
import { DataTable } from "../table/DataTable";
import { transactions } from "../../lib/db";
import { columns } from "../table/column";
import RightSection from "./RightSection";
import { useSelector } from "react-redux";
import ProgressBar from "./ProgressBar";
import PieChartLayout from "./PieChartLayout";

const DashboardLayout = () => {
  const user = useSelector((state: any) => state.auth.user);
  return (
    <div className="pl-4 pr-0 sm:pl-0 sm:pr-0">
      <div className="sub-header mb-4">Dashboard</div>
      <div className="flex flex-wrap lg:flex-nowrap items-start justify-between w-full">
        <div className="w-full lg:w-[69%]">
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
              {user?.role === "ADMIN" && (
                <DataTable
                  columns={columns()}
                  data={transactions}
                  isPaginationEnabled={false}
                  isHeaderTrue={false}
                />
              )}
              {user?.role === "USER" && (
                <div className="flex flex-wrap justify-between items-center w-full sm:w-full">
                  <ProgressBar />
                  <PieChartLayout />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Right section */}
        <div className="w-full lg:w-[30%]">
          <RightSection />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
