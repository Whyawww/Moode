"use client";
import { Sliders, ListTodo, Timer } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <ListTodo size={24} />,
      title: "1. Prioritize",
      desc: "Add up to 7 critical tasks. No clutter, just what matters today.",
    },
    {
      icon: <Sliders size={24} />,
      title: "2. Set the Vibe",
      desc: "Mix ambient sounds like Rain or Cafe to block out distractions.",
    },
    {
      icon: <Timer size={24} />,
      title: "3. Deep Work",
      desc: "Start the timer. The interface vanishes. It's just you and the work.",
    },
  ];

  return (
    <section className="py-20 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold">How Moode Works</h2>
          <p className="text-muted">Three simple steps to peak productivity.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-3xl bg-surface/20 border border-white/5 hover:bg-surface/40 transition-colors text-center group"
            >
              <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
