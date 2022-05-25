import React from 'react';
import { Button } from '@mantine/core';
import { useRouter } from 'next/router';

const AggregatedCommentBar = ({ cmtData }) => {
    const router = useRouter();

    return (
        <div className="group flex w-full items-center gap-2">
            <p className="h-7 w-[66%] text-ellipsis text-lg line-clamp-1">
                {cmtData.content}
            </p>
            <p className="w-[11%] text-lg">
                {cmtData.type == 'cmt'
                    ? '留言'
                    : cmtData.type == 'rpl'
                    ? '回覆'
                    : ''}
            </p>
            <p className="w-[11%] text-lg">{cmtData.remainTime}天</p>
            <div className="w-[11%]">
                <Button
                    className="justify-self-end  bg-primary-700 opacity-0 group-hover:opacity-100"
                    onClick={() => {
                        router.push('/admin/moderate/comment');
                    }}
                >
                    管理
                </Button>
            </div>
        </div>
    );
};

export default AggregatedCommentBar;
