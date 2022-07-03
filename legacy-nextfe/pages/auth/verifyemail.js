import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import {
    Button,
    Chips,
    Chip,
    TextInput,
    Select,
    LoadingOverlay,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useMutation } from 'react-query';
import { signIn } from 'next-auth/react';
import { sortedIndexBy } from 'lodash';

const VerifyEmail = () => {
    const router = useRouter();

    const [emailCD, setEmailCD] = useState(60);

    const [valcode, setValcode] = useState('');
    const [valcodeInputError, setValcodeInputError] = useState(undefined);
    const emailCDInterval = useRef();

    const valcodeTest = /^[0-9]{6}$/;
    const [authToken, setAuthToken] = useState();
    const [signinLoading, setSigninLoading] = useState(false);
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
        } else {
            localStorage.setItem('p2emailcd', '60');
            if (!emailCDInterval.current)
                emailCDInterval.current = setInterval(updateEmailCD, 100);
            setEmailCD(parseInt(localStorage.getItem('p2emailcd')));
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

    const verifyEmailMutation = useMutation(
        async (data) => {
            let response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/reg/validate`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            );
            if (response.ok) return response.json();
            let res = await response.json();
            throw new Error(res.Error);
        },
        {
            onSuccess: (data) => {
                setAuthToken(data.Token);
            },
            onError: (error) => {
                if (error.message === 'Failed too many times') {
                    setValcodeInputError('驗證錯誤次數過多，註冊失敗');
                } else if (error.message === 'Validation Failed') {
                    setValcodeInputError('驗證碼錯誤');
                } else if (error.message === 'Validation Token Invalid') {
                    setValcodeInputError(
                        '系統註冊碼錯誤，請回首頁重新註冊，並讓系統自動重新導向頁面'
                    );
                } else {
                    showNotification({
                        title: '發生未知的錯誤',
                        message: '請再試一次',
                        color: 'red',
                        autoClose: false,
                    });
                }
            },
        }
    );

    const resendVerifyEmailMutation = useMutation(
        async (data) => {
            let response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/reg/resendemail`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            );
            if (response.ok) return response.json();
            let res = await response.json();
            throw new Error(res.Error);
        },
        {
            onSuccess: () => {
                localStorage.setItem('p2emailcd', 60);
                setEmailCD(60);
                if (!emailCDInterval.current) {
                    emailCDInterval.current = setInterval(updateEmailCD, 100);
                }
            },
            onError: (error) => {
                let ntfMsg;
                if (error.message == 'Validation Token Invalid') {
                    ntfMsg =
                        '系統註冊碼錯誤，請回首頁重新註冊，並讓系統自動重新導向頁面';
                } else if (error.message == 'Too many emails have been sent') {
                    ntfMsg = '請等候信件寄送倒數計時！';
                } else {
                    ntfMsg = '發生了未知的錯誤，請再試一次';
                }
                showNotification({
                    title: '信件寄送失敗',
                    message: ntfMsg,
                    color: 'red',
                    autoClose: false,
                });
            },
        }
    );

    const submitDataMutation = useMutation(
        async (data) => {
            let response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/reg/info`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Token ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            );
            if (response.ok) return response.json();
            let res = await response.json();
            throw new Error(res.Error);
        },
        {
            onSuccess: async (data) => {
                setSigninLoading(true);
                let response = await signIn('credentials', {
                    redirect: false,
                    callbackUrl: '/home',
                    ...data,
                });
                if (!response.error) router.push('/home');
                else router.push('/login');
                setSigninLoading(false);
            },
            onError: () => {
                showNotification({
                    title: '發生未知的錯誤',
                    message: '請再試一次',
                    color: 'red',
                    autoClose: false,
                });
            },
        }
    );

    const sendEmail = () => {
        verifyEmailMutation.mutate({
            valtoken: router.query.token,
            valcode: valcode,
        });
        setValcodeInputError(undefined);
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
                        請填寫您的資料，就可以開始使用Speakup了！
                    </p>
                    <div className="relative">
                        <LoadingOverlay
                            visible={
                                submitDataMutation.isLoading || signinLoading
                            }
                        />
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
                                    {...personalDataForm.getInputProps(
                                        'birthyear'
                                    )}
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
                                    submitDataMutation.mutate({
                                        gender: values.gender,
                                        birthym: `${values.birthyear}${
                                            values.birthmonth.length < 2
                                                ? '0' + values.birthmonth
                                                : values.birthmonth
                                        }`,
                                    });
                                })}
                            >
                                開始使用Speakup
                            </Button>
                        </div>
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

                <p className="mt-2 text-neutral-700">
                    沒收到信件？有時候信件會被誤判為垃圾郵件，因此您也可以去垃圾郵件翻找看看
                </p>

                <div className="relative">
                    <LoadingOverlay visible={verifyEmailMutation.isLoading} />
                    <TextInput
                        className="mt-4"
                        placeholder="驗證碼"
                        value={valcode}
                        onChange={(e) => {
                            setValcode(e.currentTarget.value);
                        }}
                        error={valcodeInputError}
                    />
                    <div className=" mt-4 flex items-center gap-2">
                        <Button
                            className="bg-primary-500"
                            onClick={sendEmail}
                            disabled={
                                emailCD > 0 ||
                                !valcodeTest.test(valcode) ||
                                valcodeInputError ==
                                    '驗證錯誤次數過多，註冊失敗'
                            }
                        >
                            驗證
                        </Button>
                        {emailCD > 0 && (
                            <p className="text-primary-500">
                                未收到信件？{emailCD}秒後再次傳送
                            </p>
                        )}
                        {emailCD <= 0 && (
                            <button
                                onClick={() => {
                                    resendVerifyEmailMutation.mutate({
                                        valtoken: router.query.token,
                                    });
                                }}
                            >
                                <p className="text-primary-500">再次傳送</p>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
