import React from 'react';

import Header from '../../../components/navbar/Header';
import AdminSidebar from '../../../components/navbar/AdminSidebar.js';
import Searchbar from '../../../components/admin/contentmgmt/Searchbar.js';
import BoardCard from '../../../components/admin/cards/BoardCardwTags';
import AdminFootbar from '../../../components/navbar/AdminFootbar';

const ContentManager = () => {
    const data = [
        {
            id: 1,
            title: 'Taiwan',
            tags: ['國家議題', '政策發窄'],
            remainTime: 3,
        },
        {
            id: 3,
            title: 'Taiwan',
            tags: ['hi'],
            remainTime: 2,
        },
        {
            id: 2,
            title: 'Taiwan',
            tags: ['hi'],
            remainTime: 1,
        },
    ];

    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-neutral-100">
            <Header />
            <AdminSidebar />
            <AdminFootbar />
            <div className="relative mt-14 h-[calc(100vh-56px)] overflow-y-auto pb-32 lg:mt-16 lg:ml-56 lg:h-[calc(100vh-64px)] lg:px-16 lg:pt-16 xl:ml-64 xl:px-20">
                <div className="mx-auto w-5/6 max-w-6xl pt-6 lg:w-full xl:w-5/6">
                    <h1 className="text-4xl text-primary-800 ">您的待審議題</h1>

                    <div className="mt-4 flex w-full flex-col items-center gap-4 md:w-11/12 lg:mt-7 lg:w-full xl:mt-10 xl:gap-6">
                        {data.map((cardData, i) => {
                            return (
                                <BoardCard
                                    key={i}
                                    cardContent={cardData}
                                    redirectURL={`/admin/moderate/content/${cardData.id}`}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentManager;
