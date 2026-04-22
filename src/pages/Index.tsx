import { Button } from "@/components/ui/button";
import { Calendar, Sparkles, Users } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import useAnalytics from "@/hooks/useAnalytics";

const companies = [
  { name: "Acando", domain: "cgi.com", faviconDomain: "cgi.com", note: "now CGI", solidBg: false },
  { name: "Benify", domain: "benify.com", faviconDomain: "benifex.com", note: "now Benifex", solidBg: false },
  { name: "Minna Technologies", domain: "minnatechnologies.com", faviconDomain: "mastercard.com", note: "acquired by Mastercard", solidBg: false },
  { name: "Spiris", domain: "spiris.se", note: "formerly Visma Spcs", solidBg: true },
  { name: "Fintower", domain: "fintower.ai", note: null, solidBg: false },
] as const;

const Index = () => {
  const { trackEvent } = useAnalytics();

  const handleCompanyClick = (name: string) => {
    trackEvent('company_link_click', { company: name });
  };

  const handleRecentClick = (slug: string) => {
    trackEvent('recent_item_click', { item: slug });
  };

  const handleScheduleCallClick = () => {
    trackEvent('schedule_call_click', {
      source: 'homepage',
      location: window.location.pathname,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="backdrop-blur-sm bg-white/50 dark:bg-neutral-800/50 p-8 rounded-2xl border border-neutral-200/60 dark:border-neutral-700/40 space-y-8">
          <div className="space-y-2 text-neutral-700 dark:text-neutral-300 text-base">
            <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100">
              Designer who ships.
            </h2>
            <p>10+ years in B2B SaaS</p>
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-500 pt-4">
              Shipped at
            </p>
            <ul className="space-y-1.5 not-prose !mt-2">
              {companies.map((company) => {
                const faviconDomain = 'faviconDomain' in company ? company.faviconDomain : company.domain;
                return (
                  <li key={company.domain}>
                    <a
                      href={`https://${company.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleCompanyClick(company.name)}
                      className="group inline-flex items-center gap-2 text-base text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                    >
                      <span
                        className={`inline-flex items-center justify-center w-5 h-5 rounded-sm shrink-0 ${
                          company.solidBg
                            ? ''
                            : 'bg-neutral-200/70 dark:bg-neutral-700/50'
                        }`}
                      >
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${faviconDomain}&sz=64`}
                          alt=""
                          width={16}
                          height={16}
                          loading="lazy"
                          className="w-4 h-4 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition duration-200"
                        />
                      </span>
                      <span>{company.name}</span>
                      {company.note && (
                        <span className="text-xs text-neutral-500 dark:text-neutral-500">
                          ({company.note})
                        </span>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="space-y-1 text-neutral-700 dark:text-neutral-300 text-base">
            <p>Shipping product every week.</p>
            <p className="text-neutral-600 dark:text-neutral-400">
              Swedish west coast. Gravel cyclist & dad when not on the laptop.
            </p>
          </div>
        </div>

        <div className="backdrop-blur-sm bg-white/50 dark:bg-neutral-800/50 p-8 rounded-2xl border border-neutral-200/60 dark:border-neutral-700/40 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-lg bg-purple-100/50 dark:bg-purple-900/20">
              <Sparkles className="w-5 h-5 text-purple-700 dark:text-purple-300" />
            </div>
            <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
              Recent
            </h2>
          </div>
          <ul className="space-y-3 text-neutral-700 dark:text-neutral-300 text-base leading-relaxed">
            <li>
              <a
                href="https://www.linkedin.com/feed/update/urn:li:activity:7449740721617674240/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleRecentClick('fintower-self-serve-pivot')}
                className="font-semibold text-neutral-900 dark:text-neutral-100 underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-neutral-600 dark:hover:decoration-neutral-400"
              >
                Fintower's self-serve pivot
              </a>
              {' — 2 months from pivot decision to 50+ live customers. AI-assisted onboarding, zero sales calls, zero implementation.'}
            </li>
            <li>
              <a
                href="https://www.linkedin.com/feed/update/urn:li:activity:7310171388349222912/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleRecentClick('vibe-prototyping')}
                className="font-semibold text-neutral-900 dark:text-neutral-100 underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-neutral-600 dark:hover:decoration-neutral-400"
              >
                Vibe Prototyping
              </a>
              {' — coined the term. Essay on replacing Figma prototyping with Lovable, Cursor, and Claude. 8 hours → 45 minutes.'}
            </li>
            <li>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">Personal AI agent</span>
              {' — my personal ops staff. Buys groceries, watches Blocket for used cars, drafts cold emails, and flags calendar clashes.'}
            </li>
          </ul>
        </div>

        <div className="backdrop-blur-sm bg-white/50 dark:bg-neutral-800/50 p-8 rounded-2xl border border-neutral-200/60 dark:border-neutral-700/40 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-lg bg-blue-100/50 dark:bg-blue-900/20">
              <Users className="w-5 h-5 text-blue-700 dark:text-blue-300" />
            </div>
            <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
              Office hours
            </h2>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed">
            I keep a few 30-minute slots open each month for founders and designers working through product or AI-workflow questions. Free, informal, no pitch.
          </p>
          <div className="flex items-center">
            <a
              href="https://cal.com/simonbromander/office-hours-startup"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleScheduleCallClick}
              className="inline-flex items-center"
            >
              <Button variant="outline" className="border-neutral-200 dark:border-neutral-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 group">
                <Calendar className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-neutral-700 dark:text-neutral-300">Schedule a call</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
