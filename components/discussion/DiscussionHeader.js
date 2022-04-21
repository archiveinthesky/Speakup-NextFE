import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { BookmarkIcon, FlagIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import ReportInterface from '../common/ReportInterface';

const DiscussionHeader = ({ pagedata }) => {
    const router = useRouter();

    const [showStandpoint, setShowStandpoint] = useState(false);
    const [showReference, setShowReference] = useState(false);
    const [userSaved, setUserSaved] = useState(false);
    const [showReportMenu, setShowReportMenu] = useState(false);

    const toggleSaved = () => {
        // SaveBoard(boardId, !userSaved)
        setUserSaved(!userSaved);
    };

    if (router.isFallback) {
        return (
            <div className="mx-auto w-full bg-white px-9 py-6">
                <div className="my-1 h-8 w-40 animate-pulse rounded-xl bg-gray-300"></div>
                <div className="mt-1 mb-4 h-5 w-20 animate-pulse rounded-xl bg-gray-300"></div>
                <div className="my-1.5 h-6 w-[calc(100%-20px)] animate-pulse rounded-xl bg-gray-300"></div>
                <div className="my-1.5 h-6 w-[calc(100%-32px)] animate-pulse rounded-xl bg-gray-300"></div>
                <div className="my-1.5 h-6 w-full animate-pulse rounded-xl bg-gray-300"></div>
            </div>
        );
    } else {
        return (
            <div className="mx-auto w-full bg-neutral-50 px-9 py-6">
                <h1 className="pb-2 text-3xl text-primary-900">
                    {pagedata.title}
                </h1>
                <div className="pb-3">
                    <img
                        className="mr-3 inline h-5 w-5"
                        src={pagedata.authorPfp}
                        alt=""
                    ></img>
                    <p className="inline text-sm text-neutral-500">
                        {pagedata.authorName}
                    </p>
                </div>
                <div className="flex flex-wrap justify-start gap-4">
                    {pagedata.tags.map((tag, i) => (
                        <Link
                            href={`/search/results?searchterm=@${tag}`}
                            key={i}
                        >
                            <div className="flex h-8 flex-shrink-0 cursor-pointer items-center rounded-2xl border-[1.5px] border-neutral-400 px-4">
                                <p className="text-center text-sm text-neutral-500">{`#${tag}`}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="mt-6 flex flex-col gap-5 text-neutral-700">
                    <p className="text-lg">{pagedata.content}</p>

                    <div>
                        {showStandpoint && (
                            <div>
                                <p className="mb-2 text-xl text-primary-800">
                                    支持者的立場
                                </p>
                                <p className="mb-5 text-lg">
                                    {pagedata.supContent}
                                </p>
                                <p className="mb-2 text-xl text-primary-800">
                                    反對者的立場
                                </p>
                                <p className="text-lg">{pagedata.agnContent}</p>
                            </div>
                        )}
                        <button
                            onClick={() => {
                                setShowStandpoint(!showStandpoint);
                            }}
                        >
                            <p className="text-left text-lg leading-10 text-primary-700">
                                {showStandpoint ? '收合' : '展開'}立場/論點
                            </p>
                        </button>
                    </div>

                    <div>
                        {showReference && (
                            <div>
                                <p className="mb-2 text-xl text-primary-800">
                                    延伸資料
                                </p>
                                {pagedata.refLinks.map((link, i) => {
                                    return (
                                        <p
                                            key={i}
                                            className="text-lg text-neutral-600"
                                        >
                                            <a
                                                href={link}
                                                rel="noreferrer"
                                                target="_blank"
                                            >
                                                {link}
                                            </a>
                                        </p>
                                    );
                                })}
                            </div>
                        )}
                        <button
                            onClick={() => {
                                setShowReference(!showReference);
                            }}
                        >
                            <p className="text-left text-lg leading-10 text-primary-700">
                                {showReference ? '收合' : '展開'}參考/資料
                            </p>
                        </button>
                    </div>
                    <div className="flex h-8 justify-start gap-2">
                        <button onClick={toggleSaved}>
                            <BookmarkIcon
                                className={`h-7 w-7 text-primary-700 transition-colors ${
                                    userSaved ? 'fill-yellow-300' : 'fill-white'
                                }`}
                            />
                        </button>
                        <button
                            onClick={() => {
                                setShowReportMenu(true);
                            }}
                        >
                            <FlagIcon className="h-7 w-7 text-primary-700 " />
                        </button>
                    </div>
                </div>

                {showReportMenu && (
                    <ReportInterface
                        title={'請問您認為此主題有什麼問題？'}
                        options={[
                            '內容包含不實訊息',
                            '內容立場過度偏頗',
                            '內容包含廣告',
                            '散播仇恨言論或人生攻擊',
                            '含有煽情露骨內容',
                            '散播恐怖主義',
                        ]}
                        submitFunction={(option, value = '') => {}}
                        closeFunction={() => {
                            setShowReportMenu(false);
                        }}
                    />
                )}
            </div>
        );
    }
};

export default DiscussionHeader;
