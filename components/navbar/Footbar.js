import Link from 'next/link'
import { HomeIcon, SearchIcon, BookmarkIcon, BellIcon, UserCircleIcon } from '@heroicons/react/outline';

const Footbar = () => {
    return (
        <div className='lg:hidden fixed left-0 bottom-0 w-full h-16 px-5 bg-neutral-50 text-primary-900 border-t border-gray-400 z-20 flex justify-around items-center'>
            <Link href='/home'><a><HomeIcon className='w-8 h-8' /></a></Link>
            <Link href='/search'><a><SearchIcon className='w-8 h-8' /></a></Link>
            <Link href='/collections'><a><BookmarkIcon className='w-8 h-8' /></a></Link>
            <Link href='/home'><a><BellIcon className='w-8 h-8' /></a></Link>
            <Link href='/home'><a><UserCircleIcon className='w-8 h-8' /></a></Link>
        </div>
    );
};

export default Footbar;
