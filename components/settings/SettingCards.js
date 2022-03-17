import { Switch } from '@headlessui/react';
import { cloneDeep } from 'lodash';
import { useState, useEffect } from 'react';

const styles = {
    input: 'h-11 w-full max-w-sm rounded-sm border border-neutral-200 py-2 px-4 text-lg text-neutral-600 focus:outline-none',
    date: 'h-11 w-48 rounded-sm border border-neutral-200 py-2 px-4 text-lg text-neutral-600 focus:outline-none',
    button: 'flex h-11 w-20 items-center justify-center rounded-md bg-primary-800 text-white focus:outline-none',
    p: 'text-left md:text-right text-lg leading-[44px] text-neutral-800',
};

const BasicSettingsCard = ({ initValues }) => {
    const [todayDate, setTodayDate] = useState('');
    const [values, setValues] = useState(initValues);
    const [errors, setErrors] = useState({ name: [], username: [], email: [] });
    const [changed, setChanged] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);

    useEffect(() => {
        let today = new Date();
        setTodayDate(
            `${today.getFullYear()}-${
                today.getMonth() + 1 < 10
                    ? '0' + (today.getMonth() + 1)
                    : today.getMonth() + 1
            }-${today.getDate() < 10 ? '0' + today.getDate() : today.getDate()}`
        );
    }, []);

    useEffect(() => {
        setChanged(values != initValues);
    }, [values]);

    useEffect(() => {
        setDisableSubmit(
            Object.entries(errors).some((error) => {
                return error[1].length !== 0;
            })
        );
    }, [errors]);

    return (
        <div className=" w-full bg-white pb-10">
            <div className="mx-6 flex items-center justify-between py-5 md:mx-16">
                <h1 className=" text-2xl text-neutral-800 ">基本資料</h1>
                {changed && (
                    <button
                        className="flex h-11 w-20 items-center justify-center rounded-md bg-primary-800 text-white focus:outline-none disabled:bg-opacity-50"
                        disabled={disableSubmit}
                    >
                        儲存
                    </button>
                )}
            </div>
            <hr className=" mb-6 border-t-2" />
            <div className="flex flex-col gap-8 px-6 text-left md:grid md:grid-cols-[4fr,6fr] md:text-right">
                <p className={styles.p}>您的姓名</p>
                <div className="text-left">
                    <input
                        type="text"
                        className={styles.input}
                        value={values.name}
                        onChange={(e) => {
                            let newValues = cloneDeep(values),
                                newError = (newError = cloneDeep(errors));
                            newValues.name = e.target.value;
                            newError.name = [];
                            if (e.target.value.length >= 50) {
                                newError.name.push('名稱過長，建議您使用縮寫');
                            }
                            setValues(newValues);
                            setErrors(newError);
                        }}
                    />
                    {errors.name.map((e, i) => (
                        <p key={i} className="text-red-500">
                            {e}
                        </p>
                    ))}
                </div>

                <p className={styles.p}>您的使用者名稱</p>
                <div className="text-left">
                    <input
                        type="text"
                        className={styles.input}
                        value={values.username}
                        onChange={(e) => {
                            let newValues = cloneDeep(values),
                                newError = (newError = cloneDeep(errors));
                            newValues.username = e.target.value;
                            newError.username = [];
                            if (e.target.value.length >= 50) {
                                newError.username.push('使用者名稱過長');
                            }
                            if (e.target.value.indexOf(' ') >= 0)
                                newError.username.push(
                                    '使用者名稱不得包含空白'
                                );
                            setValues(newValues);
                            setErrors(newError);
                        }}
                    />
                    {errors.username.map((e, i) => (
                        <p key={i} className="text-red-500">
                            {e}
                        </p>
                    ))}
                </div>

                <p className={styles.p}>您的生日</p>
                <input
                    type="date"
                    max={todayDate}
                    min="1900-01-01"
                    value={values.birthday}
                    onChange={(e) => {
                        let newValues = cloneDeep(values);
                        newValues.birthday = e.target.value;
                        setValues(newValues);
                    }}
                    className={styles.date}
                />

                <p className={styles.p}>您的頭像</p>
                <button className={styles.button}>上傳</button>

                <p className={styles.p}>您的電子郵件</p>
                <div className="text-left">
                    <input
                        type="text"
                        className={styles.input}
                        value={values.email}
                        onChange={(e) => {
                            let newValues = cloneDeep(values),
                                newError = (newError = cloneDeep(errors));
                            newValues.email = e.target.value;
                            newError.email = [];
                            let re =
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if (
                                !re.test(e.target.value) &&
                                e.target.value.length !== 0
                            ) {
                                newError.email.push('請確認信箱格式輸入正確');
                            }
                            setValues(newValues);
                            setErrors(newError);
                        }}
                    />
                    {errors.email.map((e, i) => (
                        <p key={i} className="text-red-500">
                            {e}
                        </p>
                    ))}
                </div>

                <p className={styles.p}>您的密碼</p>
                <button className={styles.button}>修改</button>
            </div>
        </div>
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
            <div className="flex flex-col gap-8 px-6 text-left md:grid md:grid-cols-[4fr,6fr] md:text-right">
                <p className={styles.p}>檢舉結果通知</p>
                <Switch
                    checked={reported}
                    onChange={setReported}
                    className={`${
                        reported ? 'bg-blue-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                    <span
                        aria-hidden="true"
                        className={`transform transition duration-200 ease-in-out ${
                            reported ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white`}
                    ></span>
                </Switch>
            </div>
        </div>
    );
};

export { BasicSettingsCard, NotificationSettingsCard };
