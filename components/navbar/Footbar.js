import Link from 'next/link'
import { HomeIcon, SearchIcon, BookmarkIcon, BellIcon, UserCircleIcon } from '@heroicons/react/outline';

const Footbar = () => {
    return (
        <div className='lg:hidden fixed left-0 bottom-0 w-full h-16 px-5 bg-neutral-50 text-primary-900 border-t border-gray-400 z-20 flex justify-around items-center'>
            <Link href='/home'><HomeIcon className='w-8 h-8' /></Link>
            <Link href='/search'><SearchIcon className='w-8 h-8' /></Link>
            <Link href='/collections'><BookmarkIcon className='w-8 h-8' /></Link>
            <Link href='/home'><BellIcon className='w-8 h-8' /></Link>
            <Link href='/home'><UserCircleIcon className='w-8 h-8' /></Link>
        </div>
    );
};

export default Footbar;
