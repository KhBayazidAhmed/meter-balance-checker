"use client";

import dynamic from "next/dynamic";
import { useMediaQuery } from "react-responsive";
import { Response } from "@/lib/types";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo } from "react";

// Dynamically import the chart components
const MobileChart = dynamic(() => import("./ChartMobile"), { ssr: false });
const DesktopChart = dynamic(() => import("./ChartDesktop"), { ssr: false });

export default function ChartMeterBalance({
  meterIds,
}: {
  meterIds: {
    meterId: string;
    name: string;
  }[];
}) {
  // Use media query to detect mobile screens
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Use react-query to handle fetching status
  const isFetching = useIsFetching({ queryKey: ["meterBalance"] });
  const queryClient = useQueryClient();

  // Fetch and format the meter balance data
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

  // Memoize filtered data to prevent unnecessary recomputation
  const filteredData = useMemo(
    () => meterBalanceData.filter((meter) => meter.balance !== undefined),
    [meterBalanceData]
  );

  // Show skeleton loader while fetching data
  if (isFetching || !filteredData.length)
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

  // Render different charts based on screen size
  return isMobile ? (
    <MobileChart filteredData={filteredData} />
  ) : (
    <DesktopChart filteredData={filteredData} />
  );
}
