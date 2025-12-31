'use client';

import TrainingPage from '@/components/Training'
import withAdminLayout from '@/components/Layouts/GeneralLayout';

const Training = () => {
    return (
        <div className='w-full '>
            <TrainingPage />
        </div>
    )
}

export default withAdminLayout(Training);