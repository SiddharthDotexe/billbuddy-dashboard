import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/dashboard/dashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BillBuddy — Invoice dashboard" },
      {
        name: "description",
        content: "A clear overview of your invoice activity in the BillBuddy demo dashboard.",
      },
      { property: "og:title", content: "BillBuddy — Invoice dashboard" },
      {
        property: "og:description",
        content: "A clear overview of your invoice activity in the BillBuddy demo dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Dashboard />;
}
