import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from './instance';

// 스토리 생성 요청 타입
export interface CreateStoryRequest {
  title: string;
  description: string;
  mission: string; // API 스키마에 따라 단수형 및 필수 필드
  category?: string; // 선택 필드로 변경
  useAI?: boolean;
  // 이미지는 현재 JSON API에서 지원하지 않음
  // images?: File[];
}

// 스토리 생성 응답 타입
export interface CreateStoryResponse {
  success: boolean;
  data: {
    id: string;
    title: string;
    description: string;
    category: string;
    createdAt: string;
  };
  message?: string;
}

// 스토리 생성 API 함수
export const createStory = async (
  data: CreateStoryRequest
): Promise<CreateStoryResponse> => {
  try {
    console.log('📡 스토리 생성 API 요청 시작');
    console.log('📝 요청 데이터:', data);

    const response = await instance.post<CreateStoryResponse>(
      '/stories',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('✅ 스토리 생성 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ 스토리 생성 실패:', error);
    console.error('❌ 에러 상세:', error?.response?.data);
    throw error;
  }
};

// 스토리 생성 mutation hook
export const useCreateStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStory,
    onSuccess: data => {
      console.log('🎉 스토리 생성 성공!', data);

      // 관련 쿼리 무효화 (목록 새로고침)
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      queryClient.invalidateQueries({ queryKey: ['stories', 'my'] });

      // 성공 알림
      const storyTitle = data.data?.title || '괴담';
      alert(`"${storyTitle}"이 성공적으로 생성되었습니다! 🎉`);
    },
    onError: (error: any) => {
      console.error('💥 스토리 생성 실패:', error);

      // 다양한 에러 상황 처리
      let errorMessage = '스토리 생성 중 오류가 발생했습니다.';

      if (error.response?.status === 401) {
        errorMessage = '로그인이 필요합니다. 다시 로그인해주세요.';
      } else if (error.response?.status === 403) {
        errorMessage = '권한이 없습니다. 관리자에게 문의하세요.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      alert(`오류: ${errorMessage}`);
    },
  });
};
