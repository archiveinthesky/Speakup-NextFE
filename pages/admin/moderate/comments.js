import React from 'react';
import Header from '../../../components/navbar/Header';
import AdminSidebar from '../../../components/navbar/AdminSidebar';
import AdminFootbar from '../../../components/navbar/AdminFootbar';

const CommentModeration = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-neutral-100">
            <Header />
            <AdminSidebar />
            <AdminFootbar />
        </div>
    );
};

export default CommentModeration;
