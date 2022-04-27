import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { Popover } from '@mantine/core';

import { XIcon } from '@heroicons/react/solid';
import {
    ArrowCircleUpIcon,
    DotsVerticalIcon,
    ReplyIcon,
} from '@heroicons/react/outline';

import { updateCommentReactions } from '../lib/commentFuncs';

import styles from '../../styles/CommentCard.module.css';
import ReportInterface from '../common/ReportInterface';
import { ExtendedMenu, LikeIcon, DislikeIcon } from './CommentCardAccesories';
import { useMutation } from 'react-query';

import { useRecoilValue } from 'recoil';
import { boardDataState } from '../atoms/recoilAtoms';

const CommentCard = forwardRef(
    ({ data, motherComment, addReply, deleteFunction }, ref) => {
        const [supported, setSupported] = useState(data.userSupported);
        const [liked, setLiked] = useState(data.userLiked);
        const [disliked, setDisliked] = useState(data.userDisliked);

        const [showReportMenu, setShowReportMenu] = useState(false);
        const [showExtendedMenu, setShowExtendedMenu] = useState(false);
        const [enableAnim, setEnableAnim] = useState(false);

        const [showReplyBox, setShowReplyBox] = useState(false);

        const boardData = useRecoilValue(boardDataState);

        const firstRender = useRef(true);
        const cardmenu = useRef(null);

        const reactionsMutation = useMutation((updatedStats) =>
            updateCommentReactions(
                boardData.boardId,
                motherComment,
                data.id,
                updatedStats
            )
        );

        useEffect(() => {
            if (!firstRender.current)
                reactionsMutation.mutate({
                    supported: supported,
                    liked: liked,
                    disliked: disliked,
                });
        }, [supported, liked, disliked]);

        useEffect(() => {
            firstRender.current = false;
        }, []);

        const updateUserStatus = (updatevar) => {
            if (!enableAnim) setEnableAnim(true);
            if (updatevar === 'supported') {
                setSupported(!supported);
                if (!supported) {
                    setLiked(false);
                    setDisliked(false);
                }
            } else if (updatevar === 'liked') {
                setLiked(!liked);
                if (!liked) {
                    setSupported(false);
                    setDisliked(false);
                }
            } else if (updatevar === 'disliked') {
                setDisliked(!disliked);
                if (!disliked) {
                    setSupported(false);
                    setLiked(false);
                }
            }
        };

        const ReplyTextField = () => {
            const replyFieldRef = useRef(null);

            const postReply = () => {
                addReply(replyFieldRef.current.innerText);
                replyFieldRef.current.innerText = '';
                setShowReplyBox(false);
            };

            return (
                <div className="ml-10 mb-2 flex w-11/12 items-center pt-1 overflow-x-hidden">
                    <div
                        className={`w-full flex-grow-0 rounded-3xl border-2 border-nu-blue-400 py-1.5 pl-5 pr-10 text-sm`}
                        contentEditable={true}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                postReply();
                            }
                        }}
                        ref={replyFieldRef}
                    ></div>
                    <button
                        className={`relative right-8 -bottom-1 pb-2`}
                        onClick={postReply}
                    >
                        <ReplyIcon className="h-5 w-5 text-pm-blue-800" />
                    </button>
                </div>
            );
        };

        return (
            <>
                <div className="flex w-full gap-3" ref={ref}>
                    <img
                        className={`h-7 w-7 flex-shrink-0 border-2 p-1 ${
                            !motherComment
                                ? data.onSide === 'sup'
                                    ? 'border-green-300'
                                    : 'border-red-400'
                                : 'border-nu-blue-300'
                        } src='' alt="Profile overflow-hidden rounded-full`}
                    />
                    <div className="flex-grow">
                        <h3 className="text-base text-primary-800">
                            {data.accName}
                        </h3>
                        <p className="mt-2 mb-3 text-base text-neutral-700">
                            {data.cmtContent}
                        </p>

                        <div className="mb-2 flex items-center justify-between">
                            <div className="flex h-6">
                                <div className="flex h-6 w-40 flex-shrink-0 items-center gap-3">
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => {
                                                updateUserStatus('liked');
                                            }}
                                        >
                                            <LikeIcon
                                                liked={liked}
                                                enableAnim={enableAnim}
                                                styles={styles}
                                            />
                                        </button>
                                        <p className="inline text-sm text-neutral-500">
                                            {data.cmtLikes + (liked ? 1 : 0)}
                                        </p>
                                    </div>

                                    <div className="flex items-center">
                                        <button
                                            className="mr-1 overflow-hidden"
                                            onClick={() => {
                                                updateUserStatus('supported');
                                            }}
                                        >
                                            <ArrowCircleUpIcon
                                                className={`inline w-7 overflow-hidden ${
                                                    supported
                                                        ? 'border-primary-600 fill-primary-600 stroke-neutral-50'
                                                        : 'text-neutral-500'
                                                } ${
                                                    supported & enableAnim &&
                                                    styles.animateFlyUp
                                                }`}
                                            />
                                        </button>
                                        <p className="inline text-sm text-neutral-500">
                                            {data.cmtSupport +
                                                (supported ? 1 : 0)}
                                        </p>
                                    </div>

                                    <div className="flex items-center">
                                        <button
                                            onClick={() => {
                                                updateUserStatus('disliked');
                                            }}
                                        >
                                            <DislikeIcon
                                                disliked={disliked}
                                                enableAnim={enableAnim}
                                                styles={styles}
                                            />
                                            <p className="inline text-sm text-neutral-500">
                                                {data.cmtDislikes +
                                                    (disliked ? 1 : 0)}
                                            </p>
                                        </button>
                                    </div>
                                </div>

                                {!motherComment && (
                                    <button
                                        className="my-auto ml-4 hidden text-neutral-500 2xl:block"
                                        onClick={() => {
                                            setShowReplyBox(!showReplyBox);
                                        }}
                                    >
                                        {showReplyBox ? (
                                            <XIcon className="inline h-6 w-6" />
                                        ) : (
                                            <ReplyIcon className="inline h-6 w-6" />
                                        )}
                                    </button>
                                )}
                            </div>

                            <div>
                                <Popover
                                    opened={showExtendedMenu}
                                    onClose={() => {
                                        setShowExtendedMenu(false);
                                    }}
                                    target={
                                        <button
                                            className="text-3xl"
                                            onClick={() => {
                                                setShowExtendedMenu(true);
                                            }}
                                            ref={cardmenu}
                                            width={58}
                                        >
                                            <DotsVerticalIcon className="h-6 w-6 text-nu-blue-500" />
                                        </button>
                                    }
                                    spacing={0}
                                    position="bottom"
                                >
                                    <ExtendedMenu
                                        cmtdata={data}
                                        setShowReportMenu={setShowReportMenu}
                                        setShowExtendedMenu={
                                            setShowExtendedMenu
                                        }
                                        deleteFunction={deleteFunction}
                                        motherComment={motherComment}
                                        setShowReplyBox={setShowReplyBox}
                                        showReplyBox={showReplyBox}
                                    />
                                </Popover>
                            </div>
                        </div>
                    </div>
                </div>
                {showReplyBox && <ReplyTextField />}
                {showReportMenu && (
                    <ReportInterface
                        title={'請問您認為此留言有什麼問題？'}
                        options={[
                            '內容與討論無關',
                            '廣告或洗版訊息',
                            '散播仇恨言論或人生攻擊',
                            '含有煽情露骨內容',
                            '散播恐怖主義',
                        ]}
                        submitFunction={(option, value = '') => {}}
                        closeFunction={() => {
                            setShowReportMenu(false);
                        }}
                    />
                )}
            </>
        );
    }
);

export default CommentCard;
