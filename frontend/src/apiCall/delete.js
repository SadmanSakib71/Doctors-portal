import Axios from "axios";
import { rootUrl } from "./rootUrl";
async function remove(url) {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authorization token not found");
    }
    const res = await Axios.delete(`${rootUrl}${url}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
}

export default remove;
