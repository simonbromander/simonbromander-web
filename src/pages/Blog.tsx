
import { NavMenu } from "@/components/ui/nav-menu";
import { Calendar, MessageSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface BlogPost {
  title: string;
  description: string;
  date: string;
  slug: string;
}

const Blog = () => {
  const GITHUB_USERNAME = "simonbromander";
  const GITHUB_REPO = "simonbromander-linktree";
  
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const response = await fetch(`https://api.pagescms.org/github/${GITHUB_USERNAME}/${GITHUB_REPO}/blog`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      return response.json() as Promise<BlogPost[]>;
    },
    enabled: true,
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-neutral-50 to-neutral-100 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
      <NavMenu />
      
      <div className="ml-64 min-h-screen relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
        
        <div className="max-w-4xl mx-auto py-12 px-8 relative">
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
                <div className="text-neutral-600 dark:text-neutral-400">
                  <p>This blog uses PagesCMS.org with GitHub for content management. To get started:</p>
                  <ol className="list-decimal list-inside mt-4 space-y-2">
                    <li>Visit PagesCMS.org and connect your GitHub repository</li>
                    <li>Create a new blog collection</li>
                    <li>Add your first blog post through the CMS interface</li>
                    <li>Update the fetch URL in this component with your repository details</li>
                  </ol>
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
  );
};

export default Blog;
