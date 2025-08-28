import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../app/appUrl.js";
import { Button, IconButton } from "@material-tailwind/react";
import { setCart } from "./cartSlice.js";

export default function CartPage() {
  const { carts } = useSelector((state) => state.cartSlice);
  console.log(carts);
  const totalAmout = carts.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );
  const dispatch = useDispatch();
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
          <h1>Total Amout Rs.{totalAmout}</h1>
          <Button className="mt-5">Place Order</Button>
        </div>
      )}
    </div>
  );
}
