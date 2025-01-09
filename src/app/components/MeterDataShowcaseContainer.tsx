import { MetersTable, UsersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/vercel-postgres";
import MeterBalanceShowcase from "./MeterBalanceShowcase";
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
    .where(eq(UsersTable.mobileNumber, number))
    .orderBy(MetersTable.name);

  if (data.length === 0) {
    return <div className="text-center">Meter Data Not Found</div>;
  }
  return (
    <>
      <div className="w-full border-b border-white  flex justify-center items-center my-8">
        <ChartMeterBalance meterIds={data} />
      </div>
      <div className="flex flex-col ">
        <MeterBalanceShowcase meterIds={data} />
      </div>
    </>
  );
}
