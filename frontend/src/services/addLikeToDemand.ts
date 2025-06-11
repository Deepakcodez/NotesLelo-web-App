import axios from "axios";
import { mutate } from "swr";
const token = localStorage.getItem("useDataToken");
const groupId = localStorage.getItem("groupId");

const addLikeToDemand = (demandId: string) => {
  const base_url = import.meta.env.VITE_BASE_URL as string;

  return axios
    .post(
      `${base_url}/api/v1/demand/like`,
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
    })
    .catch((error) => {
      console.error("Error in addLikeToDemand:", error);
      throw error;
    });
};

export default addLikeToDemand;
