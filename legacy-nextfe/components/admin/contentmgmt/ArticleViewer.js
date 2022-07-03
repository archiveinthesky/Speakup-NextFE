import React from 'react';
import Link from 'next/link';

import { EyeIcon, ExclamationIcon } from '@heroicons/react/solid';
import { ClockIcon } from '@heroicons/react/outline';
import { Button } from '@mantine/core';

const ArticleViewer = ({ data, toggleEdit }) => {
    return (
        <div className="mt-7 w-full bg-neutral-50 py-7 px-9">
            <div className="flex flex-col justify-between sm:flex-row lg:items-center">
                <h2 className="my-1 text-3xl text-primary-900">{data.title}</h2>
                {toggleEdit && (
                    <Button
                        onClick={toggleEdit}
                        className="w-16 flex-grow-0 bg-primary-600"
                    >
                        編輯
                    </Button>
                )}
            </div>
            <div className="mt-3 flex w-full flex-col justify-between gap-2 lg:flex-row ">
                <div className="flex gap-4">
                    {data.tags.map((tag, i) => (
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
                <div className="flex items-center gap-2">
                    {data.status.code == 'pb' && (
                        <EyeIcon className="h-7 w-7 flex-shrink-0 fill-green-500" />
                    )}
                    {data.status.code == 'pm' && (
                        <ClockIcon className="h-7 w-7 flex-shrink-0 text-yellow-500" />
                    )}
                    {data.status.code == 'ra' && (
                        <ExclamationIcon className="h-7 w-7 flex-shrink-0 fill-red-500" />
                    )}
                    <p
                        className={` ${
                            data.status.code == 'pb'
                                ? 'text-green-500'
                                : data.status.code == 'pm'
                                ? 'text-yellow-500'
                                : 'text-red-500'
                        }`}
                    >
                        {data.status.code == 'pb'
                            ? '公開'
                            : data.status.code == 'pm'
                            ? '待審'
                            : '需要注意'}
                    </p>
                </div>
            </div>
            <div className="mt-2 lg:mt-3">
                {data.status.code === 'pm' && (
                    <p className="text-yellow-600">
                        {data.status.reason === 'jc'
                            ? '由於您非資深創作者，且是初次投稿此議題，'
                            : data.status.reason === 'rp'
                            ? '由於本議題被多次檢舉'
                            : data.status.reason === 'rs'
                            ? '為了確定您的議題在修改後符合Speakup規範'
                            : ''}
                        您的議題正在等待審核，結果通常會在七天內公布。
                    </p>
                )}
                {data.status.code === 'ra' && (
                    <p className="mt-3 text-red-600">
                        由於{data.status.reason[0]}
                        ，您的議題目前已被警告。審核者建議本議題
                        {data.status.reason[1]}，請您儘快修正議題。
                    </p>
                )}
            </div>
            <hr className="mt-3 mb-4 border-b-2 border-primary-700" />
            <div className=" flex flex-col gap-2 text-neutral-700">
                <h3 className="text-lg text-primary-700">簡述</h3>
                <p>{data.brief}</p>
                <hr className="my-2 border-b-2 border-primary-300 " />
                <h3 className="text-lg text-primary-700">支持者的立場</h3>
                <p>{data.brief}</p>
                <hr className="my-2 border-b-2 border-primary-300 " />
                <h3 className="text-lg text-primary-700">反對者的立場</h3>
                <p>{data.agnContent}</p>
                <hr className="my-2 border-b-2 border-primary-300 " />
                <h3 className="text-lg text-primary-700">延伸閱讀</h3>
                {data.refLinks.map((link, i) => (
                    <a href={link} rel="noreferrer" target="_blank" key={i}>
                        <p>{link}</p>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default ArticleViewer;
