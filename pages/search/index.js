import { useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import Header from '../../components/header/Header';
import Sidebar from '../../components/navbar/Sidebar';
import Footbar from '../../components/navbar/Footbar';

const SearchMenu = () => {
    const navigate = {};
    const [searchText, setSearchText] = useState('');

    //prettier-ignore
    const tags = [
        '娛樂','環境','司法','國家發展','經濟','少數族群','媒體','醫藥','道德','政治','教育','家庭','女性','自由','宗教','科技','社會政策','社會運動','體育',
    ];

    const formSubmit = (e) => {
        e.preventDefault();

        if (searchText !== '') {
            window.location.href = `/search/results?searchterm=${searchText}`;
        }
    };

    return (
        <div className="fixed left-0 top-0 h-screen w-screen bg-neutral-50">
            <Header />
            <Sidebar />
            <Footbar />
            <div className=" mx-auto mt-14 max-w-3xl bg-gray-50 px-3 py-5 md:mt-[20vh]">
                <form
                    className="flex h-8 items-center lg:h-14"
                    onSubmit={formSubmit}
                >
                    <input
                        className="mr-4 h-full flex-grow rounded-lg border-[0.5px] border-gray-700 px-4 text-sm focus:outline-none lg:rounded-3xl lg:text-xl"
                        placeholder="搜尋議題名字或是#標籤"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                    <button className="h-7 w-7" type="submit">
                        <SearchIcon className="h-full w-full" />
                    </button>
                </form>
                <div className="mx-auto my-3 w-11/12">
                    <h2 className="my-3 text-xl text-neutral-800 lg:my-4 lg:text-3xl">
                        熱門標籤
                    </h2>
                    <div className="flex flex-wrap gap-x-4 gap-y-3">
                        {tags.map((tag, i) => (
                            <button
                                key={i}
                                className="rounded-3xl bg-neutral-100 px-4 py-2 text-neutral-800"
                                onClick={() => {
                                    window.location.href = `/search/results?searchterm=#${tag}`;
                                }}
                            >
                                <p className="my-auto text-sm lg:text-lg">
                                    {tag}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchMenu;
