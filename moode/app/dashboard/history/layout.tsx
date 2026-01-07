import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "History",

  description:
    "Track your productivity streaks and review completed tasks over time.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Moode | History",
    description: "Check out my productivity journey.",
    type: "website",
  },
};

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
