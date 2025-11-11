"use client";

import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const StepperForm = ({ steps, submitHandler, navigateLink, persistKey }) => {
  const router = useRouter();

  const [current, setCurrent] = useState(
    !!getFromLocalStorage("step")
      ? Number(JSON.parse(getFromLocalStorage("step")).step)
      : 0
  );

  const [savedValues, setSavedValues] = useState(
    !!getFromLocalStorage(persistKey)
      ? JSON.parse(getFromLocalStorage(persistKey))
      : ""
  );

  useEffect(() => {
    setToLocalStorage("step", JSON.stringify({ step: current }));
  }, [current]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const methods = useForm({ defaultValues: savedValues });
  const watch = methods.watch();

  useEffect(() => {
    setToLocalStorage(persistKey, JSON.stringify(watch));
  }, [watch, persistKey, methods]);

  const { handleSubmit, reset } = methods;

  const handleStudentOnSubmit = (data) => {
    submitHandler(data);
    reset();
    setToLocalStorage("step", JSON.stringify({ step: 0 }));
    setToLocalStorage(persistKey, JSON.stringify({}));
    navigateLink && router.push(navigateLink);
  };

  return (
    <>
      <ul className="steps">
        {steps.map((item, index) => (
          <li
            key={index}
            className={`step ${index <= current ? "step-primary" : ""}`}
          >
            {item.title}
          </li>
        ))}
      </ul>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleStudentOnSubmit)}>
          <div>{steps[current].content}</div>
          <div style={{ marginTop: 24 }}>
            {current < steps.length - 1 && (
              <button type="primary" onClick={() => next()}>
                Next
              </button>
            )}
            {current === steps.length - 1 && (
              <button
                type="primary"
                htmlType="submit"
                // onClick={() => message.success("Processing complete!")}
              >
                Done
              </button>
            )}
            {current > 0 && (
              <button style={{ margin: "0 8px" }} onClick={() => prev()}>
                Previous
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default StepperForm;
