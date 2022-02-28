import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import AccountOptions from './AccountOptions';
import NotificationButton from './Notifications';

import { ArrowLeftIcon, SearchIcon } from '@heroicons/react/outline';

const Header = ({ accprofile = null }) => {
    const router = useRouter();

    const searchSubmit = (e) => {
        e.preventDefault();
        let keyword = e.target[0].value;
        if (keyword !== null) {
            if (keyword.charAt(0) === '#')
                window.location.href = `/search?tags=${keyword.substring(1)}`;
            else window.location.href = `/search?keyword=${keyword}`;
        }
    };

    return (
        <div className="fixed z-20 h-14 w-screen bg-primary-600 px-6 xl:px-14">
            <div className="flex h-full items-center lg:hidden">
                <Link href="/home">
                    <img className="my-auto h-10" src="/logo.svg" alt="logo" />
                </Link>
            </div>

            <div className="hidden items-center justify-between lg:flex">
                <div className="flex h-14 w-screen items-center gap-14">
                    <Link href="/home">
                        <img
                            className="my-auto h-10"
                            src="/logo.svg"
                            alt="logo"
                        />
                    </Link>
                    <form
                        className="hidden w-7/12 max-w-2xl items-center md:flex xl:w-5/12"
                        onSubmit={searchSubmit}
                    >
                        <input
                            className="h-9 w-full rounded-3xl bg-neutral-50 p-5 text-base text-neutral-600"
                            placeholder="搜尋你感興趣的議題"
                            type="text"
                        />
                        <button type="submit" className="relative -left-12">
                            <SearchIcon className="h-6 w-6" />
                        </button>
                    </form>
                </div>
                <div className="flex h-9 items-center justify-end gap-5 ">
                    <NotificationButton />
                    <AccountOptions />
                </div>
            </div>
        </div>
    );
};

export default Header;
