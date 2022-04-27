import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, useMutation } from 'react-query';

import CommentGroup from './CommentGroup';
import {
    NewComment,
    NoCommentsDisplay,
    LoadingSkeleton,
} from './CommentAccessories';

import {
    deleteComment,
    getBoardComments,
    postComment,
} from '../lib/commentFuncs';

import { cloneDeep } from 'lodash';

const CommentField = ({ boardId, onSide, sortMethod }) => {
    const [userComments, setUserComments] = useState([]);

    const {
        data: cmtQueryData,
        error: cmtQueryError,
        isLoading: cmtQueryLoading,
        fetchNextPage: cmtQueryFetchNextPage,
        hasNextPage: cmtQueryHasNextPage,
        isFetching: cmtQueryFetching,
        refetch: cmtQueryRefetch,
    } = useInfiniteQuery(
        'comments',
        ({ pageParam = 0 }) =>
            getBoardComments(
                boardId,
                onSide,
                pageParam,
                [(null, 'time', 'replies')][sortMethod - 1]
            ),
        {
            getNextPageParam: (lastPage, pages) =>
                Math.ceil(lastPage[0].totalComments / 20) > pages.length
                    ? pages.length + 1
                    : undefined,
        }
    );

    const addComment = useMutation(
        (cmtParams) => postComment(cmtParams.content, boardId, cmtParams.side),
        {
            onSuccess: (data) => {
                console.log(typeof [data, ...userComments]);
                setUserComments([data, ...userComments]);
            },
            onError: (err) => {
                console.log(err);
            },
        }
    );

    const delComment = useMutation(
        (commentId) => deleteComment(boardId, commentId),
        {
            onSuccess: (data, variables) => {
                let commentId = variables.commentId;
                let newComments;
                if (userComments.some((element) => element.id === commentId)) {
                    newComments = cloneDeep(userComments);
                    setUserComments(
                        newComments.filter(
                            (element) => element.id !== commentId
                        )
                    );
                } else {
                    cmtQueryRefetch({
                        refetchPage: (page, index) =>
                            page.some((cmt) => cmt.id === commentId),
                    });
                }
            },
        }
    );

    const { ref: lastCardRef, inView: lastCardInView, entry } = useInView();

    useEffect(() => {
        if (entry !== undefined) {
            if (
                entry.isIntersecting &&
                cmtQueryHasNextPage &&
                !cmtQueryLoading
            ) {
                cmtQueryFetchNextPage();
            }
        }
    }, [lastCardInView]);

    if (cmtQueryError)
        return (
            <div className="mx-auto flex h-48 w-full rounded-xl bg-red-200 py-3">
                <div className="m-auto">
                    <h1 className="text-center text-3xl font-medium text-red-500">
                        錯誤
                    </h1>
                    <p className="my-2 px-6 text-center text-xl text-red-500">
                        {cmtQueryError}
                    </p>
                </div>
            </div>
        );

    useEffect(() => {
        console.log(
            userComments.concat([].concat.apply([], cmtQueryData?.pages))
        );
    }, [userComments]);

    return (
        <div className="bg-neutral-50">
            <div className="mx-auto mb-4 flex flex-col divide-y divide-nu-blue-300 px-9 lg:py-3 ">
                {!cmtQueryLoading && (
                    <>
                        <NewComment
                            boardId={boardId}
                            addComment={(commentContent, side) => {
                                addComment.mutate({
                                    content: commentContent,
                                    side: side,
                                });
                            }}
                        />
                        <div className="flex w-full flex-col gap-2 pt-4">
                            {userComments
                                .concat(
                                    [].concat.apply([], cmtQueryData?.pages)
                                )
                                .map((data, i) =>
                                    data.totalComments ? (
                                        <div key={i}></div>
                                    ) : (
                                        <CommentGroup
                                            key={i}
                                            boardId={boardId}
                                            cmtdata={data}
                                            deleteComment={(cmtId) => {
                                                delComment.mutate(cmtId);
                                            }}
                                        />
                                    )
                                )}
                        </div>

                        {userComments.length + cmtQueryData?.length === 0 &&
                            !cmtQueryLoading && <NoCommentsDisplay />}
                    </>
                )}
                {(cmtQueryLoading || cmtQueryFetching) && <LoadingSkeleton />}
            </div>
        </div>
    );
};

export default CommentField;
