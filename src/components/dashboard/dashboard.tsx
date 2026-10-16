import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Check,
  Clock3,
  FileText,
  LayoutDashboard,
  Plus,
  Search,
  Settings,
  Users,
  UserRound,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { demoInvoices, formatRupees, type Invoice, type InvoiceStatus } from "./demo-data";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard, current: true },
  { label: "Invoices", icon: FileText, current: false },
  { label: "Customers", icon: Users, current: false },
  { label: "Settings", icon: Settings, current: false },
];

function NavigationItems({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav aria-label="Main navigation" className={mobile ? "grid grid-cols-4 gap-1" : "space-y-1"}>
      {navigation.map(({ label, icon: Icon, current }) => (
        <Button
          key={label}
          variant="ghost"
          size={mobile ? "sm" : "default"}
          disabled={!current}
          aria-current={current ? "page" : undefined}
          aria-label={mobile ? label : undefined}
          title={current ? label : `${label} is not available in this demo`}
          className={
            mobile
              ? `h-auto min-h-14 flex-col gap-1 px-1 py-2 text-xs ${current ? "bg-primary/10 text-primary hover:bg-primary/10" : "text-muted-foreground"}`
              : `h-11 w-full justify-start px-3 ${current ? "bg-primary/10 text-primary hover:bg-primary/10" : "text-muted-foreground"}`
          }
        >
          <Icon aria-hidden="true" className="size-[18px]" />
          <span>{label}</span>
          {!mobile && !current && (
            <span className="ml-auto text-[11px] font-normal text-muted-foreground">Soon</span>
          )}
        </Button>
      ))}
    </nav>
  );
}

function MetricCard({
  title,
  amount,
  caption,
  icon: Icon,
  tone,
}: {
  title: string;
  amount: string;
  caption: string;
  icon: typeof FileText;
  tone: "primary" | "paid" | "pending" | "overdue";
}) {
  const iconTone = {
    primary: "bg-primary/10 text-primary",
    paid: "bg-paid/10 text-paid",
    pending: "bg-pending/10 text-pending",
    overdue: "bg-overdue/10 text-overdue",
  }[tone];

  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm" aria-label={title}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-3 text-[26px] font-semibold leading-tight text-foreground">{amount}</p>
        </div>
        <span className={`grid size-10 shrink-0 place-items-center rounded-lg ${iconTone}`}>
          <Icon aria-hidden="true" className="size-[19px]" />
        </span>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{caption}</p>
    </section>
  );
}

function StatusBadge({ status }: { status: InvoiceStatus }) {
  const styles: Record<InvoiceStatus, string> = {
    Paid: "bg-paid/10 text-paid",
    Pending: "bg-pending/10 text-pending",
    Overdue: "bg-overdue/10 text-overdue",
  };
  const Icon = status === "Paid" ? Check : status === "Pending" ? Clock3 : AlertTriangle;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}>
      <Icon aria-hidden="true" className="size-3.5" />
      {status}
    </span>
  );
}

function InvoiceRows({ invoices }: { invoices: Invoice[] }) {
  if (invoices.length === 0) {
    return (
      <tr>
        <td colSpan={5} className="px-5 py-12 text-center text-sm text-muted-foreground">
          No demo invoices match your search.
        </td>
      </tr>
    );
  }

  return invoices.map((invoice) => (
    <tr key={invoice.number} className="border-t border-border/80">
      <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-primary">{invoice.number}</td>
      <td className="whitespace-nowrap px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
            {invoice.initials}
          </span>
          <span className="text-sm font-medium text-foreground">{invoice.client}</span>
        </div>
      </td>
      <td className="whitespace-nowrap px-5 py-4 text-sm text-muted-foreground">{invoice.date}</td>
      <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-foreground">
        {formatRupees(invoice.amount)}
      </td>
      <td className="whitespace-nowrap px-5 py-4"><StatusBadge status={invoice.status} /></td>
    </tr>
  ));
}

function RecentInvoices({ query }: { query: string }) {
  const filteredInvoices = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return demoInvoices;
    return demoInvoices.filter((invoice) =>
      [invoice.number, invoice.client, invoice.date, invoice.status].some((value) =>
        value.toLowerCase().includes(needle),
      ),
    );
  }, [query]);

  return (
    <section className="overflow-hidden rounded-lg border border-border bg-card shadow-sm" aria-labelledby="recent-invoices-title">
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-5 sm:px-6">
        <div>
          <h2 id="recent-invoices-title" className="text-base font-semibold text-foreground">Recent invoices</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {filteredInvoices.length} of {demoInvoices.length} demo records
          </p>
        </div>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          Sample data
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-left">
          <thead className="bg-muted/70">
            <tr>
              <th scope="col" className="px-5 py-3 text-xs font-semibold uppercase text-muted-foreground">Invoice</th>
              <th scope="col" className="px-5 py-3 text-xs font-semibold uppercase text-muted-foreground">Client</th>
              <th scope="col" className="px-5 py-3 text-xs font-semibold uppercase text-muted-foreground">Date</th>
              <th scope="col" className="px-5 py-3 text-xs font-semibold uppercase text-muted-foreground">Amount</th>
              <th scope="col" className="px-5 py-3 text-xs font-semibold uppercase text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody><InvoiceRows invoices={filteredInvoices} /></tbody>
        </table>
      </div>
    </section>
  );
}

