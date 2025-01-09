"use client";

import dynamic from "next/dynamic";
import { useMediaQuery } from "react-responsive";
import { useQueries } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo } from "react";
import { fetchMeterBalance } from "@/lib/helper";

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
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Use `useQueries` to fetch data for all meter IDs
  const results = useQueries({
    queries: meterIds.map((meter) => ({
      queryKey: ["meterBalance", meter.meterId],
      queryFn: () => fetchMeterBalance(meter.meterId),
    })),
  });

  // Determine loading state
  const isFetching = results.some((result) => result.isFetching);

  // Filter data to include only meters with valid balances
  const filteredData = useMemo(() => {
    return results
      .filter(
        (result) => result.data && result.data.data?.balance !== undefined
      )
      .map((result, index) => ({
        name: meterIds[index].name,
        balance: result.data?.data.balance || 0,
        readingTime: result.data?.data.readingTime,
      }));
  }, [results, meterIds]);

  // Show skeleton loader while fetching or if no data
  if (isFetching) {
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
  }

  // Render charts based on screen size
  return isMobile ? (
    <MobileChart filteredData={filteredData} />
  ) : (
    <DesktopChart filteredData={filteredData} />
  );
}
