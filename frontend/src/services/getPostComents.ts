import axios from "axios";

const getPostComments = async (postId: string) => {
  const base_url = import.meta.env.VITE_BASE_URL as string;
  try {
    await axios.get(`${base_url}/api/v1/notes/comments/${postId}`, );
  } catch {
    (error: any) => {
      console.error("Error in addDislikeLikeToDemand:", error);
      throw error;
    };
  }
};

export default getPostComments;
