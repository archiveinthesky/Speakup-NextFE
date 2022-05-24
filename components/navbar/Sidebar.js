import React from 'react';
import Link from 'next/link';

import {
    HomeIcon,
    TrendingUpIcon,
    BookmarkIcon,
} from '@heroicons/react/outline';

const Sidebar = ({ retractable }) => {
    //prettier-ignore
    const tags = ['娛樂','環境','司法','國家發展','經濟','少數族群','媒體','醫藥','道德','政治','教育','家庭','女性','自由','宗教','科技','社會政策','社會運動','體育',];

    return (
        <div
            className={`group fixed top-14 left-0 hidden h-[calc(100vh-56px)] flex-shrink-0 flex-col overflow-hidden overflow-x-hidden rounded-r-[32px] bg-neutral-50 pt-6 transition-width duration-500 ease-out lg:flex ${
                retractable
                    ? 'w-20 hover:w-64 hover:drop-shadow-xl lg:flex'
                    : 'w-64'
            } `}
        >
            <div className="h-44 w-full">
                <ul className="mx-auto pl-7 text-primary-900">
                    <Link href="/home">
                        <li className="flex cursor-pointer list-none gap-4 py-3">
                            <HomeIcon className="w-7 flex-shrink-0" />
                            <p
                                className={`whitespace-nowrap text-xl leading-8 ${
                                    retractable
                                        ? 'text-transparent group-hover:text-primary-900'
                                        : 'text-primary-900'
                                } `}
                            >
                                首頁
                            </p>
                        </li>
                    </Link>
                    <Link href="/search/results?searchterm=@熱門議題">
                        <li className="flex cursor-pointer list-none gap-4 py-3">
                            <TrendingUpIcon className="w-7 flex-shrink-0" />
                            <p
                                className={`whitespace-nowrap text-xl leading-8 ${
                                    retractable
                                        ? 'text-transparent group-hover:text-primary-900'
                                        : 'text-primary-900'
                                } `}
                            >
                                熱門議題
                            </p>
                        </li>
                    </Link>
                    <Link href="/collections">
                        <li className="flex cursor-pointer list-none gap-4 py-3">
                            <BookmarkIcon className="w-7 flex-shrink-0" />
                            <p
                                className={`whitespace-nowrap text-xl leading-8 ${
                                    retractable
                                        ? 'text-transparent group-hover:text-primary-900'
                                        : 'text-primary-900'
                                } `}
                            >
                                我的收藏
                            </p>
                        </li>
                    </Link>
                </ul>
            </div>
            <div className="py-3">
                <hr className="mx-auto w-5/6 border-t-2 border-gray-300" />
            </div>
            <div
                className={`flex-grow overflow-y-auto pb-6 ${
                    retractable ? 'hidden group-hover:block' : 'block'
                }`}
            >
                <ul className="h-full list-none overflow-x-hidden pl-20">
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
};

export default Sidebar;
