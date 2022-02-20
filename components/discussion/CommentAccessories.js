import { useState, useRef } from "react";
import { PaperAirplaneIcon, XIcon } from "@heroicons/react/outline";
import { postCommentBE } from "../../lib/discussion/comments";

const NewComment = ({ boardId, addComment }) => {
    const commentDiv = useRef(null);
    const [enteringComment, setEnteringComment] = useState(false);
    const [commentSide, setCommentSide] = useState(null);

    return (
        <div className="flex w-full items-center justify-end">
            <div
                className={`border-primary-700 transition-width relative mt-2 mb-4 flex flex-grow-0 items-center border px-3 ${
                    enteringComment ? "w-full rounded-2xl" : "h-9 w-9 rounded-full"
                } `}
            >
                {enteringComment && (
                    <div
                        ref={commentDiv}
                        className={`my-auto h-full w-full bg-transparent pl-2 pr-32 text-lg leading-9 focus:outline-none`}
                        contentEditable={true}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                            }
                        }}
                    />
                )}
                {enteringComment ? (
                    <div className="absolute top-1.5 right-2 flex items-center justify-end gap-2">
                        <button
                            className={`border-primary-700 ${
                                commentSide === "sup"
                                    ? " text-primary-50 bg-primary-700"
                                    : "text-primary-700  bg-neutral-100"
                            } h-6 w-6 flex-shrink-0 rounded-full border text-center text-sm `}
                            onClick={() => {
                                if (commentSide === "sup") setCommentSide(null);
                                else setCommentSide("sup");
                            }}
                        >
                            支
                        </button>
                        <button
                            className={`border-primary-700 ${
                                commentSide === "agn"
                                    ? " text-primary-50 bg-primary-700"
                                    : "text-primary-700  bg-neutral-100"
                            } h-6 w-6 flex-shrink-0 rounded-full border text-center text-sm `}
                            onClick={() => {
                                if (commentSide === "agn") setCommentSide(null);
                                else setCommentSide("agn");
                            }}
                        >
                            反
                        </button>
                        <button
                            className={`text-primary-700 h-6 w-6 flex-shrink-0`}
                            onClick={async () => {
                                if (commentDiv.current.innerText !== "") {
                                    addComment(
                                        await postCommentBE(
                                            commentDiv.current.innerText,
                                            boardId,
                                            commentSide
                                        )
                                    );
                                    setEnteringComment(false);
                                }
                            }}
                        >
                            <PaperAirplaneIcon className="h-6 w-6" />
                        </button>
                        <button
                            className={`text-primary-700 h-6 w-6 flex-shrink-0 `}
                            onClick={() => {
                                setEnteringComment(!enteringComment);
                            }}
                        >
                            <XIcon className="h-6 w-6" />
                        </button>
                    </div>
                ) : (
                    <button
                        className={`absolute top-1.5 right-1 m-auto h-6 w-6 flex-shrink-0 `}
                        onClick={() => {
                            setEnteringComment(!enteringComment);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="fill-primary-700 h-6 w-6"
                        >
                            <path d="M4 14a1 1 0 0 1 .3-.7l11-11a1 1 0 0 1 1.4 0l3 3a1 1 0 0 1 0 1.4l-11 11a1 1 0 0 1-.7.3H5a1 1 0 0 1-1-1v-3z" />
                            <rect width="20" height="2" x="2" y="20" rx="1" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

const NoCommentsDisplay = () => {
    return (
        <div className=" mx-auto my-2 flex h-40 w-11/12">
            <div className="m-auto">
                <h1 className="text-center text-xl">
                    目前還沒有留言呢 <br />
                    成為第一個留言的人吧
                </h1>
            </div>
        </div>
    );
};

const LoadingSkeleton = () => {
    return (
        <div className="flex w-full gap-3 py-2">
            <img className="h-7 w-7 flex-shrink-0 animate-pulse rounded-full border-2 border-gray-300 bg-gray-300 p-1" />
            <div className="flex-grow">
                <div className="mb-2 h-5 w-36 animate-pulse rounded-lg bg-gray-300"></div>
                <div className="my-1 h-5 animate-pulse rounded-lg bg-gray-300"></div>
                <div className="mt-1 mb-3 h-5 animate-pulse rounded-lg bg-gray-300"></div>
                <div className="my-1 h-5 w-32 animate-pulse rounded-lg bg-gray-300"></div>
            </div>
        </div>
    );
};

export { NewComment, NoCommentsDisplay, LoadingSkeleton };
