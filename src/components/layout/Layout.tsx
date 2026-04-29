import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AtSign, Linkedin, Mail } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import useAnalytics from "@/hooks/useAnalytics";

interface LayoutProps {
  children: React.ReactNode;
}

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
  
  const handleFintowerClick = () => {
    trackEvent('company_link_click', { company: 'fintower.ai' });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-neutral-50 to-neutral-100 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800 py-12 px-4 relative overflow-hidden md:flex md:items-center">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="max-w-6xl mx-auto relative w-full">
        <div className="md:flex md:gap-12">
          <div className="text-center md:text-left md:w-64 flex-shrink-0 md:sticky md:top-12 h-fit animate-fade-up">
            <div className="space-y-6">
              <Avatar className="w-32 h-32 mx-auto md:mx-0 border-4 border-white/80 dark:border-neutral-800/80 shadow-lg backdrop-blur-sm">
                <AvatarImage src="lovable-uploads/1630ba4e-617c-4ba9-beac-f977a3cd5ccd.png" />
                <AvatarFallback>SB</AvatarFallback>
              </Avatar>
              <div>
                <h1
                  className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 whitespace-nowrap"
                  style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif" }}
                >
                  Simon Bromander
                </h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 text-center md:text-left">
                  Designing and shipping product at{' '}
                  <a
                    href="https://fintower.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleFintowerClick}
                    className="bg-gradient-to-r from-purple-500 to-emerald-600 bg-clip-text text-transparent font-semibold hover:opacity-80 transition-opacity"
                  >
                    fintower.ai
                  </a>
                </p>
              </div>
              <div className="space-y-2">
                <a href="#" className="inline-block px-4 py-2.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                  <div className="flex items-center justify-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    Open for advisory & coaching
                  </div>
                </a>
              </div>
              
              {/* Social Links Section */}
              <div className="space-y-2">
                <div className="flex flex-col space-y-1">
                  {socialLinks.map((link, index) => (
                    <Button key={index} asChild variant="ghost" size="sm" className="justify-center md:justify-start h-10 px-3 font-normal">
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={() => handleSocialLinkClick(link.label)}
                        className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400"
                      >
                        <link.icon className="w-4 h-4" />
                        <span>{link.label}</span>
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-grow space-y-8 mt-8 md:mt-[7.5rem] min-h-[500px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 