import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface NavItemLink {
  id: string;
  label: string;
  href: string;
  comingSoon?: false;
  isSectionHeader?: false;
}

interface NavItemPlaceholder {
  id: string;
  label: string;
  href: null;
  comingSoon: true;
  isSectionHeader?: false;
}

interface NavItemSectionHeader {
  id: string;
  label: string;
  isSectionHeader: true;
}

type NavItem = NavItemLink | NavItemPlaceholder | NavItemSectionHeader;

function isSectionHeader(item: NavItem): item is NavItemSectionHeader {
  return 'isSectionHeader' in item && item.isSectionHeader === true;
}

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
    items: [
      { id: 'ar-section-entry', label: 'Entry', isSectionHeader: true },
      { id: 'arithmetic-reasoning-overview', label: 'Overview', href: '#arithmetic-reasoning' },
      { id: 'ar-20-patterns', label: '20 Patterns', href: '/arithmetic-reasoning/patterns' },
      { id: 'ar-pattern-drill', label: 'Pattern Drill', href: '/arithmetic-reasoning/pattern-drill' },
      { id: 'ar-section-l1', label: 'Level 1 (Number mechanics)', isSectionHeader: true },
      { id: 'ar-decimals', label: 'Decimal Operations', href: '/arithmetic-reasoning/decimals' },
      { id: 'ar-fractions', label: 'Fractions', href: '/arithmetic-reasoning/fractions' },
      { id: 'ar-percents', label: 'Percents', href: '/arithmetic-reasoning/percents' },
      { id: 'ar-unit-conversion', label: 'Unit Conversion', href: '/arithmetic-reasoning/unit-conversion' },
      { id: 'ar-section-l2', label: 'Level 2 (Ratio thinking)', isSectionHeader: true },
      { id: 'ar-ratios', label: 'Ratios & Proportions', href: '/arithmetic-reasoning/ratios' },
      { id: 'ar-rate-multiply', label: 'Rate × Quantity', href: '/arithmetic-reasoning/rate-multiply' },
      { id: 'ar-averages', label: 'Averages', href: '/arithmetic-reasoning/averages' },
      { id: 'ar-mixture', label: 'Mixture Problems', href: '/arithmetic-reasoning/mixture' },
      { id: 'ar-section-l3', label: 'Level 3 (Motion & work)', isSectionHeader: true },
      { id: 'ar-rate-distance-time', label: 'Distance, Speed & Time', href: '/arithmetic-reasoning/rate-distance-time' },
      { id: 'ar-work-rate', label: 'Work Rate', href: '/arithmetic-reasoning/work-rate' },
      { id: 'ar-section-l4', label: 'Level 4 (Word problem)', isSectionHeader: true },
      { id: 'ar-word-problem-setup', label: 'Word Problem Setup', href: '/arithmetic-reasoning/word-problem-setup' },
      { id: 'ar-section-l5', label: 'Level 5 (Geometry)', isSectionHeader: true },
      { id: 'ar-area-volume', label: 'Area & Volume', href: '/arithmetic-reasoning/area-volume' },
      { id: 'ar-section-l6', label: 'Level 6 (Algebra)', isSectionHeader: true },
      { id: 'ar-inequalities', label: 'Inequalities', href: '/arithmetic-reasoning/inequalities' },
    ],
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
                  if (isSectionHeader(item)) {
                    return (
                      <div
                        key={item.id}
                        className="mt-3 first:mt-0 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500"
                      >
                        {item.label}
                      </div>
                    );
                  }
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
