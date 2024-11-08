import MeterDataShowcase from "../components/MeterDataShowcase";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const number = (await params).number as string;

  // Render the page with conditional data mapping
  return (
    <div className="py-10 px-20 ">
      <h1 className="text-3xl text-center font-bold">
        Meter Data for {number}
      </h1>
      <div className="w-full flex justify-end">
        <Link href={`/${number}/add-meter`}>
          <button className=" border hover:border-blue-700 bg-white hover:text-blue-700 text-black font-bold py-2 px-4 rounded-sm">
            Add Meter
          </button>
        </Link>
      </div>
      <MeterDataShowcase number={number} />
    </div>
  );
}
// function MeterDataShowcaseSkeleton() {
//   return (
//     <div>
//       {Array.from({ length: 5 }).map((_, index) => (
//         <div
//           className="border-b flex py-3 items-center justify-between border-white animate-pulse"
//           key={index}
//         >
//           <div>
//             <h2 className="font-bold text-base">
//               <span className="bg-gray-300 h-5 w-24 rounded-md inline-block"></span>
//               <span className="ml-2 bg-green-200 h-5 w-16 rounded-md inline-block"></span>
//             </h2>
//           </div>
//           <div className="bg-gray-300 h-5 w-12 rounded-md"></div>
//         </div>
//       ))}
//     </div>
//   );
// }
