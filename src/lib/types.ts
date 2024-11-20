export interface Response {
  code: number;
  desc: string;
  data: Data;
}

export interface Data {
  accountNo: string;
  meterNo: string;
  balance: number;
  currentMonthConsumption: number;
  readingTime: string;
}
