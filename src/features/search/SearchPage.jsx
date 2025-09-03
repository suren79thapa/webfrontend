import { useSearchParams } from "react-router";
import SearchInput from "./SearchInput.jsx";
import { useGetProductsQuery } from "../product/productApi.js";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Rating,
  Typography,
} from "@material-tailwind/react";
import { baseUrl } from "../../app/appUrl.js";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.toString());
  const { data, isLoading, error } = useGetProductsQuery(searchParams.get("q"));
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1 className="text-red-500">{error.data}</h1>;
  console.log(data);
  return (
    <div className="p-5">
      <SearchInput setSearchParams={setSearchParams} />
      <div className="grid grid-cols-4 px-10 gap-2">
        {data &&
          data.products.map((product) => {
            return (
              <Card key={product._id} className="mt-6 ">
                <CardHeader color="blue-gray" className="relative h-56">
                  <img src={`${baseUrl}/${product.image}`} alt="card-image" />
                </CardHeader>
                <CardBody>
                  <div className="flex justify-between">
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      {product.title}
                    </Typography>
                    <p>Rs.{product.price}</p>
                  </div>
                  <Rating readonly value={product.rating} />
                  <p className="line-clamp-3">{product.description}</p>
                </CardBody>
                <CardFooter className="pt-0">
                  <Button onClick={() => nav(`/product/${product._id}`)}>
                    View Detail
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
