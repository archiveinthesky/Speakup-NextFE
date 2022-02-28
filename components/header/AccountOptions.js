import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
    UserCircleIcon,
    CogIcon,
    InformationCircleIcon,
    LogoutIcon,
} from '@heroicons/react/outline';

const AccountOptions = () => {
    const logout = () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout/`, {
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem('AuthToken'),
            },
        }).then((response) => {
            if (response.status === 204) {
                localStorage.removeItem('AuthToken');
                window.location.href = '/';
            }
        });
    };

    return (
        <Menu as="div" className="relative z-10 inline-block text-left">
            <div className="h-9">
                <Menu.Button className="inline-flex h-9 w-9 justify-center overflow-hidden rounded-full text-sm text-gray-700 shadow-sm ">
                    <UserCircleIcon className="h-9 w-9 text-primary-50" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1 ">
                        <div className="flex items-center gap-2 px-4 py-2">
                            <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                                <UserCircleIcon className="h-10 w-10" />
                            </div>
                            <p className="text-lg">Andrew Kuo</p>
                        </div>

                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`w-full ${
                                        active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700'
                                    } flex items-center gap-3 px-4 py-2 text-left text-sm`}
                                >
                                    <CogIcon className="h-7 w-7" />
                                    <p className=" text-base">設定</p>
                                </button>
                            )}
                        </Menu.Item>

                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`w-full ${
                                        active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700'
                                    } flex items-center gap-3 px-4 py-2 text-left text-sm`}
                                >
                                    <InformationCircleIcon className="h-7 w-7" />
                                    <p className=" text-base">幫助</p>
                                </button>
                            )}
                        </Menu.Item>

                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`w-full ${
                                        active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700'
                                    } flex items-center gap-3 px-4 py-2 text-left text-sm`}
                                    onClick={logout}
                                >
                                    <LogoutIcon className="h-7 w-7" />
                                    <p className=" text-base">登出</p>
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default AccountOptions;
