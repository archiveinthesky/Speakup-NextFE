import React from 'react';
import Link from 'next/link';

import { useForm } from '@mantine/form';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { InboxIcon, LockClosedIcon } from '@heroicons/react/outline';

const Login = () => {
    const loginForm = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (val) =>
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    val
                )
                    ? null
                    : '信箱格式錯誤',
        },
    });

    return (
        <div className=" fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-aqua-50">
            <div className="mx-8 w-full max-w-lg rounded-3xl bg-white py-14 px-12">
                <div className="flex w-full items-center justify-center gap-2">
                    <h1 className="text-2xl">歡迎回來</h1>
                    <img
                        className="h-7 w-7"
                        src="/landing/logo-mic.svg"
                        alt=""
                    />
                </div>
                <p className="mt-3 text-center">
                    請輸入帳號密碼
                    <br />
                    沒有帳號密碼？
                    <Link href="/signup">
                        <span className="cursor-pointer text-aqua-600">
                            立刻註冊
                        </span>
                    </Link>
                </p>
                <form
                    className="mt-11 flex flex-col gap-4"
                    onSubmit={loginForm.onSubmit((values) => {
                        fetch(
                            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
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
                            if (response.status === 200) {
                                localStorage.setItem(
                                    'Authorization',
                                    `Token ${res.Token}`
                                );
                                window.location.href = '/home';
                            } else if (response.status === 401) {
                                console.log(res);
                                if (
                                    res.Error ===
                                    'Username or password is incorrect'
                                ) {
                                    loginForm.setErrors({
                                        email: '帳號或密碼不正確',
                                        password: '帳號或密碼不正確',
                                    });
                                }
                            }
                        });
                    })}
                >
                    <TextInput
                        placeholder="您的信箱"
                        icon={<InboxIcon className="h-6 w-6 text-aqua-600" />}
                        required
                        {...loginForm.getInputProps('email')}
                    />
                    <PasswordInput
                        placeholder="您的密碼"
                        icon={
                            <LockClosedIcon className="h-6 w-6 text-aqua-600" />
                        }
                        required
                        {...loginForm.getInputProps('password')}
                    />
                    <Button
                        className="bg-aqua-600 hover:bg-aqua-700"
                        type="submit"
                    >
                        登入
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
