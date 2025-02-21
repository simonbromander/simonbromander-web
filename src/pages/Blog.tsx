
import { NavMenu } from "@/components/ui/nav-menu";

const Blog = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-neutral-50 to-neutral-100 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800 py-12 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
      
      <NavMenu />
      
      <div className="max-w-4xl mx-auto relative mt-16">
        <div className="backdrop-blur-sm bg-white/50 dark:bg-neutral-800/50 p-8 rounded-2xl border border-white/20 dark:border-neutral-700/20">
          <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-8">
            Blog
          </h1>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-neutral-600 dark:text-neutral-400">
              Content from Pages CMS will be integrated here. Currently showing placeholder content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
