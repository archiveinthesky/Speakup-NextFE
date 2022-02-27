import React, { useState } from "react";

import { useRouter } from "next/router";

// import './Styles/discussion.css'
import Header from "../../components/header/Header";
import Sidebar from "../../components/navbar/Sidebar";
import Footbar from "../../components/navbar/Footbar";
import DiscussionHeader from "../../components/discussion/DiscussionHeader";
import CommentField from "../../components/discussion/CommentField";

import {
  SideSelector,
  IntegratedSideSelector,
  CommentSort,
} from "../../components/discussion/Selectors";

const MainBoard = ({ discussionContent }) => {
  const router = useRouter();
  const [commentFieldSide, setCommentFieldSide] = useState(1);
  const [commentSort, setCommentSort] = useState(0);

  if (discussionContent !== undefined)
    return (
      <div className="h-screen w-screen overflow-x-hidden bg-neutral-100 scrollbar-hide">
        <Header />
        <Sidebar />
        <Footbar />
        <div className="flex h-screen w-full pt-14">
          <div className="mx-auto w-11/12 max-w-3xl overflow-y-auto scrollbar-hide lg:px-4">
            <div className="mt-6 w-full lg:mt-10">
              <DiscussionHeader pagedata={discussionContent} />
            </div>
            <div className="my-6 flex w-full justify-end lg:grid lg:grid-cols-3  ">
              <div />
              <SideSelector changeSide={setCommentFieldSide} />
              <CommentSort changeSortMethod={setCommentSort} />
            </div>
            <div className="w-full">
              <IntegratedSideSelector changeSide={setCommentFieldSide} />
              {[commentFieldSide].map((i) => (
                <CommentField
                  key={i}
                  boardId={discussionContent.boardId}
                  onSide={commentFieldSide}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  else return <></>;
};

export default MainBoard;

export async function getStaticProps({ params }) {
  let pagedata = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/boards/${params.boardId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return {
        boardId: params.boardId,
        title: response.title,
        authorName: "Speakup 內容團隊",
        tags: response.tags.split(","),
        content: response.brief,
        supContent: response.supContent,
        agnContent: response.agnContent,
        refLinks: response.refLinks.split(","),
        userSaved: response.isSaved,
      };
    })
    .catch((error) => {
      return { notFound: true };
    });

  if (pagedata.notFound) return { notFound: true };

  return {
    props: {
      discussionContent: pagedata,
    },
    revalidate: 1800,
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { boardId: "1" } }],
    fallback: true,
  };
}
