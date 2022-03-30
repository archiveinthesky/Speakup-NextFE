import React from 'react';
import Link from 'next/link';

import {
    HomeIcon,
    TrendingUpIcon,
    BookmarkIcon,
} from '@heroicons/react/outline';

const Sidebar = ({ retractable }) => {
    const tags = ['教育', '娛樂', '媒體', '科技'];
    const commonStyles =
        'fixed top-14 left-0 hidden h-[calc(100vh-56px)] flex-shrink-0 flex-col overflow-x-hidden rounded-r-[32px] border-neutral-800 bg-white transition-width duration-500 ease-out lg:flex';
    //['娛樂', '環境', '司法', '國家發展', '經濟', '少數族群', '媒體', '醫藥', '道德', '政治', '教育', '家庭', '女性', '自由', '宗教', '科技', '社會政策', '社會運動', '體育'];

    if (retractable) {
        return (
            <div
                className={`group ${commonStyles} w-20 hover:w-64 hover:drop-shadow-xl lg:flex`}
            >
                <div className="h-6" />
                <div className="w-full">
                    <ul className="mx-auto pl-7 text-primary-900">
                        <Link href="/home">
                            <li className="flex cursor-pointer list-none gap-4 py-3">
                                <HomeIcon className="w-7 flex-shrink-0" />
                                <p className=" whitespace-nowrap text-xl leading-8 text-transparent group-hover:text-primary-900">
                                    首頁
                                </p>
                            </li>
                        </Link>
                        <Link href="/search/results?searchterm=封測議題">
                            <li className="flex cursor-pointer list-none gap-4 py-3">
                                <TrendingUpIcon className="w-7 flex-shrink-0" />
                                <p className=" whitespace-nowrap text-xl leading-8 text-transparent group-hover:text-primary-900">
                                    封測議題
                                </p>
                            </li>
                        </Link>
                        <Link href="/collections">
                            <li className="flex cursor-pointer list-none gap-4 py-3">
                                <BookmarkIcon className="w-7 flex-shrink-0" />
                                <p className=" whitespace-nowrap text-xl leading-8 text-transparent group-hover:text-primary-900">
                                    我的收藏
                                </p>
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="hidden group-hover:block">
                    <div className="py-3">
                        <hr className="mx-auto w-5/6 border-t-2 border-gray-300" />
                    </div>
                    <ul className="h-full list-none overflow-y-auto pl-20 overflow-x-hidden">
                        {tags.map((tag, i) => {
                            return (
                                <Link
                                    href={`/search/results?searchterm=@${tag}`}
                                    key={`link${i}`}
                                >
                                    <li
                                        key={i}
                                        className="cursor-pointer whitespace-nowrap py-2 text-lg text-primary-900 "
                                    >
                                        {tag}
                                    </li>
                                </Link>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    } else {
        return (
            <div className={`${commonStyles} w-64`}>
                <div className="h-6" />
                <div className="w-full">
                    <ul className="mx-auto pl-7 text-primary-900">
                        <Link href="/home">
                            <li className="flex cursor-pointer list-none gap-4 py-3">
                                <HomeIcon className="w-7 flex-shrink-0" />
                                <p className=" whitespace-nowrap text-xl leading-8 text-primary-900">
                                    首頁
                                </p>
                            </li>
                        </Link>
                        <Link href="/search/results?searchterm=封測議題">
                            <li className="flex cursor-pointer list-none gap-4 py-3">
                                <TrendingUpIcon className="w-7 flex-shrink-0" />
                                <p className=" whitespace-nowrap text-xl leading-8 text-primary-900">
                                    封測議題
                                </p>
                            </li>
                        </Link>
                        <Link href="/collections">
                            <li className="flex cursor-pointer list-none gap-4 py-3">
                                <BookmarkIcon className="w-7 flex-shrink-0" />
                                <p className=" whitespace-nowrap text-xl leading-8 text-primary-900">
                                    我的收藏
                                </p>
                            </li>
                        </Link>
                    </ul>
                </div>
                <div>
                    <div className="py-3">
                        <hr className="mx-auto w-5/6 border-t-2 border-gray-300" />
                    </div>
                    <ul className="h-full list-none overflow-y-auto pl-20 overflow-x-hidden">
                        {tags.map((tag, i) => {
                            return (
                                <Link
                                    href={`/search/results?searchterm=@${tag}`}
                                    key={`link${i}`}
                                >
                                    <li
                                        key={i}
                                        className="cursor-pointer whitespace-nowrap py-2 text-lg text-primary-900 "
                                    >
                                        {tag}
                                    </li>
                                </Link>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
};

export default Sidebar;
