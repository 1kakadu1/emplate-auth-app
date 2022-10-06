import styled from "@emotion/styled";

export const sxInputField = {
  formControl: {
    marginBottom: "25px",
    position: "relative",
    width: "100%",
  },

  formControlInput: {},

  formControlLabel: {},
};

export const SpanErrorField = styled("span")({
  color: "red",
  textAlign: "right",
  fontSize: "12px",
  position: "absolute",
  bottom: "-19px",
  right: "0px",
  fontFamily: "Lato",
  fontWeight: 800,
});
