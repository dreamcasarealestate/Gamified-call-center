import { TrendingUp } from 'lucide-react';
import { PerformanceMetric } from '../../lib/supabase';

interface PerformanceChartProps {
  data: PerformanceMetric[];
}

export default function PerformanceChart({ data }: PerformanceChartProps) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const maxValue = Math.max(
    ...data.flatMap((d) => [d.calls, d.deals, d.conversations])
  );

  const getY = (value: number) => {
    return 150 - (value / maxValue) * 130;
  };

  const createPath = (values: number[]) => {
    if (values.length === 0) return '';

    let path = `M 40 ${getY(values[0])}`;
    values.forEach((value, index) => {
      if (index > 0) {
        const x = 40 + index * 80;
        const y = getY(value);
        path += ` L ${x} ${y}`;
      }
    });
    return path;
  };

  const callsPath = createPath(data.map((d) => d.calls));
  const dealsPath = createPath(data.map((d) => d.deals));
  const conversationsPath = createPath(data.map((d) => d.conversations));

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Weekly Performance</h2>
        <TrendingUp size={24} className="text-emerald-400" />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-900/50 rounded-xl p-3 border border-blue-500/30">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></div>
            <span className="text-xs text-slate-400">Calls</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {data.reduce((sum, d) => sum + d.calls, 0)}
          </p>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-3 border border-emerald-500/30">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50"></div>
            <span className="text-xs text-slate-400">Deals</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {data.reduce((sum, d) => sum + d.deals, 0)}
          </p>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-3 border border-purple-500/30">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50"></div>
            <span className="text-xs text-slate-400">Conversations</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {data.reduce((sum, d) => sum + d.conversations, 0)}
          </p>
        </div>
      </div>

      <div className="relative h-48 bg-slate-900/30 rounded-2xl border border-white/5 p-4">
        <svg
          className="w-full h-full"
          viewBox="0 0 600 180"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="glow-blue">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-emerald">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-purple">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d={conversationsPath}
            fill="none"
            stroke="#a855f7"
            strokeWidth="2"
            filter="url(#glow-purple)"
            className="animate-in fade-in duration-1000"
          />

          <path
            d={callsPath}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            filter="url(#glow-blue)"
            className="animate-in fade-in duration-1000 delay-150"
          />

          <path
            d={dealsPath}
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            filter="url(#glow-emerald)"
            className="animate-in fade-in duration-1000 delay-300"
          />

          {data.map((_, index) => (
            <text
              key={index}
              x={40 + index * 80}
              y="170"
              fill="#94a3b8"
              fontSize="12"
              textAnchor="middle"
            >
              {days[index] || ''}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
