import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import type { NavCategory } from '../types/studyNav';
import { isNavSectionHeader } from '../types/studyNav';
import { ARITHMETIC_REASONING_NAV_ITEMS } from '../data/arithmeticReasoningNav';

export const CONTENT_CATEGORY_IDS = ['general-science', 'arithmetic-reasoning', 'mathematics-knowledge'] as const;

const CATEGORIES: NavCategory[] = [
  {
    id: 'general-science',
    label: '1. General Science',
    expanded: false,
    items: [
      { id: 'general-science-astronomy', label: 'Astronomy', href: '/astronomy' },
      { id: 'general-science-biology', label: 'Biology', href: '/biology' },
      { id: 'general-science-chemistry', label: 'Chemistry & Atoms', href: '/chemistry' },
      { id: 'general-science-earth', label: 'Earth Science', href: '/earth-science' },
      { id: 'general-science-measurement', label: 'Measurement & Physics', href: '/measurement-physics' },
    ],
  },
  {
    id: 'arithmetic-reasoning',
    label: '2. Arithmetic Reasoning',
    expanded: false,
    items: ARITHMETIC_REASONING_NAV_ITEMS,
  },
  {
    id: 'word-knowledge',
    label: '3. Word Knowledge',
    expanded: false,
    items: [{ id: 'word-knowledge-placeholder', label: 'Coming Soon', href: null, comingSoon: true }],
  },
  {
    id: 'paragraph-comprehension',
    label: '4. Paragraph Comprehension',
    expanded: false,
    items: [{ id: 'paragraph-comprehension-placeholder', label: 'Coming Soon', href: null, comingSoon: true }],
  },
  {
    id: 'mathematics-knowledge',
    label: '5. Mathematics Knowledge',
    expanded: false,
    items: [
      { id: 'algebra', label: 'Algebra & Lines', href: '#algebra' },
      { id: 'geometry-2d', label: '2D Geometry', href: '#geometry-2d' },
      { id: 'geometry-3d', label: '3D Volume & Surface Area', href: '#geometry-3d' },
      { id: 'exponents-radicals', label: 'Exponents & Radicals', href: '#exponents-radicals' },
      { id: 'factoring', label: 'Factoring Guide', href: '#factoring' },
      { id: 'probability-stats', label: 'Stats & Probability', href: '#probability-stats' },
      { id: 'units-conversions', label: 'Units & Conversions', href: '#units-conversions' },
      { id: 'special-topics', label: 'Special Topics', href: '#special-topics' },
    ],
  },
  {
    id: 'electronics-information',
    label: '6. Electronics Information',
    expanded: false,
    items: [{ id: 'electronics-placeholder', label: 'Coming Soon', href: null, comingSoon: true }],
  },
  {
    id: 'auto-shop',
    label: '7. Auto and Shop',
    expanded: false,
    items: [{ id: 'auto-shop-placeholder', label: 'Coming Soon', href: null, comingSoon: true }],
  },
  {
    id: 'mechanical-comprehension',
    label: '8. Mechanical Comprehension',
    expanded: false,
    items: [{ id: 'mechanical-placeholder', label: 'Coming Soon', href: null, comingSoon: true }],
  },
  {
    id: 'assembling-objects',
    label: '9. Assembling Objects',
    expanded: false,
    items: [{ id: 'assembling-placeholder', label: 'Coming Soon', href: null, comingSoon: true }],
  },
];

interface SidebarProps {
  activeSection: string;
  activeCategory: string;
  onCategorySelect: (categoryId: string, sectionId?: string) => void;
  variant?: 'desktop' | 'drawer';
  onNavigate?: () => void;
  onCloseDrawer?: () => void;
}

function isRouteHref(href: string): boolean {
  return href.startsWith('/');
}

export function Sidebar({
  activeSection,
  activeCategory,
  onCategorySelect,
  variant = 'desktop',
  onNavigate,
  onCloseDrawer,
}: SidebarProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CATEGORIES.map((c) => [c.id, false])),
  );

  useEffect(() => {
    setExpanded((prev) => {
      const next = { ...prev };
      for (const id of CONTENT_CATEGORY_IDS) {
        next[id] = id === activeCategory;
      }
      return next;
    });
  }, [activeCategory]);

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCategoryClick = (cat: NavCategory) => {
    if (CONTENT_CATEGORY_IDS.includes(cat.id as (typeof CONTENT_CATEGORY_IDS)[number])) {
      onCategorySelect(cat.id);
      setExpanded((prev) => ({
        ...prev,
        ...Object.fromEntries(CONTENT_CATEGORY_IDS.map((id) => [id, id === cat.id])),
      }));
      return;
    }
    toggle(cat.id);
  };

  const fireNavigate = () => {
    onNavigate?.();
  };

  const itemClasses =
    'block min-w-0 break-words rounded-md px-3 py-2 pl-6 text-sm font-medium transition-colors';
  const categoryClasses =
    'flex min-w-0 items-center gap-2 rounded-md px-3 py-2 text-left font-semibold text-gray-700 transition-colors hover:bg-gray-100';

  const navShell =
    variant === 'drawer'
      ? 'h-full w-full min-w-0 overflow-y-auto overflow-x-hidden bg-white p-4 shadow-xl'
      : 'h-fit w-full min-w-0 space-y-1 rounded-xl bg-white p-4 shadow-sm lg:sticky lg:top-24';

  return (
    <nav className={navShell} aria-label="Study navigation">
      {variant === 'drawer' && (
        <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3">
          <h3 className="text-sm font-bold text-gray-800">Menu</h3>
          <button
            type="button"
            onClick={onCloseDrawer}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
      {variant === 'desktop' && (
        <h3 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Table of Contents
        </h3>
      )}
      <div className="space-y-1">
        {CATEGORIES.map((cat) => (
          <div key={cat.id}>
            <button
              type="button"
              onClick={() => handleCategoryClick(cat)}
              className={`w-full cursor-pointer ${categoryClasses} ${
                activeCategory === cat.id ? 'bg-emerald-50 text-emerald-800' : ''
              }`}
            >
              {expanded[cat.id] ? (
                <ChevronDown className="h-4 w-4 shrink-0 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 shrink-0 text-gray-500" />
              )}
              <span className="min-w-0 flex-1 break-words">{cat.label}</span>
            </button>
            {expanded[cat.id] && (
              <div className="mt-0.5 space-y-0.5">
                {cat.items.map((item) => {
                  if (isNavSectionHeader(item)) {
                    return (
                      <div
                        key={item.id}
                        className="mt-3 break-words px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 first:mt-0"
                      >
                        {item.label}
                      </div>
                    );
                  }
                  if (item.comingSoon) {
                    return (
                      <div
                        key={item.id}
                        className={`${itemClasses} cursor-not-allowed text-gray-400`}
                      >
                        {item.label} <span className="text-xs">(soon)</span>
                      </div>
                    );
                  }
                  const href = item.href;
                  if (isRouteHref(href)) {
                    return (
                      <NavLink
                        key={item.id}
                        to={href}
                        onClick={fireNavigate}
                        className={({ isActive }) =>
                          `${itemClasses} ${isActive ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'}`
                        }
                      >
                        {item.label}
                      </NavLink>
                    );
                  }
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={href}
                      onClick={(e) => {
                        e.preventDefault();
                        const categoryId = href.includes('arithmetic')
                          ? 'arithmetic-reasoning'
                          : 'mathematics-knowledge';
                        onCategorySelect(categoryId, item.id.replace(/-overview$/, ''));
                        fireNavigate();
                      }}
                      className={`${itemClasses} ${isActive ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
