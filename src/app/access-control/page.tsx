'use client';

import AccessControlView from '@/components/AccessControlView';
import AraDealsView from '@/components/AraComponents/DealsView'
import withAdminLayout from '@/components/Layouts/GeneralLayout';

const AccessControl = () => {
    return (
        <div>
            <AccessControlView />
        </div>
    )
}

export default withAdminLayout(AccessControl );