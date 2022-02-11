import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookmarkIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { route } from 'next/dist/server/router';
// import SaveBoard from '../Common/SaveBoards';
// import ReportContent from './ReportContent';

const DiscussionHeader = ({ pagedata }) => {
    const router = useRouter()

    const [showStandpoint, setShowStandpoint] = useState(false);
    const [showReference, setShowReference] = useState(false);
    const [userSaved, setUserSaved] = useState(false)
    const [showReportMenu, setShowReportMenu] = useState(false)

    const toggleSaved = () => {
        // SaveBoard(boardId, !userSaved)
        setUserSaved(!userSaved)
    }

    if (router.isFallback) {
        return (
            <div className="bg-white w-full mx-auto px-9 py-6">
                <div className="w-40 h-8 my-1 rounded-xl animate-pulse bg-gray-300"></div>
                <div className="w-20 h-5 mt-1 mb-4 rounded-xl animate-pulse bg-gray-300"></div>
                <div className="w-[calc(100%-20px)] h-6 my-1.5 rounded-xl animate-pulse bg-gray-300"></div>
                <div className="w-[calc(100%-32px)] h-6 my-1.5 rounded-xl animate-pulse bg-gray-300"></div>
                <div className="w-full h-6 my-1.5 rounded-xl animate-pulse bg-gray-300"></div>
            </div>
        )
    } else {
        return (
            <div className="bg-neutral-50 w-full mx-auto px-9 py-6">
                <h1 className="text-neutral-800 text-3xl pb-2">{pagedata.title}</h1>
                <div className='pb-3'>
                    <img className='inline w-5 h-5 mr-3' src={pagedata.authorPfp} alt=''></img>
                    <p className='inline text-sm text-neutral-500'>{pagedata.authorName}</p>
                </div>
                <div className="flex flex-wrap justify-start gap-4">
                    {pagedata.tags.map((tag, i) =>
                        <Link href={`/search?tags=${tag}`} key={i} >
                            <div className="flex h-8 flex-shrink-0 px-4 border-[1.5px] border-neutral-400 rounded-2xl items-center cursor-pointer">
                                <p className="text-center text-neutral-500 text-sm">{`#${tag}`}</p>
                            </div>
                        </Link>
                    )}
                </div>
                <div className="mt-6 flex flex-col gap-5">
                    <p className="text-neutral-700 text-lg">{pagedata.content}</p>

                    <div>
                        {showStandpoint && <div>
                            <p className="text-primary-600 text-xl mb-2">支持者的立場</p>
                            <p className="text-neutral-700 text-lg mb-5">{pagedata.supContent}</p>
                            <p className="text-primary-600 text-xl mb-2">反對者的立場</p>
                            <p className="text-neutral-700 text-lg">{pagedata.agnContent}</p>
                        </div>}
                        <button onClick={() => { setShowStandpoint(!showStandpoint) }}>
                            <p className="leading-10 text-primary-600 text-lg text-left">{showStandpoint ? '收合' : '展開'}立場/論點</p>
                        </button>
                    </div>

                    <div>
                        {showReference && <div>
                            <p className="text-primary-600 text-xl mb-2">延伸資料</p>
                            {pagedata.refLinks.map((link, i) => {
                                return <p key={i} className="text-neutral-600 text-lg">
                                    <a href={link} rel="noreferrer" target="_blank">{link}</a>
                                </p>
                            })}
                        </div>}
                        <button onClick={() => { setShowReference(!showReference) }}>
                            <p className="leading-10 text-primary-600 text-lg text-left">{showReference ? '收合' : '展開'}參考/資料</p>
                        </button>
                    </div>
                    <div className="h-8 flex justify-start">
                        <button onClick={toggleSaved}>
                            <BookmarkIcon className={`w-8 h-8 text-primary-600 transition-colors ${userSaved ? 'fill-yellow-300' : 'fill-white'}`} />
                        </button>
                        {/* <button onClick={() => { setShowReportMenu(true) }}>
                                        <svg className="w-8 h-8 mx-2 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 33">
                                            <g id="Icon_feather-flag" data-name="Icon feather-flag" transform="translate(-4.5 -1.5)">
                                                <path id="Path_5" data-name="Path 5" d="M6,22.5S7.5,21,12,21s7.5,3,12,3,6-1.5,6-1.5V4.5S28.5,6,24,6,16.5,3,12,3,6,4.5,6,4.5Z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                                                <path id="Path_6" data-name="Path 6" d="M6,33V22.5" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                                            </g>
                                        </svg>
                                    </button> */}
                    </div>
                </div>

                {/* {showReportMenu && <ReportContent
                            rHeader="請問此主題有什麼問題？"
                            rQuestions={["內容包含不實訊息", "內容過度偏頗", "其他"]}
                            closeReportContent={() => { setShowReportMenu(false) }}
                        />} */}
            </div >
        )
    }
}

export default DiscussionHeader

