import { Trophy, Medal, Award } from 'lucide-react';
import { UserProfile } from '../../lib/supabase';

interface MiniLeaderboardProps {
  topUsers: UserProfile[];
  currentUserRank: number;
}

export default function MiniLeaderboard({ topUsers, currentUserRank }: MiniLeaderboardProps) {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy size={20} className="text-amber-400" />;
    if (rank === 2) return <Medal size={20} className="text-slate-300" />;
    if (rank === 3) return <Award size={20} className="text-orange-400" />;
    return <span className="text-slate-400 font-bold">#{rank}</span>;
  };

  return (
    <div className="h-full bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Leaderboard</h3>
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg px-3 py-1">
          <span className="text-xs font-bold text-blue-400">Rank #{currentUserRank}</span>
        </div>
      </div>

      <div className="space-y-3">
        {topUsers.map((user, index) => {
          const rank = index + 1;
          return (
            <div
              key={user.id}
              className="flex items-center gap-3 p-3 bg-slate-900/30 rounded-xl border border-white/5 hover:bg-slate-900/50 transition-colors"
            >
              <div className="shrink-0 w-6 flex items-center justify-center">
                {getRankIcon(rank)}
              </div>

              <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                {user.username.substring(0, 2).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {user.username}
                </p>
                <p className="text-xs text-slate-400">Level {user.level}</p>
              </div>

              <div className="text-right">
                <p className="text-sm font-bold text-emerald-400">
                  {user.total_xp.toLocaleString()}
                </p>
                <p className="text-xs text-slate-400">XP</p>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full cursor-pointer mt-4 bg-slate-700/50 hover:bg-slate-700 text-white font-medium py-2 rounded-xl transition-colors border border-white/10">
        View Full Leaderboard
      </button>
    </div>
  );
}
