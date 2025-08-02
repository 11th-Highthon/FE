export interface Story {
  id: number;
  title: string;
  description?: string;
  image: string;
  category: string;
  rating?: number;
  visited?: number;
  level?: 'low' | 'mid' | 'high';
  comments?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface StoriesResponse {
  stories: Story[];
  total: number;
  page?: number;
  limit?: number;
}

export interface ApiStoriesResponse {
  success: boolean;
  data: Story[];
  message?: string;
}
