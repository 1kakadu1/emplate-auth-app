import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { RoutsPath } from "../../application/application.model";
import { InputField } from "../../components/fields/input/input-field.component";
import AuthServices from "../../services/AuthServices";
import { registrationSchema } from "./registration.schema";

interface IRegistrationInit {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const RegistrationPage = () => {
  const initValue: IRegistrationInit = {
    email: "",
    password: "",
    passwordConfirmation: "",
  };
  const navigate = useNavigate();
  const onSubmit = (
    values: IRegistrationInit,
    helpers: FormikHelpers<IRegistrationInit>
  ) => {
    AuthServices.registation(values.email, values.password)
      .then((r) => {
        navigate(RoutsPath.login);
      })
      .catch((e) => console.log("registation error", e.response.data.error));
  };

  return (
    <Container maxWidth="xl">
      <Box p={2} />
      <Formik
        initialValues={initValue}
        validationSchema={registrationSchema}
        onSubmit={(values, helpers) => {
          onSubmit(values, helpers);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setSubmitting,
          isSubmitting,
          setFieldValue,
          validateField,
        }) => (
          <form onSubmit={handleSubmit} className={""} autoComplete="off">
            <Container maxWidth="sm">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputField
                    label={"Login"}
                    type={"email"}
                    name={"email"}
                    value={values.email}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    handleFocus={() => setSubmitting(false)}
                    errors={errors.email}
                    touched={touched.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <InputField
                        label={"Password"}
                        type={"password"}
                        name={"password"}
                        value={values.password}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        handleFocus={() => setSubmitting(false)}
                        errors={errors.password}
                        touched={touched.password}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputField
                        label={"Confirm password"}
                        type={"password"}
                        name={"passwordConfirmation"}
                        value={values.passwordConfirmation}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        handleFocus={() => setSubmitting(false)}
                        errors={errors.passwordConfirmation}
                        touched={touched.passwordConfirmation}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container xs={12} justifyContent="space-between">
                    <Button variant="contained">
                      <Link
                        to={RoutsPath.login}
                        style={{
                          color: "#fff",
                          textDecoration: "none",
                        }}
                      >
                        <Typography textAlign="center">Sing In</Typography>
                      </Link>
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={
                        isSubmitting ||
                        !!(errors.email && touched.email) ||
                        !!(errors.password && touched.password)
                      }
                    >
                      Registration
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </form>
        )}
      </Formik>
      <Box p={2} />
    </Container>
  );
};
