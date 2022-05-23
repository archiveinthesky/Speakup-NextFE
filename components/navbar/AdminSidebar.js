import React from 'react';
import Link from 'next/link';

import {
    HomeIcon,
    BookOpenIcon,
    AnnotationIcon,
    ClipboardCheckIcon,
    ArrowLeftIcon,
} from '@heroicons/react/outline';

const Sidebar = () => {
    return (
        <div className="group fixed top-14 left-0 hidden h-[calc(100vh-56px)] w-56 flex-shrink-0 flex-col overflow-x-hidden rounded-r-[32px] bg-neutral-50 transition-width duration-500 ease-out lg:flex xl:w-64">
            <div className="h-6" />
            <div className="w-full">
                <ul className="mx-auto pl-7 text-primary-900">
                    <Link href="/admin">
                        <li className="flex cursor-pointer list-none gap-4 py-3">
                            <HomeIcon className="w-7 flex-shrink-0" />
                            <p className="whitespace-nowrap text-xl leading-8 text-primary-900">
                                首頁
                            </p>
                        </li>
                    </Link>
                    <Link href="/admin/manage/content">
                        <li className="flex cursor-pointer list-none gap-4 py-3">
                            <BookOpenIcon className="w-7 flex-shrink-0" />
                            <p className="whitespace-nowrap text-xl leading-8 text-primary-900">
                                您的議題
                            </p>
                        </li>
                    </Link>
                    <Link href="/admin/moderate/content">
                        <li className="flex cursor-pointer list-none gap-4 py-3">
                            <ClipboardCheckIcon className="w-7 flex-shrink-0" />
                            <p className="whitespace-nowrap text-xl leading-8 text-primary-900">
                                待審議題
                            </p>
                        </li>
                    </Link>
                    <Link href="/admin/moderate/comments">
                        <li className="flex cursor-pointer list-none gap-4 py-3">
                            <AnnotationIcon className="w-7 flex-shrink-0" />
                            <p className="whitespace-nowrap text-xl leading-8 text-primary-900">
                                留言管理
                            </p>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
