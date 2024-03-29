const getBoardComments = async ({
    auth,
    boardId,
    onSide,
    fetchPage,
    order,
}) => {
    let onside = ['sup', 'nul', 'agn'][onSide];
    let response = await fetch(
        `${
            process.env.NEXT_PUBLIC_BACKEND_URL
        }/api/comments/${boardId}/${onside}?onpage=${fetchPage}&${
            order !== null ? `&order=${order}` : ''
        }`,
        {
            method: 'GET',
            headers: {
                Authorization: auth,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }
    );
    if (!response.ok) throw new Error('Comment Fetch Failed');
    let res = await response.json();

    return new Promise(async (resolve, reject) => {
        let cmtArray = [{ totalComments: res.totalComments }].concat(res.data);
        resolve(cmtArray);
    });
};

const postComment = async ({ auth, cmtContent, boardId, onSide }) => {
    if (onSide !== 'sup' && onSide !== 'agn') onSide = 'nul';
    let response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/${boardId}/${onSide}`,
        {
            method: 'POST',
            headers: {
                Authorization: auth,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cmtContent: cmtContent,
            }),
        }
    );
    if (!response.ok) throw new Error('Comment post failed');
    return response.json();
};

const getCommentReplies = async ({ auth, boardId, commentId, onpage }) => {
    let response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/replies/${boardId}/${commentId}?onpage=${onpage}`,
        {
            method: 'GET',
            headers: {
                Authorization: auth,
                Accept: 'application/json',
                'Content-Type': 'applicaton/json',
            },
        }
    );
    if (!response.ok) throw new Error('Comment post failed');
    let res = await response.json();
    return new Promise(async (resolve, reject) => {
        let cmtArray = [{ totalComments: res.totalReplies }].concat(res.data);
        resolve(cmtArray);
    });
};

const updateCommentReactions = async ({
    auth,
    boardId,
    motherComment,
    commentId,
    updatedStats,
}) => {
    let restURI = !motherComment
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/${boardId}/nul/${commentId}`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/replies/${boardId}/${motherComment}/${commentId}`;
    let response = await fetch(restURI, {
        method: 'PUT',
        headers: {
            Authorization: auth,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStats),
    });
    if (!response.ok) throw new Error('Reaction update mutation failed');
    return response.json();
};

const postCommentReply = async ({ auth, boardId, commentid, cmtcontent }) => {
    let response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/replies/${boardId}/${commentid}`,
        {
            method: 'POST',
            headers: {
                Authorization: auth,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cmtContent: cmtcontent,
            }),
        }
    );
    return response.json();
};

const deleteComment = ({ auth, boardId, commentid }) => {
    return fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/${boardId}/nul/${commentid}`,
        {
            method: 'DELETE',
            headers: {
                Authorization: auth,
            },
        }
    );
};

const deleteReply = ({ auth, boardId, commentId, replyId }) => {
    return fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/replies/${boardId}/${commentId}/${replyId}`,
        {
            method: 'DELETE',
            headers: {
                Authorization: auth,
            },
        }
    );
};

export {
    getBoardComments,
    getCommentReplies,
    postComment,
    updateCommentReactions,
    postCommentReply,
    deleteComment,
    deleteReply,
};
