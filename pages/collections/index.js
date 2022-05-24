import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { showNotification } from '@mantine/notifications';

import Header from '../../components/navbar/Header';
import Sidebar from '../../components/navbar/Sidebar';
import Footbar from '../../components/navbar/Footbar';
import NavCard from '../../components/navigation/NavCard';
import Pagebar from '../../components/navbar/Pagebar';

const Collections = () => {
    const router = useRouter();

    const { data, error, isLoading, isIdle, refetch } = useQuery(
        'collections',
        () => {
            let response = fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/collections`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: localStorage.getItem('AuthToken'),
                    },
                }
            );
            return response.json();
        },
        {
            enabled: false,
            refetchOnWindowFocus: false,
        }
    );

    useEffect(() => {
        if (router.isReady) {
            refetch();
        }
    }, [router.query]);

    if (isIdle || isLoading) {
        return (
            <div className="fixed top-0 left-0 h-screen w-screen overflow-x-hidden bg-neutral-100 scrollbar-hide">
                <Header />
                <Sidebar retractable={false} />
                <Footbar />
                <div className="flex h-screen w-full flex-col items-center pt-14 lg:ml-64 lg:w-[calc(100%-16rem)]">
                    <div className="mt-10 w-[calc(100%-56px)] max-w-3xl md:mt-16 md:w-[calc(100%-160px)] ">
                        <div className="h-10 w-96 animate-pulse rounded-xl bg-neutral-200" />
                        <div className="mt-6 h-36 w-full animate-pulse rounded-xl bg-neutral-200" />
                        <div className="mt-6 h-36 w-full animate-pulse rounded-xl bg-neutral-200" />
                    </div>
                </div>
            </div>
        );
    } else if (error) {
        showNotification({
            title: '資料獲取失敗',
            message: '請重新整理頁面',
            color: 'red',
            disallowClose: true,
            autoClose: false,
        });
        return (
            <div className="fixed top-0 left-0 h-screen w-screen overflow-x-hidden bg-neutral-100 scrollbar-hide">
                <Header />
                <Sidebar retractable={false} />
                <Footbar />
            </div>
        );
    }

    return (
        <div className="fixed top-0 left-0 h-screen w-screen overflow-x-hidden bg-neutral-100 scrollbar-hide">
            <Header />
            <Sidebar retractable={false} />
            <Footbar />
            <div className="flex h-screen w-full flex-col items-center pt-14 lg:ml-64 lg:w-[calc(100%-16rem)]">
                <div className="mt-10 w-[calc(100%-72px)] max-w-3xl md:w-[calc(100%-160px)] ">
                    <h1 className="text-3xl text-primary-800">
                        {maxPage > 0
                            ? '想翻個有興趣的議題？沒問題'
                            : `您目前還沒有收藏，點擊書籤圖示即可將一個議題收藏起來`}
                    </h1>
                    <div className="gap2 mt-8 flex flex-col gap-8">
                        {data.map((dayContent, i) => (
                            <div key={i}>
                                <h3 className=" text-2xl text-primary-800">
                                    {dayContent.date}
                                </h3>
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
                {/* <Pagination
                    total={maxPage}
                    page={onPage}
                    onChange={(i) => {
                        console.log(i);
                    }}
                /> */}
                <Pagebar
                    maxPage={data.pages}
                    url={(id) => {
                        return `/collections?onpage=${id}`;
                    }}
                    selected={router.query.onpage ? router.query.onpage : 1}
                />
                <div className="mt-16 h-1 w-1 flex-shrink-0" />
            </div>
        </div>
    );
};

export default Collections;
