import { MetersTable, UsersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/vercel-postgres";
import MeterBalanceShowcase from "./MeterBalanceShowcase";
import MeterDailyConsumption from "./MeterDailyConsumption";
import ChartMeterBalance from "./ChartMeterBalance";
const db = drizzle();

export default async function MeterDataShowcase({
  number,
}: {
  number: string;
}) {
  // Fetch the user and meter data in a single query using a join
  const data = await db
    .select({
      meterId: MetersTable.meterId,
      name: MetersTable.name,
    })
    .from(MetersTable)
    .innerJoin(UsersTable, eq(MetersTable.userId, UsersTable.id))
    .where(eq(UsersTable.mobileNumber, number));
  if (data.length === 0) {
    return <div className="text-center">Meter Data Not Found</div>;
  }
  return (
    <>
      <div className="w-full flex justify-center items-center my-8">
        <ChartMeterBalance meterIds={data} />
      </div>
      <div>
        {data.map((meter, index) => (
          <div
            className="border-b flex py-3 items-center justify-between border-white flex-wrap md:flex-nowrap"
            key={index}
          >
            <div className="w-full md:w-auto">
              <h2 className="font-bold text-sm md:text-base">
                Name:{" "}
                <span className="text-green-500 font-semibold">
                  {meter.name}
                </span>
              </h2>
            </div>
            <div className="flex gap-2 items-center w-full md:w-auto justify-center mt-4 md:mt-0">
              <MeterBalanceShowcase meterId={meter.meterId} />
              <MeterDailyConsumption meterId={meter.meterId} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
