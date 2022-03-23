import React from 'react';
import Header from '../../components/header/Header';
import Footbar from '../../components/navbar/Footbar';
import {
    BasicSettingsCard,
    NotificationSettingsCard,
} from '../../components/settings/SettingCards';

import Sidebar from '../../components/navbar/Sidebar';

import dayjs from 'dayjs';

const Settings = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-screen overflow-y-scroll bg-neutral-50">
            <Header />
            <Sidebar />
            <Footbar />
            <div className="w-full px-6 md:px-10 lg:py-6 lg:pl-72">
                <div className="mx-auto flex max-w-7xl flex-grow-0 flex-col gap-10 pt-20 md:pt-24">
                    <BasicSettingsCard
                        initValues={{
                            name: '櫻島麻衣',
                            username: 'sakura_mai',
                            birthday: dayjs().subtract(13, 'year').toDate(),
                            email: 'wakeup@reality.truth',
                        }}
                    />
                    <NotificationSettingsCard />
                </div>
            </div>

            <div className="h-40 flex-shrink-0"></div>
        </div>
    );
};

export default Settings;
