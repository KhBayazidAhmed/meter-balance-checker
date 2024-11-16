"use client";

import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

export interface Response {
  code: number;
  desc: string;
  data: Data;
}

export interface Data {
  accountNo: string;
  meterNo: string;
  balance: number;
  currentMonthConsumption: number;
  readingTime: string;
}

export default function ChartMeterBalance({
  meterIds,
}: {
  meterIds: {
    meterId: string;
    name: string;
  }[];
}) {
  const isFetching = useIsFetching({ queryKey: ["meterBalance"] });
  const queryClient = useQueryClient();

  if (isFetching) return <div>Loading...</div>;

  const meterBalanceData = meterIds.map((meter) => {
    const response = queryClient.getQueryData([
      "meterBalance",
      meter.meterId,
    ]) as Response | undefined;
    return {
      name: meter.name, // This will show the name on the X-axis
      balance: response?.data.balance || 0, // Default to 0 if data is unavailable
    };
  });

  // Remove meters with invalid data (optional)
  const filteredData = meterBalanceData.filter(
    (meter) => meter.balance !== undefined
  );

  return (
    <div className="chart-container mx-9 w-full  p-4 my-6 bg-white rounded-lg shadow-md ">
      <h2 className="text-xl font-bold mb-4 text-center">Meter Balances</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={filteredData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="balance" fill="#32CD32">
            {/* Green color */}
            <LabelList
              dataKey="balance"
              position="top"
              fontSize={14}
              fill="#000"
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
