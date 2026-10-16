export type InvoiceStatus = "Paid" | "Pending" | "Overdue";

export type Invoice = {
  number: string;
  client: string;
  initials: string;
  date: string;
  amount: number;
  status: InvoiceStatus;
};

export const demoInvoices: Invoice[] = [
  {
    number: "BB-2026-0241",
    client: "Mango Tree Studio",
    initials: "MT",
    date: "Oct 16, 2026",
    amount: 125000,
    status: "Paid",
  },
  {
    number: "BB-2026-0240",
    client: "Northstar Digital",
    initials: "ND",
    date: "Oct 14, 2026",
    amount: 72000,
    status: "Pending",
  },
  {
    number: "BB-2026-0239",
    client: "Aarav Mehta",
    initials: "AM",
    date: "Oct 12, 2026",
    amount: 38500,
    status: "Paid",
  },
  {
    number: "BB-2026-0238",
    client: "Paper Kite Co.",
    initials: "PK",
    date: "Oct 09, 2026",
    amount: 90000,
    status: "Overdue",
  },
  {
    number: "BB-2026-0237",
    client: "Studio Meridian",
    initials: "SM",
    date: "Oct 06, 2026",
    amount: 80000,
    status: "Pending",
  },
  {
    number: "BB-2026-0236",
    client: "Bluebell Works",
    initials: "BW",
    date: "Oct 02, 2026",
    amount: 63000,
    status: "Paid",
  },
];

export const formatRupees = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);