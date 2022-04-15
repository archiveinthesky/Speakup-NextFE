import { useState } from 'react';

class Comment {
    constructor(response) {
        this.data = response;
        this.replies = {
            data: [],
            newReplies: [],
            latestServerReply: 0,
            hasReplies: response.cmtReplies,
        };
    }
}

const getComments = async (boardId, onSide, fetchPage, order = null) => {
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
                Authorization: localStorage.getItem('AuthToken'),
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }
    );
    if (!response.ok) throw new Error('Comment Fetch Failed');
    let res = await response.json();

    return new Promise(async (resolve, reject) => {
        let cmtArray = res.data.map((element) => {
            return new Comment(element);
        });
        cmtArray.splice(0, 0, { totalComments: res.totalComments });
        resolve(cmtArray);
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

export { Comment, getComments, getCommentReply, postCommentBE, postReplyBE };
