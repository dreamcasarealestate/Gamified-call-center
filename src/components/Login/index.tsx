"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Shield,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import apiClient from "@/Utils/apiClient";
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/user';

// Easily customizable colors - change these HSL values to update the theme
const COLORS = {
  primary: "hsl(220, 80%, 55%)",     // Main brand color
  secondary: "hsl(280, 70%, 60%)",   // Secondary/Accent color
  accent: "hsl(350, 85%, 60%)",      // Highlight color
  neutral: "hsl(215, 25%, 27%)",     // Text/Neutral color
};

export default function PremiumLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("buissn@proton.me");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const login = useAuthStore.getState().login;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // const response = await apiClient.post("/auth/login", {
      //   email,
      //   password,
      // });

      const { token, user } = {token:"tokenUser",user:{id:"1",name:"Demo User",designation:"Agent",isTrainingCompleted:true}};

      if (!token || !user) {
        throw new Error("Invalid login response");
      }

      // ✅ Store in Zustand
      login(token, user);

      // ✅ Redirect after login
      router.push("/aca/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);

      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Invalid email or password";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Animation for floating elements
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md mx-4"
      >
        {/* Decorative Background Elements - Responsive */}
        <div className="absolute -top-6 -left-6 sm:-top-10 sm:-left-10 w-24 h-24 sm:w-40 sm:h-40 opacity-20">
          <motion.div
            animate={floatingAnimation}
            className="absolute top-0 left-0 w-12 h-12 sm:w-20 sm:h-20 rounded-full"
            style={{
              background: `radial-gradient(circle, ${COLORS.primary}, transparent 70%)`,
            }}
          />
        </div>

        <div className="absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 w-24 h-24 sm:w-40 sm:h-40 opacity-20">
          <motion.div
            animate={{
              ...floatingAnimation,
              transition: { ...floatingAnimation.transition, delay: 1 },
            }}
            className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24 rounded-full"
            style={{
              background: `radial-gradient(circle, ${COLORS.secondary}, transparent 70%)`,
            }}
          />
        </div>

        {/* Login Card */}
        <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden border border-white/40">
          {/* Header Section with Gradient */}
          <div
            className="relative h-40 sm:h-48 p-6 sm:p-8 text-white"
            style={{
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
            }}
          >
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute -top-12 -right-12 sm:-top-20 sm:-right-20 w-32 h-32 sm:w-40 sm:h-40 rounded-full opacity-20"
                style={{ backgroundColor: COLORS.accent }}
              />
              <div
                className="absolute top-1/2 left-1/4 w-20 h-20 sm:w-32 sm:h-32 rounded-full opacity-20"
                style={{ backgroundColor: COLORS.accent }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative z-10"
            >
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                    Think Insurance First
                  </h1>
                  <p className="text-white/90 text-sm sm:text-base font-medium mt-1">
                    Trusted Tools for Trusted Advisors
                  </p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 text-white/90"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                <h2 className="text-lg sm:text-xl font-semibold">Welcome Back!</h2>
              </motion.div>
              <p className="mt-1 text-sm sm:text-base">Sign in to continue</p>
            </motion.div>
          </div>

          {/* Login Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="p-6 sm:p-8"
          >
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Email Field */}
            <div className="mb-4 sm:mb-6">
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: COLORS.neutral }}
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: COLORS.primary }} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 sm:pl-12 pr-4 py-3 sm:py-4 bg-gray-50/70 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm sm:text-base"
                  style={
                    {
                      color: COLORS.neutral,
                      "--tw-ring-color": COLORS.primary,
                    } as React.CSSProperties
                  }
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-4 sm:mb-6">
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: COLORS.neutral }}
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: COLORS.primary }} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 sm:pl-12 pr-11 sm:pr-12 py-3 sm:py-4 bg-gray-50/70 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm sm:text-base"
                  style={
                    {
                      color: COLORS.neutral,
                      "--tw-ring-color": COLORS.primary,
                    } as React.CSSProperties
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                  style={{ color: COLORS.primary }}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                      rememberMe ? "border-transparent" : "border-gray-300"
                    }`}
                    style={{
                      backgroundColor: rememberMe
                        ? COLORS.primary
                        : "transparent",
                    }}
                  >
                    {rememberMe && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span
                  className="ml-3 text-sm"
                  style={{ color: COLORS.neutral }}
                >
                  Remember me
                </span>
              </label>

              <motion.a
                whileHover={{ x: 5 }}
                href="#"
                className="text-sm font-medium flex items-center gap-1"
                style={{ color: COLORS.primary }}
              >
                Forgot password? <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </motion.a>
            </div>

            {/* Sign In Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3 sm:py-4 px-6 rounded-lg sm:rounded-xl font-semibold text-white flex items-center justify-center gap-2 sm:gap-3 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
              style={{
                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
                opacity: isLoading ? 0.8 : 1,
              }}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Footer */}
          <div className="px-6 sm:px-8 py-4 sm:py-6 border-t border-gray-100">
            <p className="text-center text-xs sm:text-sm text-gray-500">
              © 2025 Think Insurance First. All rights reserved.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}