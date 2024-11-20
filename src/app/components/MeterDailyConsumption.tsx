"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";

type MeterConsumption = {
  date: string;
  consumedTaka: number;
  consumedUnit: number;
};

type ApiResponse = {
  code: number;
  desc: string;
  data: MeterConsumption[];
};
const chartConfig = {
  dailyUnitConsumption: {
    label: "Daily Unit Consumption",
    color: "hsl(var(--chart-1))",
  },
  dailyTakaConsumption: {
    label: "Daily Taka Consumption",
    color: "hsl(var(--chart-2))",
  },
};
function calculateDailyConsumption(data: MeterConsumption[]) {
  const dailyConsumption = [];
  let previousEntry = null;
  let currentMonth = null;

  // Iterate over the data once and calculate consumption dynamically
  for (const entry of data) {
    const date = new Date(entry.date);
    const month = date.getMonth(); // Extract month from the date

    // If we're in a new month, reset tracking
    if (month !== currentMonth) {
      currentMonth = month; // Update the current month
      previousEntry = null; // Reset previous entry
    }

    if (previousEntry) {
      const dailyUnitConsumption =
        entry.consumedUnit - previousEntry.consumedUnit;
      const dailyTakaConsumption =
        entry.consumedTaka - previousEntry.consumedTaka;

      dailyConsumption.push({
        date: entry.date,
        dailyUnitConsumption: Math.round(dailyUnitConsumption),
        dailyTakaConsumption: Math.round(dailyTakaConsumption),
      });
    }

    previousEntry = entry; // Store the current entry for the next iteration
  }

  return dailyConsumption;
}
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const fifteenDaysAgo = new Date(yesterday.getTime() - 1000 * 60 * 60 * 24 * 15);

const formatDate = (date: Date) => date.toISOString().split("T")[0];
const yesterdayDate = formatDate(yesterday);
const fifteenDaysAgoDate = formatDate(fifteenDaysAgo);

export default function MeterDailyConsumption({
  meterId,
}: {
  meterId: string;
}) {
  const { data } = useQuery<ApiResponse>({
    queryKey: ["meterDailyConsumption", meterId],
    queryFn: async () => {
      const response = await fetch(
        `https://prepaid.desco.org.bd/api/tkdes/customer/getCustomerDailyConsumption?meterNo=${meterId}&dateFrom=${fifteenDaysAgoDate}&dateTo=${yesterdayDate}`
      );
      return response.json();
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
  const dailyConsumption = calculateDailyConsumption(data?.data || []);
  return (
    <ChartContainer config={chartConfig} className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={dailyConsumption}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            dataKey="date"
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            }
            angle={-45}
            textAnchor="end"
            height={70}
          />
          <YAxis
            yAxisId="left"
            orientation="left"
            stroke="hsl(var(--chart-1))"
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="hsl(var(--chart-2))"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
          />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="dailyUnitConsumption"
            stroke="hsl(var(--chart-1))"
            activeDot={{ r: 8 }}
            dot={{ r: 4 }}
            label={{
              position: "top",
              fill: "hsl(var(--chart-1))",
              fontSize: 10,
              offset: 10,
            }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="dailyTakaConsumption"
            stroke="hsl(var(--chart-2))"
            activeDot={{ r: 8 }}
            dot={{ r: 4 }}
            label={{
              position: "bottom",
              fill: "hsl(var(--chart-2))",
              fontSize: 10,
              offset: 10,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
