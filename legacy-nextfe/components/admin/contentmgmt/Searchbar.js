import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
    MultiSelect,
    Select,
    Autocomplete,
    SegmentedControl,
} from '@mantine/core';
import { SearchIcon } from '@heroicons/react/outline';

const Searchbar = ({ submitSearch }) => {
    const [screenSize, setScreenSize] = useState('mob');
    const [searchText, setSearchText] = useState('');
    const [searchTags, setSearchTags] = useState([]);
    const [searchSort, setSearchSort] = useState('');

    //prettier-ignore
    const tags = ['娛樂', '環境', '司法', '國家發展', '經濟', '少數族群', '媒體', '醫藥', '道德', '政治', '教育', '家庭', '女性', '自由', '宗教', '科技', '社會政策', '社會運動', '體育'];

    const mobData =
        searchText.trim().length > 0 &&
        searchText.charAt(searchText.length - 1) === '#'
            ? tags.map((tag) => searchText + tag)
            : [];

    const resetSearch = () => {
        setSearchText('');
        setSearchTags([]);
        setSearchSort('');
    };

    useEffect(() => {
        const updateScreen = () => {
            if (window.innerWidth > 1024) {
                if (screenSize !== 'des') resetSearch();
                setScreenSize('des');
            } else {
                if (screenSize !== 'mob') resetSearch();
                setScreenSize('mob');
            }
        };
        window.onresize = updateScreen;
        updateScreen();
        return () => {
            window.onresize = undefined;
        };
    }, []);

    const onSubmit = () => {
        if (searchText !== '' || searchTags.length > 0 || searchSort !== '') {
            submitSearch(searchText, searchTags, searchSort);
            resetSearch();
        }
    };

    if (screenSize === 'mob')
        return (
            <div className="w-full bg-white px-2 py-2">
                <h3 className="my-2 pl-2 text-xl text-neutral-800">
                    使用者議題管理
                </h3>
                <Autocomplete
                    classNames={{
                        defaultVariant: ' rounded-3xl outline-none w-full px-4',
                    }}
                    data={mobData}
                    value={searchText}
                    onChange={setSearchText}
                    placeholder="輸入關鍵字或是#標籤"
                />
                <div className="mt-2 flex justify-around gap-6 pr-3">
                    <SegmentedControl
                        classNames={{
                            root: 'bg-white w-5/6',
                            labelActive: 'rounded-2xl',
                            active: 'bg-primary-500 rounded-2xl',
                        }}
                        data={['新→舊', '舊→新', '熱門度']}
                        value={searchSort}
                        onChange={setSearchSort}
                    />
                    <button onClick={onSubmit}>
                        <SearchIcon className=" h-6 w-6 flex-shrink-0 text-primary-700" />
                    </button>
                </div>
            </div>
        );
    else
        return (
            <div className="flex h-12 w-full items-center justify-between gap-4 rounded-3xl bg-white px-8 text-neutral-500">
                <input
                    className=" h-6 w-[50%] text-lg focus:outline-none"
                    placeholder="輸入想搜尋的關鍵字"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <MultiSelect
                    className="w-[25%]"
                    data={tags}
                    value={searchTags}
                    onChange={setSearchTags}
                    placeholder="選擇議題標籤"
                    searchable
                    nothingFound="無符合描述的標籤"
                />
                <Select
                    className="h-10 w-[25%]"
                    classNames={{ defaultVariant: 'h-10' }}
                    data={['從新到舊排序', '從舊到新排序', '依熱門度排序']}
                    value={searchSort}
                    onChange={setSearchSort}
                    placeholder="排序方式"
                />
                <button onClick={onSubmit}>
                    <SearchIcon className=" h-6 w-6 flex-shrink-0 text-primary-700" />
                </button>
            </div>
        );
};

export default Searchbar;
