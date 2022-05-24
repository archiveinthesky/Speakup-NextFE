import React from 'react';
import Link from 'next/link';
import {
    HomeIcon,
    BookOpenIcon,
    AnnotationIcon,
    ClipboardCheckIcon,
} from '@heroicons/react/outline';

import {
    HomeIcon as HomeIconSolid,
    BookOpenIcon as BookOpenIconSolid,
    AnnotationIcon as AnnotationIconSolid,
    ClipboardCheckIcon as ClipboardCheckIconSolid,
} from '@heroicons/react/solid';
import { useRouter } from 'next/router';

const AdminFootbar = () => {
    const router = useRouter();

    const pageUrl = router.pathname.split('/');

    return (
        <div className="fixed left-0 bottom-0 z-20 flex h-16 w-full items-center justify-around border-t border-gray-400 bg-neutral-50 px-5 text-primary-900 lg:hidden">
            <Link href="/admin">
                <a>
                    {pageUrl[pageUrl.length - 1] == 'admin' ? (
                        <HomeIconSolid className="h-8 w-8" />
                    ) : (
                        <HomeIcon className="h-8 w-8" />
                    )}
                </a>
            </Link>
            <Link href="/admin/manage/content">
                <a>
                    {pageUrl[pageUrl.length - 2] == 'manage' &&
                    pageUrl[pageUrl.length - 1] == 'content' ? (
                        <BookOpenIconSolid className="h-8 w-8" />
                    ) : (
                        <BookOpenIcon className="h-8 w-8" />
                    )}
                </a>
            </Link>
            <Link href="/admin/moderate/content">
                <a>
                    {pageUrl[pageUrl.length - 2] == 'moderate' &&
                    pageUrl[pageUrl.length - 1] == 'content' ? (
                        <ClipboardCheckIconSolid className="h-8 w-8" />
                    ) : (
                        <ClipboardCheckIcon className="h-8 w-8" />
                    )}
                </a>
            </Link>
            <Link href="/admin/moderate/comments">
                <a>
                    {pageUrl[pageUrl.length - 2] == 'moderate' &&
                    pageUrl[pageUrl.length - 1] == 'comments' ? (
                        <AnnotationIconSolid className="h-8 w-8" />
                    ) : (
                        <AnnotationIcon className="h-8 w-8" />
                    )}
                </a>
            </Link>
        </div>
    );
};

export default AdminFootbar;
