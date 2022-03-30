const getComments = async (boardId, onSide, start, end, order = null) => {
    let onside = ['sup', 'nul', 'agn'][onSide];

    return await fetch(
        `${
            process.env.NEXT_PUBLIC_BACKEND_URL
        }/api/comments/${boardId}/${onside}?start=${start}&end=${end}${
            order !== null ? `&order=${order}` : ''
        }`,
        {
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem('AuthToken'),
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }
    ).then((response) => {
        return response.json();
    });
};

const getCommentReply = async (commentId, start, end, boardId, onSide) => {
    let onside = ['sup', 'all', 'agn'][onSide];
    return await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/replies/${boardId}/${commentId}`,
        {
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem('AuthToken'),
                Accept: 'application/json',
                'Content-Type': 'applicaton/json',
                'Start-Pos': start,
                'End-Pos': end,
            },
        }
    ).then((response) => {
        return response.json();
    });
};

const postCommentBE = async (cmtContent, boardId, onSide) => {
    if (onSide !== 'sup' && onSide !== 'agn') onSide = 'nul';
    return await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/${boardId}/${onSide}`,
        {
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem('AuthToken'),
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cmtContent: cmtContent,
            }),
        }
    ).then(async (response) => {
        return await response.json();
    });
};

const postReplyBE = async (commentid, cmtcontent, boardId, onSide) => {
    return await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/replies/${boardId}/${commentid}`,
        {
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem('AuthToken'),
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cmtContent: cmtcontent,
            }),
        }
    ).then(async (response) => {
        return await response.json();
    });
};

export { getComments, getCommentReply, postCommentBE, postReplyBE };
