import type { Metadata } from "next";
import AmbientMixer from "@/components/features/audio/AmbientMixer";
import TaskList from "@/components/features/tasks/TaskList";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Your personal focus space. Manage tasks, mix ambient sounds, and find your flow state.",
  openGraph: {
    title: "Moode | Dashboard",
    description: "Find your flow and master your focus.",
    type: "website",
  },
};

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <div className="text-center space-y-2 pt-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Ready to flow?
        </h1>
        <p className="text-muted text-lg">
          Select your vibe, set your tasks, and disappear.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 max-w-md mx-auto">
        <AmbientMixer />
      </div>
      <div className="h-full">
        <TaskList />
      </div>
    </div>
  );
}
