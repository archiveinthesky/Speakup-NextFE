import React, { useState } from 'react';
import Header from '../../../../components/navbar/Header';
import AdminSidebar from '../../../../components/navbar/AdminSidebar';
import ArticleViewer from '../../../../components/admin/contentmgmt/ArticleViewer';
import ArticleEditor from '../../../../components/admin/contentmgmt/ArticleEditor';

const ContentPage = () => {
    const [editing, setEditing] = useState(false);

    const data = {
        title: '台灣應該廢除早自習嗎',
        tags: ['娛樂', '環境'],
        brief: 'Enim cupidatat nostrud nisi cupidatat. Minim non occaecat tempor pariatur aliquip consectetur consequat exercitation sunt pariatur pariatur. Officia ex est id ipsum pariatur in veniam cillum eiusmod irure ea veniam. Duis voluptate qui elit sit non magna. Et pariatur commodo dolor do veniam aliqua do Lorem aliqua.',
        supContent:
            'Ullamco voluptate duis eiusmod aliquip deserunt voluptate veniam ut labore eu nostrud. Ut ut et culpa id irure excepteur. Officia in ad non eiusmod veniam. Incididunt consequat fugiat officia dolore ut pariatur nulla esse tempor velit veniam dolor. Fugiat sint proident excepteur veniam qui do do occaecat voluptate duis est.',
        agnContent:
            'Duis nisi aute ullamco eiusmod occaecat officia aliquip adipisicing et labore. Nulla nisi reprehenderit cupidatat nulla tempor ex eu ut id id. Consequat labore duis aliqua occaecat commodo quis aliqua occaecat ad. Nostrud pariatur adipisicing id deserunt eiusmod ex consequat elit id ea cupidatat. Exercitation aute cillum nisi et duis aliquip est et reprehenderit ullamco culpa officia magna. Et minim aliquip proident aliqua duis proident sunt culpa sunt reprehenderit.',
        refLinks: ['https://www.google.com'],
        status: {
            code: 'pm',
            reason: 'rp',
        },
    };

    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-neutral-100">
            <Header />
            <AdminSidebar />
            <div className="mt-14 h-[calc(100vh-56px)] overflow-y-auto pb-8 lg:mt-16 lg:ml-56 lg:h-[calc(100vh-64px)] lg:px-16 lg:pb-24 lg:pt-16 xl:ml-64 xl:px-20">
                <div className="mx-auto max-w-5xl">
                    <h1 className="hidden text-4xl text-primary-800 lg:block">
                        {editing ? '編輯' : '檢視'}議題
                    </h1>
                    {editing ? (
                        <ArticleEditor
                            data={data}
                            submitChanges={(newdata) => {}}
                            discardChanges={() => {
                                setEditing(false);
                            }}
                        />
                    ) : (
                        <ArticleViewer
                            data={data}
                            toggleEdit={() => {
                                setEditing(true);
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContentPage;
