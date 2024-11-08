"use server";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { MetersTable, UsersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";

// Initialize database connection
const db = drizzle();

// Cache the getMeterData function
export const getMeterData = cache(
  async (mobileNumber: string) => {
    try {
      // First, get the user's ID using the mobile number
      const userData = await db
        .select({
          id: UsersTable.id,
        })
        .from(UsersTable)
        .where(eq(UsersTable.mobileNumber, mobileNumber));

      if (userData.length === 0) {
        console.log("User not found");
        return []; // Return an empty array if the user is not found
      }

      const userId = userData[0].id;

      // Then, retrieve all meters associated with this user ID
      const meterData = await db
        .select({
          meterId: MetersTable.meterId,
          name: MetersTable.name,
        })
        .from(MetersTable)
        .where(eq(MetersTable.userId, userId));

      return meterData;
    } catch (error) {
      console.error("Error fetching meter data:", error);
      return []; // Return an empty array in case of an error
    }
  },
  ["getMeterData"]
);
