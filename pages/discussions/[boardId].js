import React, { useState, useEffect } from 'react'

import { useRouter } from "next/router";

// import './Styles/discussion.css'
import Header from '../../components/header/Header';
import Sidebar from '../../components/navbar/Sidebar'
import Footbar from '../../components/navbar/Footbar'
import DiscussionHeader from '../../components/discussion/DiscussionHeader'

import { SideSelector, IntegratedSideSelector, CommentSort } from '../../components/discussion/Selectors';

// import CommentField from './CommentField'

const MainBoard = ({ discussionContent }) => {
    const router = useRouter()
    const [flowDisplay, setFlowDisplay] = useState(1);
    const [screenSize, setScreenSize] = useState("sm")
    const [commentFieldSide, setCommentFieldSide] = useState(0)
    const [commentSort, setCommentSort] = useState(0)

    // const updateScreen = () => {
    //     let newScreenSize
    //     if (window.innerWidth < 1024) newScreenSize = "sm"
    //     else if (window.innerWidth >= 1024 && window.innerWidth <= 1280) newScreenSize = "lg"
    //     else newScreenSize = "xl"

    //     setScreenSize(newScreenSize)

    //     if (flowDisplay === 0 && newScreenSize === "sm") setFlowDisplay(1)
    //     else if ((flowDisplay === 1 || flowDisplay === 2) && newScreenSize !== "sm") setFlowDisplay(0)
    // }

    // useEffect(() => {
    //     updateScreen()
    //     window.onresize = updateScreen
    // }, [flowDisplay])

    return (
        <div className="w-screen h-screen overflow-x-hidden bg-neutral-100 scrollbar-hide" >
            <Header />
            <Sidebar />
            <Footbar />
            <div className='w-full h-screen pt-14 flex'>
                <div className='w-11/12 max-w-3xl mx-auto lg:px-4 overflow-y-auto scrollbar-hide'>
                    <div className='w-full mt-6 lg:mt-10'>
                        <DiscussionHeader pagedata={discussionContent} />
                    </div>
                    <div className="w-full my-6 flex justify-end lg:grid lg:grid-cols-3  ">
                        <div />
                        <SideSelector changeSide={setCommentFieldSide} />
                        <CommentSort changeSortMethod={setCommentSort} />
                    </div>
                    <div className='w-full h-72'>
                        <IntegratedSideSelector changeSide={setCommentFieldSide} />
                    </div>
                    {/* <div className='w-full'>
                        {flowDisplay === 3 ? <CommentField boardId={boardId} onSide={null} /> :
                            <>{flowDisplay === 0 ?
                                <div className="grid grid-cols-2 gap-12 mx-auto">
                                    <CommentField boardId={boardId} onSide="支持方" />
                                    <CommentField boardId={boardId} onSide="反對方" />
                                </div> :
                                <CommentField boardId={boardId} onSide={flowDisplay === 3 ? null : (flowDisplay === 1 ? "支持方" : "反對方")} />
                            }</>
                        }
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default MainBoard

export async function getStaticProps({ params }) {
    let pagedata = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/boards/${params.boardId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.json()
        })
        .then(response => {
            return {
                boardId: params.boardId,
                title: response.title,
                authorName: 'Speakup 內容團隊',
                tags: response.tags.split(","),
                content: response.brief,
                supContent: response.supContent,
                agnContent: response.agnContent,
                refLinks: response.refLinks.split(","),
                userSaved: response.isSaved
            }
        })
        .catch(error => {
            return { notFound: true }
        })

    if (pagedata.notFound) return { notFound: true }

    return {
        props: {
            discussionContent: pagedata
        },
        revalidate: 1800
    }
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { boardId: '1' } }
        ],
        fallback: true
    }
}