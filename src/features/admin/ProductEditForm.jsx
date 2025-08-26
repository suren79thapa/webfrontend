import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "../product/productApi.js";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import {
  brands,
  categories,
  commonSchema,
  supportedFormats,
} from "./ProductAddForm.jsx";
import { baseUrl } from "../../app/appUrl.js";

export const editSchema = Yup.object({
  ...commonSchema,
  image: Yup.mixed()
    .test("fileType", "invalid file type", (val) => {
      return !val ? true : supportedFormats.includes(val.type);
    })
    .test("fileSize", "File size is too large", (val) => {
      return !val ? true : val.size <= 5 * 1024 * 1024;
    }),
});
export default function ProductEditForm() {
  const { id } = useParams();
  const { isLoading, error, data } = useGetProductQuery(id);
  const { user } = useSelector((state) => state.userSlice);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const nav = useNavigate();
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1 className="text-red-500">{error.data}</h1>;
  return (
    <div className="p-5">
      <Formik
        initialValues={{
          title: data.title,
          description: data.description,
          price: data.price,
          image: "",
          stock: data.stock,
          brand: data.brand,
          category: data.category,
          imageReview: data.image,
        }}
        onSubmit={async (val) => {
          const formData = new FormData();
          try {
            formData.append("title", val.title);
            formData.append("description", val.description);
            formData.append("price", val.price);
            formData.append("stock", val.stock);
            formData.append("brand", val.brand);
            formData.append("category", val.category);
            if (val.image) formData.append("image", val.image);
            await updateProduct({
              data: formData,
              id: id,
              token: user?.token,
            }).unwrap();
            toast.success("Product Updated Successfully");
            nav(-1);
          } catch (err) {
            console.log(err);
            toast.error(err.data.message);
          }
        }}
        validationSchema={editSchema}
      >
        {({
          handleChange,
          handleSubmit,
          errors,
          values,
          touched,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="max-w-[400px] space-y-5">
            <div>
              <Input
                label="Title"
                name="title"
                value={values.title}
                onChange={handleChange}
              />
              {touched.title && errors.title && (
                <p className="text-red-500">{errors.title}</p>
              )}
            </div>
            <div>
              <Textarea
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
              />
              {touched.description && errors.description && (
                <p className="text-red-500">{errors.description}</p>
              )}
            </div>
            <div>
              <Input
                label="Price"
                name="price"
                type="number"
                value={values.price}
                onChange={handleChange}
              />
              {touched.price && errors.price && (
                <p className="text-red-500">{errors.price}</p>
              )}
            </div>
            <div>
              <Input
                name="stock"
                label="Stock"
                type="number"
                value={values.stock}
                onChange={handleChange}
              />
              {touched.stock && errors.stock && (
                <p className="text-red-500">{errors.stock}</p>
              )}
            </div>
            <div>
              <Select
                name="category"
                value={values.category}
                onChange={(e) => setFieldValue("category", e)}
                label="Category"
              >
                {categories.map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
              {touched.category && errors.category && (
                <p className="text-red-500">{errors.category}</p>
              )}
            </div>
            <div>
              <Select
                name="brand"
                value={values.brand}
                onChange={(e) => setFieldValue("brand", e)}
                label="Brand"
              >
                {brands.map((brand) => (
                  <Option key={brand} value={brand}>
                    {brand}
                  </Option>
                ))}
              </Select>
              {touched.brand && errors.brand && (
                <p className="text-red-500">{errors.brand}</p>
              )}
            </div>
            <div>
              <Input
                label="Image"
                name="image"
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  // console.log(file);
                  setFieldValue("imageReview", URL.createObjectURL(file));
                  setFieldValue("image", file);
                }}
              />
              {touched.image && errors.image && (
                <p className="text-red-500">{errors.image}</p>
              )}
              {values.imageReview && !errors.image && (
                <img
                  className="mt-2 h-[200px]"
                  src={`${
                    values.image
                      ? values.imageReview
                      : baseUrl + "/" + values.imageReview
                  } `}
                  alt=""
                />
              )}
            </div>
            <Button loading={isUpdating} type="submit">
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
