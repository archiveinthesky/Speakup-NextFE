import React from 'react';
import AggregatedCommentBar from './AggCommentBar';

const AggregatedBoardComments = ({ data }) => {
    return (
        <div className="flex w-full items-center">
            <h2 className="inline w-3/12 text-lg">{data.boardTitle}</h2>
            <div className="flex w-9/12 flex-col gap-2 ">
                {data.comments.map((cmt, i) => (
                    <React.Fragment key={i}>
                        <AggregatedCommentBar cmtData={cmt} key={`a${i}`} />
                        <div
                            key={`ad${i}`}
                            className="border-b-2 border-b-neutral-400 opacity-40 last:border-b-0"
                        />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default AggregatedBoardComments;
