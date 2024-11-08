"use client";

import { createUser } from "@/actions/createUser";
import { useActionState } from "react";

export default function FormUserSignup({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, formAction, isPending] = useActionState(createUser, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full">
      <span
        aria-live="polite"
        className={`${state?.error ? "text-red-500" : "text-red-500"}`}
      >
        {state?.error ? state.error : state?.success ? "Success!" : ""}
      </span>
      {children}
      <button
        disabled={isPending}
        className="py-2 bg-black text-white font-semibold border border-white rounded-md hover:bg-white hover:text-black transition-colors"
      >
        {isPending ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}
