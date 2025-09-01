import { useSelector } from "react-redux";
import OrderList from "../orders/OrderList.jsx";
import UserProfile from "./UserProfile.jsx";

export default function ProfilePage() {
  const { user } = useSelector((state) => state.userSlice);
  return (
    <div className="grid grid-cols-[1fr_1.5fr]">
      <UserProfile user={user} />
      <OrderList user={user} />
    </div>
  );
}
