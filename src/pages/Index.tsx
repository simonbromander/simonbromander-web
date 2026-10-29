import { ArrowUpRight, MessageCircle, Repeat2, Terminal, ThumbsUp, Waves } from "lucide-react";
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

const selectedPosts = [
  {
    slug: 'vibe-prototyping',
    title: 'From 8+ hours to 45 minutes',
    image: '/posts/vibe-prototyping.webp',
    alt: 'The original prototyping post artwork, showing a Generate Prototype button over Figma',
    quote: 'My prototyping process has gone from 8+ hours in Figma to 45 minutes with Lovable, Claude and Cursor...',
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7310171388349222912/',
    reactions: 970, comments: 145, reposts: 47,
  },
  {
    slug: 'teaching-prototyping',
    title: 'Taking the workflow into the classroom',
    image: '/posts/teaching-prototyping.webp',
    alt: 'Vibe Prototyping Club illustration from the guest lecture post',
    quote: 'We transformed simple grocery store filter wireframes into fully functional prototypes in minutes.',
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7313076397218967552/',
    reactions: 251, comments: 19, reposts: 8,
  },
  {
    slug: 'career-transition',
    title: 'A new chapter in B2B fintech',
    image: '/posts/career-transition.webp',
    alt: 'Simon holding his Visma pass beside his cycling equipment on his last day',
    quote: 'Today marks my last day at Visma Spcs. A bit earlier than planned, but sometimes new opportunities arise that are impossible to deny.',
    url: 'https://www.linkedin.com/feed/update/urn:li:share:7206013336587505664/',
    reactions: 116, comments: 24, reposts: null,
  },
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
        <article className="tide-feature" aria-labelledby="tide-heading">
          <div className="tide-intro">
            <div>
              <div className="project-heading"><span className="tide-mark"><Waves aria-hidden="true" /></span><h3 id="tide-heading">Tide</h3></div>
            </div>
            <div className="tide-description">
              <p>A native home for Hermes agents across Mac, iPhone, and Apple Watch. Conversations, documents, interactive cards, and workout logging in one workspace.</p>
              <p className="release-status">Private testing · Requires an existing Hermes setup.</p>
              <a className="code-link" href="mailto:me@simonbromander.com?subject=Trying%20Tide" onClick={() => handleRecentClick('tide-access')}>Ask about trying Tide <ArrowUpRight aria-hidden="true" /></a>
            </div>
          </div>
          <figure>
            <div className="tide-showcase">
              <img className="tide-mac" src="/products/tide-macos.webp" width="1600" height="1177" alt="Tide on Mac with an agent directory, conversation, and interactive weekly summary" loading="lazy" />
              <img className="tide-iphone" src="/products/tide-iphone.webp" width="520" height="1131" alt="Tide on iPhone showing a native summary card and suggested reply" loading="lazy" />
            </div>
            <figcaption>Development preview with illustrative demo conversations.</figcaption>
          </figure>
        </article>
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
      </section>

      <section className="portfolio-section" aria-labelledby="writing-heading">
        <div className="writing-heading"><h2 id="writing-heading" className="section-heading">Writing and conversations</h2><a href="https://www.linkedin.com/in/simonbromander/recent-activity/all/" target="_blank" rel="noopener noreferrer">More on LinkedIn <ArrowUpRight aria-hidden="true" /></a></div>
        <div className="post-grid">
          {selectedPosts.map(post => <article className="post-preview" key={post.slug}>
            <a className="post-link" href={post.url} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('linkedin_post_click', { post: post.slug })}>
              <div className="post-artwork"><img src={post.image} alt={post.alt} width="720" height="720" loading="lazy" /></div>
              <span className="post-source">Simon Bromander · LinkedIn</span>
              <h3>{post.title}</h3>
              <blockquote>“{post.quote}”</blockquote>
              <div className="post-engagement" aria-label="Public engagement checked 29 October 2026">
                <span><ThumbsUp aria-hidden="true" />{post.reactions}<span className="sr-only"> reactions</span></span>
                <span><MessageCircle aria-hidden="true" />{post.comments}<span className="sr-only"> comments</span></span>
                {post.reposts !== null && <span><Repeat2 aria-hidden="true" />{post.reposts}<span className="sr-only"> reposts</span></span>}
              </div>
              <span className="post-read">Read the post <ArrowUpRight aria-hidden="true" /></span>
            </a>
          </article>)}
        </div>
        <p className="engagement-date">Engagement figures checked 29 October 2026.</p>
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
