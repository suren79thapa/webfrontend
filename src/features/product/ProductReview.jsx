import { Formik } from "formik";
import { useGetProductQuery, useReviewProductMutation } from "./productApi.js";
import {
  Button,
  Option,
  Rating,
  Select,
  Textarea,
} from "@material-tailwind/react";
import toast from "react-hot-toast";

export default function ProductReview({ id, user }) {
  const { isLoading, error, data } = useGetProductQuery(id);
  const [reviewProduct, { isLoading: reviewLoading }] =
    useReviewProductMutation();
  return (
    <div className="p-5">
      <div className="max-w-[400px]">
        <h1 className="mb-2">Add Reviews </h1>
        <Formik
          initialValues={{
            rating: "",
            comment: "",
          }}
          onSubmit={async (val) => {
            try {
              await reviewProduct({
                data: val,
                token: user.token,
                id,
              }).unwrap();
              toast.success("Review added successfully");
            } catch (err) {
              toast.error(err.data.message);
            }
          }}
        >
          {({ handleSubmit, handleChange, values, setFieldValue }) => (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Select
                  value={values.rating}
                  onChange={(e) => setFieldValue("rating", Number(e))}
                  label="Rate product"
                  name="rating"
                >
                  <Option value="1">Worst</Option>
                  <Option value="2">bad</Option>
                  <Option value="3">Good</Option>
                  <Option value="4">Very Good</Option>
                  <Option value="5">Excellent</Option>
                </Select>
              </div>
              <div>
                <Textarea
                  value={values.comment}
                  onChange={handleChange}
                  name="comment"
                  label="type message"
                ></Textarea>
              </div>
              <Button loading={reviewLoading} type="submit">
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </div>
      <div>
        {data &&
          data.reviews.map((review) => {
            return (
              <div key={review._id} className="flex gap-5 items-center mt-7">
                <div className="space-y-3">
                  <h1>{review.user.username}</h1>
                  <Rating readonly value={review.rating} />
                  <p>{review.comment}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
