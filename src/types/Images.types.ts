export type ImageDataType = {
  id: number;
  alt_description: string;
  description?: string;
  urls: { [key: string]: string };
  user: {
    name: string;
    profile_image: { [key: string]: string };
    instagram_username?: string;
    twitter_username?: string;
  };
};

export interface PhotoResponse {
  results: ImageDataType[];
  total_pages: number;
  total: number;
}
