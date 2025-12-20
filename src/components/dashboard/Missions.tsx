import { CheckCircle2, Circle, Zap } from 'lucide-react';
import { Mission } from '../../lib/supabase';

interface MissionsProps {
  missions: Mission[];
  onToggle: (id: string) => void;
}

export default function Missions({ missions, onToggle }: MissionsProps) {
  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Today's Missions</h2>
        <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-xl px-3 py-1">
          <Zap size={16} className="text-emerald-400" />
          <span className="text-sm font-semibold text-emerald-400">
            {missions.filter((m) => m.completed).length}/{missions.length} Complete
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {missions.map((mission) => (
          <button
            key={mission.id}
            onClick={() => onToggle(mission.id)}
            className="w-full group"
          >
            <div
              className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                mission.completed
                  ? 'bg-emerald-500/10 border-emerald-500/30'
                  : 'bg-slate-900/30 border-white/5 hover:bg-slate-900/50 hover:border-white/10'
              }`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {mission.completed ? (
                  <CheckCircle2
                    size={24}
                    className="text-emerald-400 animate-in zoom-in duration-300"
                  />
                ) : (
                  <Circle
                    size={24}
                    className="text-slate-500 group-hover:text-slate-400 transition-colors"
                  />
                )}
              </div>

              <div className="flex-1 text-left">
                <h3
                  className={`font-semibold transition-all duration-300 ${
                    mission.completed
                      ? 'text-slate-400 line-through'
                      : 'text-white'
                  }`}
                >
                  {mission.title}
                </h3>
                {mission.description && (
                  <p className="text-sm text-slate-400 mt-1">
                    {mission.description}
                  </p>
                )}
              </div>

              <div
                className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                  mission.completed
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-slate-800/50 text-amber-400'
                }`}
              >
                <Zap size={14} />
                <span className="text-xs font-bold">+{mission.xp_reward}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
