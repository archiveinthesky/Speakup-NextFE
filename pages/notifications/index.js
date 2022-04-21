import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import Footbar from '../../components/navbar/Footbar';
import { NotificationSlot } from '../../components/header/Notifications';

const NotificationMenu = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem('AuthToken')) {
            window.location.href = '/login';
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth > 1024) {
            window.location.replace('/home');
        }
        // fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications`).then(
        //     async (response) => {
        //         let res = await response.json();
        //         setNotifications(res);
        //     }
        // );
    }, []);

    return (
        <div className="bg-nu-blue-100 fixed top-0 left-0 h-screen w-screen scrollbar-hide overflow-x-hidden">
            <Header />
            <Footbar />
            <div className=" mx-6 mt-20 bg-white px-5 pt-6 md:mx-20 md:mt-32 md:mb-2">
                <h2 className="text-pm-blue-700 text-2xl md:text-3xl">
                    您的通知
                </h2>
                <div className="divide-pm-blue-700 mt-4 flex flex-col gap-2 divide-y">
                    {notifications.map((notification, i) => (
                        <button
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            key={i}
                        >
                            <NotificationSlot
                                notifyType={notification.type}
                                notifyTitle={notification.title}
                                notifyMessage={notification.message}
                                notifyUnread={notification.unread}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotificationMenu;
