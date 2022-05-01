import React from 'react';

import { useForm } from '@mantine/form';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { UserIcon, InboxIcon, LockClosedIcon } from '@heroicons/react/outline';
import Link from 'next/link';

const SignUp = () => {
    const signupForm = useForm({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confPwd: '',
        },
        validate: {
            username: (val) =>
                (() => {
                    return val.length >= 20 ? '名稱過長' : null;
                })(),
            email: (val) =>
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    val
                )
                    ? null
                    : '信箱格式錯誤',
            password: (val) => {
                if (val.length < 8) return '密碼必須大於八個字元';
                else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(val))
                    return '密碼必須含有一個大寫字幕、小寫字母以及一個數字';
            },
            confPwd: (val) =>
                val === signupForm.values.password
                    ? undefined
                    : '密碼不相同，請再次檢查',
        },
    });

    return (
        <div className=" bg-aqua-50 fixed top-0 left-0 flex h-screen w-screen items-center justify-center">
            <div className="mx-8 w-full max-w-lg rounded-3xl bg-white py-14 px-12">
                <div className="flex w-full items-center justify-center gap-2">
                    <h1 className="text-2xl">歡迎加入</h1>
                    <img className="h-7 w-7" src="/logo-mic.svg" alt="" />
                </div>
                <p className="mt-3 text-center">
                    請輸入您的資料
                    <br />
                    註冊過了？
                    <Link href="/login">
                        <span className="text-aqua-600 cursor-pointer">
                            登入
                        </span>
                    </Link>
                </p>
                <form
                    className="mt-11 flex flex-col gap-4"
                    onSubmit={signupForm.onSubmit((values) => {
                        fetch(
                            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signup`,
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(values),
                            }
                        ).then(async (response) => {
                            let res = await response.json();
                            console.log(res);
                            if (response.status === 201) {
                                localStorage.setItem(
                                    'AuthToken',
                                    `Token ${res.Token}`
                                );
                                window.location.href = '/home';
                            } else if (response.status === 403) {
                                if (res.Error === 'Email not allowed') {
                                    signupForm.setErrors({
                                        email: 'Speakup目前正在封閉測試階段，此帳號沒有測試許可',
                                    });
                                }
                            } else if (response.status === 409) {
                                if (res.Error === 'Email has been registered') {
                                    signupForm.setErrors({
                                        email: '此信箱已註冊過，請登入',
                                    });
                                } else if (res.Error === 'Username taken') {
                                    signupForm.setErrors({
                                        username: '使用者名稱已被使用過',
                                    });
                                }
                            }
                        });
                    })}
                >
                    <TextInput
                        label="您的使用者名稱"
                        placeholder="您的使用者名稱"
                        description="使用者名稱不得超過20個字"
                        icon={<UserIcon className="text-aqua-600 h-6 w-6" />}
                        required
                        {...signupForm.getInputProps('username')}
                    />
                    <TextInput
                        label="您的信箱"
                        placeholder="您的信箱"
                        icon={<InboxIcon className="text-aqua-600 h-6 w-6" />}
                        required
                        {...signupForm.getInputProps('email')}
                    />
                    <PasswordInput
                        placeholder="您的密碼"
                        label="您的密碼"
                        description="密碼必須含有一個大寫字幕、小寫字母以及一個數字"
                        icon={
                            <LockClosedIcon className="text-aqua-600 h-6 w-6" />
                        }
                        required
                        {...signupForm.getInputProps('password')}
                    />
                    <PasswordInput
                        label="驗證密碼"
                        placeholder="驗證密碼"
                        icon={
                            <LockClosedIcon className="text-aqua-600 h-6 w-6" />
                        }
                        required
                        {...signupForm.getInputProps('confPwd')}
                    />{' '}
                    <Button
                        className="bg-aqua-600 hover:bg-aqua-700"
                        type="submit"
                    >
                        註冊
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
