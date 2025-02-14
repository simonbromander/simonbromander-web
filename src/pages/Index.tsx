
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

const Index = () => {
  const links = [
    {
      title: "Personal Website",
      url: "https://example.com",
      description: "Check out my portfolio and blog",
    },
    {
      title: "Latest Project",
      url: "https://example.com/project",
      description: "View my most recent work",
    },
    {
      title: "Contact Me",
      url: "mailto:example@email.com",
      description: "Get in touch for collaborations",
    },
  ];

  const socialLinks = [
    { icon: Twitter, url: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, url: "https://instagram.com", label: "Instagram" },
    { icon: Github, url: "https://github.com", label: "GitHub" },
    { icon: Linkedin, url: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-lg mx-auto space-y-8">
        {/* Profile Section */}
        <div className="text-center animate-fade-down">
          <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-gray-200">
            <AvatarImage src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">John Doe</h1>
          <p className="text-gray-600 mb-6">Developer & Designer</p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          {socialLinks.map((social, index) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label={social.label}
            >
              <social.icon className="w-6 h-6" />
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
              <Card className="p-4 hover:scale-[1.02] transition-transform duration-200 hover:shadow-lg bg-white/80 backdrop-blur border border-gray-200">
                <div className="space-y-1">
                  <h2 className="text-lg font-medium text-gray-800">{link.title}</h2>
                  <p className="text-sm text-gray-600">{link.description}</p>
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
