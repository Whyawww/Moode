export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Ready to flow?
        </h1>
        <p className="text-muted text-lg">
          Select your vibe, set your tasks, and disappear.
        </p>
      </div>

      <div className="p-10 border border-dashed border-white/10 rounded-3xl text-center bg-surface/20 text-muted">
        <p>🎵 Ambient Mixer will be here</p>
      </div>
    </div>
  );
}
