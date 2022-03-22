import { SearchCircleIcon } from '@heroicons/react/outline';
import { useState, useEffect } from 'react';

import Header from '../../components/header/Header';
import Footbar from '../../components/navbar/Footbar';
import Sidebar from '../../components/navbar/Sidebar';
import HomeNavCard from '../../components/navigation/HomeNavCard';

const UserHome = ({ data }) => {
    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-neutral-100">
            <Header />
            <Sidebar />
            <Footbar />
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
                                <div className="mt-6 flex gap-9 overflow-x-scroll pb-2">
                                    {track.cards.map((card, i) => (
                                        <div
                                            className="w-96 flex-shrink-0 "
                                            key={i}
                                        >
                                            <HomeNavCard cardContent={card} />
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
};

export default UserHome;

export async function getServerSideProps() {
    const res = await fetch('http://localhost:5500/home');
    const data = await res.json();

    return { props: { data } };
}
