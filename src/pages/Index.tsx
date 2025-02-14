
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { AtSign, BookOpen, Linkedin, Mail, CheckCircle2 } from "lucide-react";

const Index = () => {
  const achievements = [
    "10+ years in UX & Product",
    "From startups to enterprises",
    "Now helping startups make smarter design decisions & build better products",
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
      
      <div className="max-w-4xl mx-auto space-y-12 relative">
        {/* Profile Section */}
        <div className="md:flex items-start space-y-8 md:space-y-0 md:space-x-12">
          {/* Avatar and Name Section */}
          <div className="text-center md:text-left flex-shrink-0 md:sticky md:top-12">
            <div className="space-y-4">
              <Avatar className="w-32 h-32 mx-auto md:mx-0 border-4 border-white/80 dark:border-neutral-800/80 shadow-lg backdrop-blur-sm">
                <AvatarImage src="/lovable-uploads/1630ba4e-617c-4ba9-beac-f977a3cd5ccd.png" />
                <AvatarFallback>SB</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100">
                  Simon Bromander
                </h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mt-1">
                  Product & UX Lead
                </p>
              </div>
              <a 
                href="#"
                className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              >
                Open for advisory & coaching
              </a>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow space-y-8">
            <div className="backdrop-blur-sm bg-white/50 dark:bg-neutral-800/50 p-8 rounded-2xl border border-white/20 dark:border-neutral-700/20">
              <h2 className="text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-8">
                From Design to Product Strategy
              </h2>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 text-neutral-700 dark:text-neutral-300">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <span className="text-lg">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 animate-fade-up">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label={social.label}
                >
                  <div className={`p-4 rounded-xl ${social.bgColor} backdrop-blur-sm text-neutral-600 dark:text-neutral-300 transform transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-neutral-200/50 dark:group-hover:shadow-neutral-900/50`}>
                    <social.icon className="w-6 h-6" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
