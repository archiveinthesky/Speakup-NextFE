import React from 'react';
import { UserCircleIcon } from '@heroicons/react/outline';
import Link from 'next/link';

const HomeNavCard = ({ cardContent }) => {
    if (cardContent.picked) {
        return (
            <Link href={`/discussions/${cardContent.boardId}`}>
                <div className="bg-pm-blue-600 flex w-full flex-shrink-0 cursor-pointer justify-between overflow-hidden rounded-2xl px-6 pt-4 pb-6 drop-shadow-md">
                    <div className="h-full flex-grow ">
                        <p className=" text-nu-blue-200 text-[10px]">
                            Speakup團隊精選
                        </p>
                        <h3 className="text-lg font-light text-white">
                            {cardContent.title}
                        </h3>
                        <div className="my-2 flex items-center text-white">
                            <UserCircleIcon className="w-4" />
                            <p className=" text-xs font-light">
                                {cardContent.author}
                            </p>
                        </div>
                        <p className=" h-10 text-ellipsis text-sm font-light text-white line-clamp-2 ">
                            {cardContent.content}
                        </p>
                    </div>

                    <div className="h-10 w-7 flex-shrink-0 bg-white"></div>
                </div>
            </Link>
        );
    } else {
        return (
            <Link href={`/discussions/${cardContent.boardId}`}>
                <div className="bg-nu-blue-50 flex w-full flex-shrink-0 cursor-pointer justify-between overflow-hidden rounded-2xl pr-4 md:pr-7">
                    <div className="bg-pm-blue-700 w-[4.5rem] flex-shrink-0 md:w-24"></div>
                    <div className="h-full flex-grow px-4 py-3">
                        <h3 className=" text-pm-blue-800 text-lg md:text-xl">
                            {cardContent.title}
                        </h3>
                        <p className="text-pm-blue-600 mt-1 h-[48px] text-ellipsis line-clamp-2 lg:h-[96px] lg:line-clamp-4">
                            {cardContent.content}
                        </p>
                    </div>
                </div>
            </Link>
        );
    }
};

export default HomeNavCard;
