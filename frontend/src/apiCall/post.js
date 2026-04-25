import axios from "axios";
import { rootUrl } from "./rootUrl";

async function post(url, body = {}, token) {
  try {
    const config = token
      ? {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      : {};

    const res = await axios.post(`${rootUrl}${url}`, body, config);
    return await res;
  } catch (error) {
    return error;
  }
}

export default post;
