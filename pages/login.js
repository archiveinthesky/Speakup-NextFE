import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

import { useForm } from '@mantine/form';
import {
    Button,
    LoadingOverlay,
    PasswordInput,
    TextInput,
} from '@mantine/core';
import { InboxIcon, LockClosedIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

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
        <div className=" fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-primary-50">
            <div className="mx-8 w-full max-w-lg rounded-3xl bg-white py-14 px-12">
                <div className="flex w-full items-center justify-center gap-2">
                    <h1 className="text-2xl">歡迎回來</h1>
                    <img className="h-7 w-7" src="/logo-mic.svg" alt="" />
                </div>
                <p className="mt-3 text-center">
                    請輸入帳號密碼
                    <br />
                    沒有帳號密碼？
                    <Link href="/signup">
                        <span className="cursor-pointer text-primary-600">
                            立刻註冊
                        </span>
                    </Link>
                </p>
                <form
                    className="relative mt-11 flex flex-col gap-4"
                    onSubmit={loginForm.onSubmit(async (values) => {
                        setLoading(true);
                        let response = await signIn('credentials', {
                            redirect: false,
                            callbackUrl: '/home',
                            ...values,
                        });
                        if (!response.error) router.push('/home');
                        else if (response.error == 'CredentialsSignin') {
                            loginForm.setErrors({
                                email: true,
                                password: '信箱或密碼錯誤',
                            });
                        } else
                            showNotification({
                                title: '發生未知的錯誤',
                                message: '請再試一次',
                                color: 'red',
                                autoClose: false,
                            });
                        setLoading(false);
                    })}
                >
                    <LoadingOverlay visible={loading} />
                    <TextInput
                        placeholder="您的信箱"
                        icon={
                            <InboxIcon className="h-6 w-6 text-primary-600" />
                        }
                        required
                        {...loginForm.getInputProps('email')}
                    />
                    <PasswordInput
                        placeholder="您的密碼"
                        icon={
                            <LockClosedIcon className="h-6 w-6 text-primary-600" />
                        }
                        required
                        {...loginForm.getInputProps('password')}
                    />
                    <Link href="/auth/resetpwd">
                        <p className=" cursor-pointer text-sm text-primary-600">
                            忘記密碼
                        </p>
                    </Link>
                    <Button
                        className="bg-primary-600 hover:bg-primary-700"
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
