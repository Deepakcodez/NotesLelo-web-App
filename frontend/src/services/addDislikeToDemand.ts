import axios from "axios";
import { mutate } from "swr";
const token = localStorage.getItem("useDataToken");
const groupId = localStorage.getItem("groupId");

const addDisLikeToDemand = (demandId: string) => {
  // https://notes-lelo-app-backend.vercel.app/api/v1/demand/like
  const Url = "https://notes-lelo-app-backend.vercel.app/api/v1/demand/dislike";
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
      mutate(
        `https://notes-lelo-app-backend.vercel.app/api/v1/demand/demands/${groupId}`
      );
      console.log(">>>>>>>>>>>", response.data);
    })
    .catch((error) => {
      console.error("Error in addDislikeLikeToDemand:", error);
      throw error;
    });
};

export default addDisLikeToDemand;
