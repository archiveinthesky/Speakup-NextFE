import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Header from '../../components/header/Header';
import Sidebar from '../../components/navbar/Sidebar';
import Footbar from '../../components/navbar/Footbar';
import NavCard from '../../components/navigation/NavCard';
import Pagebar from '../../components/navbar/Pagebar';

const Collections = ({ discussionContent }) => {
    const router = useRouter();
    const [collections, setCollections] = useState([]);
    const [maxPage, setMaxPage] = useState(1);
    const [onPage, setOnPage] = useState(1);

    useEffect(() => {
        if (router.isReady) {
            if (router.query.onpage !== undefined) {
                setOnPage(router.query.onpage);
                console.log(onPage);
            }
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/collections`).then(
                async (response) => {
                    let res = await response.json();
                    setCollections(res.collections);
                    setMaxPage(res.pages);
                }
            );
        }
    }, [router.query]);

    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-neutral-100 scrollbar-hide overflow-x-hidden">
            <Header />
            <Sidebar retractable={false} />
            <Footbar />
            <div className="flex h-screen w-full flex-col items-center pt-14 lg:ml-64 lg:w-[calc(100%-16rem)]">
                <div className="mt-10 w-[calc(100%-72px)] max-w-3xl md:w-[calc(100%-160px)] ">
                    <h1 className="text-3xl text-primary-700">
                        想翻個有興趣的議題？沒問題
                    </h1>
                    <div className="gap2 mt-8 flex flex-col gap-8">
                        {collections.map((dayContent, i) => (
                            <div key={i}>
                                <h3 className=" text-2xl text-primary-700">{`${dayContent.date.substring(
                                    0,
                                    2
                                )}/${dayContent.date.substring(
                                    2,
                                    4
                                )}/${dayContent.date.substring(4)}`}</h3>
                                <div className="mt-2 flex flex-col gap-6">
                                    {dayContent.collections.map(
                                        (cardContent, i) => (
                                            <NavCard
                                                key={i}
                                                cardContent={cardContent}
                                                showDetails={false}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="h-16 flex-shrink-0"></div>
                <Pagebar
                    maxPage={maxPage}
                    url={(id) => {
                        return `/collections?onpage=${id}`;
                    }}
                    selected={onPage}
                />
                <div className="mt-16 h-1 w-1 flex-shrink-0" />
            </div>
        </div>
    );
};

export default Collections;
