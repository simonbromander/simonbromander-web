import React from 'react';
import { AtSign, Mail } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import useAnalytics from "@/hooks/useAnalytics";

interface LayoutProps {
  children: React.ReactNode;
}

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v2a6 6 0 0 1 2-3Z" />
    <path d="M2 9h4v12H2z" /><circle cx="4" cy="4" r="2" />
  </svg>
);

const socialLinks = [{
  icon: AtSign,
  url: "https://www.threads.net/@simonbromander",
  label: "Threads",
  isExternal: true
}, {
  icon: Mail,
  url: "mailto:me@simonbromander.com",
  label: "Email",
  isExternal: true
}, {
  icon: Linkedin,
  url: "https://www.linkedin.com/in/simonbromander/",
  label: "LinkedIn",
  isExternal: true
}];

export function Layout({ children }: LayoutProps) {
  const { trackEvent } = useAnalytics();

  const handleSocialLinkClick = (label: string) => {
    trackEvent('social_link_click', { platform: label });
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <a href="/" className="site-identity"><img src="/lovable-uploads/1630ba4e-617c-4ba9-beac-f977a3cd5ccd.png" width="44" height="44" alt="" /><span>Simon Bromander</span></a>
        {/* Social Links Section */}
        <nav aria-label="Social links" className="social-links">
          {socialLinks.map(link => <a key={link.label} href={link.url} aria-label={link.label} target="_blank" rel="noopener noreferrer" onClick={() => handleSocialLinkClick(link.label)}><link.icon aria-hidden="true" /><span>{link.label}</span></a>)}
          <ThemeToggle />
        </nav>
      </header>
      <main>{children}</main>
      <footer className="site-footer"><a href="mailto:me@simonbromander.com" onClick={() => trackEvent('social_link_click', { platform: 'Email', source: 'feedback-invitation' })}>Using something I’ve built? I’d like to hear what works, what breaks, and what’s missing.</a><span>Simon Bromander</span></footer>
    </div>
  );
}
