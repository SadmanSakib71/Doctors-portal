import Axios from "axios";
import { rootUrl } from "./rootUrl";

async function put(url, body = {}) {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authorization token not found");
    }
    const res = await Axios.put(`${rootUrl}${url}`, body, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
}

export default put;
