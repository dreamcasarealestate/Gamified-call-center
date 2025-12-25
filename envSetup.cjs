// envSetup.cjs
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("node:path");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require("node:fs");

const deploymentType = process.env.APP_ENV || "local";
const sourceEnvPath = path.resolve(process.cwd(), "env", `${deploymentType}.env`);
const targetEnvPath = path.resolve(process.cwd(), ".env");

try {
  if (!fs.existsSync(sourceEnvPath)) {
    console.error(`❌ Missing env file: ${sourceEnvPath}`);
    process.exit(1); // IMPORTANT: stop "next dev"
  }

  const data = fs.readFileSync(sourceEnvPath, "utf8");
  fs.writeFileSync(targetEnvPath, data, { encoding: "utf8" });

  console.log(`✅ .env generated from: env/${deploymentType}.env`);
} catch (err) {
  console.error("❌ envSetup failed:", err);
  process.exit(1);
}
