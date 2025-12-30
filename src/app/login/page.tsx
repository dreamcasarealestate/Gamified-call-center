'use client';

import PremiumLogin from "@/components/Login";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <PremiumLogin />
    </Suspense>
  );
}
