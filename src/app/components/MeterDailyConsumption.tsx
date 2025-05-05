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
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component

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
  // Sort data by date to ensure chronological order
  const sortedData = [...data].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const dailyConsumption = [];

  // Process consecutive pairs regardless of month
  for (let i = 1; i < sortedData.length; i++) {
    const current = sortedData[i];
    const previous = sortedData[i - 1];

    // Check if dates are consecutive
    const currentDate = new Date(current.date);
    const previousDate = new Date(previous.date);
    const timeDiff = currentDate.getTime() - previousDate.getTime();
    const dayDiff = timeDiff / (1000 * 3600 * 24);

    // Only calculate if days are consecutive (1 day apart)
    if (dayDiff === 1) {
      const dailyUnitConsumption = parseFloat((current.consumedUnit - previous.consumedUnit).toFixed(2));
      const dailyTakaConsumption = parseFloat((current.consumedTaka - previous.consumedTaka).toFixed(2));

      // Only add positive or zero consumption values
      if (dailyUnitConsumption >= 0 && dailyTakaConsumption >= 0) {
        dailyConsumption.push({
          date: current.date,
          dailyUnitConsumption: dailyUnitConsumption,
          dailyTakaConsumption: dailyTakaConsumption,
        });
      }
    }
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
  accountId,
}: {
  meterId: string;
  accountId?: string;
}) {

  const { data, isLoading } = useQuery<ApiResponse>({
    queryKey: ["meterDailyConsumption", meterId],
    queryFn: async () => {
      const response = await fetch(
        `https://prepaid.desco.org.bd/api/tkdes/customer/getCustomerDailyConsumption?accountNo=${accountId}&meterNo=${meterId}&dateFrom=${fifteenDaysAgoDate}&dateTo=${yesterdayDate}`
      );
      return response.json();
    },
  });

  const dailyConsumption = calculateDailyConsumption(data?.data || []);

  return (
    <div className="w-full flex flex-col items-center">
      {isLoading ? (
        <Skeleton className="w-full h-[200px] my-4 md:w-[900px] md:h-[300px]" />
      ) : (
        <ChartContainer
          config={chartConfig}
          className="w-full h-[200px] my-4 md:h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={dailyConsumption}
              margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
            >
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
                interval={0} 
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
                  offset: 20,

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
                  offset: 20,

                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      )}
    </div>
  );
}
