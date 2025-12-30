import Chart from "./Chart";
import DealsPortfolio from "./DealsPortfolio";
export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6 max-w-8xl ">
      <Chart />
      <DealsPortfolio />
    </div>
  );
}
