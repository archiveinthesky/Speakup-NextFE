import React from 'react';
import { FlagIcon, XIcon } from '@heroicons/react/solid';
import { TrashIcon, ReplyIcon } from '@heroicons/react/outline';

const ExtendedMenu = ({
    cmtdata,
    setShowReportMenu,
    setShowExtendedMenu,
    deleteFunction,
    motherComment,
    setShowReplyBox,
    showReplyBox,
}) => {
    return (
        <div className="flex flex-col">
            <button
                className="px-4 py-2 filter transition-colors duration-200 hover:bg-neutral-50"
                onClick={() => {
                    setShowReportMenu(true);
                    setShowExtendedMenu(false);
                }}
            >
                <FlagIcon className="inline h-6 w-6 text-primary-800" />
                <h3 className="inline pl-1 text-sm text-primary-800">檢舉</h3>
            </button>

            {cmtdata.isOwner && (
                <button
                    className=" px-4 py-2 filter transition-colors duration-200 hover:bg-nu-blue-50"
                    onClick={() => {
                        setShowExtendedMenu(false);
                        deleteFunction(cmtdata.id);
                    }}
                >
                    <TrashIcon className="inline h-6 w-6 text-primary-800" />
                    <h3 className="inline pl-1 text-sm text-primary-800">
                        刪除
                    </h3>
                </button>
            )}

            {!motherComment && (
                <button
                    className="px-4 py-2 text-primary-800  filter transition-colors duration-200 hover:bg-gray-200 2xl:hidden"
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

const ShowRepliesButton = ({ fetchReplies }) => {
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

function LikeIcon({ liked, enableAnim, styles }) {
    return (
        <svg
            className={`mr-1 inline h-7 w-7 p-[3.5px] text-neutral-500 ${
                liked && enableAnim && styles.animateJumpUp
            } ${liked ? 'filter-green ease-in' : 'filter-none'}`}
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
    );
}

function DislikeIcon({ disliked, enableAnim, styles }) {
    return (
        <svg
            className={`mr-1 inline h-7 w-7 p-[3.5px] text-neutral-500 ${
                disliked && enableAnim && styles.animateJumpDown
            } ${disliked ? 'filter-red ease-in' : 'filter-none'}`}
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
    );
}

export { ExtendedMenu, ShowRepliesButton, LikeIcon, DislikeIcon };
