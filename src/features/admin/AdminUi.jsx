import { useNavigate } from "react-router";
import { baseUrl } from "../../app/appUrl.js";
import { useGetProductsQuery } from "../product/productApi.js";
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import RemoveProduct from "./RemoveProduct.jsx";

const TABLE_HEAD = ["Product", "Price", "CreatedAt", "Edit", "Delete"];

export default function AdminUi() {
  const { isLoading, error, data } = useGetProductsQuery();
  const nav = useNavigate();
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1 className="text-red-500">{error.data}</h1>;
  console.log(data);
  return (
    <div className="px-10 py-5">
      <div className="flex justify-end mb-5">
        <Button
          onClick={() => nav("/product-add-form")}
          className="bg-purple-500"
        >
          Add Product
        </Button>
      </div>
      {data && (
        <Card className="h-full w-full overflow-scroll">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.products.map(
                ({ _id, title, image, price, createdAt }, index) => (
                  <tr key={_id} className="even:bg-blue-gray-50/50">
                    <td className="p-4 flex items-center gap-5">
                      <Avatar src={`${baseUrl}/${image}`} />
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {title}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        Rs.{price}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {createdAt}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <IconButton
                        onClick={() => nav(`/product-edit/${_id}`)}
                        size="sm"
                        color="purple"
                      >
                        <i className="fas fa-edit" />
                      </IconButton>
                    </td>
                    <td className="p-4">
                      <RemoveProduct id={_id} />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
