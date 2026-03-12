import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface NavItemLink {
  id: string;
  label: string;
  href: string;
  comingSoon?: false;
}

interface NavItemPlaceholder {
  id: string;
  label: string;
  href: null;
  comingSoon: true;
}

type NavItem = NavItemLink | NavItemPlaceholder;

interface NavCategory {
  id: string;
  label: string;
  expanded: boolean;
  items: NavItem[];
}

const CONTENT_CATEGORY_IDS = ['general-science', 'arithmetic-reasoning', 'mathematics-knowledge'];

const CATEGORIES: NavCategory[] = [
  {
    id: 'general-science',
    label: '1. General Science',
    expanded: true,
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
    expanded: true,
    items: [{ id: 'arithmetic-reasoning-overview', label: 'Overview', href: '#arithmetic-reasoning' }],
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
    expanded: true,
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
}

function isRouteHref(href: string): boolean {
  return href.startsWith('/');
}

export function Sidebar({ activeSection, activeCategory, onCategorySelect }: SidebarProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CATEGORIES.map((c) => [c.id, c.expanded]))
  );

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCategoryClick = (cat: NavCategory) => {
    if (CONTENT_CATEGORY_IDS.includes(cat.id)) {
      onCategorySelect(cat.id);
    }
    toggle(cat.id);
  };

  const itemClasses = 'block rounded-md px-3 py-2 pl-6 font-medium transition-colors text-sm';
  const categoryClasses = 'flex items-center gap-1 rounded-md px-3 py-2 font-semibold text-gray-700 transition-colors cursor-pointer hover:bg-gray-100';

  return (
    <nav className="lg:w-1/4 space-y-1 bg-white p-4 rounded-xl shadow-sm h-fit sticky top-24">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
        Table of Contents
      </h3>
      <div className="space-y-1">
        {CATEGORIES.map((cat) => (
          <div key={cat.id}>
            <button
              type="button"
              onClick={() => handleCategoryClick(cat)}
              className={`w-full text-left ${categoryClasses} ${
                activeCategory === cat.id ? 'bg-emerald-50 text-emerald-800' : ''
              }`}
            >
              {expanded[cat.id] ? (
                <ChevronDown className="h-4 w-4 shrink-0 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 shrink-0 text-gray-500" />
              )}
              {cat.label}
            </button>
            {expanded[cat.id] && (
              <div className="mt-0.5 space-y-0.5">
                {cat.items.map((item) => {
                  if (item.comingSoon) {
                    return (
                      <div
                        key={item.id}
                        className={`${itemClasses} text-gray-400 cursor-not-allowed`}
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
                        className={({ isActive }) =>
                          `${itemClasses} ${isActive ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-gray-100 text-gray-700'}`
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
                        const categoryId = href.includes('arithmetic') ? 'arithmetic-reasoning' : 'mathematics-knowledge';
                        onCategorySelect(categoryId, item.id.replace(/-overview$/, ''));
                      }}
                      className={`${itemClasses} ${isActive ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-gray-100 text-gray-700'}`}
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
