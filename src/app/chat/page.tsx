'use client'
import ChatPanel from "@/components/ChatPanel";
import withAdminLayout from "@/components/Layouts/GeneralLayout";

const ChatPanelPage = () => {
    return (
        <ChatPanel />
    );
}

export default withAdminLayout(ChatPanelPage);