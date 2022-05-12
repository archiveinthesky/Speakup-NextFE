import React, { useState } from 'react';
import Header from '../../../../components/navbar/Header';
import AdminSidebar from '../../../../components/navbar/AdminSidebar';
import ArticleViewer from '../../../../components/admin/contentmgmt/ArticleViewer';
import ArticleEditor from '../../../../components/admin/contentmgmt/ArticleEditor';

const ContentPage = () => {
    const template = {
        title: '',
        tags: [],
        brief: '',
        supContent: '',
        agnContent: '',
        refLinks: [''],
        status: {},
    };

    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-neutral-100">
            <Header />
            <AdminSidebar />
            <div className="mt-14 h-[calc(100vh-56px)] overflow-y-auto pb-8 lg:mt-16 lg:ml-56 lg:h-[calc(100vh-64px)] lg:px-16 lg:pb-24 lg:pt-16 xl:ml-64 xl:px-20">
                <div className="mx-auto max-w-5xl">
                    <h1 className="hidden text-4xl text-primary-800 lg:block">
                        編輯議題
                    </h1>
                    <ArticleEditor
                        data={template}
                        submitChanges={(newdata) => {}}
                        discardChanges={() => {
                            window.location.href = '/admin/manage/content';
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ContentPage;
