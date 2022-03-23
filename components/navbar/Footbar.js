import React from 'react';
import Link from 'next/link';
import {
    HomeIcon,
    SearchIcon,
    BookmarkIcon,
    BellIcon,
    UserCircleIcon,
} from '@heroicons/react/outline';

const Footbar = () => {
    return (
        <div className="fixed left-0 bottom-0 z-20 flex h-16 w-full items-center justify-around border-t border-gray-400 bg-neutral-50 px-5 text-primary-900 lg:hidden">
            <Link href="/home">
                <a>
                    <HomeIcon className="h-8 w-8" />
                </a>
            </Link>
            <Link href="/search">
                <a>
                    <SearchIcon className="h-8 w-8" />
                </a>
            </Link>
            <Link href="/collections">
                <a>
                    <BookmarkIcon className="h-8 w-8" />
                </a>
            </Link>
            <Link href="/notifications">
                <a>
                    <BellIcon className="h-8 w-8" />
                </a>
            </Link>
            <Link href="/settings">
                <a>
                    <UserCircleIcon className="h-8 w-8" />
                </a>
            </Link>
        </div>
    );
};

export default Footbar;
