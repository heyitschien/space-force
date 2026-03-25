import { Link, NavLink, useLocation } from 'react-router-dom';
import { getLevelForTopic } from '../data/arLevels';
import { getArTopicById } from '../data/arTopicContent';
import { ARITHMETIC_REASONING_NAV_ITEMS } from '../data/arithmeticReasoningNav';
import type { NavItem } from '../types/studyNav';
import { isNavSectionHeader } from '../types/studyNav';

interface ArLevelTopicNavProps {
  currentTopicId: string;
}

function isRouteHref(href: string): boolean {
  return href.startsWith('/');
}

function toRouterPath(href: string): string {
  if (href.startsWith('/')) return href;
  if (href.startsWith('#')) return `/${href}`;
  return href;
}

function ArithmeticReasoningFullIndex({ currentPath, locationHash }: { currentPath: string; locationHash: string }) {
  const itemClasses = 'block rounded-md px-2 py-1.5 transition-colors';
  const activeClasses = 'bg-rose-100 font-semibold text-rose-900';
  const idleClasses = 'text-slate-700 hover:bg-slate-50';

  return (
    <details className="group w-full border-t border-slate-200 pt-2">
      <summary className="cursor-pointer list-none py-1 text-sm font-semibold text-slate-600 hover:text-rose-800 [&::-webkit-details-marker]:hidden">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden className="text-slate-400 group-open:rotate-90 transition-transform">
            ▸
          </span>
          All Arithmetic Reasoning topics
        </span>
      </summary>
      <div className="mt-2 max-h-60 overflow-y-auto rounded-lg border border-slate-200 bg-white p-2 text-sm shadow-sm">
        {ARITHMETIC_REASONING_NAV_ITEMS.map((item: NavItem) => {
          if (isNavSectionHeader(item)) {
            return (
              <div
                key={item.id}
                className="mt-2 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 first:mt-0"
              >
                {item.label}
              </div>
            );
          }
          if ('comingSoon' in item && item.comingSoon) {
            return null;
          }
          const href = item.href;
          if (isRouteHref(href)) {
            const isCurrent = currentPath === href;
            return (
              <NavLink
                key={item.id}
                to={href}
                end
                className={`${itemClasses} ${isCurrent ? activeClasses : idleClasses}`}
              >
                {item.label}
              </NavLink>
            );
          }
          const to = toRouterPath(href);
          const overviewActive = currentPath === '/' && locationHash === href;
          return (
            <Link
              key={item.id}
              to={to}
              className={`${itemClasses} ${overviewActive ? activeClasses : idleClasses}`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </details>
  );
}

export function ArLevelTopicNav({ currentTopicId }: ArLevelTopicNavProps) {
  const location = useLocation();
  const level = getLevelForTopic(currentTopicId);
  if (!level) return null;

  return (
    <div className="sticky top-[57px] z-[9] border-b border-slate-200 bg-slate-50/80 px-4 py-2 backdrop-blur">
      <div className="mx-auto flex max-w-4xl min-w-0 flex-col gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">
            Level {level.level} ({level.label}):
          </span>
          <div className="flex flex-wrap gap-2">
            {level.topicIds.map((topicId) => {
              const topic = getArTopicById(topicId);
              const isCurrent = topicId === currentTopicId;
              const label = topic?.title ?? topicId.replace(/-/g, ' ');

              if (isCurrent) {
                return (
                  <span
                    key={topicId}
                    className="rounded-full bg-rose-200 px-4 py-1.5 text-sm font-semibold text-rose-900"
                  >
                    {label}
                  </span>
                );
              }

              return (
                <NavLink
                  key={topicId}
                  to={`/arithmetic-reasoning/${topicId}`}
                  className="rounded-full bg-white/80 px-4 py-1.5 text-sm text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-800"
                >
                  {label}
                </NavLink>
              );
            })}
          </div>
        </div>
        <ArithmeticReasoningFullIndex currentPath={location.pathname} locationHash={location.hash} />
      </div>
    </div>
  );
}
