/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pie, PieChart as RechartsPieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
const chartData = [
  { type: "Shopping", expenditure: 275, fill: "#204CFC" },
  { type: "Home", expenditure: 200, fill: "#ABB8C4" },
  { type: "Others", expenditure: 287, fill: "#0D0F10" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

function CustomLegend(data: any) {
  return (
    <ul className="space-y-2">
      {data?.data.map((entry: any, index: number) => {
        return (
          <div key={`item-${index}`} className="flex items-center gap-2 mr-2">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.fill }}
            />
            <div className="ml-1">
              <div className="text-16-semibold">₹{entry.expenditure}.00</div>
              <div className="text-10-semibold text-dark-600">{entry.type}</div>
            </div>
          </div>
        );
      })}
    </ul>
  );
}

export function PieChart() {
  return (
    <div className="flex items-center justify-between bg-slate-100">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square h-[162px]"
      >
        <RechartsPieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="expenditure"
            nameKey="type"
            innerRadius={40}
            strokeWidth={80}
            fill="#8884d8"
            stroke="none"
          ></Pie>
        </RechartsPieChart>
      </ChartContainer>
      <CustomLegend data={chartData} />
    </div>
  );
}
