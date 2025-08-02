import { useQuery } from '@tanstack/react-query';
import { instance } from './instance';

// 스토리 상세 정보 타입
export interface StoryDetail {
  _id: string;
  title: string;
  description: string;
  content: string;
  thumbnailUrl: string;
  audioUrl?: string;
  genre: string; // category 대신 genre
  mission: string[];
  creator: string;
  likes: number;
  likedUser: string[];
  rating: number;
  experienceCount: number;
  level: number;
  comments: any[];
  createdAt: string;
  updatedAt: string;
}

// 스토리 상세 조회 API
export const getStoryDetail = async (id: string): Promise<StoryDetail> => {
  try {
    console.log('📡 스토리 상세 조회 API 요청 시작');
    console.log('📝 스토리 ID:', id);

    const response = await instance.get(`/stories/${id}`);
    console.log('✅ 스토리 상세 조회 성공:', response.data);

    return response.data;
  } catch (error) {
    console.error('❌ 스토리 상세 조회 실패:', error);
    console.error('❌ 에러 상세:', error?.response?.data);

    // 에러 발생시 더미 데이터 반환
    const dummyDetail: StoryDetail = {
      _id: id,
      title: '스토리를 찾을 수 없습니다',
      description: '요청하신 스토리를 찾을 수 없습니다.',
      content: '스토리 내용을 불러올 수 없습니다.',
      thumbnailUrl: '/sample_nightmare.jpg',
      audioUrl: '',
      genre: '미스터리',
      mission: ['스토리를 다시 시도해보세요'],
      creator: 'unknown',
      likes: 0,
      likedUser: [],
      rating: 0,
      experienceCount: 0,
      level: 0,
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return dummyDetail;
  }
};

// 스토리 상세 조회 hook
export const useStoryDetail = (id: string) => {
  return useQuery({
    queryKey: ['story', 'detail', id],
    queryFn: () => getStoryDetail(id),
    staleTime: 10 * 60 * 1000, // 10분
    retry: false, // 실패시 재시도 하지 않음 (더미 데이터 사용)
    enabled: !!id, // id가 있을 때만 실행
  });
};
