import { Link, useLocation } from "react-router-dom";
import { NAVIGATION_CONFIG } from "@/config/navigation";

export function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          <Link to="/" className="text-xl font-semibold text-gray-900">
            {NAVIGATION_CONFIG.STORE_NAME}
          </Link>

          <div className="flex items-center gap-8">
            {NAVIGATION_CONFIG.LINKS.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                className={`text-sm font-medium transition-colors ${
                  isActive(href)
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
