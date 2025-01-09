import { drizzle } from "drizzle-orm/vercel-postgres";
import MeterDataShowcase from "../components/MeterDataShowcaseContainer";
import Link from "next/link";
import { UsersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
const db = drizzle();
export async function generateStaticParams() {
  const users = await db
    .select({
      number: UsersTable.mobileNumber,
    })
    .from(UsersTable);

  return users.map((user) => ({
    number: user.number,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const number = (await params).number as string;
  const user = await db
    .select({
      mobileNumber: UsersTable.mobileNumber,
    })
    .from(UsersTable)
    .where(eq(UsersTable.mobileNumber, number));

  if (user.length === 0) {
    notFound();
  }
  // Render the page with conditional data mapping
  return (
    <div className="md:py-10 md:px-20 ">
      <h1 className="text-3xl text-center font-bold">
        Meter Data for {number}
      </h1>
      <div className="w-full flex justify-end">
        <Link prefetch={true} href={`/${number}/add-meter`}>
          <button className=" border hover:border-blue-700 bg-white hover:text-blue-700 text-black font-bold py-2 px-4 rounded-sm">
            Add Meter
          </button>
        </Link>
      </div>
      <MeterDataShowcase number={number} />
    </div>
  );
}
