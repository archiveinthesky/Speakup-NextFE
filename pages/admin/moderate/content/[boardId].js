import React, { useState, useEffect } from 'react';
import { Button, Modal, Textarea } from '@mantine/core';

import Header from '../../../../components/navbar/Header';
import AdminSidebar from '../../../../components/navbar/AdminSidebar';
import ArticleModerator from '../../../../components/admin/contentmgmt/ArticleModerator';

const ContentPage = () => {
    const [declineModal, setDeclineModal] = useState(false);
    const [declineReason, setDeclineReason] = useState('');
    const [declineEdit, setDeclineEdit] = useState('');

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

    const acceptArticle = () => {
        if (
            window.confirm(
                '我已詳閱本議題，並確定本議題完全符合Speakup議題規範，也了解如果審核結果有誤，我的聲望可能會受影響。'
            )
        ) {
            window.location.href = '/admin/moderate/content';
        }
    };

    const declineArticle = () => {
        setDeclineModal(true);
    };

    const submitDeclineArticle = () => {
        setDeclineModal(false);
        window.location.href = '/admin/moderate/content';
    };

    useEffect(() => {
        if (declineModal) {
            setDeclineReason('');
            setDeclineEdit('');
        }
    }, [declineModal]);

    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-neutral-100">
            <Header />
            <AdminSidebar />
            <div className="mt-14 h-[calc(100vh-56px)] overflow-y-auto pb-8 lg:mt-16 lg:ml-56 lg:h-[calc(100vh-64px)] lg:px-16 lg:pb-24 lg:pt-16 xl:ml-64 xl:px-20">
                <div className="mx-auto max-w-5xl">
                    <h1 className="hidden text-4xl text-primary-800 lg:block">
                        審核議題
                    </h1>
                    <ArticleModerator
                        data={data}
                        acceptArticle={acceptArticle}
                        declineArticle={declineArticle}
                    />
                </div>
                <Modal
                    opened={declineModal}
                    title="審核未通過原因"
                    onClose={() => {
                        setDeclineModal(false);
                    }}
                >
                    <Textarea
                        label="未通過原因"
                        description="請讓創作者知道為什麼議題未過審"
                        value={declineReason}
                        onChange={(e) => {
                            setDeclineReason(e.currentTarget.value);
                        }}
                        autosize
                        required
                    />
                    <div className="h-4"></div>
                    <Textarea
                        label="修訂建議"
                        description="請讓創作者知道該怎麼修改議題"
                        value={declineEdit}
                        onChange={(e) => {
                            setDeclineEdit(e.currentTarget.value);
                        }}
                        autosize
                        required
                    />
                    <Button
                        className="mt-4 bg-primary-600"
                        onClick={submitDeclineArticle}
                    >
                        提交
                    </Button>
                </Modal>
            </div>
        </div>
    );
};

export default ContentPage;
