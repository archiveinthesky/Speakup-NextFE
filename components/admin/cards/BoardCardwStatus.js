import React from 'react';
import Link from 'next/link';

import {
    ChatAlt2Icon,
    CalendarIcon,
    BookmarkIcon,
    ClockIcon,
} from '@heroicons/react/outline';
import { EyeIcon, ExclamationIcon } from '@heroicons/react/solid';

const BoardCard = ({ cardContent, redirectURL }) => {
    return (
        <a href={redirectURL} className="w-full">
            <>
                <div className="relative flex w-full cursor-pointer justify-between overflow-hidden rounded-2xl border-2 border-primary-800 bg-white pr-4 md:pr-7 lg:hidden">
                    <div className="w-20 flex-shrink-0 bg-primary-700 md:w-24"></div>
                    <div className=" w-full flex-grow py-2 px-4 text-primary-700">
                        <h3 className="text-lg text-neutral-800 md:text-xl">
                            {cardContent.title}
                        </h3>
                        <div className="my-1 flex items-center">
                            <ChatAlt2Icon className="mr-2 h-6 w-6 flex-shrink-0" />
                            <p className="text-xs">{cardContent.comments}</p>
                        </div>
                        <div className="my-1 flex items-center">
                            <BookmarkIcon className="mr-2 h-6 w-6 flex-shrink-0" />
                            <p className="text-xs">{cardContent.collections}</p>
                        </div>
                        <div className=" absolute bottom-2 right-3 flex items-end gap-1">
                            <p className="text-xs text-neutral-700">
                                {cardContent.date}
                            </p>
                            {cardContent.status == 'pm' && (
                                <ClockIcon className="h-6 flex-shrink-0 text-yellow-500" />
                            )}
                            {cardContent.status == 'ra' && (
                                <ExclamationIcon className="h-6 flex-shrink-0 fill-red-500" />
                            )}
                        </div>
                    </div>
                </div>
                <div className="hidden h-24 w-full cursor-pointer items-center justify-between overflow-hidden rounded-2xl border-2 border-primary-800 bg-white pr-4 md:pr-7 lg:flex">
                    <div className="h-full w-24 flex-shrink-0 bg-primary-700 "></div>
                    <div className="flex h-full w-1/2 items-center px-6">
                        <h3 className="text-2xl text-neutral-800 ">
                            {cardContent.title}
                        </h3>
                    </div>
                    <div className=" h-20 border-l-2 border-primary-800"></div>
                    <div
                        className={`flex w-1/2  justify-around gap-1 text-primary-600`}
                    >
                        <div className="flex w-20 flex-col items-center justify-center gap-2">
                            <ChatAlt2Icon className="h-7 w-7 flex-shrink-0" />
                            <p className="text-sm">{cardContent.comments}</p>
                        </div>
                        <div className="flex w-20 flex-col items-center justify-center gap-2">
                            <BookmarkIcon className="h-7 w-7 flex-shrink-0" />
                            <p className="text-sm">{cardContent.collections}</p>
                        </div>
                        <div className="flex w-20 flex-col items-center justify-center gap-2">
                            <CalendarIcon className="h-7 w-7 flex-shrink-0" />
                            <p className="text-sm">{cardContent.date}</p>
                        </div>
                        <div className="flex w-20 flex-col items-center justify-center gap-2">
                            {cardContent.status == 'pb' && (
                                <EyeIcon className="h-7 w-7 flex-shrink-0 fill-green-500" />
                            )}
                            {cardContent.status == 'pm' && (
                                <ClockIcon className="h-7 w-7 flex-shrink-0 text-yellow-500" />
                            )}
                            {cardContent.status == 'ra' && (
                                <ExclamationIcon className="h-7 w-7 flex-shrink-0 fill-red-500" />
                            )}
                            <p
                                className={`text-sm ${
                                    cardContent.status == 'pb'
                                        ? 'text-green-500'
                                        : cardContent.status == 'pm'
                                        ? 'text-yellow-500'
                                        : 'text-red-500'
                                }`}
                            >
                                {cardContent.status == 'pb'
                                    ? '公開'
                                    : cardContent.status == 'pm'
                                    ? '待審'
                                    : '需要注意'}
                            </p>
                        </div>
                    </div>
                </div>
            </>
        </a>
    );
};

export default BoardCard;
