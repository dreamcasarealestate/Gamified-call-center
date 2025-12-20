"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import ProgressSection from "@/components/dashboard/ProgressSection";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import Missions from "@/components/dashboard/Missions";
import GiftBox from "@/components/dashboard/GiftBox";
import MiniLeaderboard from "@/components/dashboard/MiniLeaderboard";
import Boosts from "@/components/dashboard/Boosts";
import LiveDealsFeed from "@/components/dashboard/LiveDealsFeed";
import {
  Mission,
  PerformanceMetric,
  Boost,
  UserProfile,
  LiveDeal,
} from "../../lib/supabase";
import { useState } from "react";
import GeneralLayout from "@/components/Layouts/GeneralLayout";

export default function DashboardPage() {
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: "1",
      user_id: "user1",
      title: "Complete 10 Sales Calls",
      description: "Make meaningful connections with prospects",
      xp_reward: 50,
      completed: true,
      completed_at: new Date().toISOString(),
      date: new Date().toISOString().split("T")[0],
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      user_id: "user1",
      title: "Close 3 Deals",
      description: "Convert prospects to customers",
      xp_reward: 100,
      completed: true,
      completed_at: new Date().toISOString(),
      date: new Date().toISOString().split("T")[0],
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      user_id: "user1",
      title: "Follow up with 5 Leads",
      description: "Send personalized follow-up messages",
      xp_reward: 30,
      completed: false,
      completed_at: null,
      date: new Date().toISOString().split("T")[0],
      created_at: new Date().toISOString(),
    },
    {
      id: "4",
      user_id: "user1",
      title: "Update CRM Records",
      description: "Keep your pipeline organized",
      xp_reward: 20,
      completed: false,
      completed_at: null,
      date: new Date().toISOString().split("T")[0],
      created_at: new Date().toISOString(),
    },
  ]);

  const performanceData: PerformanceMetric[] = [
    {
      id: "1",
      user_id: "user1",
      date: "2024-01-15",
      calls: 12,
      deals: 3,
      conversations: 8,
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      user_id: "user1",
      date: "2024-01-16",
      calls: 15,
      deals: 5,
      conversations: 10,
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      user_id: "user1",
      date: "2024-01-17",
      calls: 10,
      deals: 2,
      conversations: 7,
      created_at: new Date().toISOString(),
    },
    {
      id: "4",
      user_id: "user1",
      date: "2024-01-18",
      calls: 18,
      deals: 6,
      conversations: 12,
      created_at: new Date().toISOString(),
    },
    {
      id: "5",
      user_id: "user1",
      date: "2024-01-19",
      calls: 14,
      deals: 4,
      conversations: 9,
      created_at: new Date().toISOString(),
    },
    {
      id: "6",
      user_id: "user1",
      date: "2024-01-20",
      calls: 16,
      deals: 5,
      conversations: 11,
      created_at: new Date().toISOString(),
    },
    {
      id: "7",
      user_id: "user1",
      date: "2024-01-21",
      calls: 20,
      deals: 7,
      conversations: 14,
      created_at: new Date().toISOString(),
    },
  ];

  const boosts: Boost[] = [
    {
      id: "1",
      user_id: "user1",
      name: "Weekend Warrior",
      xp_bonus: 10,
      expires_at: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
      active: true,
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      user_id: "user1",
      name: "Deal Closer",
      xp_bonus: 15,
      expires_at: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
      active: true,
      created_at: new Date().toISOString(),
    },
  ];

  const topUsers: UserProfile[] = [
    {
      id: "1",
      username: "Sarah Chen",
      avatar_url: "",
      level: 15,
      current_xp: 450,
      total_xp: 8750,
      daily_streak: 12,
      rank: 1,
      last_active: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      username: "Mike Torres",
      avatar_url: "",
      level: 14,
      current_xp: 320,
      total_xp: 7820,
      daily_streak: 8,
      rank: 2,
      last_active: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      username: "Alex Kim",
      avatar_url: "",
      level: 13,
      current_xp: 280,
      total_xp: 7280,
      daily_streak: 15,
      rank: 3,
      last_active: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
  ];

  const liveDeals: LiveDeal[] = [
    {
      id: "1",
      user_id: "user1",
      username: "Sarah Chen",
      deal_title: "Enterprise Plan",
      amount: 15000,
      created_at: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      user_id: "user2",
      username: "Mike Torres",
      deal_title: "Premium Package",
      amount: 8500,
      created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      user_id: "user3",
      username: "Alex Kim",
      deal_title: "Starter Bundle",
      amount: 3200,
      created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    },
    {
      id: "4",
      user_id: "user4",
      username: "Emma Davis",
      deal_title: "Professional Suite",
      amount: 12000,
      created_at: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    },
  ];

  const handleToggleMission = (id: string) => {
    setMissions((prev) =>
      prev.map((mission) =>
        mission.id === id
          ? {
              ...mission,
              completed: !mission.completed,
              completed_at: !mission.completed
                ? new Date().toISOString()
                : null,
            }
          : mission
      )
    );
  };

  return (
    <GeneralLayout>
      <div className="min-h-screen bg-[#0B0F1A] text-white antialiased ">
        {/* MAIN CONTENT WRAPPER - Full width now */}
        <div className="max-w-7xl mx-auto flex flex-col p-4 md:p-6 gap-6">
          {/* Row 1 - Progress Section (Full Width) */}
          <ProgressSection
            level={5}
            currentXp={300}
            xpToNextLevel={500}
            dailyStreak={3}
          />

          {/* Row 2 - Missions and Performance (Split Row) */}
          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            {/* Missions - Uses Flex-1 to take equal space */}
            <div className="flex-1">
              <Missions missions={missions} onToggle={handleToggleMission} />
            </div>

            {/* Performance Chart - Uses Flex-1 to take equal space */}
            <div className="flex-1">
              <PerformanceChart data={performanceData} />
            </div>
          </div>

          {/* Row 3 - Mini Leaderboard, Gifts and Boosts (Grid Layout) */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {/* Mini Leaderboard - Spans 2 columns on small screens, 1 on large */}
            <div className="sm:col-span-2 lg:col-span-1">
              <MiniLeaderboard topUsers={topUsers} currentUserRank={7} />
            </div>

            {/* Gift Box */}
            <div className="h-full">
              <GiftBox />
            </div>

            {/* Boosts */}
            <div className="h-full">
              <Boosts boosts={boosts} />
            </div>
          </section>

          {/* Row 4 - Live Deals Feed (Full Width) */}
          <section className="bg-slate-900/30 rounded-2xl border border-white/5">
            <LiveDealsFeed deals={liveDeals} />
          </section>
        </div>
      </div>
    </GeneralLayout>
  );
}
