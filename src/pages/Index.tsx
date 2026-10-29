import { ArrowUpRight, FlaskConical, Terminal } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PortfolioMotion } from "@/components/PortfolioMotion";
import useAnalytics from "@/hooks/useAnalytics";

const companies = [
  { name: "Fintower", domain: "fintower.ai", note: null, solidBg: false },
  { name: "Spiris", domain: "spiris.se", note: "formerly Visma Spcs", solidBg: true },
  { name: "Minna Technologies", domain: "minnatechnologies.com", faviconDomain: "mastercard.com", note: "acquired by Mastercard", solidBg: false },
  { name: "Benify", domain: "benify.com", faviconDomain: "benifex.com", note: "now Benifex", solidBg: false },
  { name: "Acando", domain: "cgi.com", faviconDomain: "cgi.com", note: "now CGI", solidBg: false },
] as const;

const Index = () => {
  const { trackEvent } = useAnalytics();

  const handleCompanyClick = (name: string) => {
    trackEvent('company_link_click', { company: name });
  };

  const handleRecentClick = (slug: string) => {
    trackEvent('recent_item_click', { item: slug });
  };

  return (
    <Layout>
      <section className="portfolio-hero">
        <PortfolioMotion kind="hero" />
        <h1>Designer<br />who ships.</h1>
        <p className="hero-role">Product designer building and shipping at <a href="https://fintower.ai" onClick={() => handleCompanyClick('Fintower')}>Fintower</a></p>
        <div className="hero-description">
          <p>10+ years building B2B SaaS products.</p>
          <p>I turn customer problems into products people can use.</p>
          <p className="personal-note">Based on Sweden’s west coast. Gravel cyclist and dad when I’m not on the laptop.</p>
        </div>
        <div className="company-history">
          <p className="section-label">I’ve worked at</p>
          <ul>{companies.map(company => <li key={company.domain}>
            <a href={`https://${company.domain}`} target="_blank" rel="noopener noreferrer" onClick={() => handleCompanyClick(company.name)}>{company.name}</a>
            {company.note && <span>{company.note}</span>}
          </li>)}</ul>
        </div>
      </section>

      <section className="portfolio-section" aria-labelledby="recent-heading">
        <h2 id="recent-heading" className="section-heading">Recent</h2>
        <div className="product-grid">
          <article className="product-feature">
            <a className="product-visual mumla-visual" href="https://mumla.app" target="_blank" rel="noopener noreferrer" onClick={() => handleRecentClick('mumla')} aria-label="Explore Mumla">
              <img src="/products/mumla-macos.webp" alt="Mumla’s native macOS dictation interface" width="1920" height="1520" />
            </a>
            <div className="project-heading"><img className="app-icon" src="/products/mumla-icon.webp" width="44" height="44" alt="" /><h3><a href="https://mumla.app" target="_blank" rel="noopener noreferrer" onClick={() => handleRecentClick('mumla')}>Mumla <ArrowUpRight aria-hidden="true" /></a></h3><PortfolioMotion kind="waveform" /></div>
            <p>a native dictation app for macOS and iOS. Speech-to-text with AI running on your device.</p>
            <p className="release-status">Available to test with TestFlight</p>
            <a className="code-link" href="mailto:hello@mumla.app?subject=Test%20Mumla" onClick={() => handleRecentClick('mumla-testflight')}>Request test access<span className="sr-only"> to Mumla by email</span><ArrowUpRight aria-hidden="true" /></a>
          </article>
          <article className="product-feature">
            <a className="product-visual shelfie-visual" href="/shelfie/" onClick={() => handleRecentClick('shelfie-coffee')} aria-label="Explore Shelfie Coffee">
              <img src="/shelfie/promo.png" alt="Shelfie Coffee’s freshness tracking and coffee collection on iPhone" width="1200" height="630" />
            </a>
            <div className="project-heading"><img className="app-icon" src="/shelfie/app-icon.png" width="44" height="44" alt="" /><h3><a href="/shelfie/" onClick={() => handleRecentClick('shelfie-coffee')}>Shelfie Coffee <ArrowUpRight aria-hidden="true" /></a></h3><PortfolioMotion kind="coffee" /></div>
            <p>a privacy-first native iOS app for tracking coffee freshness and memorable brews. Package scanning, no account, private iCloud sync.</p>
            <a className="code-link" href="https://apps.apple.com/app/id6803004011" target="_blank" rel="noopener noreferrer" onClick={() => handleRecentClick('shelfie-app-store')}>View on the App Store<span className="sr-only">: Shelfie Coffee</span><ArrowUpRight aria-hidden="true" /></a>
          </article>
          <article className="product-feature product-feature-wide">
            <a className="product-visual treadtap-visual" href="/treadtap/" onClick={() => handleRecentClick('treadtap')} aria-label="Explore TreadTap">
              <img src="/treadtap/promo.png" alt="TreadTap walking-pad controls in light and dark mode" width="1320" height="2868" loading="lazy" />
            </a>
            <div>
              <div className="project-heading"><img className="app-icon" src="/treadtap/app-icon.png" width="44" height="44" alt="" loading="lazy" /><h3><a href="/treadtap/" onClick={() => handleRecentClick('treadtap')}>TreadTap <ArrowUpRight aria-hidden="true" /></a></h3><PortfolioMotion kind="trail" /></div>
              <p>A remote and session tracker for compatible Bluetooth walking pads. Control your pace across iPhone, Apple Watch, and Mac. Save completed walks to Apple Health.</p>
              <a className="code-link" href="https://apps.apple.com/app/id6807523989" target="_blank" rel="noopener noreferrer" onClick={() => handleRecentClick('treadtap-app-store')}>View on the App Store<span className="sr-only">: TreadTap</span><ArrowUpRight aria-hidden="true" /></a>
            </div>
          </article>
        </div>
        <div className="project-row">
          <img className="row-icon" src="/products/fintower-icon.png" width="40" height="40" alt="" loading="lazy" />
          <div><h3><a href="https://www.linkedin.com/feed/update/urn:li:activity:7449740721617674240/" target="_blank" rel="noopener noreferrer" onClick={() => handleRecentClick('fintower-self-serve-pivot')}>Fintower's self-serve pivot <ArrowUpRight aria-hidden="true" /></a></h3><p>from pivot decision to 50+ live customers in two months. AI-assisted onboarding, no sales calls, no implementation.</p></div>
        </div>
        <div className="project-row">
          <span className="row-icon experiment-icon"><FlaskConical aria-hidden="true" /></span>
          <div><h3><a href="https://www.linkedin.com/feed/update/urn:li:activity:7310171388349222912/" target="_blank" rel="noopener noreferrer" onClick={() => handleRecentClick('vibe-prototyping')}>Vibe Prototyping <ArrowUpRight aria-hidden="true" /></a></h3><p>how I moved from slow Figma prototypes to faster learning with Lovable, Cursor, and Claude.</p></div>
        </div>
      </section>

      <section className="portfolio-section" aria-labelledby="tools-heading">
        <h2 id="tools-heading" className="section-heading">Tools and experiments</h2>
        <div className="project-row">
          <span className="row-icon terminal-icon"><Terminal aria-hidden="true" /></span>
          <div><h3>Obsidian Claude</h3><p>An Obsidian plugin that brings an AI coding terminal into your notes. Work with code without leaving the context you are already thinking in.</p>
            <a className="code-link" href="https://github.com/simonbromander/obsidian-claude" target="_blank" rel="noopener noreferrer" onClick={() => handleRecentClick('obsidian-claude')}>View the code<span className="sr-only"> for Obsidian Claude</span><ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>

      </section>


    </Layout>
  );
};

export default Index;
