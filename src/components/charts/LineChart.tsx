import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Income",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const CustomLegend = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-3">
        <span className="flex items-center gap-1 text-12-semibold">
          <span className="w-4 h-1 rounded bg-blue-400"></span> Income
        </span>
        <span className="flex items-center gap-1 text-12-semibold">
          <span className="w-4 h-1 rounded bg-dark-700"></span> Expenses
        </span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center bg-slate-100 text-dark-200 text-12-semibold px-3 py-1 rounded-md text-sm">
          Jan 12 - Jan 16
          <ChevronDown className="ml-auto size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-12 rounded-lg bg-light-200 z-50"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuGroup>
            <DropdownMenuItem>Upgrade to Pro</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export function LineChartLayout() {
  return (
    <Card className="h-72 w-[calc(100%-1rem)]">
      {/* ✅ Properly Aligned Header */}
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="text-18-bold text-dark-200">Money Flow</div>
          <div>
            <CustomLegend />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-48 w-[calc(100%+2rem)] -ml-4"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <Line
              dataKey="desktop"
              type="monotone"
              stroke="#204CFC"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="mobile"
              type="monotone"
              stroke="#ABB8C4"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
