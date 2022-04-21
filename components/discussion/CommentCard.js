import React, { useState, useEffect, useRef, forwardRef } from 'react';
import styles from '../../styles/CommentCard.module.css';

import ReportInterface from '../common/ReportInterface';

import { XIcon, FlagIcon } from '@heroicons/react/solid';
import {
    ArrowCircleUpIcon,
    DotsVerticalIcon,
    ReplyIcon,
} from '@heroicons/react/outline';
import { TrashIcon } from '@heroicons/react/outline';
import { Popover } from '@mantine/core';

const CommentCard = forwardRef(
    (
        {
            boardId,
            onSide,
            cmtdata,
            motherComment = null,
            APIPostReply,
            delComment,
            fetchReplies = null,
        },
        ref
    ) => {
        const [supported, setSupported] = useState(cmtdata.userSupported);
        const [liked, setLiked] = useState(cmtdata.userLiked);
        const [disliked, setDisliked] = useState(cmtdata.userDisliked);
        const [showReportMenu, setShowReportMenu] = useState(false);
        const [showExtendedMenu, setShowExtendedMenu] = useState(false);
        const [showReplyBox, setShowReplyBox] = useState(false);
        const [enableAnim, setEnableAnim] = useState(false);

        const firstRender = useRef(true);
        const cardmenu = useRef(null);

        useEffect(() => {
            let onside = ['sup', 'all', 'agn'][onSide];
            if (!firstRender.current) {
                fetch(
                    `${
                        process.env.NEXT_PUBLIC_BACKEND_URL
                    }/api/comments/${boardId}/${onside}${
                        motherComment !== null ? '/' + motherComment : ''
                    }/${cmtdata.id}`,
                    {
                        method: 'PUT',
                        headers: {
                            Authorization: localStorage.getItem('AuthToken'),
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            supported: supported,
                            liked: liked,
                            disliked: disliked,
                            reported: false,
                        }),
                    }
                )
                    .then((response) => {
                        return response.json();
                    })
                    .catch((error) => {});
            }
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

        const deleteComment = () => {
            let onside = ['sup', 'all', 'agn'][onSide];
            fetch(
                motherComment === null
                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/${boardId}/${onside}/${cmtdata.id}`
                    : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/replies/${boardId}/${motherComment}/${cmtdata.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: localStorage.getItem('AuthToken'),
                    },
                }
            ).then((response) => {
                if (response.status === 204) {
                    delComment();
                }
            });
        };

        const ExtendedMenu = () => {
            return (
                <div className="flex flex-col">
                    <button
                        className="px-4 py-2 filter transition-colors duration-200 hover:bg-nu-blue-50"
                        onClick={() => {
                            setShowReportMenu(true);
                            setShowExtendedMenu(false);
                        }}
                    >
                        <FlagIcon className="inline h-6 w-6 text-pm-blue-700" />
                        <h3 className="inline pl-1 text-sm text-pm-blue-700">
                            檢舉
                        </h3>
                    </button>

                    {cmtdata.isOwner && (
                        <button
                            className=" px-4 py-2 filter transition-colors duration-200 hover:bg-nu-blue-50"
                            onClick={() => {
                                setShowExtendedMenu(false);
                                deleteComment();
                            }}
                        >
                            <TrashIcon className="inline h-6 w-6 text-pm-blue-700" />
                            <h3 className="inline pl-1 text-sm text-pm-blue-700">
                                刪除
                            </h3>
                        </button>
                    )}

                    {motherComment === null && (
                        <button
                            className="px-4 py-2 text-pm-blue-700  filter transition-colors duration-200 hover:bg-gray-200 2xl:hidden"
                            onClick={() => {
                                setShowExtendedMenu(false);
                                setShowReplyBox(!showReplyBox);
                            }}
                        >
                            {showReplyBox ? (
                                <XIcon className="inline h-6 w-6" />
                            ) : (
                                <ReplyIcon className="inline h-6 w-6" />
                            )}
                            <h3 className="inline pl-1 text-sm">
                                {showReplyBox ? '取消' : '回覆'}
                            </h3>
                        </button>
                    )}
                </div>
            );
        };

        const ShowRepliesButton = () => {
            const [isClicked, setIsClicked] = useState(false);

            return (
                <button
                    className="flex items-start gap-1 text-nu-blue-500"
                    onClick={() => {
                        setIsClicked(true);
                        fetchReplies();
                    }}
                    disabled={isClicked}
                >
                    <ReplyIcon className="inline h-5 w-5 rotate-180" />
                    <p className="inline text-sm">
                        {isClicked ? '載入中' : '查看回覆'}
                    </p>
                </button>
            );
        };

        const ReplyTextField = () => {
            const replyFieldRef = useRef(null);

            const postReply = () => {
                APIPostReply(cmtdata, replyFieldRef.current.innerText);
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
                            motherComment === null
                                ? cmtdata.onSide === 'sup'
                                    ? 'border-green-300'
                                    : 'border-red-400'
                                : 'border-nu-blue-300'
                        } src='' alt="Profile overflow-hidden rounded-full`}
                    />
                    <div className="flex-grow">
                        <h3 className="text-base text-primary-800">
                            {cmtdata.accName}
                        </h3>
                        <p className="mt-2 mb-3 text-base text-neutral-700">
                            {cmtdata.cmtContent}
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
                                            <svg
                                                className={`mr-1 inline h-7 w-7 p-[3.5px] text-neutral-500 ${
                                                    liked &&
                                                    enableAnim &&
                                                    styles.animateJumpUp
                                                } ${
                                                    liked
                                                        ? 'filter-green ease-in'
                                                        : 'filter-none'
                                                }`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="25.149"
                                                height="25.501"
                                                viewBox="0 0 25.149 25.501"
                                            >
                                                <path
                                                    className={`${
                                                        liked
                                                            ? 'fill-primary-600 stroke-primary-600'
                                                            : 'fill-transparent stroke-neutral-500'
                                                    }`}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2.5"
                                                    d="M16.5,10.875v-4.5A3.375,3.375,0,0,0,13.125,3l-4.5,10.125V25.5h12.69a2.25,2.25,0,0,0,2.25-1.913l1.553-10.125a2.25,2.25,0,0,0-2.25-2.588ZM8.625,25.5H5.25A2.25,2.25,0,0,1,3,23.251V15.375a2.25,2.25,0,0,1,2.25-2.25H8.625"
                                                    transform="translate(-1.5 -1.5)"
                                                />
                                            </svg>
                                        </button>
                                        <p className="inline text-sm text-neutral-500">
                                            {cmtdata.cmtLikes + (liked ? 1 : 0)}
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
                                            {cmtdata.cmtSupport +
                                                (supported ? 1 : 0)}
                                        </p>
                                    </div>

                                    <div className="flex items-center">
                                        <button
                                            onClick={() => {
                                                updateUserStatus('disliked');
                                            }}
                                        >
                                            <svg
                                                className={`mr-1 inline h-7 w-7 p-[3.5px] text-neutral-500 ${
                                                    disliked &&
                                                    enableAnim &&
                                                    styles.animateJumpDown
                                                } ${
                                                    disliked
                                                        ? 'filter-red ease-in'
                                                        : 'filter-none'
                                                }`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="22.934"
                                                height="23.251"
                                                viewBox="0 0 22.934 23.251"
                                            >
                                                <path
                                                    className={`${
                                                        disliked
                                                            ? 'fill-primary-600 stroke-primary-600'
                                                            : 'fill-transparent stroke-neutral-500'
                                                    }`}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2.5"
                                                    d="M11.255,16.162v4.05a3.037,3.037,0,0,0,3.037,3.037l4.05-9.112V3H6.921A2.025,2.025,0,0,0,4.9,4.721L3.5,13.834a2.025,2.025,0,0,0,2.025,2.329ZM18.342,3h2.7A2.339,2.339,0,0,1,23.4,5.025v7.087a2.339,2.339,0,0,1-2.359,2.025h-2.7"
                                                    transform="translate(-1.971 -1.499)"
                                                />
                                            </svg>
                                            <p className="inline text-sm text-neutral-500">
                                                {cmtdata.cmtDislikes +
                                                    (disliked ? 1 : 0)}
                                            </p>
                                        </button>
                                    </div>
                                </div>

                                {motherComment === null && (
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
                                    <ExtendedMenu />
                                </Popover>
                            </div>
                        </div>

                        {fetchReplies !== null && <ShowRepliesButton />}
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
