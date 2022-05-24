import React from 'react';
import { ChevronDownIcon, SearchCircleIcon } from '@heroicons/react/outline';
import { useState, useEffect } from 'react';

import Header from '../../components/navbar/Header';
import Footbar from '../../components/navbar/Footbar';
import Sidebar from '../../components/navbar/Sidebar';
import HomeNavCard from '../../components/navigation/HomeNavCard';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { showNotification } from '@mantine/notifications';
import Head from 'next/head';

const UserHome = ({}) => {
    const [homeVer, setHomeVer] = useState('mob');
    const [errDisplayed, setErrDisplayed] = useState(false);

    const { data, error, isLoading } = useQuery(
        'home',
        () => {
            let response = fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/home`,
                {
                    headers: {
                        Authorization: localStorage.getItem('AuthToken'),
                    },
                }
            );

            if (!response.ok) throw new Error('Fetch failed');
            return response.json();
        },
        { refetchOnWindowFocus: false }
    );

    useEffect(() => {
        if (!errDisplayed && error) {
            showNotification({
                title: '資料獲取失敗',
                message: '請重新整理頁面',
                color: 'red',
                disallowClose: true,
                autoClose: false,
            });
            setErrDisplayed(true);
        }
    }, [error]);

    useEffect(() => {
        function updateScreen() {
            setHomeVer(window.innerWidth <= 1280 ? 'mob' : 'des');
        }
        updateScreen();
        window.onresize = updateScreen;
        return () => {
            window.onresize = null;
        };
    }, []);

    console.log(isLoading);

    if (error) {
        return (
            <div
                className={`fixed top-0 left-0 h-screen w-screen ${
                    homeVer === 'mob' ? 'bg-neutral-50' : 'bg-neutral-100'
                } `}
            >
                <Header />
                <Sidebar />
                <Footbar />
            </div>
        );
    } else if (homeVer === 'mob') {
        if (isLoading)
            return (
                <div className="fixed top-0 left-0 flex h-screen w-screen justify-center bg-neutral-50">
                    <Header />
                    <Footbar />
                    <div className="mt-28">
                        <div className="h-36 w-96 animate-pulse rounded-xl bg-neutral-200" />
                        <div className="mt-6 h-36 w-96 animate-pulse rounded-xl bg-neutral-200" />
                    </div>
                </div>
            );
        return (
            <div className="fixed top-0 left-0 h-screen w-screen bg-neutral-50">
                <Footbar />
                <div className="absolute top-0 left-0 right-0 h-[30vh] min-h-[208px] bg-primary-600 pt-12">
                    <img className="mx-auto w-20" src="/logo-mic.svg" />
                    <h1 className="mt-4 text-center text-2xl text-white">
                        歡迎回來Speakup
                    </h1>
                </div>
                <div className="mt-[calc(max(30vh,208px))] mb-16 flex h-[calc(100vh-max(30vh,208px)-64px)] w-full flex-col gap-4 overflow-y-scroll px-12">
                    <h2 className="pt-6 text-xl">{data.tracks[0].name}</h2>
                    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
                        {data.tracks[0].cards?.map((card, i) => (
                            <HomeNavCard key={i} cardContent={card} />
                        ))}
                    </div>
                    <Link
                        href={`/search/results?searchterm=${data.tracks[0].title}`}
                    >
                        <div className="cursor-pointer text-center text-primary-900">
                            <p>探索更多</p>
                            <ChevronDownIcon className=" mx-auto w-6" />
                        </div>
                    </Link>
                    <div className="h-16"></div>
                </div>
            </div>
        );
    } else if (homeVer === 'des') {
        if (isLoading) {
            console.log('Screw you');
            return (
                <div className="fixed top-0 left-0 h-screen w-screen bg-neutral-100">
                    <Header />
                    <Sidebar />
                    <div className="ml-64 mt-16 pl-20 pt-16">
                        <h1 className="text-4xl text-primary-800">
                            歡迎回來Speakup
                        </h1>
                        <div className="mt-12 flex gap-8">
                            <div className="h-36 w-96 animate-pulse rounded-xl bg-neutral-200" />
                            <div className="h-36 w-96 animate-pulse rounded-xl bg-neutral-200" />
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="fixed top-0 left-0 h-screen w-screen bg-neutral-100">
                <Header />
                <Sidebar />
                <div className="ml-64 mt-16 pl-20 pt-16">
                    <h1 className="text-4xl text-primary-800">
                        {data.user} 歡迎回來Speakup!
                    </h1>
                    <div className="mt-6 flex w-full flex-col gap-9">
                        {data.tracks.map((track, i) => (
                            <div key={i}>
                                <h2 className="text-2xl text-primary-800">
                                    {track.name}
                                </h2>
                                <div className="flex ">
                                    <div className="mt-6 flex gap-9 overflow-x-auto pb-3.5 scrollbar-thin scrollbar-track-neutral-100 scrollbar-thumb-neutral-500">
                                        {track.cards.map((card, i) => (
                                            <div
                                                className="w-96 flex-shrink-0 "
                                                key={i}
                                            >
                                                <HomeNavCard
                                                    cardContent={card}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex w-20 flex-shrink-0 items-center justify-center">
                                        <a
                                            href={`/search/results?searchterm=@${track.title}`}
                                            className=" w-10 rounded-full text-primary-700"
                                        >
                                            <SearchCircleIcon />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default UserHome;

// export async function getServerSideProps() {
//     const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/home`
//     );
//     const data = await res.json();

//     return { props: { data } };
// }
