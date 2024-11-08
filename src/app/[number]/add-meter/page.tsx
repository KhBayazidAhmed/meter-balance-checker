import FormMeterAdd from "@/app/components/FormMeterAdd";
import MeterDataTable from "@/app/components/MeterDataTable";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const number = (await params).number;
  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-black text-white p-4">
      <div className="flex flex-col items-center gap-6 w-full max-w-lg border border-white p-6 rounded-lg">
        <h1 className="text-2xl font-semibold text-center">
          Your Number :{number}
        </h1>
        <Link href={`/${number}`}>
          <button className="border hover:border-blue-700 bg-white hover:text-blue-700 text-black font-bold py-2 px-4 rounded-sm">
            Go Back
          </button>
        </Link>
        <p className="text-center text-gray-300">Add your meter Id with name</p>
        <FormMeterAdd mobileNumber={number} />
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-2xl font-semibold text-center">Meters</h1>
          <p className="text-center text-gray-300">Meters will be shown here</p>
          <MeterDataTable number={number} />
        </div>
      </div>
    </main>
  );
}
