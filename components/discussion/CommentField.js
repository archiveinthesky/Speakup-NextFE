import React, { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { useQueryClient, useInfiniteQuery } from 'react-query';

import CommentCard from './CommentCard';
import CommentResponseField from './CommentResponseField';
import {
    NewComment,
    NoCommentsDisplay,
    LoadingSkeleton,
} from './CommentAccessories';

import {
    getCommentReply,
    getComments,
    postReplyBE,
} from '../../lib/discussion/comments';

import { cloneDeep } from 'lodash';

const CommentField = ({ boardId, onSide, sortMethod }) => {
    const [comments, setComments] = useState([]);
    const [userComments, setUserComments] = useState([]);

    const {
        data: cmtQueryData,
        error: cmtQueryError,
        isLoading: cmtQueryLoading,
        fetchNextPage: cmtQueryFetchNextPage,
        hasNextPage: cmtQueryHasNextPage,
        isFetching: cmtQueryFetching,
    } = useInfiniteQuery(
        'comments',
        ({ pageParam = 1 }) =>
            getComments(
                boardId,
                onSide,
                pageParam,
                [(null, 'time', 'replies')][sortMethod - 1]
            ),
        {
            getNextPageParam: (lastPage, pages) => {
                return Math.ceil(lastPage[0].totalComments / 20) > pages.length
                    ? pages.length + 1
                    : undefined;
            },
        }
    );

    const { ref: lastCardRef, inView: lastCardInView, entry } = useInView();

    const fetchCommentReply = async (commentId) => {
        let cmtObject = [...userComments, ...comments][commentId];
        let response = await getCommentReply(
            cmtObject.data.id,
            cmtObject.replies.latestServerReply + 1,
            Math.min(
                cmtObject.replies.hasReplies,
                cmtObject.replies.latestServerReply + 11
            ),
            boardId,
            onSide
        );
        let newComments,
            submitChanges,
            targetCmtPos = commentId;
        if (commentId < userComments.length) {
            newComments = cloneDeep(userComments);
            submitChanges = () => {
                setUserComments(newComments);
            };
        } else {
            newComments = cloneDeep(comments);
            submitChanges = () => {
                setComments(newComments);
            };
            targetCmtPos -= userComments.length;
        }
        let cmtarray = [];
        let alreadyExistedIDs = newComments[
            targetCmtPos
        ].replies.newReplies.map((reply) => {
            return reply.id;
        });
        for (let i in response) {
            console.log(response[i]);
            if (alreadyExistedIDs.indexOf(response[i].id) === -1)
                cmtarray.push(response[i]);
        }
        newComments[targetCmtPos].replies.data = [
            ...newComments[targetCmtPos].replies.data,
            ...cmtarray,
        ];
        newComments[targetCmtPos].replies.latestServerReply += cmtarray.length;
        submitChanges();
    };

    const postReply = async (commentPos, commentData, cmtcontent) => {
        let res = await postReplyBE(
            commentData.id,
            cmtcontent,
            boardId,
            commentData.onSide
        );
        if (commentPos < userComments.length) {
            let newCmts = cloneDeep(userComments);
            newCmts[commentPos].replies.newReplies.push(res);
            newCmts[commentPos].replies.hasReplies += 1;
            setUserComments(newCmts);
        } else {
            let newCmts = cloneDeep(comments);
            newCmts[commentPos - userComments.length].replies.newReplies.push(
                res
            );
            newCmts[commentPos - userComments.length].replies.hasReplies += 1;
            setComments(newCmts);
        }
    };

    const delComment = (commentid) => {
        let targetId = commentid;
        let newComments, submitChanges;
        if (commentid < userComments.length) {
            newComments = cloneDeep(userComments);
            newComments.splice(targetId, 1);
            setUserComments(newComments);
        } else {
            targetId -= userComments.length;
            newComments = cloneDeep(comments);
            newComments.splice(targetId, 1);
            setComments(newComments);
        }
    };

    const delReply = (commentLoc, replyLoc, isNewReply = false) => {
        if (commentLoc < userComments.length) {
            let newCmts = cloneDeep(userComments);
            if (isNewReply) {
                newCmts[commentLoc].replies.newReplies.splice(replyLoc, 1);
            } else {
                newCmts[commentLoc].replies.data.splice(replyLoc, 1);
            }
            setUserComments(newCmts);
        } else {
            let newCmtLoc = commentLoc - userComments.length;
            let newCmts = cloneDeep(comments);
            newCmts[newCmtLoc].replies.data.splice(replyLoc, 1);
            setComments(newCmts);
        }
    };

    useEffect(() => {
        setUserComments([]);
    }, [onSide, sortMethod]);

    useEffect(() => {
        if (entry !== undefined) {
            if (
                entry.isIntersecting &&
                cmtQueryHasNextPage &&
                !cmtQueryLoading
            ) {
                cmtQueryFetchNextPage();
            } else {
                console.log(cmtQueryHasNextPage);
                console.log(cmtQueryLoading);
            }
        }
    }, [lastCardInView]);

    const addUserComment = (commentContent) => {
        console.log({
            data: commentContent,
            replies: {
                data: [],
                newReplies: [],
                latestServerReply: 0,
                hasReplies: commentContent.cmtReplies,
            },
        });
        setUserComments([
            {
                data: commentContent,
                replies: {
                    data: [],
                    newReplies: [],
                    latestServerReply: 0,
                    hasReplies: 0,
                },
            },
            ...userComments,
        ]);
    };

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

    return (
        <div className="bg-neutral-50">
            <div className="mx-auto mb-4 flex flex-col divide-y divide-neutral-300 px-9 lg:py-3 ">
                {!cmtQueryLoading && (
                    <>
                        <NewComment
                            boardId={boardId}
                            addComment={addUserComment}
                        />
                        {userComments
                            .concat([].concat.apply([], cmtQueryData.pages))
                            .map((cmt, i, array) => {
                                if (cmt.totalComments) return;

                                return (
                                    <div key={i} className="pt-4 pb-2">
                                        <CommentCard
                                            boardId={boardId}
                                            onSide={onSide}
                                            cmtdata={cmt.data}
                                            APIPostReply={(
                                                commentData,
                                                cmtContent
                                            ) => {
                                                postReply(
                                                    i,
                                                    commentData,
                                                    cmtContent
                                                );
                                            }}
                                            delComment={() => {
                                                delComment(i);
                                            }}
                                            fetchReplies={
                                                cmt.replies.hasReplies -
                                                    cmt.replies.newReplies
                                                        .length >
                                                    0 &&
                                                cmt.replies
                                                    .latestServerReply === 0
                                                    ? () => {
                                                          fetchCommentReply(i);
                                                      }
                                                    : null
                                            }
                                            ref={
                                                i + 1 === array.length
                                                    ? lastCardRef
                                                    : null
                                            }
                                        />
                                        {cmt.replies.latestServerReply > 0 && (
                                            <CommentResponseField
                                                boardId={boardId}
                                                onSide={onSide}
                                                commentId={cmt.data.id}
                                                commentData={cmt.replies.data}
                                                delComment={(replyPos) => {
                                                    delReply(i, replyPos);
                                                }}
                                                fetchMoreReplies={
                                                    cmt.replies
                                                        .latestServerReply +
                                                        cmt.replies.newReplies
                                                            .length ===
                                                    cmt.replies.hasReplies
                                                        ? null
                                                        : () => {
                                                              fetchCommentReply(
                                                                  i
                                                              );
                                                          }
                                                }
                                            />
                                        )}
                                        {cmt.replies.newReplies.length > 0 && (
                                            <CommentResponseField
                                                boardId={boardId}
                                                onSide={onSide}
                                                commentId={cmt.data.id}
                                                commentData={
                                                    cmt.replies.newReplies
                                                }
                                                delComment={(replyPos) => {
                                                    delReply(i, replyPos);
                                                }}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        {userComments.length + cmtQueryData.length === 0 &&
                            !cmtQueryLoading && <NoCommentsDisplay />}
                    </>
                )}
                {(cmtQueryLoading || cmtQueryFetching) && <LoadingSkeleton />}
            </div>
        </div>
    );
};

export default CommentField;
