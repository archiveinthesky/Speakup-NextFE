import React from 'react';
import Header from '../../../components/navbar/Header';
import AdminSidebar from '../../../components/navbar/AdminSidebar';
import AdminFootbar from '../../../components/navbar/AdminFootbar';
import IndividualCommentBrief from '../../../components/admin/commentmgmt/IdvCommentBrief';
import IndividualCommentNav from '../../../components/admin/commentmgmt/IdvCommentNav';

const CommentModeration = () => {
    const data = [
        {
            id: 1,
            boardTitle: '台灣應該廢除早自習嗎？ ',
            boardId: 1,
            content:
                'Anim elit Lorem labore Lorem nostrud cupidatat occaecat labore in incididunt ut deserunt. Magna ad officia commodo irure et enim in ea nulla. Nostrud non est eiusmod nostrud eu occaecat est aliquip. Irure eu occaecat commodo non nulla. Mollit aliquip qui non amet dolor excepteur quis nisi excepteur nisi adipisicing aliqua fugiat. Deserunt elit excepteur labore deserunt culpa pariatur qui in. Lorem exercitation magna esse commodo ad mollit et irure ut. Ad consectetur nulla in enim ipsum elit. Duis proident proident id aute sit commodo est amet commodo mollit ex elit anim incididunt.',
            remainTime: 3,
            type: 'cmt',
            reportReason: {
                protocol: 'rep',
                reason: ['你好', 'Commodo', 'Commodo'],
            },
            relatedCmt: [],
        },
    ];

    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-neutral-100">
            <Header />
            <AdminSidebar />
            <AdminFootbar />
            <div className="relative mt-14 h-[calc(100vh-56px)]  overflow-y-auto pb-32 scrollbar-hide lg:mt-16 lg:ml-56 lg:h-[calc(100vh-64px)] lg:px-16 lg:pt-16 xl:ml-64 xl:px-20">
                <div className="mx-auto max-w-6xl">
                    <h1 className="hidden text-4xl text-primary-800 lg:block">
                        留言管理系統
                    </h1>
                    <div className="mt-4 h-[calc(100vh-200px)] w-full">
                        <div className="h-20 w-full">
                            <IndividualCommentBrief cardContent={data[0]} />
                        </div>
                        <div className="my-8 h-[calc(100vh-500px)] min-h-[260px] w-full">
                            <IndividualCommentNav commentData={data[0]} />
                        </div>
                        <div className="h-20 w-full">
                            <IndividualCommentBrief cardContent={data[0]} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentModeration;
