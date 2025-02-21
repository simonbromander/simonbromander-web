
import * as React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, BookOpen } from "lucide-react";

export function NavMenu() {
  return (
    <nav className="fixed left-0 top-0 h-screen w-64 z-50">
      <div className="h-full backdrop-blur-md bg-white/70 dark:bg-neutral-900/70 px-4 py-8 border-r border-white/20 dark:border-neutral-700/20 shadow-lg">
        <div className="flex flex-col space-y-6">
          <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 px-4">Navigation</h1>
          <ul className="flex flex-col space-y-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-lg",
                    isActive
                      ? "bg-blue-100/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 hover:text-neutral-900 dark:hover:text-neutral-100"
                  )
                }
              >
                <Home className="h-4 w-4" />
                Start
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-lg",
                    isActive
                      ? "bg-blue-100/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 hover:text-neutral-900 dark:hover:text-neutral-100"
                  )
                }
              >
                <BookOpen className="h-4 w-4" />
                Blog
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
