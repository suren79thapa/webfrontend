import { useGetProductsQuery } from "../product/productApi.js";
import { Avatar, Card, IconButton, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Product", "Price", "CreatedAt", "Edit", "Delete"];

export default function AdminUi() {
  const { isLoading, error, data } = useGetProductsQuery();
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1 className="text-red-500">{error.data}</h1>;
  console.log(data);
  return (
    <div className="p-5">
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
                      <Avatar />
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
                      <IconButton size="sm" color="purple">
                        <i className="fas fa-edit" />
                      </IconButton>
                    </td>
                    <td className="p-4">
                      <IconButton size="sm" color="pink">
                        <i className="fas fa-trash" />
                      </IconButton>
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
