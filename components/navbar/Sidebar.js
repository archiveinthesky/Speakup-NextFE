import Link from 'next/link'

import { HomeIcon, TrendingUpIcon, BookmarkIcon } from '@heroicons/react/outline'

const Sidebar = () => {

    const tags = ['教育', '娛樂', '媒體', '科技'];
    //['娛樂', '環境', '司法', '國家發展', '經濟', '少數族群', '媒體', '醫藥', '道德', '政治', '教育', '家庭', '女性', '自由', '宗教', '科技', '社會政策', '社會運動', '體育'];

    return (<>

        <div className={`absolute top-14 left-0 hidden lg:flex w-20 hover:w-64 h-[calc(100vh-56px)] flex-shrink-0 group bg-neutral-50 rounded-r-[32px] flex-col hover:drop-shadow-xl transition-width duration-500 overflow-x-hidden ease-out`}>
            <div className="h-6" />
            <div className='w-full'>
                <ul className="mx-auto text-primary-900 pl-7">
                    <Link href="/home">
                        <li className="flex list-none py-3 gap-4 cursor-pointer">
                            <HomeIcon className='w-7 flex-shrink-0' />
                            <p className=" text-transparent group-hover:text-primary-900 text-xl leading-8 whitespace-nowrap">首頁</p>
                        </li>
                    </Link>
                    <Link href="/search?tags=封測議題">
                        <li className="flex list-none py-3 gap-4 cursor-pointer">
                            <TrendingUpIcon className='w-7 flex-shrink-0' />
                            <p className=" text-transparent group-hover:text-primary-900 text-xl leading-8 whitespace-nowrap">封測議題</p>
                        </li>
                    </Link>
                    <Link href="/collections">
                        <li className="flex list-none py-3 gap-4 cursor-pointer">
                            <BookmarkIcon className='w-7 flex-shrink-0' />
                            <p className=" text-transparent group-hover:text-primary-900 text-xl leading-8 whitespace-nowrap">我的收藏</p>
                        </li>
                    </Link>
                </ul>
            </div>
            <div className='hidden group-hover:block'>
                <div className="py-3">
                    <hr className="border-t-2 border-gray-300 w-5/6 mx-auto" />
                </div>
                <ul className="list-none h-full pl-20 overflow-x-hidden overflow-y-auto">
                    {tags.map((tag, i) => {
                        return (
                            <Link href={`/search?tags=${tag}`} key={`link${i}`}>
                                <li key={i} className="py-2 text-primary-900 text-lg whitespace-nowrap cursor-pointer ">{tag}</li>
                            </Link>
                        )
                    })}
                </ul>
            </div>

        </div>
    </>
    )
}

export default Sidebar
