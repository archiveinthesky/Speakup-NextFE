import { Button } from '@mantine/core';
import React from 'react';

const IndividualCommentNav = ({ commentData }) => {
    return (
        <div className="flex h-full w-full gap-12 rounded-3xl border-2 border-primary-700 bg-white px-8 py-6">
            <div className="flex h-full w-1/2 items-center justify-center rounded-2xl">
                <div className="h-full w-full overflow-y-auto scrollbar-hide">
                    <h2 className="text-2xl text-neutral-800">
                        {commentData.boardTitle}
                    </h2>
                    <div className="my-2 border-b-2 border-neutral-300" />
                    <p className="text-lg text-neutral-700">
                        {commentData.content}
                    </p>
                </div>
            </div>
            <div className="border-l-2 border-primary-800" />
            <div className="h-full w-1/2">
                <div className="ml-auto mr-6 flex w-full items-center justify-end gap-4 object-none object-right">
                    <p>{commentData.remainTime}天</p>
                    <div className="w-20 rounded-3xl border-2 border-neutral-200 bg-neutral-50 py-1">
                        <p className="text-center">留言</p>
                    </div>
                </div>
                <div className="px-auto mt-4 h-[calc(100%-50px)] w-full rounded-2xl text-neutral-700">
                    <div className="w-full overflow-y-auto scrollbar-hide">
                        <h3 className="text-2xl ">
                            {commentData.reportReason.protocol === 'val'
                                ? '要求再審'
                                : commentData.reportReason.protocol === 'rep'
                                ? '被檢舉'
                                : '要求審核'}
                            原因
                        </h3>
                        <ul className="ml-4 mt-2 list-disc text-lg">
                            {commentData.reportReason.reason.map(
                                (reason, i) => (
                                    <li key={i}>{reason}</li>
                                )
                            )}
                        </ul>
                        <div className="mt-6 flex w-full items-center justify-around ">
                            <Button className="bg-red-600 font-light hover:bg-red-700">
                                刪除留言
                            </Button>
                            <Button className="bg-primary-600 font-light">
                                降低排序
                            </Button>
                            <Button className="bg-primary-600 font-light">
                                無問題
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndividualCommentNav;
