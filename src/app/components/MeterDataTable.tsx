import React from "react";
import { getMeterData } from "@/actions/getMeterData";
import DeleteMeterData from "./DeleteMeterData";

export default async function MeterDataTable({ number }: { number: string }) {
  const meterData = await getMeterData(number);
  return (
    <div>
      {meterData.map((meter, index) => (
        <div
          className="border-b flex py-3 items-center justify-between border-white"
          key={index}
        >
          <div>
            <h2 className="font-bold text-base">
              {" "}
              Name :{" "}
              <span className="text-green-500 font-semibold ">
                {meter.name}
              </span>
            </h2>
            <p> Meter Id : {meter.meterId}</p>
          </div>
          <DeleteMeterData meterId={meter.meterId} mobileNumber={number} />
        </div>
      ))}
    </div>
  );
}
