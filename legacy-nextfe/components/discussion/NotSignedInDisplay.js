import React from 'react';

const NotSignedInDisplay = () => {
    return (
        <div className=" mx-auto my-2 flex h-40 w-full rounded-xl bg-neutral-50">
            <div className="m-auto">
                <h1 className="text-center text-xl">
                    想加入討論嗎？
                    <a className="text-primary-600" href="/signup">
                        註冊帳號
                    </a>
                    參與Speakup的議題交流
                </h1>
            </div>
        </div>
    );
};

export default NotSignedInDisplay;
