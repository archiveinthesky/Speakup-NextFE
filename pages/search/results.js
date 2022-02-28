import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Header from '../../components/header/Header';
import Sidebar from '../../components/navbar/Sidebar';
import Footbar from '../../components/navbar/Footbar';
import WideNavCard from '../../components/navcards/NavCard';
import Pagebar from '../../components/navbar/Pagebar';

const SearchResults = ({ discussionContent }) => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [maxPage, setMaxPage] = useState(1);
    const [onPage, setOnPage] = useState(1);

    useEffect(() => {
        if (router.isReady) {
            if (router.query.searchterm === undefined) {
                window.location.href = '/search';
            }
            setSearchTerm(router.query.searchterm);
            if (router.query.onpage !== undefined) {
                setOnPage(router.query.onpage);
                console.log(onPage);
            } else console.log(router.query);
            fetch('http://localhost:5500/searchresults').then(
                async (response) => {
                    let res = await response.json();
                    setSearchResults(res.results);
                    setMaxPage(res.pages);
                }
            );
        }
    }, [router.query]);

    return (
        <div className="h-screen w-screen overflow-x-hidden bg-neutral-100 scrollbar-hide">
            <Header />
            <Sidebar retractable={false} />
            <Footbar />
            <div className="flex h-screen w-full flex-col items-center pt-14 lg:ml-64 lg:w-[calc(100%-16rem)]">
                <div className="mt-16 w-[calc(100%-96px)] max-w-3xl md:w-[calc(100%-160px)] ">
                    <h1 className="text-3xl text-primary-700">
                        以下為{searchTerm}的搜尋結果
                    </h1>
                    <div className="mt-8 flex flex-col gap-6">
                        {searchResults.map((cardContent, i) => (
                            <WideNavCard key={i} cardContent={cardContent} />
                        ))}
                    </div>
                </div>
                <div className="h-16"></div>
                <Pagebar
                    maxPage={maxPage}
                    url={(id) => {
                        return `/search/results?searchterm=${searchTerm}&onpage=${id}`;
                    }}
                    selected={onPage}
                />
            </div>
        </div>
    );
};

export default SearchResults;
