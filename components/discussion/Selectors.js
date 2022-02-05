import { useState, Fragment } from "react";
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

const SideSelector = ({ changeSide }) => {
    const [onSide, setOnSide] = useState(1)

    return (
        <div className="hidden lg:flex w-72 h-10 bg-neutral-50 rounded-3xl justify-self-center items-center">
            <button onClick={() => { setOnSide(1); changeSide(1) }}
                className={`flex w-1/3 h-8 ${onSide === 1 ? 'bg-primary-700' : ''} rounded-2xl justify-center items-center`}>
                <p className={`${onSide === 1 ? 'text-neutral-50' : 'text-neutral-800'} w-1/2 border-b-2 transition-colors duration-300 border-transparent hover:border-primary-700 text-sm leading-6`}>支持</p>
            </button>
            <button onClick={() => { setOnSide(2); changeSide(2) }}
                className={`flex w-1/3 h-8 ${onSide === 2 ? 'bg-primary-700' : ''} rounded-2xl justify-center items-center`}>
                <p className={`${onSide === 2 ? 'text-neutral-50' : 'text-neutral-800'} border-b-2 transition-colors duration-300 border-transparent hover:border-primary-700 text-sm leading-6`}>不區分立場</p>
            </button>
            <button onClick={() => { setOnSide(3); changeSide(3) }}
                className={`flex w-1/3 h-8 ${onSide === 3 ? 'bg-primary-700' : ''} rounded-2xl justify-center items-center`}>
                <p className={`${onSide === 3 ? 'text-neutral-50' : 'text-neutral-800'} w-1/2 border-b-2 transition-colors duration-300 border-transparent hover:border-primary-700 text-sm leading-6`}>反對</p>
            </button>
        </div>
    )
}

const IntegratedSideSelector = ({ changeSide }) => {
    const [onSide, setOnSide] = useState(1)

    return (
        <div className="flex lg:hidden w-full h-10 bg-neutral-50 items-center">
            <button onClick={() => { setOnSide(1); changeSide(1) }}
                className={`flex w-1/3 h-8  rounded-2xl justify-center items-center`}>
                <p className={`${onSide === 1 ? 'text-primary-800' : 'text-neutral-400'} w-1/3 border-b-2 transition-colors duration-300 border-transparent hover:border-primary-700 text-sm leading-6`}>支持</p>
            </button>
            <button onClick={() => { setOnSide(2); changeSide(2) }}
                className={`flex w-1/3 h-8  rounded-2xl justify-center items-center`}>
                <p className={`${onSide === 2 ? 'text-primary-800' : 'text-neutral-400'} min-w-[33%] border-b-2 transition-colors duration-300 border-transparent hover:border-primary-700 text-sm leading-6`}>不區分立場</p>
            </button>
            <button onClick={() => { setOnSide(3); changeSide(3) }}
                className={`flex w-1/3 h-8  rounded-2xl justify-center items-center`}>
                <p className={`${onSide === 3 ? 'text-primary-800' : 'text-neutral-400'} w-1/3 border-b-2 transition-colors duration-300 border-transparent hover:border-primary-700 text-sm leading-6`}>反對</p>
            </button>
        </div>
    )
}

const CommentSort = ({ changeSortMethod }) => {
    const [sortMethod, setSortMethod] = useState(0)

    return (
        <Menu as="div" className="relative inline-block text-left justify-self-end z-10">
            <Menu.Button className="inline-flex justify-center w-full px-4 py-2 bg-neutral-50 hover:bg-gray-50 text-sm text-gray-700 rounded-md shadow-sm">
                <p>留言排序方式</p>
                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-neutral-50 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button className={`${active ? 'bg-gray-50 text-gray-900' : 'text-gray-700'} w-full text-left px-4 py-2 text-sm`}
                                    onClick={() => { setSortMethod(1); changeSortMethod(1) }}>依熱門度排序</button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button className={`${active ? 'bg-gray-50 text-gray-900' : 'text-gray-700'} w-full text-left px-4 py-2 text-sm`}
                                    onClick={() => { setSortMethod(2); changeSortMethod(2) }}>依時間排序</button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button className={`${active ? 'bg-gray-50 text-gray-900' : 'text-gray-700'} w-full text-left px-4 py-2 text-sm`}
                                    onClick={() => { setSortMethod(3); changeSortMethod(3) }}>依回覆數排序</button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )

}

export { SideSelector, IntegratedSideSelector, CommentSort };
