import { Response } from "./types";

export const fetchMeterBalance = async (meterId: string) => {
  try {
    const response = await fetch(
      `https://prepaid.desco.org.bd/api/tkdes/customer/getBalance?meterNo=${meterId}`
    );
    if (!response.ok) throw new Error("Failed to fetch data");
    const data: Response = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching balance for meter ${meterId}:`, error);
    throw error;
  }
};
