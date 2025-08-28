import { useParams } from "react-router";
import { useGetProductQuery } from "./productApi.js";
import { baseUrl } from "../../app/appUrl.js";
import { Rating, Typography } from "@material-tailwind/react";
import AddToCart from "../cart/AddToCart.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const { isLoading, error, data } = useGetProductQuery(id);
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1 className="text-red-500">{error.data}</h1>;
  return (
    <div className="grid grid-cols-[1fr_2fr] p-5 gap-6">
      <div>
        <img src={`${baseUrl}/${data.image}`} alt="" />
      </div>
      <div className="space-y-3">
        <Typography variant="h4">{data.title}</Typography>
        <div className="text-gray-700 space-y-3">
          <p>{data.description}</p>
          <p>Rs.{data.price}</p>
          <p>Brand: {data.brand}</p>
          <Rating readonly value={data.rating} />
        </div>
        <AddToCart product={data} />
      </div>
    </div>
  );
}
