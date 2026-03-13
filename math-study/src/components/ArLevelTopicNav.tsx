import { NavLink } from 'react-router-dom';
import { getLevelForTopic } from '../data/arLevels';
import { getArTopicById } from '../data/arTopicContent';

interface ArLevelTopicNavProps {
  currentTopicId: string;
}

export function ArLevelTopicNav({ currentTopicId }: ArLevelTopicNavProps) {
  const level = getLevelForTopic(currentTopicId);
  if (!level) return null;

  return (
    <div className="sticky top-[57px] z-[9] border-b border-slate-200 bg-slate-50/80 px-4 py-2 backdrop-blur">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-2">
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
    </div>
  );
}
