import Link from 'next/link';
import {
    ChatAlt2Icon,
    EyeIcon,
    UserCircleIcon,
} from '@heroicons/react/outline';

const WideNavCard = ({ cardContent, showDetails }) => {
    console.table(cardContent);

    return (
        <Link href={`/discussions/${cardContent.boardId}`}>
            <div className="flex w-full cursor-pointer justify-between overflow-hidden rounded-2xl bg-neutral-50 pr-4 md:pr-7">
                <div className="w-[4.5rem] flex-shrink-0 bg-primary-700  md:w-24"></div>
                <div className="h-full flex-grow px-4 py-3">
                    <h3 className=" text-lg text-primary-800 md:text-xl">
                        {cardContent.title}
                    </h3>
                    <p className="mt-1 h-[72px] text-ellipsis text-primary-600 line-clamp-3">
                        {cardContent.content}
                    </p>
                </div>
                <div
                    className={`hidden w-24 flex-shrink-0 flex-col justify-end gap-1 pb-4 text-primary-600 ${
                        showDetails && 'md:flex'
                    }`}
                >
                    <div className="flex items-center">
                        <UserCircleIcon className="mr-2 h-6 w-6 flex-shrink-0" />
                        <p className="text-xs">{cardContent.author}</p>
                    </div>
                    <div className="flex items-center">
                        <EyeIcon className="mr-2 h-6 w-6 flex-shrink-0" />
                        <p className="text-xs">{cardContent.views}</p>
                    </div>
                    <div className="flex items-center">
                        <ChatAlt2Icon className="mr-2 h-6 w-6 flex-shrink-0" />
                        <p className="text-xs">{cardContent.comments}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default WideNavCard;
