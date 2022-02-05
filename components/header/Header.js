import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import AccountOptions from './AccountOptions'
import NotificationButton from './Notifications'

import { ArrowLeftIcon, SearchIcon } from '@heroicons/react/outline'


const Header = ({ accprofile = null }) => {
    const router = useRouter()

    const [showReturnArrow, setShowReturnArrow] = useState(false)

    useEffect(() => {
        let sepedUrl = `${router.pathname}${router.query}`.split('/')
        console.log(sepedUrl)
        setShowReturnArrow(['home', 'admin', 'search', 'collections'].indexOf(sepedUrl[1]) === -1)
    }, [router.pathname])


    const searchSubmit = (e) => {
        e.preventDefault()
        let keyword = e.target[0].value
        if (keyword !== null) {
            if (keyword.charAt(0) === "#") window.location.href = `/search?tags=${keyword.substring(1)}`
            else window.location.href = `/search?keyword=${keyword}`
        }
    }

    return (
        <div className='fixed w-screen h-14 bg-primary-600 z-20 px-6 xl:px-14'>
            <div className='flex lg:hidden h-full items-center'>
                <Link href="/home">
                    <img className="my-auto h-10" src='/logo.svg' alt="logo" />
                </Link>
            </div>

            <div className="hidden lg:flex justify-between items-center">
                <div className="w-screen h-14 flex items-center gap-14">
                    <Link href="/home">
                        <img className="my-auto h-10" src='/logo.svg' alt="logo" />
                    </Link>
                    <form className="hidden md:flex w-7/12 xl:w-5/12 max-w-2xl items-center" onSubmit={searchSubmit}>
                        <input className="w-full h-9 p-5 bg-neutral-50 text-base text-neutral-600 rounded-3xl" placeholder="搜尋你感興趣的議題" type="text" />
                        <button type="submit" className="relative -left-12">
                            <SearchIcon className='w-6 h-6' />
                        </button>
                    </form>
                </div>
                <div className='h-9 flex justify-end items-center gap-5 '>
                    <NotificationButton />
                    <AccountOptions />
                </div>
            </div >
        </div>
    )
}

export default Header
