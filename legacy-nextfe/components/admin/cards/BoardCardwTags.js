import React from 'react';
import Link from 'next/link';

const BoardCard = ({ cardContent, redirectURL }) => {
    return (
        <a href={redirectURL} className="w-full">
            <>
                <div className="relative flex w-full cursor-pointer justify-between overflow-hidden rounded-2xl border-2 border-primary-800 bg-white pr-4 md:pr-7 lg:hidden">
                    <div className="w-20 flex-shrink-0 bg-primary-700 md:w-24"></div>
                    <div className="relative w-full flex-grow py-2 px-4 text-primary-700">
                        <h3 className="text-lg text-neutral-800 md:text-xl">
                            {cardContent.title}
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {cardContent.tags.map((tag, i) => (
                                <Link
                                    href={`/search/results?searchterm=@${tag}`}
                                    key={i}
                                >
                                    <div className="flex h-6 flex-shrink-0 cursor-pointer items-center rounded-2xl border-[1.5px] border-neutral-400 px-3">
                                        <p className="text-center text-xs text-neutral-500">{`#${tag}`}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <p className="absolute bottom-2 -right-1 text-sm">
                            {cardContent.remainTime}天
                        </p>
                    </div>
                </div>
                <div className="hidden h-24 w-full cursor-pointer items-center justify-between overflow-hidden rounded-2xl border-2 border-l-[20px] border-primary-800 bg-white pr-12 lg:flex">
                    <div className="flex h-full w-1/2 items-center px-6">
                        <h3 className="text-2xl text-neutral-800 ">
                            {cardContent.title}
                        </h3>
                    </div>
                    <div className=" h-20 border-l-2 border-primary-800"></div>
                    <div className={`flex w-1/2 gap-1 px-10 text-primary-600`}>
                        <div className="flex gap-4">
                            {cardContent.tags.map((tag, i) => (
                                <Link
                                    href={`/search/results?searchterm=@${tag}`}
                                    key={i}
                                >
                                    <div className="flex h-8 flex-shrink-0 cursor-pointer items-center rounded-2xl border-[1.5px] border-neutral-400 px-4">
                                        <p className="text-center text-sm text-neutral-500">{`#${tag}`}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <h3
                        className={`flex-shrink-0 ${
                            cardContent.remainTime <= 2 ? 'text-red-500' : ''
                        }`}
                    >
                        {cardContent.remainTime}天
                    </h3>
                </div>
            </>
        </a>
    );
};

export default BoardCard;
