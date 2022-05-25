import React from 'react';

const IndividualCommentBrief = ({ cardContent }) => {
    return (
        <div className="h-20 w-full cursor-pointer items-center justify-between overflow-hidden rounded-2xl border-2 border-primary-800 bg-white pr-4 md:pr-7 lg:flex">
            <div className="flex h-full w-4/12 items-center px-6">
                <h3 className="h-18 text-ellipsis text-lg text-neutral-800 line-clamp-1 ">
                    {cardContent?.boardTitle}
                </h3>
            </div>
            <div className="h-16 border-l-2 border-primary-800" />
            <div className="h-18 flex w-1/2 justify-around gap-1 text-ellipsis text-lg line-clamp-1">
                {cardContent?.content}
            </div>
            <div className="w-1/12">
                <p>{cardContent?.remainTime}天</p>
            </div>
        </div>
    );
};

export default IndividualCommentBrief;
