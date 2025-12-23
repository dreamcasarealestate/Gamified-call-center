'use client'
import ChatSidebar from "@/components/ChatPanel";
import withAdminLayout from "@/components/Layouts/GeneralLayout";

 const ChatHistoryPage=()=> {
    return (
        <>
            <ChatSidebar isOpen={true} onClose={() => {}} />
        </>
    );
}

export default withAdminLayout(ChatHistoryPage);