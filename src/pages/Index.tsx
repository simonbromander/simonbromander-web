import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AtSign, BookOpen, Linkedin, Mail, CheckCircle2, Calendar, Link2, Users, Camera, ExternalLink, PenLine } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Layout } from "@/components/layout/Layout";

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
    icon: PenLine,
    url: "#/blog",
    label: "Blog",
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

  return (
    <Layout>
      <div className="space-y-8">
        <div className="backdrop-blur-sm bg-white/50 dark:bg-neutral-800/50 p-8 rounded-2xl border border-white/20 dark:border-neutral-700/20">
          <h2 className="text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-8">
            From Design to Product Strategy
          </h2>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start space-x-3 text-neutral-700 dark:text-neutral-300">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                <span className="text-lg">{achievement}</span>
              </div>
            ))}
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
          <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
            Interested in advisory or personal coaching? I offer free 30-minute office hours to help individuals and startups with their product and UX challenges. Let's chat!
          </p>
          <div className="flex items-center">
            <Button asChild variant="outline" className="border-neutral-200 dark:border-neutral-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 group">
              <a href="https://cal.com/simonbromander/office-hours-startup?date=2025-02-14&month=2025-02" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-neutral-700 dark:text-neutral-300">Schedule a Call</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;