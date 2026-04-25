import Axios from "axios";
import { rootUrl } from "./rootUrl";

async function get(url) {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("Authorization token not found");
  }
  const res = await Axios.get(`${rootUrl}${url}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res;
}

export default get;
