import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { BarChartLayout } from "../charts/BarChart";
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
];

export function Chart({
  title,
  amount,
  icon,
}: {
  title: string;
  amount: string;
  icon: JSX.Element;
}) {
  return (
    <Card className="h-48 w-56 mr-4 flex flex-col">
      <CardHeader className="p-2">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-12-semibold text-dark-600 tracking-wide">
              {title}
            </div>
            <div className="text-16-semibold">{amount}</div>
          </div>
          <div>
            <div className="flex items-center justify-center h-8 w-8 bg-slate-100 rounded-lg">
              {icon}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <BarChartLayout data={chartData} />
      </CardContent>
    </Card>
  );
}
