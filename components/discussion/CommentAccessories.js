const NoCommentsDisplay = () => {
    return (
        <div className=" w-11/12 h-40 mx-auto my-2 flex" >
            <div className='m-auto'>
                <h1 className='text-xl text-center'>
                    目前還沒有留言呢 <br />
                    成為第一個留言的人吧
                </h1>
            </div>
        </div>
    )
}

const LoadingSkeleton = () => {
    return (
        <div className="w-full flex gap-3 py-2">
            <img className='w-7 h-7 flex-shrink-0 rounded-full animate-pulse bg-gray-300 p-1 border-2 border-gray-300' />
            <div className='flex-grow'>
                <div className="w-36 h-5 bg-gray-300 animate-pulse rounded-lg mb-2"></div>
                <div className="h-5 bg-gray-300 animate-pulse rounded-lg my-1"></div>
                <div className="h-5 bg-gray-300 animate-pulse rounded-lg mt-1 mb-3"></div>
                <div className="w-32 h-5 bg-gray-300 animate-pulse rounded-lg my-1"></div>

            </div>
        </div >
    )
}

export { NoCommentsDisplay, LoadingSkeleton }