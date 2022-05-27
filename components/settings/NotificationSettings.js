import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { isEqual } from 'lodash';

import { Button, Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';

const styles = {
    button: 'flex h-11 w-20 items-center justify-center rounded-md bg-primary-700 hover:bg-primary-600 text-white focus:outline-none',
    p: 'text-left md:text-right text-lg leading-[44px] text-neutral-800',
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

export default NotificationSettingsCard;
