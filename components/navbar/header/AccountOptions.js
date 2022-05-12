import React from 'react';

import {
    UserCircleIcon,
    CogIcon,
    InformationCircleIcon,
    LogoutIcon,
} from '@heroicons/react/outline';
import { Menu } from '@mantine/core';

const AccountOptions = () => {
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
                <button className="inline-flex h-9 w-9 justify-center overflow-hidden rounded-full text-sm text-gray-700 ">
                    <UserCircleIcon className="h-9 w-9 text-neutral-50" />
                </button>
            }
            position="bottom"
            placement="end"
        >
            <Menu.Item icon={<CogIcon className="h-7 w-7" />}> 設定 </Menu.Item>
            <Menu.Item icon={<InformationCircleIcon className="h-7 w-7" />}>
                關於
            </Menu.Item>
            <Menu.Item
                icon={<LogoutIcon className="h-7 w-7" />}
                onClick={logout}
            >
                登出
            </Menu.Item>
        </Menu>
    );
};

export default AccountOptions;
