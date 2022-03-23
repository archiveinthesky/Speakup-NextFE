import React from 'react';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import {
    TextInput,
    Button,
    Modal,
    Group,
    PasswordInput,
    Switch,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { PhotographIcon } from '@heroicons/react/outline';

const styles = {
    button: 'flex h-11 w-20 items-center justify-center rounded-md bg-primary-600 text-white focus:outline-none',
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
                val.length >= 5 ? '名稱過長，建議您使用縮寫' : null,
            username: (val) =>
                (() => {
                    return val.length >= 20 ? '名稱過長' : null;
                })(),
            birthday: null,
            email: (val) =>
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    val
                )
                    ? null
                    : '信箱格式錯誤',
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

    return (
        <form
            className=" w-full bg-white pb-10"
            onSubmit={form.onSubmit((values) => console.log(values))}
        >
            <div className="mx-6 flex items-center justify-between py-5 md:mx-16">
                <h1 className=" text-2xl text-neutral-800 ">基本資料</h1>
                <Button
                    className="flex h-10 w-20 items-center justify-center rounded-md bg-primary-600 text-white focus:outline-none disabled:bg-opacity-50"
                    type="submit"
                >
                    儲存
                </Button>
            </div>
            <hr className=" mb-6 border-t-2" />
            <div className="flex flex-col gap-4 px-6 text-left md:grid md:grid-cols-[4fr,6fr] md:items-center md:gap-y-5 ">
                <p className={styles.p}>您的姓名</p>
                <TextInput
                    classNames={{ input: 'max-w-sm h-12 text-lg' }}
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
                                <div className=" flex items-center justify-center gap-4">
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

                <p className={styles.p}>您的密碼</p>
                <Button
                    className={styles.button}
                    onClick={() => {
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
                        onSubmit={pwdForm.onSubmit((values) => {
                            console.log(values);
                            setPwdOverlay(false);
                        })}
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
                                type="submit"
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

const NotificationSettingsCard = () => {
    const [reported, setReported] = useState(false);

    return (
        <div className=" w-full bg-white pb-10">
            <h1 className="mx-6 py-5 text-2xl text-neutral-800 md:mx-16">
                通知設定
            </h1>
            <hr className=" mb-6 border-t-2" />
            <div className="flex flex-col gap-8 px-6 text-left md:grid md:grid-cols-[4fr,6fr] md:items-center ">
                <p className={styles.p}>檢舉結果通知</p>
                <Switch
                    checked={reported}
                    onChange={(e) => {
                        setReported(e.currentTarget.checked);
                    }}
                />
            </div>
        </div>
    );
};

export { BasicSettingsCard, NotificationSettingsCard };
