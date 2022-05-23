import Header from '../../components/navbar/Header';
import AdminSidebar from '../../components/navbar/AdminSidebar';
import {
    AnnotationIcon,
    ClipboardCheckIcon,
    PencilAltIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';

const AdminHomePage = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-neutral-100">
            <Header />
            <AdminSidebar />
            <div className="mt-16 ml-64 flex h-[calc(100vh-156px)] flex-col items-center justify-center gap-8 pt-16 pl-20 text-primary-800">
                <h1 className="text-4xl">歡迎回到Speakup創作者管理介面</h1>
                <div className="flex gap-8">
                    <Link href="/admin/manage/content">
                        <button className="block rounded-lg border-4 border-primary-800 px-12 py-16 transition-colors hover:bg-white/20">
                            <PencilAltIcon className="h-24 w-24" />
                            <h2 className="mt-2 text-center text-2xl">
                                議題總覽
                            </h2>
                        </button>
                    </Link>
                    <Link href="/admin/moderate/content">
                        <button className="block rounded-lg border-4 border-primary-800 px-12 py-16 transition-colors hover:bg-white/20">
                            <ClipboardCheckIcon className="h-24 w-24" />
                            <h2 className="mt-2 text-center text-2xl">
                                待審議題
                            </h2>
                        </button>
                    </Link>
                    <Link href="/admin/moderate/comments">
                        <button className="block rounded-lg border-4 border-primary-800 px-12 py-16 transition-colors hover:bg-white/20">
                            <AnnotationIcon className="h-24 w-24" />
                            <h2 className="mt-2 text-center text-2xl">
                                留言管理
                            </h2>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;
