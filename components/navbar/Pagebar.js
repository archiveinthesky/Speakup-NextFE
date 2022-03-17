import Link from 'next/link';

const Pagebar = ({ maxPage, url, selected }) => {
    console.log(selected);

    return (
        <div className="mx-7 flex flex-wrap gap-3 md:mx-12">
            {[...Array(maxPage).keys()].map((i) => {
                return (
                    <Link href={url(i + 1)} key={i}>
                        <div
                            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded ${
                                selected == i + 1
                                    ? 'bg-primary-700'
                                    : 'bg-primary-500'
                            }`}
                        >
                            <p className="text-center text-lg text-white">
                                {i + 1}
                            </p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default Pagebar;
