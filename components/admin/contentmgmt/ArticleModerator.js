import React from 'react';
import Link from 'next/link';

import { Button } from '@mantine/core';

const ArticleModerator = ({ data, acceptArticle, declineArticle }) => {
    return (
        <div className="mt-7 w-full bg-neutral-50 py-7 px-9">
            <div className="flex flex-col justify-between sm:flex-row lg:items-center">
                <h2 className="my-1 text-3xl text-primary-900">{data.title}</h2>
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
            <hr className="mt-3 mb-4 border-b-2 border-primary-700" />
            <div className="mt-4 ">
                <Button
                    className="inline bg-primary-600"
                    onClick={acceptArticle}
                >
                    審核通過
                </Button>
                <Button
                    className="ml-4 inline bg-red-500"
                    color="red"
                    onClick={declineArticle}
                >
                    審核不通過
                </Button>
            </div>
        </div>
    );
};

export default ArticleModerator;
