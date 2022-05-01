import React from 'react';
import {
    CogIcon,
    BellIcon,
    InformationCircleIcon,
} from '@heroicons/react/outline';

const SettingsSidebar = () => {
    return (
        <div className="fixed top-14 left-0 hidden h-[calc(100vh-56px)] w-64 flex-shrink-0 flex-col rounded-r-[32px] border-nu-blue-800 bg-white transition-width duration-500 ease-out overflow-x-hidden lg:flex">
            <div className="h-6" />
            <div className="w-full">
                <ul className="mx-auto px-7 text-pm-blue-900">
                    <li>
                        <p className="whitespace-nowrap text-xl leading-8 text-pm-blue-900">
                            Speakup設定
                        </p>
                    </li>
                    <hr className=" my-4" />
                    <li className="flex cursor-pointer list-none gap-4 py-3">
                        <CogIcon className="w-7 flex-shrink-0" />
                        <p className="whitespace-nowrap text-lg leading-8 text-pm-blue-900">
                            基本資料
                        </p>
                    </li>

                    <li className="flex cursor-pointer list-none gap-4 py-3">
                        <BellIcon className="w-7 flex-shrink-0" />
                        <p className="whitespace-nowrap text-lg leading-8 text-pm-blue-900">
                            通知設定
                        </p>
                    </li>

                    <li className="flex cursor-pointer list-none gap-4 py-3">
                        <InformationCircleIcon className="w-7 flex-shrink-0" />
                        <p className=" whitespace-nowrap text-lg leading-8 text-pm-blue-900">
                            平台協助
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SettingsSidebar;
