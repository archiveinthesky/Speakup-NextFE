const getComments = async (start, end, boardId, onSide) => {
  let onside = ["sup", "all", "agn"][onSide];
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/${boardId}/${onside}`,
    {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("AuthToken"),
        Accept: "application/json",
        "Content-Type": "application/json",
        "Start-Pos": start,
        "End-Pos": end,
      },
    }
  ).then((response) => {
    return response.json();
  });
};

const getCommentReply = async (commentId, start, end, boardId, onSide) => {
  let onside = ["sup", "all", "agn"][onSide];
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/${boardId}/${onside}/${commentId}`,
    {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("AuthToken"),
        Accept: "application/json",
        "Content-Type": "application/json",
        "Start-Pos": start,
        "End-Pos": end,
      },
    }
  ).then((response) => {
    return response.json();
  });
};

const postCommentBE = async (cmtContent, boardId, onSide) => {
  if (onSide !== "sup" && onSide !== "agn") onSide = "sup";
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/${boardId}/${onSide}`,
    {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("AuthToken"),
        Accept: "application/json",
        "Content-Type": "application/json",
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
  // let onside = ""
  // if (onSide === "支持方") onside = "sup"
  // else if (onSide === "反對方") onside = "agn"
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/${boardId}/${onSide}/${commentid}`,
    {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("AuthToken"),
        Accept: "application/json",
        "Content-Type": "application/json",
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
