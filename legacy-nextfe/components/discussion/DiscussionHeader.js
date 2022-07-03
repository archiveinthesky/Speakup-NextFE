import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { BookmarkIcon, FlagIcon, LinkIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import ReportInterface from '../common/ReportInterface';
import { Spoiler } from '@mantine/core';
import { useMutation } from 'react-query';
import { useSession } from 'next-auth/react';
import { showNotification } from '@mantine/notifications';

const DiscussionHeader = ({ pagedata }) => {
    const router = useRouter();
    const { data: session, status: loginStatus } = useSession();

    const [userSaved, setUserSaved] = useState(false);
    const [showReportMenu, setShowReportMenu] = useState(false);

    const collectBoardMutation = useMutation(
        async (values) => {
            let response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/collections`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Token ${session.authToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                }
            );
            if (response.ok) return true;
            throw new Error('Fetch failed');
        },
        {
            onSuccess: (data, variables) => {
                setUserSaved(variables.save);
            },
            onError: (error) => {
                showNotification({
                    title: '收藏本議題時發生錯誤',
                    message: '請再試一次',
                    color: 'red',
                    autoClose: false,
                });
            },
        }
    );

    if (router.isFallback) {
        return (
            <div className="mx-auto w-full bg-white py-6 px-9">
                <div className="my-1 h-8 w-40 animate-pulse rounded-xl bg-gray-300"></div>
                <div className="mt-1 mb-4 h-5 w-20 animate-pulse rounded-xl bg-gray-300"></div>
                <div className="my-1.5 h-6 w-[calc(100%-20px)] animate-pulse rounded-xl bg-gray-300"></div>
                <div className="my-1.5 h-6 w-[calc(100%-32px)] animate-pulse rounded-xl bg-gray-300"></div>
                <div className="my-1.5 h-6 w-full animate-pulse rounded-xl bg-gray-300"></div>
            </div>
        );
    } else {
        return (
            <div className="mx-auto w-full bg-neutral-50 py-6 px-9">
                <h1 className="pb-2 text-3xl text-primary-900">
                    {pagedata.title}
                </h1>
                <div className="flex items-center pb-3">
                    <img
                        className="mr-3 h-5 w-5 "
                        src={pagedata.authorPfp}
                        alt=""
                    />
                    <p className="text-sm text-neutral-500">
                        {pagedata.authorName}
                    </p>
                    <div className="w-4" />
                    {false && (
                        <>
                            <LinkIcon className="h-5 w-5 text-primary-600" />
                            <a href={pagedata.sponsorLink}>
                                <p className="text-sm text-primary-600">
                                    議題連結
                                </p>
                            </a>
                        </>
                    )}
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
                        <Spoiler
                            maxHeight={0}
                            showLabel="展開雙方立場"
                            hideLabel="收合雙方立場"
                            classNames={{
                                control: 'text-lg leading-10 text-primary-700',
                            }}
                        >
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
                        </Spoiler>
                    </div>

                    <div>
                        <Spoiler
                            maxHeight={0}
                            showLabel="展開延伸閱讀"
                            hideLabel="收合延伸閱讀"
                            classNames={{
                                control: 'text-lg leading-10 text-primary-700',
                            }}
                        >
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
                        </Spoiler>
                    </div>
                    <div className="flex h-8 justify-start gap-2">
                        {loginStatus === 'authenticated' && (
                            <>
                                <button
                                    onClick={() => {
                                        if (!collectBoardMutation.isLoading)
                                            collectBoardMutation.mutate({
                                                boardId: pagedata.boardId,
                                                save: !userSaved,
                                            });
                                    }}
                                >
                                    <BookmarkIcon
                                        className={`h-7 w-7 text-primary-700 transition-colors ${
                                            userSaved
                                                ? 'fill-yellow-300'
                                                : 'fill-white'
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
                            </>
                        )}
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
