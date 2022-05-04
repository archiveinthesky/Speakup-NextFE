import React from 'react';
import Searchbar from '../../../components/admin/contentmgmt/Searchbar.js';
import Header from '../../../components/header/Header.js';
import AdminSidebar from '../../../components/navbar/AdminSidebar.js';

const ContentManager = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-neutral-100">
            <Header />
            <AdminSidebar />
            <div className="mt-14 lg:mt-16 lg:ml-64 lg:w-auto lg:pt-16 lg:pl-20">
                <h1 className="hidden text-4xl text-primary-800 lg:block">
                    使用者內容管理介面
                </h1>
                <div className="w-full lg:mt-4 lg:pr-20">
                    <Searchbar />
                </div>
            </div>
        </div>
    );
};

export default ContentManager;
