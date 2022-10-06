import { FormikHandlers } from "formik";

export interface IFieldInput {
  label: string;
  name: string;
  animClass?: string;
  type?: string;
  value: string;
  errors: string | undefined;
  touched: boolean | undefined;
  handleChange: FormikHandlers["handleChange"];
  handleBlur: FormikHandlers["handleBlur"];
  handleFocus: () => void;
}
