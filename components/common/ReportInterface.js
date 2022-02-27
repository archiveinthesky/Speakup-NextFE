import { useState } from "react";

const ReportInterface = ({ title, options, submitFunction, closeFunction }) => {
  const [displayTitle, setDisplayTitle] = useState(title);
  const [displayOptions, setDisplayOptions] = useState(options);
  const [reportOption, setReportOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="fixed top-0 left-0 z-30 flex h-screen w-screen items-center justify-center">
      <span
        className="absolute top-0 left-0 z-30 h-screen w-screen bg-neutral-800 opacity-70"
        onClick={closeFunction}
      />
      <div className="z-40 w-5/6 max-w-[24rem] rounded-2xl bg-neutral-50 p-6 ">
        <h3 className="text-2xl text-neutral-800">{displayTitle}</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitFunction();
            setDisplayTitle("我們已收到您的檢舉");
            setDisplayOptions([]);
            setSubmitted(true);
          }}
        >
          <ul>
            {displayOptions.map((option, i) => (
              <li key={i} className="my-4 list-none text-xl text-neutral-800">
                <input
                  type="radio"
                  name="reason"
                  id={`reportReason${i}`}
                  onChange={() => {
                    setReportOption(i);
                    console.log(reportOption);
                  }}
                />
                <label htmlFor={`reportReason${i}`} className="ml-2">
                  {option}
                </label>
              </li>
            ))}
          </ul>
          {submitted ? (
            <button
              className="mt-6 h-10 w-16 rounded-lg bg-primary-500 text-sm text-white"
              onClick={closeFunction}
            >
              關閉
            </button>
          ) : (
            <button
              type="submit"
              className="h-10 w-16 rounded-lg bg-primary-500 text-sm text-white disabled:opacity-75"
              disabled={reportOption === null}
            >
              提交
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ReportInterface;
