import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { showNotification } from '@mantine/notifications';

import Header from '../../../components/navbar/Header';
import AdminSidebar from '../../../components/navbar/AdminSidebar';
import AdminFootbar from '../../../components/navbar/AdminFootbar';
import AggregatedBoardComments from '../../../components/admin/commentmgmt/AggBoardComments';

const CommentModeration = () => {
    const { data, error, isLoading } = useQuery('modComments', async () => {
        let response = await fetch('http://localhost:5500/comments', {
            method: 'GET',
        });

        if (!response.ok) throw new Error('Fetch Failed');
        return response.json();
    });

    useEffect(() => {
        if (error)
            showNotification({
                title: '資料獲取失敗',
                message: '請重新整理頁面',
                color: 'red',
                disallowClose: true,
                autoClose: false,
            });
    }, [error]);

    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-neutral-100">
            <Header />
            <AdminSidebar />
            <AdminFootbar />
            <div className="relative mt-14 h-[calc(100vh-56px)] overflow-y-auto pb-32 lg:mt-16 lg:ml-56 lg:h-[calc(100vh-64px)] lg:px-16 lg:pt-16 xl:ml-64 xl:px-20">
                <div className="mx-auto max-w-[1660px]">
                    <h1 className="hidden text-4xl text-primary-800 lg:block">
                        留言管理系統
                    </h1>
                    <div className="mt-8 w-full rounded-xl bg-white px-10 py-4">
                        <div className="group flex w-full items-center">
                            <h3 className="w-3/12 text-lg text-neutral-600">
                                標題
                            </h3>
                            <div className="flex w-9/12 gap-2">
                                <p className="w-[66%] text-lg text-neutral-600">
                                    留言內容
                                </p>
                                <p className="w-[11%] text-lg text-neutral-600">
                                    型態
                                </p>
                                <p className="w-[11%] text-lg text-neutral-600">
                                    剩餘時間
                                </p>
                                <div className="w-[11%]" />
                            </div>
                        </div>
                        <div className="mt-4 flex w-full flex-col gap-4">
                            {isLoading || error ? (
                                <div className="flex w-full items-center">
                                    <div className="w-3/12">
                                        <div className="h-5 w-1/2 animate-pulse rounded-lg bg-neutral-300 pr-5" />
                                    </div>
                                    <div className="flex w-9/12 gap-2">
                                        <div className="w-[66%] text-lg text-neutral-600">
                                            <div className="h-5 w-1/2 animate-pulse rounded-lg bg-neutral-300 pr-5" />
                                        </div>
                                        <div className="w-[11%] text-lg text-neutral-600">
                                            <div className="h-5 w-1/2 animate-pulse rounded-lg bg-neutral-300 pr-5" />
                                        </div>
                                        <div className="w-[11%] text-lg text-neutral-600">
                                            <div className="h-5 w-1/2 animate-pulse rounded-lg bg-neutral-300 pr-5" />
                                        </div>
                                        <div className="w-[11%]" />
                                    </div>
                                </div>
                            ) : (
                                data.map((board, i) => (
                                    <React.Fragment key={i}>
                                        <AggregatedBoardComments
                                            key={i}
                                            data={board}
                                        />
                                        <div
                                            key={`d${i}`}
                                            className="border-b-2 border-b-neutral-400 opacity-60 last:border-b-0"
                                        />
                                    </React.Fragment>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentModeration;
