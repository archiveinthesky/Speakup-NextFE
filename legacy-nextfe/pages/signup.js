import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

import { useForm } from '@mantine/form';
import {
    Button,
    LoadingOverlay,
    PasswordInput,
    TextInput,
} from '@mantine/core';
import { UserIcon, InboxIcon, LockClosedIcon } from '@heroicons/react/outline';
import { showNotification } from '@mantine/notifications';

const SignUp = () => {
    const router = useRouter();

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

    const signupMutation = useMutation(
        async (values) => {
            let response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/reg/email`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                }
            );
            if (response.ok) return response.json();
            let res = await response.json();
            throw new Error(res.Error);
        },
        {
            onSuccess: (data) => {
                router.push(`/auth/verifyemail?token=${data.valtoken}`);
            },
            onError: (error) => {
                if (error.message === 'Email registered') {
                    signupForm.setErrors({
                        email: '此信箱已註冊過，請登入',
                    });
                } else if (error.message === 'Username taken') {
                    signupForm.setErrors({
                        username: '使用者名稱已被使用過',
                    });
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

    return (
        <div className=" fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-primary-50">
            <div className="mx-8 w-full max-w-lg rounded-3xl bg-white py-14 px-12">
                <div className="flex w-full items-center justify-center gap-2">
                    <h1 className="text-2xl">歡迎加入</h1>
                    <img
                        className="h-7 w-7"
                        src="/assets/logo-mic.svg"
                        alt=""
                    />
                </div>
                <p className="mt-3 text-center">
                    請輸入您的資料
                    <br />
                    註冊過了？
                    <Link href="/login">
                        <span className="cursor-pointer text-primary-600">
                            登入
                        </span>
                    </Link>
                </p>
                <form
                    className="relative mt-11 flex flex-col gap-4"
                    onSubmit={signupForm.onSubmit((values) => {
                        signupMutation.mutate(values);
                    })}
                >
                    <LoadingOverlay visible={signupMutation.isLoading} />
                    <TextInput
                        label="您的使用者名稱"
                        placeholder="您的使用者名稱"
                        description="使用者名稱不得超過20個字"
                        icon={<UserIcon className="h-6 w-6 text-primary-600" />}
                        required
                        {...signupForm.getInputProps('username')}
                    />
                    <TextInput
                        label="您的信箱"
                        placeholder="您的信箱"
                        icon={
                            <InboxIcon className="h-6 w-6 text-primary-600" />
                        }
                        required
                        {...signupForm.getInputProps('email')}
                    />
                    <PasswordInput
                        placeholder="您的密碼"
                        label="您的密碼"
                        description="密碼必須含有一個大寫字幕、小寫字母以及一個數字"
                        icon={
                            <LockClosedIcon className="h-6 w-6 text-primary-600" />
                        }
                        required
                        {...signupForm.getInputProps('password')}
                    />
                    <PasswordInput
                        label="驗證密碼"
                        placeholder="驗證密碼"
                        icon={
                            <LockClosedIcon className="h-6 w-6 text-primary-600" />
                        }
                        required
                        {...signupForm.getInputProps('confPwd')}
                    />{' '}
                    <Button
                        className="bg-primary-600 hover:bg-primary-700"
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
