import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

const ResetPwd = () => {
    const router = useRouter();

    const [emailCD, setEmailCD] = useState(0);
    const [emailSent, setEmailSent] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const emailCDInterval = useRef();

    const emailTest =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const pwdTest = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    useEffect(() => {
        if (localStorage.getItem('emailcd')) {
            if (!emailCDInterval.current)
                emailCDInterval.current = setInterval(updateEmailCD, 1000);
            setEmailCD(parseInt(localStorage.getItem('emailcd')));
            setEmailSent(true);
        }
    }, []);

    const updateEmailCD = () => {
        if (localStorage.getItem('emailcd')) {
            let newval = parseInt(localStorage.getItem('emailcd')) - 1;
            if (newval == 0) {
                clearInterval(emailCDInterval.current);
                emailCDInterval.current = null;
                localStorage.removeItem('emailcd');
            } else {
                localStorage.setItem('emailcd', newval);
            }
            setEmailCD(newval);
        }
    };

    const pwdForm = useForm({
        initialValues: {
            newpwd: '',
            valpwd: '',
        },
        validate: {
            newpwd: (newpwd) =>
                pwdTest.test(newpwd)
                    ? null
                    : '密碼至少需要八個字元，並有大小寫字母各一和一個數字',
            valpwd: (valpwd) =>
                pwdForm.values.newpwd === valpwd ? null : '輸入的密碼不相符',
        },
    });

    if (router.query.token)
        return (
            <div className=" fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-primary-50">
                <form
                    className="mx-8 w-full max-w-lg rounded-3xl bg-white py-14 px-12"
                    onSubmit={pwdForm.onSubmit((values) => {
                        console.log(values);
                    })}
                >
                    <h1 className="text-2xl text-primary-500">重設密碼</h1>
                    <PasswordInput
                        className="mt-2"
                        label="新的密碼"
                        description="密碼至少需要八個字元，並有大小寫字母各一和一個數字"
                        {...pwdForm.getInputProps('newpwd')}
                    />
                    <PasswordInput
                        className="mt-2"
                        label="再次輸入密碼"
                        {...pwdForm.getInputProps('valpwd')}
                    />
                    <Button className="mt-2 bg-primary-500" type="submit">
                        修改
                    </Button>
                </form>
            </div>
        );

    return (
        <div className=" fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-primary-50">
            <div className="mx-8 w-full max-w-lg rounded-3xl bg-white py-14 px-12">
                <h1 className="text-2xl text-primary-500">忘記密碼</h1>
                <p className="mt-2 text-neutral-700">
                    請輸入您用來註冊Speakup帳號的信箱，我們將會寄重設密碼的連結給您。
                </p>
                {emailSent && (
                    <p className="mt-2 text-neutral-700">
                        沒收到信件？有時候信件會被誤判為垃圾郵件，因此您也可以去垃圾郵件翻找看看
                    </p>
                )}
                <TextInput
                    className="mt-4"
                    placeholder="您的信箱"
                    value={userEmail}
                    onChange={(e) => {
                        setUserEmail(e.currentTarget.value);
                    }}
                />
                <div className="mt-4 flex items-center gap-2">
                    <Button
                        className="bg-primary-500"
                        onClick={() => {
                            localStorage.setItem('emailcd', 60);
                            setEmailCD(60);
                            setEmailSent(true);
                            if (!emailCDInterval.current) {
                                emailCDInterval.current = setInterval(
                                    updateEmailCD,
                                    1000
                                );
                            }
                        }}
                        disabled={emailCD > 0 || !emailTest.test(userEmail)}
                    >
                        傳送
                    </Button>
                    {emailCD > 0 && (
                        <p className="text-primary-500">
                            未收到信件？{emailCD}秒後再次傳送
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResetPwd;
