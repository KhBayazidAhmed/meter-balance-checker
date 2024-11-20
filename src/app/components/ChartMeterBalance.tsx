"use client";

import { Response } from "@/lib/types";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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

  const meterBalanceData = meterIds.map((meter) => {
    const response = queryClient.getQueryData([
      "meterBalance",
      meter.meterId,
    ]) as Response | undefined;
    return {
      name: meter.name,
      balance: response?.data.balance || 0,
    };
  });
  if (!meterBalanceData && isFetching)
    return (
      <Card className="my-6 w-full max-w-4xl mx-auto bg-transparent border-0">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-white">
            Meter Balances
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center bg-transparent">
          <Skeleton className="h-[50px] w-[200px]" />
        </CardContent>
      </Card>
    );

  const filteredData = meterBalanceData.filter(
    (meter) => meter.balance !== undefined
  );

  return (
    <Card className="my-6 w-full max-w-4xl mx-auto bg-transparent border-0">
      <CardHeader>
        <CardTitle className="text-center text-2xl text-white">
          Meter Balances
        </CardTitle>
        <CardDescription className="text-center text-sm text-white">
          Balance data as of yesterday at 12:00 AM
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-transparent">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={filteredData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Bar dataKey="balance" fill="#32CD32" radius={[4, 4, 0, 0]}>
              <LabelList
                dataKey="balance"
                position="top"
                fontSize={12}
                fill="#FFF"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <span className="text-white">Reading time: Yesterday at 12:00 AM</span>
        <span className="text-white">Balances may vary slightly</span>
      </CardFooter>
    </Card>
  );
}
