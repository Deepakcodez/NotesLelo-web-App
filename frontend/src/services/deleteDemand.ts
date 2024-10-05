import axios from "axios";
import { mutate } from "swr";
const token = localStorage.getItem("useDataToken");
const groupId = localStorage.getItem("groupId");

const deleteDemand = async(demandId: string) => {
     console.log('>>>>>>>>>>>', demandId, groupId)
  return axios
    .post(
      "https://notes-lelo-app-backend.vercel.app/api/v1/demand/delete",
      { demandId, groupId},
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

export default deleteDemand;
