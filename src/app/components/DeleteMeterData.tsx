"use client";

import React, { useActionState } from "react";
import { deleteMeter } from "@/actions/deleteMeter";

export default function DeleteMeterData({
  meterId,
  mobileNumber,
}: {
  meterId: string;
  mobileNumber: string;
}) {
  const [state, formAction, isPending] = useActionState(deleteMeter, null);
  return (
    <div>
      <span>{state?.success ? state.message : state?.error}</span>
      <form action={formAction}>
        <input type="hidden" name="meterId" value={meterId} />
        <input type="hidden" name="mobileNumber" value={mobileNumber} />

        <button
          typeof="submit"
          className="bg-black py-2 px-3 justify-items-end text-white font-semibold border border-white rounded-md hover:bg-white hover:text-black transition-colors"
        >
          {isPending ? "Loading..." : "Delete"}
        </button>
      </form>
    </div>
  );
}
