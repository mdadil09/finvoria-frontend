import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Link } from "react-router-dom";
import { PieChart } from "../charts/PieChart";

const PieChartLayout = () => {
  return (
    <Card className="flex-1 ml-0 sm:ml-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="text-18-bold text-dark-200">Statistics</div>
          <Link
            to={"/activity/transactions"}
            className="flex items-center bg-slate-100 px-2 py-1 rounded-md text-12-semibold text-dark-200"
          >
            View All{" "}
            <ChevronRight
              style={{
                height: "16px",
                width: "16px",
                fontWeight: "semibold",
                marginLeft: "4px",
                marginRight: "0px",
              }}
            />
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <PieChart />
      </CardContent>
    </Card>
  );
};

export default PieChartLayout;
