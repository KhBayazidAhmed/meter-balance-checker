"use client";

import { fetchMeterBalance } from "@/lib/helper";
import { useQueries } from "@tanstack/react-query";
import MeterDailyConsumption from "./MeterDailyConsumption";

export default function MeterBalanceShowcase({
  meterIds,
}: {
  meterIds: {
    meterId: string;
    name: string;
  }[];
}) {
  const result = useQueries({
    queries: meterIds.map((meterId) => ({
      queryKey: ["meterBalance", meterId.meterId],
      queryFn: () => fetchMeterBalance(meterId.meterId),
      staleTime: 1000 * 60 * 60, // 1 hour
      refetchOnWindowFocus: false,
    })),
  });

  return (
    <>
      {result.map((meter, index) => (
        <div
          className="border-b flex py-3  items-center justify-between border-white flex-wrap xl:flex-nowrap"
          key={index}
        >
          <div className="w-full pl-3 md:w-auto">
            <h2 className="font-bold text-sm md:text-base">
              Name:{" "}
              <span className="text-green-500 font-semibold">
                {meterIds[index].name}
              </span>
            </h2>
            <div className="flex flex-col self-center gap-2 items-center pr-8 w-full md:w-auto">
              <div className="w-full">
                <h2 className="font-bold text-sm md:text-base">
                  Meter No:{" "}
                  <span className="text-green-500 font-semibold">
                    {meter.isLoading ? "Loading..." : meter.data?.data.meterNo}
                  </span>
                </h2>
                <h2 className="font-bold text-sm md:text-base">
                  Balance:{" "}
                  <span className="text-green-500 font-semibold">
                    {meter.isLoading
                      ? "Loading..."
                      : meter.data?.data.balance + " BDT"}
                  </span>
                </h2>
                <h2 className="font-bold text-sm md:text-base">
                  ReadingTime:{" "}
                  <span className="text-green-500 font-semibold">
                    {meter.isLoading
                      ? "Loading..."
                      : meter.data?.data.readingTime
                      ? new Intl.DateTimeFormat("en-BD", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                          timeZone: "Asia/Dhaka",
                        }).format(new Date(meter.data.data.readingTime))
                      : ""}
                  </span>
                </h2>
                <h2 className="font-bold text-sm md:text-base">
                  Current Month Consumption:{" "}
                  <span className="text-green-500 font-semibold">
                    {meter.isLoading
                      ? "Loading..."
                      : meter.data?.data.currentMonthConsumption + " BDT"}
                  </span>
                </h2>
              </div>
            </div>
          </div>
          <MeterDailyConsumption meterId={meterIds[index].meterId} />
        </div>
      ))}
    </>
  );
}
