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
import { useAddProductMutation } from "../product/productApi.js";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
export const supportedFormats = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];
export const commonSchema = {
  title: Yup.string()
    .min(5, "Title must be at least 3 characters")
    .required("Title is required"),
  description: Yup.string()
    .min(10, "Description must be at least 3 characters")
    .required("Description is required"),
  price: Yup.number().required("Price is required"),
  stock: Yup.number().required("Stock is required"),
  brand: Yup.string().required("Brand is required"),
  category: Yup.string().required("Category is required"),
};
export const valSchema = Yup.object({
  ...commonSchema,
  image: Yup.mixed()
    .required("image is required")
    .test("fileType", "invalidFileType", (val) => {
      return val && supportedFormats.includes(val.type);
    })
    .test("fileSize", "File size is too large", (val) => {
      return val && val.size <= 5 * 1024 * 1024;
    }),
});

export default function ProductAddForm() {
  const [addProduct, { isLoading }] = useAddProductMutation();
  const { user } = useSelector((state) => state.userSlice);
  const nav = useNavigate();
  return (
    <div className="p-5">
      <Formik
        initialValues={{
          title: "",
          description: "",
          price: "",
          image: "",
          stock: "",
          brand: "",
          category: "",
          imageReview: "",
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
            formData.append("image", val.image);
            await addProduct({
              data: formData,
              token: user.token,
            }).unwrap();
            toast.success("Product Added Successfully");
            nav(-1);
          } catch (err) {
            toast.error(err.data.message);
          }
        }}
        validationSchema={valSchema}
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
                  console.log(file);
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
                  src={values.imageReview}
                  alt=""
                />
              )}
            </div>
            <Button loading={isLoading} type="submit">
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export const categories = [
  "Mobile",
  "Laptop",
  "Tablet",
  "Accessory",
  "Shoes",
  "Clothing",
  "Electronics",
  "Home Appliances",
];

export const brands = [
  "Apple",
  "Samsung",
  "Sony",
  "Xiaomi",
  "Dell",
  "HP",
  "Nike",
  "Adidas",
  "Puma",
  "Levi's",
];
