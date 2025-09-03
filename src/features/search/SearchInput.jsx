import { Input } from "@material-tailwind/react";
import { Formik } from "formik";
import { useNavigate } from "react-router";

export default function SearchInput({ isNav, setSearchParams }) {
  const nav = useNavigate();
  return (
    <div>
      <Formik
        initialValues={{
          search: "",
        }}
        onSubmit={(val, { resetForm }) => {
          if (isNav) {
            nav(`/search?q=${val.search}`);
          } else {
            setSearchParams({ q: val.search });
          }
          resetForm();
        }}
      >
        {({ handleSubmit, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <div className="w-72">
              <Input
                onChange={handleChange}
                name="search"
                label="Search Product"
                icon={<i className="fas fa-search" />}
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
