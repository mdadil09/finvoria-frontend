/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bar, BarChart as RechartsBarChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#204CFC",
  },
} satisfies ChartConfig;

export function BarChartLayout(data: any) {
  console.log(data.data);

  return (
    <ChartContainer
      config={chartConfig}
      className="z-100 h-32 lg:w-52 xl:w-52 2xl:w-52 md:w-52 -ml-4 sm:w-full"
    >
      <RechartsBarChart data={data.data}>
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="desktop" fill="#204CFC" radius={4} />
      </RechartsBarChart>
    </ChartContainer>
  );
}
