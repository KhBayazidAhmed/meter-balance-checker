"use client";

import { addMeter } from "@/actions/addMeter";
import React, { useActionState } from "react";

export default function FormMeterAdd({
  mobileNumber,
}: {
  mobileNumber: string;
}) {
  const [state, formAction, isPending] = useActionState(addMeter, null);
  return (
    <>
      <span className={`${state?.success ? "text-green-500" : "text-red-500"}`}>
        {state?.success ? state.message : state?.error}
      </span>
      <form action={formAction} className="flex flex-col gap-4 w-full">
        <input
          className="p-2 bg-black text-white border border-white rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
          type="text"
          name="meterName"
          required
          placeholder="Identifier Name"
        />
        <input type="hidden" name="mobileNumber" value={mobileNumber} />
        <input
          className="p-2 bg-black text-white border border-white rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
          type="number"
          name="meterId"
          required
          placeholder="meter Id"
        />
        <button
          disabled={isPending}
          className=" py-2 bg-black text-white font-semibold border border-white rounded-md hover:bg-white hover:text-black transition-colors"
        >
          {isPending ? "Loading..." : "Submit"}
        </button>
      </form>
    </>
  );
}
