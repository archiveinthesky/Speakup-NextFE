import React, { useState, useEffect } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';

import Header from '../../components/header/Header';
import Sidebar from '../../components/navbar/Sidebar';
import Footbar from '../../components/navbar/Footbar';
import DiscussionHeader from '../../components/discussion/DiscussionHeader';
import CommentField from '../../components/discussion/CommentField';

import {
    SideSelector,
    IntegratedSideSelector,
    CommentSort,
} from '../../components/discussion/Selectors';
import { useSetRecoilState } from 'recoil';
import { boardDataState } from '../../components/atoms/recoilAtoms';

const MainBoard = ({ discussionContent }) => {
    const [commentFieldSide, setCommentFieldSide] = useState(1);
    const [commentSort, setCommentSort] = useState(0);

    const setBoardData = useSetRecoilState(boardDataState);

    useEffect(() => {
        if (!localStorage.getItem('AuthToken')) {
            window.location.href = '/login';
        }
        setBoardData({
            boardId: discussionContent.boardId,
        });
    }, []);

    useEffect(() => {
        // console.log('Reloading');
        // queryClient.invalidateQueries();
    }, [commentFieldSide, commentSort]);

    if (discussionContent !== undefined)
        return (
            <div className="fixed top-0 left-0 h-screen w-screen bg-neutral-100 scrollbar-hide overflow-x-hidden">
                <Header />
                <Sidebar retractable={true} />
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
                            <IntegratedSideSelector
                                changeSide={setCommentFieldSide}
                            />

                            <ReactQueryDevtools initialIsOpen={false} />
                            {[commentFieldSide * commentSort].map(() => (
                                <CommentField
                                    key={commentFieldSide * commentSort}
                                    boardId={discussionContent.boardId}
                                    onSide={commentFieldSide}
                                    sortMethod={commentSort}
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
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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
                authorName: 'Speakup 內容團隊',
                tags: response.tags.split(','),
                content: response.brief,
                supContent: response.supContent,
                agnContent: response.agnContent,
                refLinks: response.refLinks.split(','),
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
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/isr/boards`
    );
    const paths = await res.json();

    return {
        paths: paths,
        fallback: true,
    };
}
