import PremiumLogin from "@/components/Login";

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const reset = searchParams?.reset;
  const resetSuccess = reset === "success";

  return <PremiumLogin resetSuccess={resetSuccess} />;
}
