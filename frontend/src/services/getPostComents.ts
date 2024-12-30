import axios from "axios";

const getPostComments = async (postId: string) => {
  const base_url = import.meta.env.VITE_BASE_URL as string;
  let resp;
  try {
    resp = await axios.get(`${base_url}/api/v1/notes/comment/${postId}`);
  } catch {
    (error: any) => {
      console.error("Error in addDislikeLikeToDemand:", error);
      throw error;
    };
  }

  return resp?.data.comments;
};

export default getPostComments;
