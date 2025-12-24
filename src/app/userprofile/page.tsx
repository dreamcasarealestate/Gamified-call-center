"use client";

import AcaAgentsView from "@/components/AraComponents/AgentsView";

import withAdminLayout from "@/components/Layouts/GeneralLayout";
import UserProfileView from "@/components/UserProfileView";

const UserProfile= () => {
  return (
    <div>
      <UserProfileView />
    </div>
  );
};

export default withAdminLayout(UserProfile);
