import { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

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
                    onSide === 0 ? "bg-primary-700 underline-offset-1" : ""
                } items-center justify-center rounded-2xl`}
            >
                <p
                    className={`${
                        onSide === 0 ? "text-neutral-50" : "text-neutral-800"
                    } hover:border-primary-700 w-1/2 border-b-2 border-transparent text-sm leading-6 transition-colors duration-300`}
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
                    onSide === 1 ? "bg-primary-700 underline-offset-1" : ""
                } items-center justify-center rounded-2xl`}
            >
                <p
                    className={`${
                        onSide === 1 ? "text-neutral-50" : "text-neutral-800"
                    } hover:border-primary-700 border-b-2 border-transparent text-sm leading-6 transition-colors duration-300`}
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
                    onSide === 2 ? "bg-primary-700 underline-offset-1" : ""
                } items-center justify-center rounded-2xl`}
            >
                <p
                    className={`${
                        onSide === 2 ? "text-neutral-50" : "text-neutral-800"
                    } hover:border-primary-700 w-1/2 border-b-2 border-transparent text-sm leading-6 transition-colors duration-300`}
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
                        onSide === 0 ? "text-primary-800" : "text-neutral-400"
                    } hover:border-primary-700 w-1/3 border-b-2 border-transparent text-sm leading-6 transition-colors duration-300`}
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
                        onSide === 1 ? "text-primary-800" : "text-neutral-400"
                    } hover:border-primary-700 min-w-[33%] border-b-2 border-transparent text-sm leading-6 transition-colors duration-300`}
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
                        onSide === 2 ? "text-primary-800" : "text-neutral-400"
                    } hover:border-primary-700 w-1/3 border-b-2 border-transparent text-sm leading-6 transition-colors duration-300`}
                >
                    反對
                </p>
            </button>
        </div>
    );
};

const CommentSort = ({ changeSortMethod }) => {
    const [sortMethod, setSortMethod] = useState(0);

    return (
        <Menu as="div" className="relative inline-block justify-self-end text-left">
            <Menu.Button className="text-primary-800 justify-centera inline-flex w-full items-center rounded-3xl border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm shadow-sm hover:bg-gray-50">
                <p>留言排序方式</p>
                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-neutral-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${
                                        active ? "bg-gray-50 text-gray-900" : "text-gray-700"
                                    } w-full px-4 py-2 text-left text-sm`}
                                    onClick={() => {
                                        setSortMethod(1);
                                        changeSortMethod(1);
                                    }}
                                >
                                    依熱門度排序
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${
                                        active ? "bg-gray-50 text-gray-900" : "text-gray-700"
                                    } w-full px-4 py-2 text-left text-sm`}
                                    onClick={() => {
                                        setSortMethod(2);
                                        changeSortMethod(2);
                                    }}
                                >
                                    依時間排序
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${
                                        active ? "bg-gray-50 text-gray-900" : "text-gray-700"
                                    } w-full px-4 py-2 text-left text-sm`}
                                    onClick={() => {
                                        setSortMethod(3);
                                        changeSortMethod(3);
                                    }}
                                >
                                    依回覆數排序
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export { SideSelector, IntegratedSideSelector, CommentSort };
