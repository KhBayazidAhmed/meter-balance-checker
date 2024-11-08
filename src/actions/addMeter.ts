"use server";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { UsersTable, MetersTable } from "@/drizzle/schema"; // Import schema and types
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Initialize database connection
const db = drizzle();
export const addMeter = async (_privState: unknown, formData: FormData) => {
  try {
    // Extract form data
    const mobileNumber = formData.get("mobileNumber") as string;
    const meterName = formData.get("meterName") as string;
    const meterId = formData.get("meterId") as string;

    // Validate required fields
    if (!mobileNumber || !meterName || !meterId) {
      throw new Error("Mobile number, meter ID, and meter name are required.");
    }

    // Check if user exists
    const existingUser = await db
      .select()
      .from(UsersTable)
      .where(eq(UsersTable.mobileNumber, mobileNumber));

    if (existingUser.length === 0) {
      throw new Error("User not found.");
    }

    // Insert new meter associated with the user's ID
    await db.insert(MetersTable).values({
      name: meterName,
      meterId: meterId,
      userId: existingUser[0].id,
    });
    revalidatePath(`/${[mobileNumber]}/add-meter`);
    return {
      success: true,
      message: "Meter added successfully.",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error:", error.message);
    return {
      success: false,
      error: error.message || "An unknown error occurred.",
    };
  }
};
