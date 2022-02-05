import { useState, useEffect, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BellIcon, ExclamationIcon } from '@heroicons/react/solid'

const NotificationButton = () => {
    const [notifications, setNotifications] = useState([])
    const [newNotifications, setNewNotifications] = useState([])

    useEffect(() => {
        setNotifications([{
            type: "warn",
            message: "您的留言已被撤除"
        }, {
            message: "您的留言已被撤除"
        }, {
            message: "您的留言已被撤除"
        }, {
            message: "您的留言已被撤除"
        }, {
            message: "您的留言已被撤除"
        }, {
            message: "您的留言已被撤除"
        }])
    }, [])

    const readNotifications = () => {
        setNewNotifications([])
    }

    const NotificationSlot = ({ notifyType, notifyMessage }) => {
        return (
            <div className='w-full min-h-[2.25rem] flex justify-start items-center gap-2'>
                <div className='w-8 h-8 flex-shrink-0'>
                    {(notifyType === "warn") && <ExclamationIcon className='text-yellow-400' />}
                    {(notifyType === undefined) && <BellIcon className='text-gray-400' />}
                </div>
                <p className='flex-grow-0 text-base'>{notifyMessage}</p>
            </div>
        )
    }


    return (
        <Menu as="div" className="relative inline-block text-left z-10">
            <div className='h-9'>
                <Menu.Button className="relative inline-flex justify-center items-center w-9 h-9 shadow-sm text-sm overflow-hidden text-white hover:text-gray-100 focus:text-gray-100" onClick={readNotifications}>
                    <BellIcon className='w-9 h-9 text-primary-50' />
                    {newNotifications.length > 0 && <>
                        <div className='absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-red-500'></div>
                        <div className='absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-red-500 animate-ping'></div>
                    </>}
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
                <Menu.Items className="origin-top-right absolute -right-14 md:right-0 mt-2 w-72 md:w-80 max-h-[90vh] overflow-y-auto scrollbar-hide rounded-md shadow-lg bg-neutral-50 focus:outline-none">
                    <h1 className='px-4 mt-3 text-2xl'>您的通知</h1>
                    <div className="flex py-2 flex-col gap-2 ">
                        {notifications.map((notification, i) =>
                            <Menu.Item key={i}>
                                {({ active }) =>
                                    <button className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} w-full px-4 py-2 text-sm text-left`}>
                                        <NotificationSlot notifyType={notification.type} notifyMessage={notification.message} />
                                    </button>
                                }
                            </Menu.Item>
                        )}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default NotificationButton