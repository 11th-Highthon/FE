// 사용자 프로필 관련 타입 정의
export interface UserProfile {
  id: number;
  username: string;
  email: string;
  profileImage?: string;
  rating: number;
  followers: number;
  following: number;
  level: string;
  levelName: string;
  badge?: string;
  createdAt: string;
}

export interface ApiUserResponse {
  success: boolean;
  data: UserProfile;
  message?: string;
}

// 실제 API 응답 구조
export interface ApiUserResponseActual {
  user: {
    _id: string;
    username: string;
    email: string;
    password: string;
    createdStories: any[];
    playedStories: any[];
    likedStories: any[];
    followers: any[];
    following: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

// 더미 데이터용 프로필
export const DUMMY_USER_PROFILE: UserProfile = {
  id: 1,
  username: '공포 마니아',
  email: 'hororlover@naver.com',
  profileImage: '/sample_nightmare.jpg',
  rating: 2,
  followers: 5,
  following: 12,
  level: 'Lv.2',
  levelName: '겁쟁이',
  badge: 'A60000',
  createdAt: '2024-01-01T00:00:00Z',
};
