"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-6 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-muted">Last updated: January 2026</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-6 text-foreground/80 leading-relaxed">
          <p>
            Welcome to <strong>Moode</strong>. We value your privacy and are
            committed to protecting your personal data. This policy explains
            what information we collect and how we use it.
          </p>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-foreground">
              1. Information We Collect
            </h2>
            <p>
              When you use Moode, we collect minimal data necessary for the app
              to function:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-muted">
              <li>
                <strong>Account Info:</strong> Your name, email address, and
                profile picture (via Google OAuth).
              </li>
              <li>
                <strong>Usage Data:</strong> Your task lists and focus session
                statistics stored in our database.
              </li>
              <li>
                <strong>Technical Data:</strong> Browser type and device
                information for optimizing the experience.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-foreground">
              2. How We Use Your Data
            </h2>
            <p>We use your information strictly to:</p>
            <ul className="list-disc pl-5 space-y-1 text-muted">
              <li>Provide and maintain the Moode service.</li>
              <li>Sync your tasks and settings across devices.</li>
              <li>Authenticate your identity securely.</li>
            </ul>
            <p className="font-bold text-primary mt-2">
              We do NOT sell, trade, or rent your personal identification
              information to others.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-foreground">
              3. Third-Party Services
            </h2>
            <p>We use trusted third-party services to operate:</p>
            <ul className="list-disc pl-5 space-y-1 text-muted">
              <li>
                <strong>Supabase:</strong> For database and authentication
                hosting.
              </li>
              <li>
                <strong>Google OAuth:</strong> For secure sign-in.
              </li>
              <li>
                <strong>Vercel:</strong> For hosting the website application.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-foreground">4. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us via GitHub or email.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
