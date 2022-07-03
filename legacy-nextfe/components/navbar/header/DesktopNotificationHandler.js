import React, { useState, useEffect } from 'react';
import { BellIcon } from '@heroicons/react/outline';
import { BellIcon as BellIconSolid } from '@heroicons/react/solid';
import { Modal, Popover } from '@mantine/core';
import NotificationScroller from './NotificationScroller';

const DesktopNotifications = () => {
    const [showPopover, setShowPopover] = useState(false);
    const [screenSize, setScreenSize] = useState('des');

    useEffect(() => {
        const updateScreen = () => {
            if (window.innerWidth < 1024) setScreenSize('mob');
            else setScreenSize('des');
        };
        updateScreen();
        window.addEventListener('resize', updateScreen);
        return () => {
            window.removeEventListener('resize', updateScreen);
        };
    }, []);

    if (screenSize === 'des')
        return (
            <div className="h-9 w-9">
                <Popover
                    title="您的通知"
                    classNames={{ title: 'text-xl' }}
                    opened={showPopover}
                    onClose={() => {
                        setShowPopover(false);
                    }}
                    target={
                        <button
                            onClick={() => {
                                setShowPopover(!showPopover);
                            }}
                        >
                            <BellIconSolid className="h-9 w-9 text-white" />
                        </button>
                    }
                    width={384}
                    position="bottom"
                    placement="end"
                >
                    <NotificationScroller />
                </Popover>
            </div>
        );
    return <div></div>;
};

export default DesktopNotifications;
