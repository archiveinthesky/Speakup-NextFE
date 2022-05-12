import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, MultiSelect, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/outline';
import { isEqual } from 'lodash';

const ArticleEditor = ({ data, submitChanges, discardChanges }) => {
    const form = useForm({
        initialValues: data,
        validate: {
            title: (title) => (console.log('Hello') < 5 ? '標題過短' : null),
            tags: (tags) => (tags.length == 0 ? '請至少選擇一個標籤' : null),
            brief: (brief) => (brief.length < 50 ? '議題過短' : null),
            supContent: (brief) => (brief.length < 50 ? '議題過短' : null),
            agnContent: (brief) => (brief.length < 50 ? '議題過短' : null),
            refLinks: (link) =>
                refLinks.length < 2 ? '請至少附上兩篇相關文章' : null,
        },
    });
    const [refLinks, setRefLinks] = useState([]);

    useEffect(() => {
        console.log(form.getInputProps('title'));
        setRefLinks(data.refLinks);
    }, []);

    useEffect(() => {
        console.log(form.values);
    }, [form.values]);

    //prettier-ignore
    const tags = ['娛樂', '環境', '司法', '國家發展', '經濟', '少數族群', '媒體', '醫藥', '道德', '政治', '教育', '家庭', '女性', '自由', '宗教', '科技', '社會政策', '社會運動', '體育'];

    const urlTest =
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

    const organizeData = () => {
        let data = form.values;
        form.refLinks = refLinks;
        return data;
    };

    const handleSubmit = () => {};

    return (
        <form
            className="mt-7 w-full bg-neutral-50 py-7 px-9"
            onSubmit={form.onSubmit(handleSubmit)}
        >
            <div className="flex w-full flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
                <Textarea
                    classNames={{
                        root: 'flex-grow',
                        input: 'bg-transparent border-0 border-b-2 rounded-none text-3xl text-primary-700 pl-0 pb-2',
                    }}
                    minRows={1}
                    {...form.getInputProps('title')}
                    required
                />
                <div className="flex items-center justify-around gap-2">
                    <Button
                        className="bg-primary-700 hover:bg-primary-600"
                        onClick={submitChanges}
                        disabled={
                            isEqual(organizeData(), data) ? true : undefined
                        }
                        type="submit"
                    >
                        儲存
                    </Button>
                    <Button
                        className="bg-red-500 hover:bg-red-400"
                        color="red"
                        onClick={() => {
                            if (window.confirm('確定要捨棄變更？')) {
                                discardChanges();
                            }
                        }}
                    >
                        捨棄變更
                    </Button>
                </div>
            </div>

            <div className="mt-3 flex flex-col gap-6 text-neutral-700">
                <div>
                    <div>
                        <h3 className="mb-2 inline text-lg text-primary-600">
                            標籤
                        </h3>
                        <span
                            className="mantine-1m203yh mantine-Textarea-required"
                            aria-hidden="true"
                        >
                            {' *'}
                        </span>
                    </div>
                    <MultiSelect
                        className="bg-transparent"
                        classNames={{
                            input: 'bg-transparent',
                            label: 'bg-white',
                        }}
                        data={tags}
                        {...form.getInputProps('tags')}
                        searchable
                        maxSelectedValues={4}
                        clearable
                        required
                    />
                </div>
                <Textarea
                    label="簡述"
                    autosize
                    minRows={2}
                    classNames={{
                        label: 'text-lg text-primary-600 font-normal',
                        input: 'bg-transparent border-0 border-b-2 rounded-none',
                    }}
                    required
                    {...form.getInputProps('brief')}
                />
                <Textarea
                    label="支持者的立場"
                    autosize
                    minRows={2}
                    classNames={{
                        label: 'text-lg text-primary-600 font-normal',
                        input: 'bg-transparent border-0 border-b-2 rounded-none',
                    }}
                    required
                    {...form.getInputProps('supContent')}
                />
                <Textarea
                    label="反對者的立場"
                    autosize
                    minRows={2}
                    classNames={{
                        label: 'text-lg text-primary-600 font-normal',
                        input: 'bg-transparent border-0 border-b-2 rounded-none',
                    }}
                    required
                    {...form.getInputProps('agnContent')}
                />
                <div>
                    <div>
                        <h3 className="inline text-lg text-primary-600">
                            延伸閱讀
                        </h3>
                        <span
                            className="mantine-1m203yh mantine-Textarea-required"
                            aria-hidden="true"
                        >
                            {' *'}
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        {refLinks.map((link, i) => (
                            <div className="flex w-full gap-2" key={i}>
                                <TextInput
                                    classNames={{
                                        root: 'flex-grow',
                                        input: 'bg-transparent border-0 border-b-2 rounded-none',
                                    }}
                                    value={link}
                                    error={
                                        urlTest.test(link) || link.length == 0
                                            ? undefined
                                            : '請輸入一個網址'
                                    }
                                    onChange={(event) =>
                                        setRefLinks(
                                            refLinks
                                                .slice(0, i)
                                                .concat(
                                                    [
                                                        event.currentTarget
                                                            .value,
                                                    ].concat(
                                                        refLinks.slice(i + 1)
                                                    )
                                                )
                                        )
                                    }
                                />
                                <button
                                    className="flex-shrink-0 disabled:opacity-50"
                                    disabled={
                                        refLinks.length <= 1 ? true : undefined
                                    }
                                    onClick={() => {
                                        setRefLinks(refLinks.splice(i, 1));
                                    }}
                                >
                                    <XCircleIcon className="h-6 w-6 text-primary-600" />
                                </button>
                            </div>
                        ))}
                        <button
                            className="disabled:opacity-50"
                            disabled={
                                !urlTest.test(refLinks[refLinks.length - 1]) ||
                                refLinks[refLinks.length - 1].length == 0
                            }
                            onClick={() => {
                                setRefLinks(refLinks.concat(['']));
                            }}
                        >
                            <PlusCircleIcon className=" h-6 w-6 text-primary-600 " />
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ArticleEditor;
