import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center gap-4 flex-col items-center min-h-screen">
      <h1 className="text-3xl text-balance  md:text-5xl font-semibold text-center ">
        Meter Balance Checker with some Analytics
      </h1>
      <Link
        className="border-2 border-white rounded-md px-4 py-2 text-center"
        href="/create-user"
      >
        {" "}
        Make User to Add Meters{" "}
      </Link>
    </main>
  );
}
