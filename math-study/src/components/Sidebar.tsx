import { NavLink } from 'react-router-dom';

const SECTIONS: Array<
  | { id: string; label: string; href: string }
  | { id: string; label: string }
> = [
  { id: 'general-science-astronomy', label: 'General Science — Astronomy', href: '/astronomy' },
  { id: 'general-science-biology', label: 'General Science — Biology', href: '/biology' },
  { id: 'general-science-chemistry', label: 'General Science — Chemistry & Atoms', href: '/chemistry' },
  { id: 'general-science-earth', label: 'General Science — Earth Science', href: '/earth-science' },
  { id: 'general-science-measurement', label: 'General Science — Measurement & Physics', href: '/measurement-physics' },
  { id: 'algebra', label: 'Algebra & Lines' },
  { id: 'geometry-2d', label: '2D Geometry' },
  { id: 'geometry-3d', label: '3D Volume & Surface Area' },
  { id: 'exponents-radicals', label: 'Exponents & Radicals' },
  { id: 'factoring', label: 'Factoring Guide' },
  { id: 'probability-stats', label: 'Stats & Probability' },
  { id: 'units-conversions', label: 'Units & Conversions' },
  { id: 'special-topics', label: 'Special Topics' },
];

const GENERAL_SCIENCE_IDS = ['general-science-astronomy', 'general-science-biology', 'general-science-chemistry', 'general-science-earth', 'general-science-measurement'];

interface SidebarProps {
  activeSection: string;
}

export function Sidebar({ activeSection }: SidebarProps) {
  const routeLinkClasses =
    'sidebar-link block rounded-md px-3 py-2 font-medium transition-colors';

  return (
    <nav className="lg:w-1/4 space-y-1 bg-white p-4 rounded-xl shadow-sm h-fit sticky top-24">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Table of Contents</h3>
      {SECTIONS.map(({ id, label, ...rest }) =>
        'href' in rest && rest.href ? (
          <NavLink
            key={id}
            to={rest.href}
            className={({ isActive }) =>
              `${routeLinkClasses} ${
                GENERAL_SCIENCE_IDS.includes(id) ? 'pl-4' : ''
              } ${isActive ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-gray-100'}`
            }
          >
            {label}
          </NavLink>
        ) : (
          <a
            key={id}
            href={`#${id}`}
            className={`${routeLinkClasses} ${
              activeSection === id ? 'active' : 'hover:bg-gray-100'
            }`}
          >
            {label}
          </a>
        )
      )}
    </nav>
  );
}
