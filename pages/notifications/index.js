import { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import Footbar from '../../components/navbar/Footbar';
import { NotificationSlot } from '../../components/header/Notifications';

const NotificationMenu = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (window.innerWidth > 1024) {
            window.location.replace('/home');
        }
        fetch('http://localhost:5500/notifications').then(async (response) => {
            let res = await response.json();
            setNotifications(res);
        });
    }, []);

    return (
        <div className="h-screen w-screen overflow-x-hidden bg-neutral-100 scrollbar-hide">
            <Header />
            <Footbar />
            <div className=" mx-11 mt-24 md:mx-20 md:mt-32 md:mb-24">
                <h2 className="text-2xl text-primary-700 md:text-3xl">
                    您的通知
                </h2>
                <div className="mt-4 flex flex-col gap-2 divide-y divide-primary-700">
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
