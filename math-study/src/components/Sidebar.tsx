const SECTIONS = [
  { id: 'algebra', label: 'Algebra & Lines' },
  { id: 'geometry-2d', label: '2D Geometry' },
  { id: 'geometry-3d', label: '3D Volume & Surface Area' },
  { id: 'exponents-radicals', label: 'Exponents & Radicals' },
  { id: 'factoring', label: 'Factoring Guide' },
  { id: 'probability-stats', label: 'Stats & Probability' },
  { id: 'units-conversions', label: 'Units & Conversions' },
  { id: 'special-topics', label: 'Special Topics' },
] as const;

interface SidebarProps {
  activeSection: string;
}

export function Sidebar({ activeSection }: SidebarProps) {
  return (
    <nav className="lg:w-1/4 space-y-1 bg-white p-4 rounded-xl shadow-sm h-fit sticky top-24">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Table of Contents</h3>
      {SECTIONS.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`sidebar-link block px-3 py-2 rounded-md hover:bg-gray-100 font-medium ${activeSection === id ? 'active' : ''}`}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
