
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { AtSign, BookOpen, Linkedin, Mail, Sparkles } from "lucide-react";

const Index = () => {
  const links = [
    {
      title: "Follow my startup journey",
      url: "#",
      description: "Learn about my experiences building and growing startups",
    },
  ];

  const socialLinks = [
    { 
      icon: AtSign, 
      url: "#", 
      label: "Read.cv",
      bgColor: "bg-neutral-100/80 dark:bg-neutral-800/80",
    },
    { 
      icon: Mail, 
      url: "#", 
      label: "Email",
      bgColor: "bg-neutral-100/80 dark:bg-neutral-800/80",
    },
    { 
      icon: BookOpen, 
      url: "#", 
      label: "Blog",
      bgColor: "bg-neutral-100/80 dark:bg-neutral-800/80",
    },
    { 
      icon: Linkedin, 
      url: "#", 
      label: "LinkedIn",
      bgColor: "bg-neutral-100/80 dark:bg-neutral-800/80",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-neutral-50 to-neutral-100 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800 py-12 px-4 relative overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
      
      <div className="max-w-2xl mx-auto space-y-10 relative">
        {/* Profile Section */}
        <div className="text-center animate-fade-down space-y-6">
          <div className="relative inline-block group">
            <Avatar className="w-32 h-32 mx-auto border-4 border-white/80 dark:border-neutral-800/80 shadow-lg backdrop-blur-sm">
              <AvatarImage src="/lovable-uploads/1630ba4e-617c-4ba9-beac-f977a3cd5ccd.png" />
              <AvatarFallback>SI</AvatarFallback>
            </Avatar>
            <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-neutral-800 dark:text-neutral-100 hover:tracking-wide transition-all duration-300">
              Hi, I'm Simon
            </h1>
            <div className="max-w-xl mx-auto space-y-4 backdrop-blur-sm bg-white/50 dark:bg-neutral-800/50 p-6 rounded-2xl border border-white/20 dark:border-neutral-700/20">
              <p className="text-xl text-neutral-700 dark:text-neutral-300">
                UX Designer at heart, <span className="font-medium relative group">
                  leader in mind
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-neutral-400 dark:bg-neutral-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </span>
              </p>
              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                My work extends beyond visuals; I enable, mentor, and turn visions into business success. I'm dedicated to building high-performing, outcome-focused design teams that keep designers satisfied while achieving business goals.
              </p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          {socialLinks.map((social, index) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              aria-label={social.label}
            >
              <div className={`p-4 rounded-full ${social.bgColor} backdrop-blur-sm text-neutral-600 dark:text-neutral-300 transform transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-neutral-200/50 dark:group-hover:shadow-neutral-900/50`}>
                <social.icon className="w-6 h-6" />
              </div>
            </a>
          ))}
        </div>

        {/* Link Cards */}
        <div className="space-y-4">
          {links.map((link, index) => (
            <a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block animate-fade-up"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <Card className="p-6 hover:scale-[1.02] transition-all duration-200 hover:shadow-lg bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-white/20 dark:border-neutral-700/20 group">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                    {link.title}
                  </h2>
                  <span className="text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-all duration-300 group-hover:translate-x-1">→</span>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
