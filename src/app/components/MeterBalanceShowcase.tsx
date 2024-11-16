"use client";

import { useQuery } from "@tanstack/react-query";
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

export default function MeterBalanceShowcase({ meterId }: { meterId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["meterBalance", meterId],
    queryFn: async () => {
      const response = await fetch(
        `https://prepaid.desco.org.bd/api/tkdes/customer/getBalance?meterNo=${meterId}`
      );
      const data = (await response.json()) as Response;
      return data;
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
  return (
    <div className="flex flex-col self-center gap-2 items-center pr-8 w-full md:w-auto">
      <div className="w-full">
        <h2 className="font-bold text-sm md:text-base">
          Meter No:{" "}
          <span className="text-green-500 font-semibold">
            {isLoading ? "Loading..." : data?.data.meterNo}
          </span>
        </h2>
        <h2 className="font-bold text-sm md:text-base">
          Balance:{" "}
          <span className="text-green-500 font-semibold">
            {isLoading ? "Loading..." : data?.data.balance + " BDT"}
          </span>
        </h2>
        <h2 className="font-bold text-sm md:text-base">
          ReadingTime:{" "}
          <span className="text-green-500 font-semibold">
            {isLoading
              ? "Loading..."
              : data?.data.readingTime
              ? new Intl.DateTimeFormat("en-BD", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                  timeZone: "Asia/Dhaka",
                }).format(new Date(data.data.readingTime))
              : ""}
          </span>
        </h2>
        <h2 className="font-bold text-sm md:text-base">
          Current Month Consumption:{" "}
          <span className="text-green-500 font-semibold">
            {isLoading
              ? "Loading..."
              : data?.data.currentMonthConsumption + " BDT"}
          </span>
        </h2>
      </div>
    </div>
  );
}
