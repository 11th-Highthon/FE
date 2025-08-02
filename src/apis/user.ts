import { useQuery } from '@tanstack/react-query';
import { instance } from './instance';
import type { UserProfile, ApiUserResponse } from '../types/user';
import { DUMMY_USER_PROFILE } from '../types/user';

// 현재 사용자의 프로필 조회 (특정 ID 사용)
export const getCurrentUserProfile = async (): Promise<UserProfile> => {
  // 고정된 사용자 ID 사용
  const userId = '688e6a95932e0f5ae190c4b5';

  try {
    console.log('📡 사용자 프로필 API 조회 시작');
    console.log('📡 사용자 ID:', userId);

    const response = await instance.get(`/users/profile/${userId}`);
    console.log('✅ 프로필 API 응답 성공:', response.data);

    // 실제 API 응답 구조에 맞게 데이터 매핑
    const apiUser = response.data.user;

    const profileData: UserProfile = {
      id: 1, // 숫자 타입으로 변환
      username: apiUser.username || '사용자',
      email: apiUser.email || 'user@example.com',
      profileImage: '/sample_nightmare.jpg', // 기본 이미지
      rating: Math.floor(Math.random() * 5) + 1, // 1-5 랜덤 평점
      followers: apiUser.followers?.length || 0,
      following: apiUser.following?.length || 0,
      level: 'Lv.' + (Math.floor(Math.random() * 5) + 1), // Lv.1-5 랜덤
      levelName: ['초보자', '겁쟁이', '도전자', '베테랑', '마스터'][
        Math.floor(Math.random() * 5)
      ],
      badge: '#A60000',
      createdAt: apiUser.createdAt || new Date().toISOString(),
    };

    console.log('🔄 최종 프로필 데이터:', profileData);
    return profileData;
  } catch (error) {
    console.error('❌ 프로필 API 조회 실패:', error);
    console.error('❌ 에러 상세:', error.response?.data);

    // API 실패시 더미 데이터 사용
    console.warn('⚠️ 더미 데이터로 폴백');
    return DUMMY_USER_PROFILE;
  }
};

// 다른 사용자의 프로필 조회
export const getUserProfile = async (userId: number): Promise<UserProfile> => {
  try {
    const response = await instance.get<ApiUserResponse>(
      `/users/profile/${userId}`
    );
    return response.data.data;
  } catch (error) {
    // 에러 발생시 더미 데이터 반환 (ID만 변경)
    return {
      ...DUMMY_USER_PROFILE,
      id: userId,
      username: `사용자 ${userId}`,
      email: `user${userId}@example.com`,
    };
  }
};

// 현재 사용자 프로필 조회 hook
export const useCurrentUserProfile = () => {
  return useQuery({
    queryKey: ['user', 'profile', 'current'],
    queryFn: getCurrentUserProfile,
    staleTime: 10 * 60 * 1000, // 10분
    retry: false, // 실패시 재시도 하지 않음 (더미 데이터 사용)
  });
};

// 다른 사용자 프로필 조회 hook
export const useUserProfile = (userId: number) => {
  return useQuery({
    queryKey: ['user', 'profile', userId],
    queryFn: () => getUserProfile(userId),
    staleTime: 10 * 60 * 1000, // 10분
    retry: false,
    enabled: !!userId, // userId가 있을 때만 실행
  });
};
