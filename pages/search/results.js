import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Header from '../../components/header/Header';
import Sidebar from '../../components/navbar/Sidebar';
import Footbar from '../../components/navbar/Footbar';
import NavCard from '../../components/navigation/NavCard';
import Pagebar from '../../components/navbar/Pagebar';

const SearchResults = ({ discussionContent }) => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [maxPage, setMaxPage] = useState(1);
    const [onPage, setOnPage] = useState(1);

    useEffect(() => {
        if (!localStorage.getItem('AuthToken')) {
            window.location.href = '/login';
        }
    }, []);

    useEffect(() => {
        if (router.isReady) {
            if (router.query.searchterm === undefined) {
                window.location.href = '/search';
            }
            setSearchTerm(router.query.searchterm);
            console.log(router.query);
            if (router.query.onpage !== undefined) {
                setOnPage(router.query.onpage);
                console.log(onPage);
            } else console.log(router.query);
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/search`, {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('AuthToken'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    searchterm: router.query.searchterm,
                }),
            }).then(async (response) => {
                let res = await response.json();
                console.log(res);
                setSearchResults(res.results);
                setMaxPage(res.pages);
            });
        }
    }, [router.query]);

    return (
        <div className="bg-nu-blue-100 fixed top-0 left-0 h-screen w-screen scrollbar-hide overflow-x-hidden">
            <Header />
            <Sidebar retractable={false} />
            <Footbar />
            <div className="flex h-screen w-full flex-col items-center pt-14 lg:ml-64 lg:w-[calc(100%-16rem)]">
                <div className="mt-10 w-[calc(100%-56px)] max-w-3xl md:mt-16 md:w-[calc(100%-160px)] ">
                    <h1 className="text-pm-blue-700 text-2xl md:text-3xl">
                        {maxPage > 0
                            ? `以下為${searchTerm}的搜尋結果`
                            : `很抱歉，我們找不到符合${searchTerm}的結果`}
                    </h1>
                    <div className="mt-8 flex flex-col gap-6">
                        {searchResults.map((cardContent, i) => (
                            <NavCard key={i} cardContent={cardContent} />
                        ))}
                    </div>
                </div>
                <div className="h-16 flex-shrink-0"></div>
                <Pagebar
                    maxPage={maxPage}
                    url={(id) => {
                        return `/search/results?searchterm=${searchTerm}&onpage=${id}`;
                    }}
                    selected={onPage}
                />
                <div className="mt-16 h-1 w-1 flex-shrink-0" />
            </div>
        </div>
    );
};

export default SearchResults;
