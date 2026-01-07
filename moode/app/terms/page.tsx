"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-6 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold tracking-tight">
            Terms of Service
          </h1>
          <p className="text-muted">Last updated: January 2026</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-6 text-foreground/80 leading-relaxed">
          <p>
            By accessing <strong>Moode</strong>, you agree to be bound by these
            Terms of Service. If you do not agree to these terms, please do not
            use our service.
          </p>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-foreground">
              1. Use License
            </h2>
            <p>
              Moode is a free productivity tool. You are granted a limited,
              non-exclusive license to use the application for personal
              productivity purposes. You may not use the service for any illegal
              or unauthorized purpose.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-foreground">2. Disclaimer</h2>
            <p>
              The materials on Moode are provided on an 'as is' basis. We make
              no warranties, expressed or implied, regarding the reliability or
              availability of the service, although we strive for 99.9% uptime.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-foreground">
              3. User Accounts
            </h2>
            <p>
              You are responsible for safeguarding the password/account access
              that you use to access the service. We reserve the right to
              terminate accounts that violate our terms or engage in abusive
              behavior.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-foreground">
              4. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these terms at any time. We will
              notify users of any significant changes.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
