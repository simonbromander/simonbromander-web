import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="space-y-8">
        <div
          className="backdrop-blur-sm bg-white/50 dark:bg-neutral-800/50 p-8 rounded-2xl border border-neutral-200/60 dark:border-neutral-700/40 animate-fade-up"
          style={{ animationDelay: '120ms' }}
        >
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-500 mb-3">
              Error 404
            </p>
            <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
              Page not found
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto mb-8">
              The page you were looking for doesn't exist or has moved.
            </p>
            <Button asChild variant="outline">
              <a href="#/" className="inline-flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
