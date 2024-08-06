import axios from "axios";
import { PhotoResponse } from "./types/Images.types";

const BASE_URL = "https://api.unsplash.com";
const ACCESS_KEY = "GgvK89EzqrRrVzzR8Dqz3Ub9BwN1pu1hm0BA7vqvdJc";

export const searchImages = async (
  query: string,
  page: number = 1,
  perPage: number = 21
): Promise<PhotoResponse> => {
  try {
    const response = await axios.get<PhotoResponse>(
      `${BASE_URL}/search/photos`,
      {
        params: {
          query,
          client_id: ACCESS_KEY,
          page,
          per_page: perPage,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
