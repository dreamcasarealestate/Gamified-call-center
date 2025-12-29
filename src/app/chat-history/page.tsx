"use client";
import ChatHistory from "@/components/chat-history";
import withAdminLayout from "@/components/Layouts/GeneralLayout";

function ChatHistoryPage() {
  return (
    <div className="min-h-screen text-white">
      <ChatHistory />
    </div>
  );
}

export default withAdminLayout(ChatHistoryPage);