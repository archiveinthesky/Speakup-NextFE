import React from 'react';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/outline';

export default function Home() {
    return (
        <div className="fixed top-0 left-0 h-screen w-screen overflow-x-hidden ">
            <div className="relative flex h-24 w-screen items-center justify-center bg-primary-50 px-11 ">
                <img className="h-14" src="/assets/logo-black.svg" alt="logo" />
                <div className="absolute right-11 hidden flex-grow-0 items-center gap-8 lg:flex">
                    <a
                        href="https://speakup-team.notion.site/Speakup-50887304586641559268ef313ef6e1f6"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        <p className="text-lg">使用幫助</p>
                    </a>

                    <a
                        href="https://speakup-team.notion.site/Speakup-ff4943ac425a430ebc06e74982d18968"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        <p className="text-lg">關於我們</p>
                    </a>
                    <Link href="/signup">
                        <div className="hidden h-12 cursor-pointer rounded-2xl bg-primary-600 px-4 lg:block">
                            <p className="text-center leading-[48px] text-white">
                                開始使用
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="relative mt-20 h-[30vw] w-full">
                <div className=" absolute top-0 left-[-15vw] hidden opacity-50 lg:block ">
                    <img
                        className="w-[30vw] max-w-2xl"
                        src="/assets/logo-mic.svg"
                        alt=""
                    />
                </div>
                <div className="absolute top-0 right-[-15vw] hidden opacity-50 lg:block ">
                    <img
                        className="w-[30vw] max-w-2xl"
                        src="/assets/logo-mic.svg"
                        alt=""
                    />
                </div>
                <div className="mt-12">
                    <h1 className="text-center text-5xl font-bold leading-[60px] lg:pt-24 lg:text-7xl lg:leading-[84px]">
                        <span className="inline-block">為重要議題</span>
                        <span className="inline-block">
                            的
                            <span className="bg-gradient-to-br from-primary-700 to-primary-400 bg-clip-text text-transparent">
                                交流
                            </span>
                        </span>
                        <br />
                        <span className="inline-block">提供</span>
                        <span className="bg-gradient-to-br from-primary-900 to-primary-500 bg-clip-text text-transparent">
                            理性溝通
                        </span>
                        <span className="inline-block">的空間</span>
                    </h1>
                    <div className=" h-10"></div>
                    <p className=" mx-5 text-center text-2xl leading-[40px]">
                        在Speakup，我們相信每個議題都值得被討論
                        <br />
                        每個人的聲音都該被聽到
                    </p>
                    <div className=" h-10"></div>
                    <Link href="/signup">
                        <div>
                            <div className=" mx-auto flex h-20 w-60 cursor-pointer items-center justify-around rounded-[48px] bg-primary-600 px-6">
                                <p className=" text-4xl text-white">加入討論</p>
                            </div>
                            <ChevronRightIcon className="h-11 w-11 text-white" />
                        </div>
                    </Link>
                    <div className="h-20 lg:h-40"></div>
                </div>
                <div className="w-screen bg-primary-50 py-16">
                    <h2 className=" text-center text-5xl font-bold text-primary-600 lg:text-7xl">
                        Let's Speakup!
                    </h2>
                    <div className="\ mx-auto mt-20 flex w-[80vw] max-w-5xl flex-col items-center gap-8 text-center text-3xl font-bold lg:grid lg:grid-cols-2 lg:justify-center">
                        <div className=" 80 flex h-48 w-full items-center justify-center rounded-3xl border-4 border-primary-600 xl:w-[480px]">
                            <p>
                                打破同溫層和謾罵的屏障
                                <br />
                                讓理性的交流在彼此間發生
                            </p>
                        </div>
                        <div className=" 80 flex h-48 w-full items-center justify-center rounded-3xl border-4 border-primary-600 xl:w-[480px]">
                            <p>
                                每週精選議題焦點
                                <br />
                                快速理解焦點內容、雙方立場
                            </p>
                        </div>
                        <div className=" 80 flex h-48 w-full items-center justify-center rounded-3xl border-4 border-primary-600 xl:w-[480px]">
                            <p>
                                專門為議題討論設計的介面
                                <br />
                                更容易的表達意見
                            </p>
                        </div>
                        <div className=" 80 flex h-48 w-full items-center justify-center rounded-3xl border-4 border-primary-600 xl:w-[480px]">
                            <p>
                                明確的留言管理
                                <br />
                                保障所有人自由討論的權利
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex h-60 w-screen items-center justify-between bg-primary-500 xl:h-72">
                    <div className="mx-auto flex w-10/12 flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <h1 className="my-auto text-4xl leading-[48px] text-white lg:leading-[60px] xl:text-5xl xl:leading-[72px]">
                            準備好了嗎？
                            <br />
                            馬上開始討論吧
                        </h1>
                        <Link href="/signup">
                            <div className="flex h-16 w-44 cursor-pointer items-center justify-center rounded-[40px] bg-white text-2xl hover:drop-shadow-md lg:text-3xl xl:h-20 xl:w-52 xl:text-4xl">
                                開始使用
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="h-56 w-screen bg-black py-8 text-white lg:h-80">
                    <div className="mx-auto flex h-full w-11/12 flex-col md:w-10/12 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <div className="flex items-center gap-4">
                                <img
                                    className="inline h-20 w-20"
                                    src="/assets/logo-mic.svg"
                                    alt=""
                                />
                                <h1 className="my-2 inline text-3xl lg:my-4 lg:text-5xl">
                                    Speakup
                                </h1>
                            </div>
                            <h1 className="my-4 text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
                                致力於創造一個更理性的討論空間
                            </h1>
                        </div>
                        {/* <div className='mt-8 lg:mt-16 flex gap-10 lg:gap-16 xl:gap-24'>
                                <div>
                                    <h2 className= lg:text-2xl 2xl:text-3xl'>平台簡介</h2>
                                    <ul className='mt-6 xl:text-xl 2xl:text-2xl'>
                                        <li className='my-4'>平台理念</li>
                                        <li className='my-4'>關於我們</li>
                                        <li className='my-4'>支持我們</li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className= lg:text-2xl 2xl:text-3xl'>平台規範</h2>
                                    <ul className='mt-6 xl:text-xl 2xl:text-2xl'>
                                        <li className='my-4'>使用者條款</li>
                                        <li className='my-4'>留言規範</li>
                                        <li className='my-4'>審核流程</li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className=' lg:text-2xl 2xl:text-3xl'>議題討論</h2>
                                    <ul className='mt-6 xl:text-xl 2xl:text-2xl'>
                                        <li className='my-4 '>議題投票</li>
                                        <li className='my-4 '>篩選流程</li>
                                    </ul>
                                </div>
                            </div> */}
                        <h2 className="w-full text-base text-gray-500 lg:text-right lg:text-xl">
                            &copy; 2022 Speakup開發團隊 版權所有
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
