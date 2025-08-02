export interface Story {
  _id: string; // API 명세에 따라 id → _id 변경
  title: string;
  description?: string;
  thumbnailUrl: string; // API 명세에 따라 image → thumbnailUrl 변경
  category: string;
  creator?: string; // 스토리 작성자 ID
  rating?: number;
  visited?: number;
  playCount?: number; // 방문 수 추가 필드
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
