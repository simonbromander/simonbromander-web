
import { NavMenu } from "@/components/ui/nav-menu";
import { BookOpen, Calendar, MessageSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BlogPost {
  title: string;
  description: string;
  date: string;
  slug: string;
}

const Blog = () => {
  const { toast } = useToast();
  const GITHUB_USERNAME = "simonbromander";
  const GITHUB_REPO = "simonbromander-linktree";
  
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      console.log('Fetching blog posts...');
      const response = await fetch(`https://api.pagescms.org/github/${GITHUB_USERNAME}/${GITHUB_REPO}/blog`);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`Failed to fetch blog posts: ${response.status} ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Fetched data:', data);
      return data as BlogPost[];
    },
    retry: 1,
    meta: {
      onError: (error: Error) => {
        console.error('Query error:', error);
        toast({
          title: "Error loading blog posts",
          description: error.message || "Failed to load blog posts",
          variant: "destructive",
        });
      }
    }
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-neutral-50 to-neutral-100 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800 py-12 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
      
      <NavMenu />
      
      <div className="max-w-4xl mx-auto relative mt-16">
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

          <div className="flex-grow space-y-8 mt-8 md:mt-0">
            <div className="backdrop-blur-sm bg-white/50 dark:bg-neutral-800/50 p-8 rounded-2xl border border-white/20 dark:border-neutral-700/20">
              <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-8">
                Blog
              </h1>

              <div className="prose prose-neutral dark:prose-invert max-w-none">
                {isLoading ? (
                  <div className="animate-pulse space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-neutral-200 dark:bg-neutral-700 h-24 rounded-lg" />
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-red-600 dark:text-red-400 space-y-4">
                    <p>Error loading blog posts. Please check:</p>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>Your GitHub repository is connected to PagesCMS.org</li>
                      <li>The blog collection is properly configured in .pages.yml</li>
                      <li>You have at least one blog post in your repository</li>
                      <li>Your repository name and username are correct ({GITHUB_USERNAME}/{GITHUB_REPO})</li>
                    </ol>
                    <p className="mt-4 text-sm">
                      If the issue persists, check the browser console for more details.
                    </p>
                  </div>
                ) : posts?.length ? (
                  <div className="space-y-8">
                    {posts.map((post) => (
                      <article key={post.slug} className="group">
                        <a href={`/blog/${post.slug}`} className="block space-y-4">
                          <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {post.title}
                          </h2>
                          <p className="text-neutral-600 dark:text-neutral-400">{post.description}</p>
                          <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(post.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              5 min read
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              2 comments
                            </span>
                          </div>
                        </a>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="text-neutral-600 dark:text-neutral-400">
                    No blog posts found. Add your first post through PagesCMS.org.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
