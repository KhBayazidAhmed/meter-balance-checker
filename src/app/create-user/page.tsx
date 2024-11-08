"use client";

import { createUser } from "@/actions/createUser";
import Link from "next/link";
import { useActionState } from "react";

export default function Page() {
  const [state, formAction, isPending] = useActionState(createUser, null);

  return (
    <main className="flex justify-center items-center min-h-screen bg-black text-white p-4">
      <div className="flex flex-col items-center gap-6 w-full max-w-lg border border-white p-6 rounded-lg">
        <h1 className="text-2xl font-semibold text-center">
          Create a User to Add Meters or Login
        </h1>
        <p className="text-center text-gray-300">
          Create a user profile to manage and monitor your meters efficiently.
          Once added, you can check all meter balances and view data without
          re-entering meter numbers.
        </p>
        <span
          className={`${state?.success ? "text-green-500" : "text-red-500"}`}
        >
          {state?.success ? state.message : state?.error}
        </span>
        <form action={formAction} className="flex flex-col gap-4 w-full">
          <input
            className="p-2 bg-black text-white border border-white rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            type="text"
            name="mobileNumber"
            required
            min={11}
            placeholder="Mobile Number"
          />
          <button
            disabled={isPending}
            className=" py-2 bg-black text-white font-semibold border border-white rounded-md hover:bg-white hover:text-black transition-colors"
          >
            {isPending ? "Loading..." : "Submit"}
          </button>
          {state?.redirectTo && (
            <Link className="text-center" href={`/${state.redirectTo}`}>
              Go to Add Meter Page
            </Link>
          )}
        </form>
      </div>
    </main>
  );
}
