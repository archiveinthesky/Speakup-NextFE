import { ReplyIcon } from '@heroicons/react/outline'
import { cloneDeep } from 'lodash'
import CommentCard from './CommentCard'

const CommentResponseField = ({ boardId, onSide, commentId, commentData, delComment, fetchMoreReplies = null }) => {

    const ShowRepliesButton = () => {
        return (
            <button className='text-neutral-500 flex items-start gap-1' onClick={fetchMoreReplies}>
                <ReplyIcon className='inline rotate-180 w-5 h-5' />
                <p className='inline text-sm'>查看更多回覆</p>
            </button>
        )
    }

    return (
        <div className="w-[88%] md:w-11/12 lg:w-[88%] xl:w-11/12 bg-neutral-50 mt-2 ml-auto flex flex-col">
            {commentData.map((cmt, i) => {
                return <CommentCard
                    boardId={boardId}
                    onSide={onSide}
                    key={"r" + i}
                    cmtdata={cmt}
                    motherComment={commentId}
                    delComment={() => { delComment(i) }}
                    replyFunction={null}
                />
            })}
            {fetchMoreReplies !== null && <ShowRepliesButton />}
        </div >
    )
}

export default CommentResponseField
