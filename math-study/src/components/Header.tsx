import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onOpenMobileNav?: () => void;
}

export function Header({ searchTerm, onSearchChange, onOpenMobileNav }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-blue-700 text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-4 md:flex-row">
        <div className="flex w-full items-center gap-3 md:w-auto md:gap-4">
          {onOpenMobileNav && (
            <button
              type="button"
              onClick={onOpenMobileNav}
              className="rounded-lg p-2 text-white hover:bg-white/10 lg:hidden"
              aria-label="Open study menu"
            >
              <Menu className="h-7 w-7" />
            </button>
          )}
        <Link to="/" className="flex min-w-0 flex-1 items-center gap-2 hover:opacity-90 md:flex-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <h1 className="truncate text-xl font-bold sm:text-2xl">ASVAB Study Portal</h1>
        </Link>
        <Link
          to="/"
          className="hidden shrink-0 rounded-lg bg-white/20 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/30 sm:inline-flex"
        >
          Home
        </Link>
        </div>
        <div className="relative w-full md:w-96">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search formulas (e.g., 'slope', 'circle')..."
            className="w-full pl-10 pr-4 py-2 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </header>
  );
}
