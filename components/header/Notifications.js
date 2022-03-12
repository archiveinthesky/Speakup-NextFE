import { useState, useEffect, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BellIcon, ExclamationIcon } from '@heroicons/react/solid';

const NotificationButton = () => {
    const [notifications, setNotifications] = useState([]);
    const [newNotifications, setNewNotifications] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5500/notifications').then(async (response) => {
            let res = await response.json();
            setNotifications(res);
        });
    }, []);

    const readNotifications = () => {
        setNewNotifications([]);
    };

    const NotificationSlot = ({
        notifyType,
        notifyTitle,
        notifyMessage,
        notifyUnread,
    }) => {
        return (
            <div className="my-2 flex min-h-[3.5rem] w-full items-center justify-between pr-5">
                <div className="flex items-center justify-start gap-3 pr-2">
                    <div className="w-11 flex-shrink-0">
                        {notifyType === 'warn' && (
                            <ExclamationIcon className="text-yellow-400" />
                        )}
                        {notifyType === undefined && (
                            <BellIcon className="text-gray-400" />
                        )}
                    </div>
                    <div className="flex-grow-0 ">
                        <h3 className="text-base text-primary-800">
                            {notifyTitle}
                        </h3>
                        <p className="mt-1 text-sm text-neutral-600">
                            {notifyMessage}
                        </p>
                    </div>
                </div>
                {notifyUnread && (
                    <div className="h-2 w-2 flex-shrink-0 justify-self-end rounded-full bg-primary-500"></div>
                )}
            </div>
        );
    };

    return (
        <Menu as="div" className="relative z-10 inline-block text-left">
            <div className="h-9">
                <Menu.Button
                    className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden text-sm text-white shadow-sm hover:text-gray-100 focus:text-gray-100"
                    onClick={readNotifications}
                >
                    <BellIcon className="h-9 w-9 text-primary-50" />
                    {newNotifications.length > 0 && (
                        <>
                            <div className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-red-500"></div>
                            <div className="absolute top-0.5 right-0.5 h-2 w-2 animate-ping rounded-full bg-red-500"></div>
                        </>
                    )}
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
                <Menu.Items className="absolute -right-14 mt-2 max-h-[90vh] w-96 origin-top-right overflow-y-auto rounded-md bg-white pt-4 shadow-lg scrollbar-hide focus:outline-none md:right-0">
                    <h1 className="ml-[18px] text-xl text-primary-700">
                        您的通知
                    </h1>
                    <div className="flex flex-col gap-2 divide-y divide-primary-700 p-2">
                        {notifications.map((notification, i) => (
                            <Menu.Item key={i}>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700'
                                        } w-full px-4 py-2 text-left text-sm`}
                                    >
                                        <NotificationSlot
                                            notifyType={notification.type}
                                            notifyTitle={notification.title}
                                            notifyMessage={notification.message}
                                            notifyUnread={notification.unread}
                                        />
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default NotificationButton;
