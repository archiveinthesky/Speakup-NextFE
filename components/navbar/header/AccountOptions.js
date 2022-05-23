import React from 'react';

import {
    UserCircleIcon,
    CogIcon,
    InformationCircleIcon,
    LogoutIcon,
    PencilAltIcon,
    ChevronDownIcon,
    HomeIcon,
} from '@heroicons/react/outline';
import { Menu } from '@mantine/core';
import { useRouter } from 'next/router';

const AccountOptions = () => {
    const router = useRouter();

    const inAdmin = router.pathname.split('/')[1] == 'admin';

    const userdata = {
        token: '',
        username: 'Andrew',
        profileImg:
            'https://lh3.googleusercontent.com/TsbW_LVdVZIjYX2SGGu0X5OxTnj-zZLYXUC66RRUfq94GW6iSuIQU6PVO64Z_pKp-ldWJ6YXVL2xvXEQbA=w60-h60-l90-rj',
        reputation: 2000,
    };

    const logout = () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`, {
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem('AuthToken'),
            },
        }).then((response) => {
            if (response.status === 204) {
                localStorage.removeItem('AuthToken');
                window.location.href = '/';
            }
        });
    };

    return (
        <Menu
            control={
                <button className="flex items-center gap-2 rounded-3xl bg-primary-400 py-2 px-3 text-neutral-800">
                    <div className="h-7 w-7 overflow-hidden rounded-full">
                        <img
                            className="h-full"
                            src={userdata.profileImg}
                            alt="pfp"
                        />
                    </div>
                    <p className="">{userdata.username}</p>
                    <ChevronDownIcon className="h-4 w-4" />
                </button>
            }
            position="bottom"
            placement="end"
        >
            <Menu.Item
                className="text-primary-900"
                icon={
                    inAdmin ? (
                        <HomeIcon className="h-7 w-7" />
                    ) : (
                        <PencilAltIcon className="h-7 w-7" />
                    )
                }
                onClick={() => {
                    window.location.href = inAdmin ? '/home' : '/admin';
                }}
            >
                {inAdmin ? 'Speakup首頁' : '創作者介面'}
            </Menu.Item>
            <Menu.Item
                className="text-primary-900"
                icon={<CogIcon className="h-7 w-7" />}
                onClick={() => {
                    window.location.href = '/settings';
                }}
            >
                設定
            </Menu.Item>
            <Menu.Item
                className="text-primary-900"
                icon={<InformationCircleIcon className="h-7 w-7" />}
            >
                關於
            </Menu.Item>
            <Menu.Item
                className="text-primary-900"
                icon={<LogoutIcon className="h-7 w-7" />}
                onClick={logout}
            >
                登出
            </Menu.Item>
        </Menu>
    );
};

export default AccountOptions;
