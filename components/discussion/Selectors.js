import React from 'react';
import { useState, Fragment } from 'react';
// import { Menu, Transition } from '@headlessui/react';
import { Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ChevronDownIcon } from '@heroicons/react/solid';

const SideSelector = ({ changeSide }) => {
    const [onSide, setOnSide] = useState(1);

    return (
        <div className="hidden h-10 w-72 items-center justify-self-center rounded-3xl bg-neutral-50 px-2 lg:flex">
            <button
                onClick={() => {
                    setOnSide(0);
                    changeSide(0);
                }}
                className={`flex h-8 w-1/3 ${
                    onSide === 0 ? 'bg-primary-700 underline-offset-1' : ''
                } items-center justify-center rounded-2xl`}
            >
                <p
                    className={`${
                        onSide === 0 ? 'text-neutral-50' : 'text-neutral-800'
                    } w-1/2 border-b-2 border-transparent text-sm leading-6 transition-colors duration-300 hover:border-primary-700`}
                >
                    支持
                </p>
            </button>
            <button
                onClick={() => {
                    setOnSide(1);
                    changeSide(1);
                }}
                className={`flex h-8 w-1/3 ${
                    onSide === 1 ? 'bg-primary-700 underline-offset-1' : ''
                } items-center justify-center rounded-2xl`}
            >
                <p
                    className={`${
                        onSide === 1 ? 'text-neutral-50' : 'text-neutral-800'
                    } border-b-2 border-transparent text-sm leading-6 transition-colors duration-300 hover:border-primary-700`}
                >
                    不區分立場
                </p>
            </button>
            <button
                onClick={() => {
                    setOnSide(2);
                    changeSide(2);
                }}
                className={`flex h-8 w-1/3 ${
                    onSide === 2 ? 'bg-primary-700 underline-offset-1' : ''
                } items-center justify-center rounded-2xl`}
            >
                <p
                    className={`${
                        onSide === 2 ? 'text-neutral-50' : 'text-neutral-800'
                    } w-1/2 border-b-2 border-transparent text-sm leading-6 transition-colors duration-300 hover:border-primary-700`}
                >
                    反對
                </p>
            </button>
        </div>
    );
};

const IntegratedSideSelector = ({ changeSide }) => {
    const [onSide, setOnSide] = useState(1);

    return (
        <div className="flex h-10 w-full items-center bg-neutral-50 lg:hidden">
            <button
                onClick={() => {
                    setOnSide(0);
                    changeSide(0);
                }}
                className={`flex h-8 w-1/3  items-center justify-center rounded-2xl`}
            >
                <p
                    className={`${
                        onSide === 0 ? 'text-primary-800' : 'text-neutral-400'
                    } w-1/3 border-b-2 border-transparent text-sm leading-6 transition-colors duration-300 hover:border-primary-700`}
                >
                    支持
                </p>
            </button>
            <button
                onClick={() => {
                    setOnSide(1);
                    changeSide(1);
                }}
                className={`flex h-8 w-1/3  items-center justify-center rounded-2xl`}
            >
                <p
                    className={`${
                        onSide === 1 ? 'text-primary-800' : 'text-neutral-400'
                    } min-w-[33%] border-b-2 border-transparent text-sm leading-6 transition-colors duration-300 hover:border-primary-700`}
                >
                    不區分立場
                </p>
            </button>
            <button
                onClick={() => {
                    setOnSide(2);
                    changeSide(2);
                }}
                className={`flex h-8 w-1/3  items-center justify-center rounded-2xl`}
            >
                <p
                    className={`${
                        onSide === 2 ? 'text-primary-800' : 'text-neutral-400'
                    } w-1/3 border-b-2 border-transparent text-sm leading-6 transition-colors duration-300 hover:border-primary-700`}
                >
                    反對
                </p>
            </button>
        </div>
    );
};

const CommentSort = ({ changeSortMethod }) => {
    const [sortMethod, setSortMethod] = useState(1);

    return (
        <Menu
            control={
                <div className="inline-flex w-full items-center justify-center rounded-3xl border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-primary-800 hover:bg-gray-50">
                    <p>{`依${
                        ['熱門度', '時間', '回覆數'][sortMethod - 1]
                    }排序`}</p>
                    <ChevronDownIcon
                        className="-mr-1 ml-2 h-5 w-5"
                        aria-hidden="true"
                    />
                </div>
            }
            className="relative inline-block justify-self-end text-left text-primary-800"
            position="bottom"
        >
            <Menu.Item
                onClick={() => {
                    setSortMethod(1);
                    changeSortMethod(1);
                }}
            >
                依熱門度排序
            </Menu.Item>
            <Menu.Item
                onClick={() => {
                    setSortMethod(2);
                    changeSortMethod(2);
                }}
            >
                依時間排序
            </Menu.Item>
            <Menu.Item
                onClick={() => {
                    setSortMethod(3);
                    changeSortMethod(3);
                }}
            >
                依回覆數排序
            </Menu.Item>
        </Menu>
    );
};

export { SideSelector, IntegratedSideSelector, CommentSort };
