import { useQuery } from '@tanstack/react-query';
import { getAllStories } from './story';
import type { Story } from '../types/story';

// 사용자가 작성한 스토리 조회 (creator 필터링 방식)
export const getMyStories = async (): Promise<Story[]> => {
  try {
    console.log('📡 내 스토리 조회 시작 (creator 필터링 방식)');
    console.log('📡 타겟 creator ID:', '688e6a95932e0f5ae190c4b5');

    // 1. 모든 스토리를 가져오기
    const allStories = await getAllStories();
    console.log('📚 전체 스토리 수:', allStories.length);
    console.log('📚 전체 스토리 데이터 샘플:', allStories.slice(0, 2));

    // 2. creator 필드가 688e6a95932e0f5ae190c4b5인 스토리만 필터링
    const targetCreatorId = '688e6a95932e0f5ae190c4b5';
    const myStories = allStories.filter(story => {
      console.log(
        `🔍 스토리 체크: ${story.title} - creator: ${
          story.creator || 'undefined'
        }`
      );
      const isMyStory = story.creator === targetCreatorId;
      if (isMyStory) {
        console.log(
          `✅ 내 스토리 발견: ${story.title} (creator: ${story.creator})`
        );
      }
      return isMyStory;
    });

    console.log('📝 내가 작성한 스토리 수:', myStories.length);
    console.log(
      '📝 내 스토리 목록:',
      myStories.map(s => ({ title: s.title, _id: s._id, creator: s.creator }))
    );

    // 3. 결과 반환
    if (myStories.length > 0) {
      console.log('✅ 최종 내 스토리 데이터:', myStories);
      return myStories;
    } else {
      console.log('📭 작성한 스토리가 없습니다');
      return [];
    }
  } catch (error) {
    console.error('❌ 내 스토리 조회 실패:', error);
    console.error('❌ 에러 상세:', error?.response?.data);

    // 에러 발생시 더미 데이터 반환
    console.warn('⚠️ 더미 데이터로 폴백');
    return [
      {
        _id: 'my-1',
        title: '내가 만든 첫 번째 괴담',
        category: '심리 스릴러',
        description: '밤늦은 시간, 홀로 남은 사무실에서...',
        thumbnailUrl: '/sample_nightmare.jpg',
        creator: '688e6a95932e0f5ae190c4b5', // creator 필드 추가
        rating: 4.2,
        playCount: 156,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        _id: 'my-2',
        title: '두 번째 무서운 이야기',
        category: '귀신',
        description: '오래된 집의 지하실에서 들려오는 소리...',
        thumbnailUrl: '/sample_2.webp',
        creator: '688e6a95932e0f5ae190c4b5', // creator 필드 추가
        rating: 3.8,
        playCount: 89,
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
