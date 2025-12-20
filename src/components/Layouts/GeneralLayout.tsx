import React, { ReactNode } from "react";
import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";

export default function GeneralLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64 ">
        {/* Topbar */}
        <div className="">
          <Topbar/>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-3 mt-16">
          {children}
        </main>
      </div>
    </div>
  );
}
