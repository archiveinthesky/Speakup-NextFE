import React from 'react';
import Link from 'next/link';
import {
    HomeIcon,
    SearchIcon,
    BookmarkIcon,
    BellIcon,
    UserCircleIcon,
} from '@heroicons/react/outline';

import {
    HomeIcon as HomeIconSolid,
    SearchIcon as SearchIconSolid,
    BookmarkIcon as BookmarkIconSolid,
    BellIcon as BellIconSolid,
    UserCircleIcon as UserCircleIconSolid,
} from '@heroicons/react/solid';
import { useRouter } from 'next/router';

const Footbar = () => {
    const router = useRouter();

    const pageUrl = (() => {
        let url = '',
            len = router.pathname.length;
        for (let i = 0; i < len; i++) {
            let currentChar = router.pathname[len - i - 1];
            if (i == 0 && currentChar == '/') {
            } else if (currentChar == '/') break;
            url += currentChar;
        }
        return url.split('').reverse().join('');
    })();

    return (
        <div className="fixed left-0 bottom-0 z-20 flex h-16 w-full items-center justify-around border-t border-gray-400 bg-neutral-50 px-5 text-primary-900 lg:hidden">
            <Link href="/home">
                <a>
                    {pageUrl == 'home' ? (
                        <HomeIconSolid className="h-8 w-8" />
                    ) : (
                        <HomeIcon className="h-8 w-8" />
                    )}
                </a>
            </Link>
            <Link href="/search">
                <a>
                    {pageUrl == 'search' || pageUrl == 'results' ? (
                        <SearchIconSolid className="h-8 w-8" />
                    ) : (
                        <SearchIcon className="h-8 w-8" />
                    )}
                </a>
            </Link>
            <Link href="/collections">
                <a>
                    {pageUrl == 'collections' ? (
                        <BookmarkIconSolid className="h-8 w-8" />
                    ) : (
                        <BookmarkIcon className="h-8 w-8" />
                    )}
                </a>
            </Link>
            <Link href="/notifications">
                <a>
                    {pageUrl == 'notifications' ? (
                        <BellIconSolid className="h-8 w-8" />
                    ) : (
                        <BellIcon className="h-8 w-8" />
                    )}
                </a>
            </Link>
            <Link href="/aboutuser">
                <a>
                    {pageUrl == 'aboutuser' ? (
                        <UserCircleIconSolid className="h-8 w-8" />
                    ) : (
                        <UserCircleIcon className="h-8 w-8" />
                    )}
                </a>
            </Link>
        </div>
    );
};

export default Footbar;
