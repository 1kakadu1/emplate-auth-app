import { Alert, Box, Button, Container, Grid, Typography } from "@mui/material";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RoutsPath } from "../../application/application.model";
import { InputField } from "../../components/fields/input/input-field.component";
import AuthServices from "../../services/AuthServices";
import { toUserAction } from "../../store/reducer/user/user.reducer";
import { toUserSelector } from "../../store/reducer/user/user.selector";
import { loginFormSchema } from "./login.schema";

interface ILoginInit {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const dispatch = useDispatch();
  const error = useSelector(toUserSelector.error);
  const initValue: ILoginInit = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const onSubmit = (values: ILoginInit) => {
    AuthServices.login(values.email, values.password)
      .then((r) => {
        console.log("login", r.data);
        dispatch(toUserAction.setUser(r.data));
        navigate(RoutsPath.home);
      })
      .catch((e) => {dispatch(toUserAction.setUserError(e.error))});
  };
  return (
    <Container maxWidth="xl">
      <Box p={5} />
      <Formik
        initialValues={initValue}
        validationSchema={loginFormSchema}
        onSubmit={(values) => {
          onSubmit(values);
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
                <Grid item xs={12}>
                  <Grid container xs={12} justifyContent="space-between">
                    <Button variant="contained">
                      <Link
                        to={RoutsPath.registration}
                        style={{
                          color: "#fff",
                          textDecoration: "none",
                        }}
                      >
                        <Typography textAlign="center">Sing Up</Typography>
                      </Link>
                    </Button>
                    <Button variant="contained" type="submit" disabled={isSubmitting}>
                      Send
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Box p={2} />
              {
                  error && <Grid item xs={12}><Alert severity="error">{error}</Alert></Grid>
              }
            </Container>
          </form>
        )}
      </Formik>
      
      <Box p={2} />
    </Container>
  );
};
