import { useForm, FormProvider, type FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {  Grid } from "@mui/material";
import FormField from "./fields";

import {  useEffect, useState } from "react";
import type { FormFieldProps } from "../../Dto/formDto";

interface CommonFormProps<T> {
  fields?: FormFieldProps<T>[];
  onSubmit: (data: T) => Promise<void>;
  defaultValues?: import("react-hook-form").DefaultValues<T>;
  validationSchema?: yup.ObjectSchema<any>;
  children?: React.ReactNode;
  shouldReset?: boolean;
  watchFields?: { name: string; callback: (val: any) => void }[];
}



function CommonForm<T extends FieldValues>({
  fields,
  onSubmit,
  defaultValues ,
  validationSchema,
  shouldReset = false,
  children,
  watchFields = [],
}: CommonFormProps<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const methods = useForm<T>({
    defaultValues,
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (shouldReset ||(defaultValues&& Object.keys(defaultValues)?.length > 0)) {
      reset(defaultValues as T);
    }
  }, [defaultValues, shouldReset]);
  
  useEffect(() => {
    if (watchFields.length > 0) {
      // const subscription = 
      watchFields.map((field) => {
        return methods.watch((value, { name }) => {
          if (name === field.name) {
            field.callback(value[field.name])
          }
        })
      })

      // return () => {
      //   subscription.forEach((unsubscribe) => unsubscribe?.())
      // }
    }
  }, [methods, watchFields])
  const handleFormSubmit = async (data: T) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form id="common-form" onSubmit={handleSubmit(handleFormSubmit)}>
     {children? children:  <Grid container spacing={2}>
          {fields?.map((field) => (
            !field.hide && 
            <Grid 
             size={{
              xs:field?.size?.sm || 12,
              sm:field?.size?.md || 6,
              md:field?.size?.lg || 4} }
              key={field.name}
            >
              <FormField {...field} disabled={field.disabled??isSubmitting} />
            </Grid>
          ))}
        </Grid>}
      </form>
    </FormProvider>
  );
}

export default CommonForm;
