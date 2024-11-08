import React from "react";

export default function loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4   bg-black text-white p-4">
      <div className="flex flex-col items-center gap-6 w-full max-w-lg border border-white p-6 rounded-lg">
        <h1 className="text-2xl font-semibold text-center">Loading...</h1>
      </div>
    </div>
  );
}

export function LoadingSkeleton() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4   bg-black text-white p-4">
      <div className="flex flex-col items-center gap-6 w-full max-w-lg border border-white p-6 rounded-lg">
        <h1 className="text-2xl font-semibold text-center">Loading...</h1>
        <div className="w-full flex justify-end">
          <div className="bg-gray-300 h-5 w-12 rounded-md"></div>
          <div className="bg-gray-300 h-5 w-12 rounded-md"></div>
          <div className="bg-gray-300 h-5 w-12 rounded-md"></div>
          <div className="bg-gray-300 h-5 w-12 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
