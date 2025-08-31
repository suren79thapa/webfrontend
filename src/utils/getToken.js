import { getUserFromLocal } from "../features/local/local.js";

export const getToken = () => getUserFromLocal()?.token;
