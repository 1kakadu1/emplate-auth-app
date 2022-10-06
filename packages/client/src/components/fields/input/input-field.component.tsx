import React from "react";
import { FilledInput, FormControl, InputLabel } from "@mui/material";
import { IFieldInput } from "./input-field.model";
import { SpanErrorField, sxInputField } from "./input-field.styles";

const inputIdSlug = "filled-adornment-";

export const InputField = ({
  label,
  name,
  animClass = "",
  type = "text",
  value,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleFocus,
}: IFieldInput) => {
  return (
    <FormControl
      className={`${animClass}`}
      sx={sxInputField.formControl}
      variant="filled"
    >
      <InputLabel
        htmlFor={inputIdSlug + name}
        sx={sxInputField.formControlLabel}
      >
        {label}
      </InputLabel>
      <FilledInput
        id={inputIdSlug + name}
        name={name}
        sx={{
          "& .MuiFilledInput-input": {
            paddingLeft: "11px",
          },
        }}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />

      <SpanErrorField>{errors && touched && errors}</SpanErrorField>
    </FormControl>
  );
};
