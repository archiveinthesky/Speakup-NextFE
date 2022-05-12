import React, { useState, useEffect } from 'react';
import Header from '../../components/navbar/Header';
import Footbar from '../../components/navbar/Footbar';
import {
    BasicSettingsCard,
    NotificationSettingsCard,
    AccountActions,
} from '../../components/settings/SettingCards';

import Sidebar from '../../components/navbar/Sidebar';

import dayjs from 'dayjs';

import { isEmpty } from 'lodash';

const Settings = () => {
    const [initValues, setInitValues] = useState({});

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/data`, {
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem('AuthToken'),
                Accept: 'application/json',
            },
        }).then(async (response) => {
            let res = await response.json();
            res.birthday = dayjs(res.birthday).toDate();
            setInitValues(res);
        });
    }, []);

    return (
        <div className="fixed top-0 left-0 h-screen w-screen overflow-y-scroll bg-neutral-100">
            <Header />
            <Sidebar />
            <Footbar />
            <div className="w-full px-6 md:px-10 lg:py-6 lg:pl-72">
                <div className="mx-auto flex max-w-7xl flex-grow-0 flex-col gap-10 pt-20 md:pt-24">
                    {!isEmpty(initValues) && (
                        <>
                            <BasicSettingsCard initValues={initValues} />
                            <NotificationSettingsCard
                                initValues={{
                                    all: true,
                                    cmtMod: true,
                                    brdMod: true,
                                    cmtReply: true,
                                    brdAlc: true, //Board analytics
                                    ads: true,
                                }}
                            />
                            <AccountActions />
                        </>
                    )}
                </div>
            </div>

            <div className="h-40 flex-shrink-0"></div>
        </div>
    );
};

export default Settings;
