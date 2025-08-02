import { useQuery } from '@tanstack/react-query';
import { instance } from './instance';
import type { Story } from '../types/story';

// 사용자가 작성한 스토리 조회
export const getMyStories = async (): Promise<Story[]> => {
  const userId = '688e6a95932e0f5ae190c4b5';

  try {
    console.log('📡 내 스토리 조회 시작');
    console.log('📡 사용자 ID:', userId);

    // 1. 사용자 프로필에서 createdStories 확인
    const profileResponse = await instance.get(`/users/profile/${userId}`);
    console.log('👤 사용자 프로필:', profileResponse.data);

    const createdStories = profileResponse.data.user.createdStories || [];
    console.log('📚 작성한 스토리 목록:', createdStories);

    if (createdStories.length === 0) {
      console.log('📝 작성한 스토리가 없습니다');
      return [];
    }

    // 2. 각 스토리 ID로 상세 정보 조회 (병렬 처리)
    const storyPromises = createdStories.map(async (storyId: string) => {
      try {
        const storyResponse = await instance.get(`/stories/${storyId}`);
        return storyResponse.data;
      } catch (error) {
        console.warn(`스토리 ${storyId} 조회 실패:`, error);
        return null;
      }
    });

    const stories = await Promise.all(storyPromises);
    const validStories = stories.filter(story => story !== null);

    console.log('✅ 최종 내 스토리 데이터:', validStories);
    return validStories;
  } catch (error) {
    console.error('❌ 내 스토리 조회 실패:', error);
    console.error('❌ 에러 상세:', error.response?.data);

    // 에러 발생시 더미 데이터 반환
    return [
      {
        id: 'my-1',
        title: '내가 만든 첫 번째 괴담',
        category: '심리 스릴러',
        description: '밤늦은 시간, 홀로 남은 사무실에서...',
        image: '/sample_nightmare.jpg',
        rating: 4.2,
        playCount: 156,
        duration: 15,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'my-2',
        title: '두 번째 무서운 이야기',
        category: '귀신',
        description: '오래된 집의 지하실에서 들려오는 소리...',
        image: '/sample_2.webp',
        rating: 3.8,
        playCount: 89,
        duration: 12,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }
};

// 내 스토리 조회 hook
export const useMyStories = () => {
  return useQuery({
    queryKey: ['stories', 'my'],
    queryFn: getMyStories,
    staleTime: 10 * 60 * 1000, // 10분
    retry: false, // 실패시 재시도 하지 않음 (더미 데이터 사용)
  });
};
