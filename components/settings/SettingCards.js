import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import dayjs from 'dayjs';
import { isEqual } from 'lodash';

import {
    TextInput,
    Button,
    Modal,
    Group,
    PasswordInput,
    Switch,
    Checkbox,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { PhotographIcon } from '@heroicons/react/outline';

const styles = {
    button: 'flex h-11 w-20 items-center justify-center rounded-md bg-primary-700 hover:bg-primary-600 text-white focus:outline-none',
    p: 'text-left md:text-right text-lg leading-[44px] text-neutral-800',
};

const BasicSettingsCard = ({ initValues }) => {
    const [uploadPFPModal, setUploadPFPModal] = useState(false);
    const [selectedPFP, setSelectedPFP] = useState('');
    const [urlPFP, setUrlPFP] = useState('');
    const [pwdOverlay, setPwdOverlay] = useState(false);

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

    return (
        <form
            className="w-full bg-white pb-10 lg:bg-neutral-50"
            onSubmit={submitUserData}
            id="dataform"
        >
            <div className="mx-6 flex h-20 items-center justify-between py-5 md:mx-16">
                <h1 className="text-2xl text-neutral-800">基本資料</h1>
                <Button
                    className={`${
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
                </Button>
            </div>
            <hr className="mb-6 border-t-2 " />
            <div className="flex flex-col gap-4 px-6 text-left md:grid md:grid-cols-[4fr,6fr] md:items-center md:gap-y-5 ">
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

                {/* <p className={styles.p}>您的電子郵件</p>
                <TextInput
                    classNames={{ input: 'max-w-sm h-10' }}
                    {...form.getInputProps('email')}
                /> */}

                <p className={styles.p}>您的密碼</p>
                <Button
                    className={styles.button}
                    onClick={() => {
                        pwdForm.setValues({
                            oldPwd: '',
                            newPwd: '',
                            valPwd: '',
                        });
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
                        className="flex flex-col gap-4"
                        id="pwdform"
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
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
                                onClick={pwdForm.onSubmit((values) => {
                                    fetch(
                                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/data/pwd`,
                                        {
                                            method: 'PUT',
                                            headers: {
                                                Authorization:
                                                    localStorage.getItem(
                                                        'AuthToken'
                                                    ),
                                                'Content-Type':
                                                    'application/json',
                                                Accept: 'application/json',
                                            },
                                            body: JSON.stringify(values),
                                        }
                                    ).then(async (response) => {
                                        let res;
                                        try {
                                            res = await response.json();
                                            console.log(res);
                                        } catch {}
                                        if (response.status === 400) {
                                            if (
                                                res.error ===
                                                'Old password incorrect'
                                            )
                                                pwdForm.setErrors({
                                                    oldPwd: '密碼錯誤',
                                                });
                                        } else if (response.status === 200) {
                                            setPwdOverlay(false);
                                        }
                                    });
                                })}
                            >
                                確定
                            </Button>
                        </Group>
                    </form>
                </Modal>
            </div>
        </form>
    );
};

const NotificationSettingsCard = ({ initValues }) => {
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const notifyForm = useForm({
        initialValues: initValues,
    });

    useEffect(() => {
        if (!notifyForm.values.all) {
            notifyForm.setValues({
                all: false,
                cmtMod: false,
                brdMod: false,
                cmtReply: false,
                brdAlc: false, //Board analytics
                ads: false,
            });
        }
    }, [notifyForm.values.all]);

    return (
        <div className="w-full bg-white pb-10 lg:bg-neutral-50 ">
            <div className="mx-6 flex h-20 items-center justify-between py-5 md:mx-16">
                <h1 className="text-2xl text-neutral-800">平台通知</h1>
                <Button
                    className={`${
                        isEqual(notifyForm.values, initValues)
                            ? 'hidden'
                            : 'flex'
                    } h-9 w-20 items-center justify-center rounded-md bg-primary-700 text-white hover:bg-primary-600 focus:outline-none disabled:bg-opacity-50`}
                    type="submit"
                    // color={submitSuccess ? 'green' : 'red'}
                    // loading={submitting}
                    onMouseLeave={() => {
                        setSubmitSuccess(false);
                    }}
                >
                    儲存
                </Button>
            </div>
            <hr className="mb-6 border-t-2 " />
            <div className="flex flex-col gap-8 px-6 text-left md:grid md:grid-cols-[4fr,6fr] md:items-center ">
                <p className={styles.p}>開啟通知</p>
                <Checkbox
                    size="md"
                    {...notifyForm.getInputProps('all', { type: 'checkbox' })}
                />
                {notifyForm.values.all && (
                    <>
                        <p className={styles.p}>留言審核結果</p>
                        <Checkbox
                            size="md"
                            {...notifyForm.getInputProps('cmtMod', {
                                type: 'checkbox',
                            })}
                        />
                        <p className={styles.p}>議題審核結果</p>
                        <Checkbox
                            size="md"
                            {...notifyForm.getInputProps('brdMod', {
                                type: 'checkbox',
                            })}
                        />
                        <p className={styles.p}>熱門留言回覆</p>
                        <Checkbox
                            size="md"
                            {...notifyForm.getInputProps('cmtReply', {
                                type: 'checkbox',
                            })}
                        />
                        <p className={styles.p}>議題數據分析</p>
                        <Checkbox
                            size="md"
                            {...notifyForm.getInputProps('brdAlc', {
                                type: 'checkbox',
                            })}
                        />
                        <p className={styles.p}>Speakup宣傳通知</p>
                        <Checkbox
                            size="md"
                            {...notifyForm.getInputProps('ads', {
                                type: 'checkbox',
                            })}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

const AccountActions = () => {
    return (
        <div className="w-full bg-white pb-10 lg:bg-neutral-50 ">
            <div className="mx-6 flex h-20 items-center justify-between py-5 md:mx-16">
                <h1 className="text-2xl text-neutral-800">帳號行動</h1>
            </div>
            <div className="flex flex-col gap-8 px-6 text-left md:grid md:grid-cols-[4fr,6fr] md:items-center ">
                <p className={styles.p}>登出帳號</p>
                <Button variant="outline" className="w-16">
                    登出
                </Button>
                <p className={styles.p}>意見回饋</p>
                <Button variant="outline" className="w-28">
                    意見回饋
                </Button>
            </div>
        </div>
    );
};
export { BasicSettingsCard, NotificationSettingsCard, AccountActions };
