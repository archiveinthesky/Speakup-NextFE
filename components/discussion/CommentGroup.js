import React, { useState, useEffect, forwardRef } from 'react';
import { cloneDeep } from 'lodash';

import CommentCard from './CommentCard';

import { useInfiniteQuery, useMutation } from 'react-query';
import {
    deleteReply,
    getCommentReplies,
    postCommentReply,
} from '../lib/commentFuncs';

import { ReplyIcon } from '@heroicons/react/solid';
import CommentResponseField from './CommentResponseField';

const CommentGroup = forwardRef(({ boardId, cmtdata, deleteComment }, ref) => {
    const [userReplies, setUserReplies] = useState([]);

    const {
        data: replyQueryData,
        error: replyQueryError,
        isLoading: replyQueryLoading,
        fetchNextPage: replyQueryFetchNextPage,
        hasNextPage: replyQueryHasNextPage,
        isFetching: replyQueryFetching,
        refetch: replyQueryRefetch,
    } = useInfiniteQuery(
        `reply-${cmtdata.id}`,
        ({ pageParam = 0 }) => {
            return getCommentReplies(boardId, cmtdata.id, pageParam);
        },
        {
            getNextPageParam: (lastPage, pages) =>
                Math.ceil(lastPage[0].totalComments / 10) > pages.length
                    ? pages.length
                    : undefined,
            enabled: false,
        }
    );

    const addReplyMutation = useMutation(
        (newReply) => {
            return postCommentReply(boardId, cmtdata.id, newReply);
        },
        {
            onSuccess: (data) => {
                setUserReplies(userReplies.concat(data));
            },
        }
    );

    const deleteReplyMutation = useMutation(
        (replyId) => deleteReply(boardId, cmtdata.id, replyId),
        {
            onSuccess: (data, variables) => {
                let replyId = variables;
                let newReplies;
                if (userReplies.some((element) => element.id === replyId)) {
                    newReplies = cloneDeep(userReplies);
                    setUserReplies(
                        newReplies.filter((element) => element.id !== replyId)
                    );
                } else {
                    replyQueryRefetch({
                        refetchPage: (page, index) =>
                            page.some((cmt) => cmt.id === replyId),
                    });
                }
            },
        }
    );

    useEffect(() => {
        if (replyQueryData) {
            let newUserCmts = cloneDeep(userReplies);
            replyQueryData.pages[replyQueryData.pages.length - 1].forEach(
                (item) => {
                    newUserCmts = newUserCmts.filter(
                        (cmt) => cmt.id !== item.id
                    );
                }
            );
            setUserReplies(newUserCmts);
        }
    }, [replyQueryData]);

    const FetchRepliesBtn = () => {
        if ((!replyQueryHasNextPage && replyQueryData) || !cmtdata.cmtReplies)
            return <div></div>;

        return (
            <button
                className="flex items-start gap-1 text-nu-blue-500"
                onClick={() => {
                    replyQueryFetchNextPage();
                }}
                disabled={replyQueryLoading || replyQueryFetching}
            >
                <ReplyIcon className="inline h-5 w-5 rotate-180" />
                <p className="inline text-sm">
                    {replyQueryLoading || replyQueryFetching
                        ? '載入中'
                        : '查看回覆'}
                </p>
            </button>
        );
    };

    return (
        <div className="w-full" ref={ref}>
            <CommentCard
                data={cmtdata}
                addReply={(content) => {
                    addReplyMutation.mutate(content);
                }}
                deleteFunction={deleteComment}
            />
            <div className="mt-2">
                <CommentResponseField
                    commentId={cmtdata.id}
                    commentData={[].concat
                        .apply([], replyQueryData?.pages)
                        .concat(userReplies)}
                    deleteReply={(replyId) => {
                        deleteReplyMutation.mutate(replyId);
                    }}
                />
                <div className="pl-10">
                    <FetchRepliesBtn />
                </div>
            </div>
        </div>
    );
});

export default CommentGroup;
