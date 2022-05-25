import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Button, Chips, Chip, TextInput, Select } from '@mantine/core';
import { useForm } from '@mantine/form';

const VerifyEmail = () => {
    const router = useRouter();

    const [emailCD, setEmailCD] = useState(0);
    const [emailSent, setEmailSent] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const emailCDInterval = useRef();

    const valcode = /^[0-9]{6}$/;

    const [authToken, setAuthToken] = useState();
    const possibleYears = (() => {
        let day = new Date();
        let year = day.getFullYear() - 12;
        let years = [];
        for (let i = 0; i < 100; i++) {
            years.push(year.toString());
            year--;
        }
        return years;
    })();
    //prettier-ignore
    const possibleMonths = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

    useEffect(() => {
        if (router.isReady && !router.query.token) router.push('/signup');
    }, [router.isReady]);

    useEffect(() => {
        if (localStorage.getItem('p2emailcd')) {
            if (!emailCDInterval.current)
                emailCDInterval.current = setInterval(updateEmailCD, 100);
            setEmailCD(parseInt(localStorage.getItem('p2emailcd')));
            setEmailSent(true);
        }
    }, []);

    const updateEmailCD = () => {
        if (localStorage.getItem('p2emailcd')) {
            let newval = parseInt(localStorage.getItem('p2emailcd')) - 1;
            if (newval == 0) {
                clearInterval(emailCDInterval.current);
                emailCDInterval.current = null;
                localStorage.removeItem('p2emailcd');
            } else {
                localStorage.setItem('p2emailcd', newval);
            }
            setEmailCD(newval);
        }
    };

    const sendEmail = () => {
        localStorage.setItem('p2emailcd', 60);
        setEmailCD(60);
        setEmailSent(true);
        if (!emailCDInterval.current) {
            emailCDInterval.current = setInterval(updateEmailCD, 100);
        }
    };

    const personalDataForm = useForm({
        initialValues: { gender: '', birthyear: '', birthmonth: '' },
        validate: {
            gender: (gender) => (gender !== '' ? null : '請選擇一個值'),
            birthyear: (birthyear) =>
                birthyear !== '' ? null : '請選擇一個值',
            birthmonth: (birthmonth) =>
                birthmonth !== '' ? null : '請選擇一個值',
        },
    });

    if (authToken) {
        return (
            <div className=" fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-primary-50">
                <div className="mx-8 w-full max-w-lg rounded-3xl bg-white py-14 px-12">
                    <h1 className="text-2xl text-primary-500">最後一步</h1>
                    <p className="mt-2 text-neutral-700">
                        請填寫最後的部分，就可以開始使用Speakup了！
                    </p>

                    <div className="mt-4">
                        <h3 className=" font-medium">您的性別</h3>
                        <Chips
                            className="mt-2"
                            {...personalDataForm.getInputProps('gender')}
                            required
                        >
                            <Chip value="male">男</Chip>
                            <Chip value="female">女</Chip>
                            <Chip value="other">其他</Chip>
                        </Chips>
                        {personalDataForm.errors.gender && (
                            <p className="mt-2 text-sm text-red-500">
                                {personalDataForm.errors.gender}
                            </p>
                        )}
                    </div>

                    <div className="mt-6 ">
                        <h3 className="font-medium">您的出生年月</h3>
                        <div className="flex gap-4">
                            <Select
                                className="inline w-5/12"
                                label="年"
                                searchable
                                data={possibleYears}
                                maxDropdownHeight={280}
                                {...personalDataForm.getInputProps('birthyear')}
                                required
                            />
                            <Select
                                className=" inline w-3/12"
                                label="月"
                                searchable
                                data={possibleMonths}
                                maxDropdownHeight={280}
                                {...personalDataForm.getInputProps(
                                    'birthmonth'
                                )}
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                        <Button
                            className="bg-primary-500"
                            onClick={personalDataForm.onSubmit((values) => {
                                console.log(values);
                            })}
                        >
                            開始使用Speakup
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className=" fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-primary-50">
            <div className="mx-8 w-full max-w-lg rounded-3xl bg-white py-14 px-12">
                <h1 className="text-2xl text-primary-500">信箱驗證</h1>
                <p className="mt-2 text-neutral-700">
                    請檢查您用來註冊的信箱，Speakup有寄送一封有驗證碼的信給您
                </p>
                {emailSent && (
                    <p className="mt-2 text-neutral-700">
                        沒收到信件？有時候信件會被誤判為垃圾郵件，因此您也可以去垃圾郵件翻找看看
                    </p>
                )}
                <TextInput
                    className="mt-4"
                    placeholder="驗證碼"
                    value={userEmail}
                    onChange={(e) => {
                        setUserEmail(e.currentTarget.value);
                    }}
                />
                <div className="mt-4 flex items-center gap-2">
                    <Button
                        className="bg-primary-500"
                        onClick={sendEmail}
                        disabled={emailCD > 0 || !valcode.test(userEmail)}
                    >
                        驗證
                    </Button>
                    {emailCD > 0 && (
                        <p className="text-primary-500">
                            未收到信件？{emailCD}秒後再次傳送
                        </p>
                    )}
                    {emailSent && emailCD <= 0 && (
                        <button onClick={sendEmail}>
                            <p className="text-primary-500">再次傳送</p>
                        </button>
                    )}
                    <button
                        onClick={() => {
                            setAuthToken('F');
                        }}
                    >
                        你好
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
