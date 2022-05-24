import Header from '../../components/navbar/Header';
import AdminSidebar from '../../components/navbar/AdminSidebar';
import {
    AnnotationIcon,
    ClipboardCheckIcon,
    HomeIcon,
    PencilAltIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import AdminFootbar from '../../components/navbar/AdminFootbar';

const AdminHomePage = () => {
    const NavBtn = ({ link, icon, text }) => {
        return (
            <Link href={link}>
                <button className="flex w-full items-center gap-8 rounded-lg border-4 border-primary-800 px-8 py-4 transition-colors hover:bg-white/20 lg:block lg:w-auto lg:gap-4 lg:px-12 lg:py-16">
                    {icon}
                    <h2 className="text-center text-2xl lg:mt-2">{text}</h2>
                </button>
            </Link>
        );
    };

    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-neutral-100">
            <Header />
            <AdminSidebar />
            <AdminFootbar />
            <div className="lg:m-full mx-auto mt-16 flex h-[calc(100vh-156px)] w-5/6 flex-col items-center justify-center gap-8 text-primary-800 lg:ml-64 lg:pt-16 lg:pl-20">
                <h1 className="text-4xl">
                    <span className="inline-block leading-10">
                        歡迎回到Speakup
                    </span>
                    <span className="inline-block leading-10">
                        創作者管理介面
                    </span>
                </h1>
                <div className="flex w-full flex-col gap-8 lg:flex-row">
                    <NavBtn
                        link="/admin/manage/content"
                        icon={<PencilAltIcon className="h-12 lg:h-24 " />}
                        text="議題總覽"
                    />
                    <NavBtn
                        link="/admin/moderate/content"
                        icon={<ClipboardCheckIcon className="h-12 lg:h-24" />}
                        text="待審議題"
                    />
                    <NavBtn
                        link="/admin/moderate/comments"
                        icon={<AnnotationIcon className="h-12 lg:h-24" />}
                        text="留言管理"
                    />
                    <span className="lg:hidden">
                        <NavBtn
                            link="/home"
                            icon={<HomeIcon className="h-12 lg:h-24" />}
                            text="回Speakup"
                        />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;
