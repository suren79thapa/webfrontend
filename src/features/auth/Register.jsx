import {
  Button,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import { Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { useRegisterUserMutation } from "./authApi.js";
import toast from "react-hot-toast";
// now we will be creating the validation schema
const valSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("username is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .min(3, "password must be atleast 3 character")
    .required("Password is required"),
});
export default function Register() {
  const [registeruser, { isLoading }] = useRegisterUserMutation();
  const [show, setShow] = useState(false);
  const nav = useNavigate();
  return (
    <div className="p-5  max-w-[400px]">
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        onSubmit={async (val) => {
          try {
            await registeruser(val).unwrap();
            toast.success("user registered successfully");
            nav(-1);
          } catch (err) {
            toast.error(err.data.message);
          }
        }}
        validationSchema={valSchema}
      >
        {({ handleChange, handleSubmit, errors, values, touched }) => (
          <form onSubmit={handleSubmit} className="space-y-5 ">
            <div>
              <Input
                name="username"
                label="Username"
                value={values.username}
                onChange={handleChange}
              />
              {touched.username && errors.username && (
                <p className="text-red-500">{errors.username}</p>
              )}
            </div>
            <div>
              <Input
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
              />
              {touched.email && errors.email && (
                <p className="text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="relative flex w-full max-w-[24rem]">
              <Input
                type={show ? "text" : "password"}
                label="Password"
                value={values.password}
                onChange={handleChange}
                name="password"
                className="pr-20"
                containerProps={{
                  className: "min-w-0",
                }}
              />
              <IconButton
                onClick={() => setShow(!show)}
                size="sm"
                className="!absolute right-1 top-1 rounded"
                variant="text"
              >
                <i className={`fas fa-${show ? "unlock" : "lock"} fa-lg`} />
              </IconButton>
            </div>
            <Button loading={isLoading} type="submit">
              Submit
            </Button>
          </form>
        )}
      </Formik>
      <Typography color="gray" className="mt-4 text-center font-normal">
        Already have an account ?
        <Button
          onClick={() => nav(-1)}
          size="sm"
          variant="text"
          className="font-medium text-gray-900"
        >
          Sign In
        </Button>
      </Typography>
    </div>
  );
}
