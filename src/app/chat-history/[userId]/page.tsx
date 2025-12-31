"use client";

import UserChatHistoryView from "@/commonComponents/UserChatHistoryView";
import withAdminLayout from "@/components/Layouts/GeneralLayout";
import { useParams } from "next/navigation";

const UserChatHistory = () => {
    const params = useParams<{ userId: string }>();

    if (!params?.userId) {
        return <div className="p-6 text-gray-600">Invalid user</div>;
    }

    return <UserChatHistoryView userId={params.userId} />;
};

export default withAdminLayout(UserChatHistory);
