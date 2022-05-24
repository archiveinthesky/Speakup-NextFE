import React from 'react';
import { useInfiniteQuery } from 'react-query';
import { PlusCircleIcon } from '@heroicons/react/solid';

import Header from '../../../components/navbar/Header';
import AdminSidebar from '../../../components/navbar/AdminSidebar.js';
import Searchbar from '../../../components/admin/contentmgmt/Searchbar.js';
import BoardCard from '../../../components/admin/cards/BoardCardwStatus';
import Link from 'next/link';
import AdminFootbar from '../../../components/navbar/AdminFootbar';

const ContentManager = () => {
    const infQuery = useInfiniteQuery();

    const data = [
        {
            id: 1,
            title: 'Taiwan',
            tags: ['hi'],
            brief: 'Excepteur quis culpa dolor culpa cillum cillum deserunt minim aliqua.',
            comments: 100,
            collections: 100,
            status: 'pb',
            date: '2021/12/21',
        },
        {
            id: 2,
            title: 'Second ',
            tags: ['hi'],
            brief: 'Excepteur quis culpa dolor culpa cillum cillum deserunt minim aliqua.',
            comments: 100,
            collections: 100,
            status: 'pm',
            date: '2021/12/21',
        },
        {
            id: 1,
            title: 'Taiwan',
            tags: ['hi'],
            brief: 'Excepteur quis culpa dolor culpa cillum cillum deserunt minim aliqua.',
            comments: 100,
            collections: 100,
            status: 'ra',
            date: '2021/12/21',
        },
    ];

    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-neutral-100">
            <Header />
            <AdminSidebar />
            <AdminFootbar />
            <div className="relative mt-14 h-[calc(100vh-56px)] overflow-y-auto pb-32 lg:mt-16 lg:ml-56 lg:h-[calc(100vh-64px)] lg:px-16 lg:pt-16 xl:ml-64 xl:px-20">
                <div className=" mx-auto max-w-[1660px]">
                    <h1 className="hidden text-4xl text-primary-800 lg:block">
                        使用者內容管理介面
                    </h1>
                    <div className="w-full lg:mt-4">
                        <Searchbar />
                    </div>
                    <div className="mx-auto mt-4 flex w-5/6 flex-col items-center gap-4 md:w-11/12 lg:mt-7 lg:w-full xl:mt-10 xl:gap-6">
                        {data.map((cardData, i) => {
                            return (
                                <BoardCard
                                    key={i}
                                    cardContent={cardData}
                                    redirectURL={`/admin/manage/content/${cardData.id}`}
                                />
                            );
                        })}
                    </div>
                </div>
                <Link href="/admin/manage/content/new">
                    <PlusCircleIcon className="fixed bottom-20 right-2 h-14 w-14 cursor-pointer fill-primary-700 lg:bottom-4 lg:right-4 lg:h-14 lg:w-14" />
                </Link>
            </div>
        </div>
    );
};

export default ContentManager;
