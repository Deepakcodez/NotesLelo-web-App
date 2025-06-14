import axios from "axios";
import { mutate } from "swr";
const token = localStorage.getItem("useDataToken");
const groupId = localStorage.getItem("groupId");

const deletePost = async (postId: string) => {
  const base_url = import.meta.env.VITE_BASE_URL as string;

  return axios
    .post(
      `${base_url}/api/v1/notes/delete`,
      { postId, groupId },
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    )
    .then((response) => {
      mutate(`${base_url}/api/v1/demand/demands/${groupId}`);
      console.log(">>>>>>>>>>>", response.data);
    })
    .catch((error) => {
      console.error("Error in addDislikeLikeToDemand:", error);
      throw error;
    });
};

export default deletePost;
