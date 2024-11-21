"use client";

import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { useState, useEffect } from "react";

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 60, // 1 hour
            gcTime: 1000 * 60 * 60 * 2, // 2 hours
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [persister, setPersister] = useState<any | null>(null);

  useEffect(() => {
    // Ensure this logic only runs on the client
    if (typeof window !== "undefined") {
      setPersister(
        createSyncStoragePersister({
          storage: window.localStorage,
        })
      );
    }
  }, []);

  // Avoid rendering until persister is set
  if (!persister) return null;

  return (
    <PersistQueryClientProvider
      persistOptions={{ persister }}
      client={queryClient}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
