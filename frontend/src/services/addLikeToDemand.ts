import axios from "axios";
import { mutate } from "swr";
const token = localStorage.getItem("useDataToken");
const groupId = localStorage.getItem("groupId");

const addLikeToDemand = (demandId: string) => {
    // https://notes-lelo-app-backend.vercel.app/api/v1/demand/like
  return axios
    .post(
      "http://localhost:8000/api/v1/demand/like",
      { demandId },
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    )
    .then((response) => {
        mutate(
            `http://localhost:8000/api/v1/demand/demands/${groupId}`
          );
    })
    .catch((error) => {
      console.error("Error in addLikeToDemand:", error);
      throw error;
    });
};

export default addLikeToDemand;
