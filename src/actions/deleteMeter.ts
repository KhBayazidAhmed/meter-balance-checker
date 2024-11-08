"use server";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { MetersTable } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Initialize database connection
const db = drizzle();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function deleteMeter(_preventDefault: any, formData: FormData) {
  try {
    const meterId = formData.get("meterId") as string;
    const mobileNumber = formData.get("mobileNumber") as string;
    // Step 2: Delete the meter if it is associated with the user's ID
    const result = await db
      .delete(MetersTable)
      .where(and(eq(MetersTable.meterId, meterId)));

    if (result.rowCount === 0) {
      return {
        success: false,
        message: "Meter not found or does not belong to the user",
      };
    }
    revalidatePath(`/${mobileNumber}/add-meter`);
  } catch (error) {
    console.error("Error deleting meter:", error);
    return {
      success: false,
      error: "An error occurred while deleting the meter",
    };
  }
}
