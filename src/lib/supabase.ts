import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "***************";
const supabaseAnonKey = "*************";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserProfile = {
  id: string;
  username: string;
  avatar_url: string;
  level: number;
  current_xp: number;
  total_xp: number;
  daily_streak: number;
  rank: number;
  last_active: string;
  created_at: string;
};

export type Mission = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  xp_reward: number;
  completed: boolean;
  completed_at: string | null;
  date: string;
  created_at: string;
};

export type PerformanceMetric = {
  id: string;
  user_id: string;
  date: string;
  calls: number;
  deals: number;
  conversations: number;
  created_at: string;
};

export type Boost = {
  id: string;
  user_id: string;
  name: string;
  xp_bonus: number;
  expires_at: string;
  active: boolean;
  created_at: string;
};

export type LiveDeal = {
  id: string;
  user_id: string;
  username: string;
  deal_title: string;
  amount: number;
  created_at: string;
};
