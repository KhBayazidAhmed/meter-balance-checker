"use server";

export async function getMeterData(mobileNumber: string) {
  try {
    if (!mobileNumber) {
      throw new Error("Mobile Number is required");
    }
    if (mobileNumber.length !== 12) {
      throw new Error("Mobile Number must be 12 digits");
    }
    const response = await fetch(
      `https://prepaid.desco.org.bd/api/tkdes/customer/getBalance?meterNo=${mobileNumber}`,
      {
        next: {
          tags: [mobileNumber],
          revalidate: 7200,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return {
      success: true,
      message: "Meter Data Fetched Successfully",
      error: null,
      data: data,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message,
      error: error.message,
    };
  }
}
