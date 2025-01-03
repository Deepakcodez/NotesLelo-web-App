import axios from "axios";

const getUserById = async (userId: string | undefined) => {
  const base_url = import.meta.env.VITE_BASE_URL as string;
  let resp;
  try {
    resp = await axios.get(`http://localhost:8000/api/v1/user/${userId}`);
  } catch (error) {
    throw error;
  }

  return resp?.data?.data;
};

export default getUserById;
