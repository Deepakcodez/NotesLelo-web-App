import axios from "axios";
import { mutate } from "swr";
const token = localStorage.getItem("useDataToken");
const groupId = localStorage.getItem("groupId");

const addDisLikeToDemand = (demandId: string) => {
 
  const base_url = import.meta.env.VITE_BASE_URL as string;

  const Url = `http://localhost:8000/api/v1/demand/dislike`;
  return axios
    .post(
      Url,
      { demandId },
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

export default addDisLikeToDemand;
