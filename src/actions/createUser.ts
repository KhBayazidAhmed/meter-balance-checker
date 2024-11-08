"use server";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { UsersTable, UserInsert } from "@/drizzle/schema"; // Import schema and types
import { eq } from "drizzle-orm";

// Initialize database connection
const db = drizzle();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createUser = async (_privState: any, formData: FormData) => {
  try {
    const mobileNumber = formData.get("mobileNumber") as string;

    if (!mobileNumber) {
      throw new Error("Mobile number is required");
    }
    // Check if user already exists
    const existingUser = await db
      .select()
      .from(UsersTable)
      .where(eq(UsersTable.mobileNumber, mobileNumber));

    if (existingUser.length > 0) {
      return {
        success: false,
        redirectTo: mobileNumber,
        error: " Account with this mobile number already exists",
      };
    }

    // Prepare user data
    const userData: UserInsert = {
      mobileNumber,
    };

    // Insert new user
    await db.insert(UsersTable).values(userData);

    return {
      success: true,
      message: "User created successfully",
      redirectTo: mobileNumber,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error.message);
    return {
      success: false,
      error: error.message || "An unknown error occurred",
    };
  }
};
