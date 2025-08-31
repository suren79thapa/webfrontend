import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../app/appUrl.js";
import { Button, IconButton } from "@material-tailwind/react";
import { clearCart, setCart } from "./cartSlice.js";
import { useCreateOrderMutation } from "../orders/orderApi.js";
import toast from "react-hot-toast";

export default function CartPage() {
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const { carts } = useSelector((state) => state.cartSlice);
  console.log(carts);
  const totalAmount = carts.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );
  const dispatch = useDispatch();
  const handleOrder = async () => {
    try {
      await createOrder({
        products: carts,
        totalAmount,
      }).unwrap();
      toast.success("Order place successfully");
      dispatch(clearCart());
    } catch (err) {
      toast.error(err.data.message);
    }
  };
  return (
    <div className="p-5">
      {carts.length === 0 ? (
        <h1>cart is empty</h1>
      ) : (
        <div>
          {carts.map((item) => {
            return (
              <div className="flex gap-3 items-center my-5" key={item.id}>
                <img
                  src={`${baseUrl}/${item.image}`}
                  alt=""
                  className="w-40 h-40"
                />
                <p>{item.title}</p>
                <p>Rs.{item.price}</p>
                <div className="flex gap-3 items-center">
                  <IconButton
                    size="sm"
                    disabled={item.qty === 1}
                    onClick={() =>
                      dispatch(
                        setCart({
                          ...item,
                          qty: item.qty - 1,
                        })
                      )
                    }
                  >
                    <i className="fas fa-minus" />
                  </IconButton>
                  <p className="font-body">{item.qty}</p>
                  <IconButton
                    size="sm"
                    disabled={item.qty === item.stock}
                    onClick={() =>
                      dispatch(
                        setCart({
                          ...item,
                          qty: item.qty + 1,
                        })
                      )
                    }
                  >
                    <i className="fas fa-add" />
                  </IconButton>
                </div>
              </div>
            );
          })}
          <h1>Total Amount Rs.{totalAmount}</h1>
          <Button loading={isLoading} onClick={handleOrder} className="mt-5">
            Place Order
          </Button>
        </div>
      )}
    </div>
  );
}
