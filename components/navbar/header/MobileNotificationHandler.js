import React, { useState, useEffect } from 'react';
import { BellIcon } from '@heroicons/react/outline';
import { BellIcon as BellIconSolid } from '@heroicons/react/solid';
import { Modal, Popover } from '@mantine/core';
import NotificationScroller from './NotificationScroller';

const MobileNotifications = () => {
    const [showModal, setShowModal] = useState(false);
    const [screenSize, setScreenSize] = useState('mob');

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

    if (screenSize === 'mob') {
        return (
            <div className="lg:hidden">
                <button
                    onClick={() => {
                        setShowModal(true);
                    }}
                >
                    {showModal ? (
                        <BellIconSolid className="h-8 w-8" />
                    ) : (
                        <BellIcon className="h-8 w-8" />
                    )}
                </button>
                <Modal
                    title="您的通知"
                    opened={showModal}
                    onClose={() => {
                        setShowModal(false);
                    }}
                    overflow="inside"
                >
                    <NotificationScroller />
                </Modal>
            </div>
        );
    }
    return <div></div>;
};

export default MobileNotifications;
