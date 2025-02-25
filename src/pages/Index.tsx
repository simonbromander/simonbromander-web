import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AtSign, BookOpen, Linkedin, Mail, CheckCircle2, Calendar, Link2, Users, Camera } from "lucide-react";
const Index = () => {
  const achievements = ["10+ years in UX & Product", "From startups to enterprises", "Now helping startups make smarter design decisions & build better products"];
  const socialLinks = [{
    icon: AtSign,
    url: "https://www.threads.net/@simonbromander",
    label: "Threads",
    bgColor: "bg-neutral-100/80 dark:bg-neutral-800/80"
  }, {
    icon: Mail,
    url: "mailto:me@simonbromander.com",
    label: "Email",
    bgColor: "bg-neutral-100/80 dark:bg-neutral-800/80"
  }, {
    icon: BookOpen,
    url: "https://substack.com/@simonbromander",
    label: "Substack",
    bgColor: "bg-neutral-100/80 dark:bg-neutral-800/80"
  }, {
    icon: Linkedin,
    url: "https://www.linkedin.com/in/simonbromander/",
    label: "LinkedIn",
    bgColor: "bg-neutral-100/80 dark:bg-neutral-800/80"
  }, {
    icon: Camera,
    url: "http://photography.simonbromander.com",
    label: "Photography Portfolio",
    bgColor: "bg-neutral-100/80 dark:bg-neutral-800/80"
  }];
  return <div className="min-h-screen w-full bg-gradient-to-br from-white via-neutral-50 to-neutral-100 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800 py-12 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
      
      <div className="max-w-4xl mx-auto relative">
        <div className="md:flex md:gap-12">
          <div className="text-center md:text-left md:w-64 flex-shrink-0 md:sticky md:top-12 self-start">
            <div className="space-y-4">
              <Avatar className="w-32 h-32 mx-auto md:mx-0 border-4 border-white/80 dark:border-neutral-800/80 shadow-lg backdrop-blur-sm">
                <AvatarImage src="lovable-uploads/1630ba4e-617c-4ba9-beac-f977a3cd5ccd.png" />
                <AvatarFallback>SB</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100">
                  Simon Bromander
                </h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mt-1 flex items-center gap-2 justify-center md:justify-start">
                  <span>Product & Design at</span>
                  <a href="https://fintower.ai" target="_blank" rel="noopener noreferrer" className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">fintower.ai</a>
                </p>
              </div>
              <div className="space-y-2">
                <a href="#" className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                  <div className="flex items-center justify-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    Open for advisory & coaching
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="flex-grow space-y-8 mt-8 md:mt-0">
            <div className="backdrop-blur-sm bg-white/50 dark:bg-neutral-800/50 p-8 rounded-2xl border border-white/20 dark:border-neutral-700/20">
              <h2 className="text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-8">
                From Design to Product Strategy
              </h2>
              <div className="space-y-4">
                {achievements.map((achievement, index) => <div key={index} className="flex items-start space-x-3 text-neutral-700 dark:text-neutral-300">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                    <span className="text-lg">{achievement}</span>
                  </div>)}
              </div>
            </div>

            <div className="backdrop-blur-sm bg-white/50 dark:bg-neutral-800/50 p-8 rounded-2xl border border-white/20 dark:border-neutral-700/20 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-lg bg-blue-100/50 dark:bg-blue-900/20">
                  <Users className="w-5 h-5 text-blue-700 dark:text-blue-300" />
                </div>
                <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
                  Book Office Hours
                </h2>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">Interested in Advisory or personal Coaching? I offer free 30-minute office hours to help individuals and startups with their product and UX challenges. Let's chat!</p>
              <div className="flex items-center">
                <Button asChild variant="outline" className="border-neutral-200 dark:border-neutral-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 group">
                  <a href="https://cal.com/simonbromander/office-hours-startup?date=2025-02-14&month=2025-02" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-neutral-700 dark:text-neutral-300">Schedule a Call</span>
                  </a>
                </Button>
              </div>
            </div>

            <div className="backdrop-blur-sm bg-white/50 dark:bg-neutral-800/50 p-8 rounded-2xl border border-white/20 dark:border-neutral-700/20 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-lg bg-blue-100/50 dark:bg-blue-900/20">
                  <Link2 className="w-5 h-5 text-blue-700 dark:text-blue-300" />
                </div>
                <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
                  Links
                </h2>
              </div>
              <div className="space-y-3">
                {socialLinks.map(social => <Button key={social.label} asChild variant="outline" className="w-full border-neutral-200 dark:border-neutral-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 group justify-start">
                    <a href={social.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                      <social.icon className="w-4 h-4 mr-3 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-neutral-700 dark:text-neutral-300">{social.label}</span>
                    </a>
                  </Button>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Index;