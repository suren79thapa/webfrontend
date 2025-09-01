import { Formik } from "formik";
import { useGetUserQuery, useUpdateUserMutation } from "../auth/authApi.js";
import { Button, Input } from "@material-tailwind/react";
import * as Yup from "yup";
import toast from "react-hot-toast";
const valSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  username: Yup.string()
    .min(3, "username must be atleast 3 character")
    .required("username is required"),
});
export default function UserProfile({ user }) {
  const { isLoading, error, data } = useGetUserQuery(user.token);
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1 className="text-red-500">{error.data?.message}</h1>;
  return (
    <div className="p-5">
      <Formik
        initialValues={{
          email: data.email,
          username: data.username,
        }}
        validationSchema={valSchema}
        onSubmit={async (val) => {
          try {
            await updateUser({
              token: user.token,
              data: val,
            }).unwrap();
            toast.success("Profile Updated Successfully");
          } catch (err) {
            toast.error(err.data.message);
          }
        }}
      >
        {({ handleChange, handleSubmit, touched, errors, values }) => (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Input
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={touched.email && errors.email}
              />
              {touched.email && errors.email && (
                <p className="text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <Input
                label="Username"
                name="username"
                value={values.username}
                onChange={handleChange}
                error={touched.username && errors.username}
              />
              {touched.username && errors.username && (
                <p className="text-red-500">{errors.username}</p>
              )}
            </div>
            <Button loading={updateLoading} type="submit">
              Update
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
