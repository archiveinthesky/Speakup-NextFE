import { Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';

const AccountActions = () => {
    const { data: session } = useSession();

    const styles = {
        button: 'flex h-11 w-20 items-center justify-center rounded-md bg-primary-700 hover:bg-primary-600 text-white focus:outline-none',
        p: 'text-left md:text-right text-lg leading-[44px] text-neutral-800',
    };

    const logout = () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`, {
            method: 'POST',
            headers: {
                Authorization: `Token ${session.authToken}`,
            },
        }).then((response) => {
            if (response.status === 204) {
                signOut();
            } else
                showNotification({
                    title: '登出失敗',
                    message: '請再試一次',
                    color: 'red',
                    autoClose: false,
                });
        });
    };

    return (
        <div className="w-full bg-white pb-10 lg:bg-neutral-50 ">
            <div className="mx-6 flex h-20 items-center justify-between py-5 md:mx-16">
                <h1 className="text-2xl text-neutral-800">帳號行動</h1>
            </div>
            <div className="flex flex-col gap-8 px-6 text-left md:grid md:grid-cols-[4fr,6fr] md:items-center ">
                <p className={styles.p}>登出帳號</p>
                <Button variant="outline" className="w-16" onClick={logout}>
                    登出
                </Button>
                <p className={styles.p}>意見回饋</p>
                <a
                    className="w-28"
                    href="https://forms.gle/YfUQJ1MDheYQozVy8"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    <Button variant="outline" className="w-28">
                        意見回饋
                    </Button>
                </a>
            </div>
        </div>
    );
};
export default AccountActions;
