import React from 'react';

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

const NotificationScroller = () => {
    return (
        <div className="my-2 w-full">
            <p>您目前沒有通知</p>
        </div>
    );
};

export default NotificationScroller;
