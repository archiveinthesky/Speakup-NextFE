import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useSession, signIn, signOut } from 'next-auth/react';

import {
    Button,
    Modal,
    Group,
    PasswordInput,
    LoadingOverlay,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';

const styles = {
    button: 'flex h-11 w-20 items-center justify-center rounded-md bg-primary-700 hover:bg-primary-600 text-white focus:outline-none',
    p: 'text-left md:text-right text-lg leading-[44px] text-neutral-800',
};

const BasicSettingsCard = ({ initValues }) => {
    const [pwdOverlay, setPwdOverlay] = useState(false);
    const [signinLoading, setSigninLoading] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    const pwdForm = useForm({
        initialValues: {
            oldPwd: '',
            newPwd: '',
            valPwd: '',
        },
        validate: {
            newPwd: (val) => {
                if (val.length < 8) return '密碼必須大於八個字元';
                else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(val))
                    return '密碼必須含有一個大寫字幕、小寫字母以及一個數字';
            },
            valPwd: (val) =>
                val === pwdForm.values.newPwd
                    ? undefined
                    : '密碼不相同，請再次檢查',
        },
    });

    const passwordMutation = useMutation(
        async (values) => {
            let response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/data/pwd`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `Token ${session.authToken}`,
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify(values),
                }
            );
            if (response.ok)
                return new Promise((resolve) => {
                    resolve(true);
                });
            let res = await response.json();
            throw new Error(res.Error);
        },
        {
            onSuccess: async () => {
                setSigninLoading(true);
                console.log(session.user);
                console.log(pwdForm.values.newPwd);
                let response = await signIn('credentials', {
                    redirect: false,
                    callbackUrl: '/home',
                    email: session.user.email,
                    password: pwdForm.values.newPwd,
                });
                console.log(response);
                if (response.error) {
                    showNotification({
                        title: '密碼更改成功',
                        message: '請重新登入',
                    });
                    router.push('/login');
                }
                showNotification({
                    message: '密碼更改成功',
                });
                setPwdOverlay(false);
                pwdForm.setValues({ oldPwd: '', newPwd: '', valPwd: '' });
                setSigninLoading(false);
            },
            onError: (error) => {
                if (error.message === 'Old password incorrect') {
                    pwdForm.setErrors({
                        oldPwd: '密碼錯誤',
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
        <div className="w-full bg-white pb-10 lg:bg-neutral-50">
            <div className="mx-6 flex h-20 items-center justify-between py-5 md:mx-16">
                <h1 className="text-2xl text-neutral-800">基本資料</h1>
                {/* <Button
                    className={` invisible ${
                        isEqual(form.values, initValues) ? 'hidden' : 'flex'
                    } h-9 w-20 items-center justify-center rounded-md ${(() => {
                        if (userDataMutation.isIdle) return 'bg-primary-700';
                        if (userDataMutation.isSuccess) return 'bg-green-400';
                        if (userDataMutation.isError) return 'bg-red-500';
                    })()} text-white hover:bg-primary-600 focus:outline-none disabled:bg-opacity-50`}
                    type="submit"
                    loading={userDataMutation.isLoading}
                    onMouseLeave={() => {
                        // if (userDataMutation) userDataMutation.reset();
                    }}
                >
                    儲存
                </Button> */}
            </div>
            <hr className="mb-6 border-t-2 " />
            <div className="flex flex-col gap-4 px-6 text-left md:grid md:grid-cols-[4fr,6fr] md:items-center md:gap-y-5 ">
                <p className={styles.p}>您的密碼</p>
                <Button
                    className={styles.button}
                    onClick={() => {
                        pwdForm.reset();
                        setPwdOverlay(true);
                    }}
                >
                    修改
                </Button>
                <Modal
                    opened={pwdOverlay}
                    onClose={() => {
                        setPwdOverlay(false);
                    }}
                    title="密碼修改"
                >
                    <form
                        className="relative flex flex-col gap-4"
                        onSubmit={pwdForm.onSubmit((values) => {
                            passwordMutation.mutate(values);
                        })}
                        id="pwdform"
                    >
                        <LoadingOverlay
                            visible={
                                passwordMutation.isLoading || signinLoading
                            }
                        />
                        <PasswordInput
                            placeholder="您原本的密碼"
                            label="舊密碼"
                            required
                            {...pwdForm.getInputProps('oldPwd')}
                        />
                        <PasswordInput
                            placeholder="新密碼"
                            label="新密碼"
                            description="密碼必須含有一個大寫字幕、小寫字母以及一個數字"
                            required
                            {...pwdForm.getInputProps('newPwd')}
                        />
                        <PasswordInput
                            placeholder="新密碼"
                            label="驗證密碼"
                            description="請再次輸入密碼"
                            required
                            {...pwdForm.getInputProps('valPwd')}
                        />
                        <Group position="right">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setPwdOverlay(false);
                                }}
                            >
                                取消
                            </Button>
                            <Button
                                variant="filled"
                                className="bg-primary-600"
                                type="submit"
                                form="pwdform"
                            >
                                確定
                            </Button>
                        </Group>
                    </form>
                </Modal>
            </div>
        </div>
    );
};

export default BasicSettingsCard;

/*
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { PhotographIcon } from '@heroicons/react/outline';


const [selectedPFP, setSelectedPFP] = useState('');
    const [uploadPFPModal, setUploadPFPModal] = useState(false);
    const [urlPFP, setUrlPFP] = useState('');
    useEffect(() => {
        if (selectedPFP === '') return undefined;
        setUrlPFP(
            URL.createObjectURL(new Blob(selectedPFP, { type: 'image/jpeg' }))
        );
        return () => {
            URL.revokeObjectURL(selectedPFP);
        };
    }, [selectedPFP]);

    const form = useForm({
        initialValues: initValues,

        validate: {
            name: (val) =>
                val.length >= 50 ? '名稱過長，建議您使用縮寫' : null,
            username: (val) =>
                (() => {
                    return val.length >= 20 ? '名稱過長' : null;
                })(),
            birthday: null,
            // email: (val) =>
            //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            //         val
            //     )
            //         ? null
            //         : '信箱格式錯誤',
        },
    });

    const submitUserData = form.onSubmit((values) => {
        let vals = values;
        let date = dayjs(values.birthday);
        let month = date.month() + 1;
        month = month < 10 ? `0${month}` : `${month}`;
        let day = date.date();
        day = day < 10 ? `0${day}` : `${day}`;
        vals.birthday = `${dayjs().year()}-${month}-${day}`;
        userDataMutation.mutate(vals);
    });

    const userDataMutation = useMutation(
        async (values) => {
            let response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/data`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: localStorage.getItem('AuthToken'),
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                }
            );
            console.log(response);
            if (!response.ok) throw new Error(response.error);
            return new Promise((resolve, reject) => {
                resolve({});
            });
        },
        {
            onSettled: (data, error) => {
                console.log(data);
                console.log(error);
            },
            onError: (error) => {
                console.error(error);
                form.setErrors({ username: '此使用者名稱已被使用' });
            },
        }
    );
    
     <p className={styles.p}>您的姓名</p>
                <TextInput
                    classNames={{ input: 'max-w-sm h-10' }}
                    required
                    {...form.getInputProps('name')}
                />
                
                <p className={styles.p}>您的使用者名稱</p>
                <TextInput
                    classNames={{ input: 'max-w-sm h-10' }}
                    required
                    {...form.getInputProps('username')}
                />

                <p className={styles.p}>您的生日</p>
                <div>
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
                            {...personalDataForm.getInputProps('birthmonth')}
                            required
                        />
                    </div>
                </div>
                <DatePicker
                    classNames={{ root: 'w-48 h-10 leading-8' }}
                    minDate={dayjs('1900-01-01').toDate()}
                    maxDate={dayjs().subtract(13, 'year').toDate()}
                    {...form.getInputProps('birthday')}
                />

                <p className={styles.p}>您的頭像</p>
                <Button
                    className={styles.button}
                    onClick={() => {
                        setUploadPFPModal(true);
                    }}
                >
                    上傳
                </Button>
                <Modal
                    opened={uploadPFPModal}
                    onClose={() => {
                        setUploadPFPModal(false);
                    }}
                    title="上傳使用者頭像"
                >
                    <Dropzone
                        onDrop={(file) => {
                            setSelectedPFP(file);
                            setUploadPFPModal(false);
                        }}
                        accept={IMAGE_MIME_TYPE}
                        multiple={false}
                        maxSize={5 * 1024 ** 2}
                    >
                        {() => {
                            return (
                                <div className="flex items-center justify-center gap-4">
                                    <PhotographIcon className="h-16 w-16" />
                                    <div className="">
                                        <h2>將使用者頭像拖曳至此以上傳</h2>
                                        <p>頭像不得超過5mb</p>
                                    </div>
                                </div>
                            );
                        }}
                    </Dropzone>
                </Modal>
                <Modal
                    opened={urlPFP !== ''}
                    title="確認使用者頭像"
                    onClose={() => {
                        setSelectedPFP('');
                        setUrlPFP('');
                    }}
                >
                    <img
                        src={urlPFP}
                        className="mx-auto h-40 w-40 rounded-[50%] object-cover"
                    />
                    <Group position="right">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSelectedPFP('');
                                setUrlPFP('');
                            }}
                        >
                            取消
                        </Button>
                        <Button
                            variant="filled"
                            className="bg-primary-600"
                            onClick={() => {
                                let formData = new FormData();
                                formData.append(
                                    'file',
                                    new Blob(selectedPFP, {
                                        type: 'image/jpeg',
                                    })
                                );
                                console.log(selectedPFP);
                                console.log(typeof formData.get('file'));

                                fetch(
                                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/data/profileimg`,
                                    {
                                        method: 'POST',
                                        headers: {
                                            Authorization:
                                                localStorage.getItem(
                                                    'AuthToken'
                                                ),
                                            // 'Content-Type':
                                            //     'multipart/form-data',
                                        },
                                        body: formData,
                                    }
                                ).then((response) => {
                                    console.log(response);
                                });
                                setSelectedPFP('');
                                setUrlPFP('');
                            }}
                        >
                            確定
                        </Button>
                    </Group>
                </Modal>

                <p className={styles.p}>您的電子郵件</p>
                <TextInput
                    classNames={{ input: 'max-w-sm h-10' }}
                    {...form.getInputProps('email')}
                />
    
    */
