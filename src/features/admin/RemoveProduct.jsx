import { Button, IconButton } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useRemoveProductMutation } from "../product/productApi.js";
import toast from "react-hot-toast";

export default function RemoveProduct({ id }) {
  const [removeProduct, { isLoading }] = useRemoveProductMutation();
  // to get the token
  const { user } = useSelector((state) => state.userSlice);
  const handleRemove = async () => {
    try {
      await removeProduct({ id, token: user.token }).unwrap();
      toast.success("product deleted successfully");
    } catch (err) {
      toast.error(err.data.message);
    }
  };
  return (
    <div>
      <Button
        onClick={handleRemove}
        loading={isLoading}
        size="sm"
        className="px-3"
        color="pink"
      >
        <i className="fas fa-trash" />
      </Button>
    </div>
  );
}