export function Dashboard() {
  const [search, setSearch] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const paid = demoInvoices.filter((invoice) => invoice.status === "Paid");
  const pending = demoInvoices.filter((invoice) => invoice.status === "Pending");
  const overdue = demoInvoices.filter((invoice) => invoice.status === "Overdue");
  const totalAmount = demoInvoices.reduce((total, invoice) => total + invoice.amount, 0);
  const amountFor = (invoices: Invoice[]) =>
    invoices.reduce((total, invoice) => total + invoice.amount, 0);

  return (
    <div className="min-h-screen bg-dashboard-canvas text-foreground">
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-border bg-card px-4 py-5 lg:flex">
        <div className="flex h-10 items-center gap-3 px-2">
          <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <FileText aria-hidden="true" className="size-[18px]" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">BillBuddy</p>
            <p className="text-xs text-muted-foreground">Freelance workspace</p>
          </div>
        </div>
        <p className="mb-3 mt-9 px-3 text-[11px] font-semibold uppercase text-muted-foreground">Workspace</p>
        <NavigationItems />
        <div className="mt-auto border-t border-border pt-4">
          <p className="px-3 text-xs leading-5 text-muted-foreground">Preview workspace<br />Sample data only</p>
        </div>
      </aside>

      <div className="min-w-0 lg:pl-60">
        <header className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur">
          <div className="mx-auto flex min-h-[72px] max-w-[1480px] flex-wrap items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 lg:hidden">
              <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
                <FileText aria-hidden="true" className="size-[18px]" />
              </span>
              <span className="text-sm font-semibold">BillBuddy</span>
            </div>
            <div className="relative order-3 w-full md:order-2 md:mx-auto md:max-w-lg md:flex-1">
              <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                aria-label="Search demo invoices"
                placeholder="Search invoices or clients"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                style={{}}
                className="h-10 border-border bg-background pl-9 pr-10 text-sm"
              />
              {search && (
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Clear search"
                  onClick={() => setSearch("")}
                  className="absolute right-1 top-1/2 size-8 -translate-y-1/2 text-muted-foreground"
                >
                  <X aria-hidden="true" />
                </Button>
              )}
            </div>
            <div className="ml-auto flex items-center gap-2 md:order-3">
              <span className="hidden text-xs text-muted-foreground sm:inline">Demo workspace</span>
              <span aria-label="Demo profile placeholder" className="grid size-9 place-items-center rounded-full border border-border bg-secondary text-secondary-foreground">
                <UserRound aria-hidden="true" className="size-[17px]" />
              </span>
            </div>
          </div>
        </header>

        <div className="border-b border-border bg-card px-3 py-2 lg:hidden">
          <NavigationItems mobile />
        </div>

        <main className="mx-auto max-w-[1480px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 text-xs font-medium text-primary">
                <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                BILLBUDDY DASHBOARD
              </p>
              <h1 className="text-[28px] font-semibold leading-tight text-foreground">Good morning</h1>
              <p className="mt-2 text-sm text-muted-foreground">Here’s your invoice activity at a glance.</p>
            </div>
            <Button onClick={() => setCreateDialogOpen(true)} className="h-10 w-full px-4 shadow-sm sm:w-auto">
              <Plus aria-hidden="true" className="size-4" />
              Create invoice
            </Button>
          </div>

          <div role="note" className="mb-5 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3.5 text-sm text-foreground">
            <span className="mt-0.5 size-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <p><span className="font-semibold">Demo dashboard.</span> All figures and invoices below are sample data; no real invoices or payments are connected.</p>
          </div>

          <section aria-label="Invoice summary" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard title="Total invoiced" amount={formatRupees(totalAmount)} caption={`${demoInvoices.length} sample invoices`} icon={FileText} tone="primary" />
            <MetricCard title="Paid" amount={formatRupees(amountFor(paid))} caption={`${paid.length} sample invoices paid`} icon={Check} tone="paid" />
            <MetricCard title="Pending" amount={formatRupees(amountFor(pending))} caption={`${pending.length} sample invoices awaiting payment`} icon={Clock3} tone="pending" />
            <MetricCard title="Overdue" amount={formatRupees(amountFor(overdue))} caption={`${overdue.length} sample invoices past due`} icon={AlertTriangle} tone="overdue" />
          </section>

          <div className="mb-4 mt-8 flex items-center justify-between gap-4">
            <h2 className="text-xs font-semibold uppercase text-muted-foreground">Your activity</h2>
            <span className="text-xs text-muted-foreground">Updated with sample data</span>
          </div>
          <RecentInvoices query={search} />
          <p className="mt-4 text-center text-xs text-muted-foreground">BillBuddy preview · Sample figures only</p>
        </main>
      </div>

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create an invoice</DialogTitle>
            <DialogDescription>
              Invoice creation isn’t connected in this demo. The dashboard uses sample data only, and nothing will be created or sent.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}