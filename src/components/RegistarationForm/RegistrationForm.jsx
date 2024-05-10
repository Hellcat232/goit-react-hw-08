import { Formik, Form, Field, ErrorMessage } from "formik";
import { register } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Too short!")
    .max(20, "Too long!")
    .required("Required"),
});

export const RegistrationForm = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Registration</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={Schema}
        onSubmit={(values, action) => {
          dispatch(register(values));
          action.resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="name" />
            {touched.name && errors.name && <div>{errors.name}</div>}

            <Field name="email" />
            {touched.email && errors.email && <div>{errors.email}</div>}

            <Field name="password" />
            {touched.password && errors.password && (
              <div>{errors.password}</div>
            )}

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};