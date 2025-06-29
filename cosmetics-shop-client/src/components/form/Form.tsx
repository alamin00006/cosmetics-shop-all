/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactElement, ReactNode, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Toaster } from "react-hot-toast";

type FormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type FormProps = {
  children?: ReactElement | ReactNode;
  submitHandler: SubmitHandler<any>;
} & FormConfig;

const Form = ({
  children,
  submitHandler,
  defaultValues,
  resolver,
}: FormProps) => {
  const formConfig: FormConfig = {};

  if (!!defaultValues) formConfig["defaultValues"] = defaultValues;
  if (!!resolver) formConfig["resolver"] = resolver;
  const methods = useForm<FormProps>(formConfig);

  const {
    handleSubmit,
    reset,
    // formState: { isSubmitting }
  } = methods;

  const onSubmit = async (data: any) => {
    await submitHandler(data);
    // reset();
  };

  useEffect(() => reset(defaultValues), [defaultValues, reset, methods]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {children}
        {/* {typeof children === "function" ? children({ isSubmitting }) : children} */}
        <Toaster
          position="top-center"
          containerStyle={{ marginTop: "100px" }}
          reverseOrder={false}
        />
      </form>
    </FormProvider>
  );
};

export default Form;
