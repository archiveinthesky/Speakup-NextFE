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

import { cloneDeep } from 'lodash';
import { useQuery } from 'react-query';
import { LoadingOverlay, Overlay } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

const Settings = () => {
    const [initValues, setInitValues] = useState({});

    const { data, error, isLoading } = useQuery(
        'settings',
        () => {
            let response = fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/data`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: localStorage.getItem('AuthToken'),
                        Accept: 'application/json',
                    },
                }
            );
            return response.json();
        },
        { refetchOnWindowFocus: false }
    );

    useEffect(() => {
        if (data) {
            let newData = cloneDeep(data);
            newData.birthday = dayjs(data.birthday).toDate();
            setInitValues(newData);
        }
    }, [data]);

    useEffect(() => {
        showNotification({
            title: '資料獲取失敗',
            message: '請重新整理頁面',
            color: 'red',
            disallowClose: true,
            autoClose: false,
        });
    }, [error]);

    return (
        <div className="fixed top-0 left-0 h-screen w-screen overflow-y-scroll bg-neutral-100">
            <Header />
            <Sidebar />
            <Footbar />
            <div className="w-full px-6 md:px-10 lg:py-6 lg:pl-72">
                <div className="mx-auto flex max-w-7xl flex-grow-0 flex-col gap-10 pt-20 md:pt-24">
                    <div className="relative">
                        <LoadingOverlay visible={isLoading} zIndex={10} />
                        {error && <Overlay opacity={0.6} zIndex={10} />}
                        <BasicSettingsCard initValues={initValues} />
                    </div>
                    <div className="relative">
                        <LoadingOverlay visible={isLoading} zIndex={10} />
                        {error && <Overlay opacity={0.6} zIndex={10} />}
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
                    </div>
                    <div className="relative">
                        <LoadingOverlay visible={isLoading} zIndex={10} />
                        {error && <Overlay opacity={0.6} zIndex={10} />}
                        <AccountActions />
                    </div>
                </div>
            </div>

            <div className="h-40 flex-shrink-0"></div>
        </div>
    );
};

export default Settings;