"use client";

import PremiumLogin from "@/components/Login";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const resetSuccess = searchParams.get("reset") === "success";

  return <PremiumLogin resetSuccess={resetSuccess} />;
}
