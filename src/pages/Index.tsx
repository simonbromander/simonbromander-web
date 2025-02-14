
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { AtSign, BookOpen, Linkedin, Mail } from "lucide-react";

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
      bgColor: "bg-neutral-100 dark:bg-neutral-800",
    },
    { 
      icon: Mail, 
      url: "#", 
      label: "Email",
      bgColor: "bg-neutral-100 dark:bg-neutral-800",
    },
    { 
      icon: BookOpen, 
      url: "#", 
      label: "Blog",
      bgColor: "bg-neutral-100 dark:bg-neutral-800",
    },
    { 
      icon: Linkedin, 
      url: "#", 
      label: "LinkedIn",
      bgColor: "bg-neutral-100 dark:bg-neutral-800",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-white dark:bg-neutral-900 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-10">
        {/* Profile Section */}
        <div className="text-center animate-fade-down space-y-6">
          <Avatar className="w-32 h-32 mx-auto border-4 border-white dark:border-neutral-800 shadow-lg">
            <AvatarImage src="/lovable-uploads/1630ba4e-617c-4ba9-beac-f977a3cd5ccd.png" />
            <AvatarFallback>SI</AvatarFallback>
          </Avatar>
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-neutral-800 dark:text-neutral-100">Hi, I'm Simon</h1>
            <div className="max-w-xl mx-auto space-y-4">
              <p className="text-xl text-neutral-700 dark:text-neutral-300">
                UX Designer at heart, <span className="font-medium">leader in mind</span>. I mainly been working with SaaS products spanning Fintech, E-Commerce, and HR Tech.
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
              <div className={`p-4 rounded-full ${social.bgColor} text-neutral-600 dark:text-neutral-300 transform transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg`}>
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
              <Card className="p-6 hover:scale-[1.02] transition-all duration-200 hover:shadow-lg bg-white dark:bg-neutral-800 border dark:border-neutral-700 group">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                    {link.title}
                  </h2>
                  <span className="text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">→</span>
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
