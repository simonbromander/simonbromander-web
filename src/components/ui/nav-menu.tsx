
import * as React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export function NavMenu() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="backdrop-blur-md bg-white/70 dark:bg-neutral-900/70 rounded-full px-2 py-2 border border-white/20 dark:border-neutral-700/20 shadow-lg">
        <ul className="flex items-center space-x-1">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  "inline-block px-4 py-2 text-sm font-medium transition-colors rounded-full",
                  isActive
                    ? "bg-blue-100/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 hover:text-neutral-900 dark:hover:text-neutral-100"
                )
              }
            >
              Start
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
