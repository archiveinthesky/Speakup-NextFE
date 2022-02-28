import { ReplyIcon } from '@heroicons/react/outline';
import CommentCard from './CommentCard';

const CommentResponseField = ({
    boardId,
    onSide,
    commentId,
    commentData,
    delComment,
    fetchMoreReplies = null,
}) => {
    const ShowRepliesButton = () => {
        return (
            <button
                className="flex items-start gap-1 text-neutral-500"
                onClick={fetchMoreReplies}
            >
                <ReplyIcon className="inline h-5 w-5 rotate-180" />
                <p className="inline text-sm">查看更多回覆</p>
            </button>
        );
    };

    return (
        <div className="mt-2 ml-auto flex w-[88%] flex-col bg-neutral-50 md:w-11/12 lg:w-[88%] xl:w-11/12">
            {commentData.map((cmt, i) => {
                return (
                    <CommentCard
                        boardId={boardId}
                        onSide={onSide}
                        key={'r' + i}
                        cmtdata={cmt}
                        motherComment={commentId}
                        delComment={() => {
                            delComment(i);
                        }}
                        replyFunction={null}
                    />
                );
            })}
            {fetchMoreReplies !== null && <ShowRepliesButton />}
        </div>
    );
};

export default CommentResponseField;
