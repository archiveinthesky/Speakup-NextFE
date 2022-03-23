import { ChevronDownIcon, SearchCircleIcon } from '@heroicons/react/outline';
import { useState, useEffect } from 'react';

import Header from '../../components/header/Header';
import Footbar from '../../components/navbar/Footbar';
import Sidebar from '../../components/navbar/Sidebar';
import NavCard from '../../components/navigation/NavCard';
import HomeNavCard from '../../components/navigation/HomeNavCard';
import Link from 'next/link';

const UserHome = ({ data }) => {
    const [homeVer, setHomeVer] = useState('mob');

    useEffect(() => {
        function updateScreen() {
            setHomeVer(window.innerWidth <= 1280 ? 'mob' : 'des');
        }
        updateScreen();
        window.onresize = updateScreen;
        return () => {
            window.onresize = null;
        };
    });

    if (homeVer === 'mob') {
        return (
            <div className=" fixed top-0 left-0 h-screen w-screen bg-white">
                <Footbar />
                <div className="absolute top-0 left-0 right-0 h-[30vh] min-h-[208px] bg-primary-600 pt-12">
                    <img className="mx-auto w-20" src="/mic.png" />
                    <h1 className="mt-4 text-center text-2xl text-white">
                        歡迎回來Speakup
                    </h1>
                </div>
                <div className="mt-[calc(max(30vh,208px))] mb-16 flex h-[calc(100vh-max(30vh,208px)-64px)] w-full flex-col gap-4 overflow-y-scroll px-12">
                    <h2 className="pt-6 text-xl">{data.tracks[0].name}</h2>
                    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
                        {data.tracks[0].cards.map((card, i) => (
                            <HomeNavCard key={i} cardContent={card} />
                        ))}
                    </div>
                    <Link
                        href={`/search/results?searchterm=${data.tracks[0].name}`}
                    >
                        <div className="cursor-pointer text-center">
                            <p>探索更多</p>
                            <ChevronDownIcon className=" mx-auto w-6" />
                        </div>
                    </Link>
                    <div className="h-16"></div>
                </div>
            </div>
        );
    } else if (homeVer === 'des') {
        return (
            <div className="fixed top-0 left-0 h-screen w-screen bg-neutral-100">
                <Header />
                <Sidebar />
                <div className="ml-64 mt-16 pl-20 pt-16">
                    <h1 className="text-4xl text-primary-700">
                        {data.user} 歡迎回來Speakup!
                    </h1>
                    <div className="mt-6 flex w-full flex-col gap-9">
                        {data.tracks.map((track, i) => (
                            <div key={i}>
                                <h2 className="text-2xl text-primary-700">
                                    {track.name}
                                </h2>
                                <div className="flex ">
                                    <div className="3 mt-6 flex gap-9 overflow-x-auto pb-3.5 scrollbar-thin scrollbar-track-neutral-100 scrollbar-thumb-neutral-500">
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
                                            href={`/search/results?searchterm=#${track.name}`}
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

export async function getServerSideProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/home`);
    const data = await res.json();

    return { props: { data } };
}
