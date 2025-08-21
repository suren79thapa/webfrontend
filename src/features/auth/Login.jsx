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
import { useLoginUserMutation } from "./authApi.js";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../user/userSlice.js";
// now we will be creating the validation schema
const valSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .min(3, "password must be atleast 3 character")
    .required("Password is required"),
});
export default function Login() {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [show, setShow] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="p-5  max-w-[400px]">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (val) => {
          try {
            const res = await loginUser(val).unwrap();
            // console.log("Login response:", res);
            toast.success("Login successfull");
            dispatch(setUser(res));
            nav(-1);
          } catch (err) {
            console.error("Login error:", err);
            toast.error(err.data.message);
          }
        }}
        validationSchema={valSchema}
      >
        {({ handleChange, handleSubmit, errors, values, touched }) => (
          <form onSubmit={handleSubmit} className="space-y-5 ">
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
        Don't have an account ?
        <Button
          onClick={() => nav("/register")}
          size="sm"
          variant="text"
          className="font-medium text-gray-900"
        >
          Sign Up
        </Button>
      </Typography>
    </div>
  );
}
