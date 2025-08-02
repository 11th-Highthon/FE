import { useQuery } from '@tanstack/react-query';
import { instance } from './instance';
import type { Story, ApiStoriesResponse } from '../types/story';
import { isAuthenticated } from '../utils';

// 모든 스토리 조회
export const getAllStories = async (): Promise<Story[]> => {
  try {
    console.log('📡 API 요청 시작: /stories');
    console.log('📡 Base URL:', import.meta.env.VITE_API_URL);
    const response = await instance.get<ApiStoriesResponse>('/stories');
    console.log('📡 API 응답 성공:', response.data);
    return (response.data as unknown as Story[]) || [];
  } catch (error) {
    console.error('❌ 전체 스토리 조회 실패:', error);
    console.error('❌ 에러 상세:', error?.response?.data);
    return [];
  }
};

// 인기 스토리 조회
export const getPopularStories = async (): Promise<Story[]> => {
  try {
    console.log('📡 인기 스토리 API 요청 시작: /stories/popular');
    console.log('📡 Base URL:', import.meta.env.VITE_API_URL);
    const response = await instance.get<ApiStoriesResponse>('/stories/popular');
    console.log('📡 인기 스토리 API 응답 성공:', response.data);

    // API 응답이 직접 배열인 경우 처리
    if (Array.isArray(response.data)) {
      return response.data;
    }

    return response.data.data || response.data || [];
  } catch (error) {
    console.error('❌ 인기 스토리 조회 실패:', error);
    console.error('❌ 에러 상세:', error.response?.data);
    return [];
  }
};

// 새로운 스토리 조회
export const getNewStories = async (): Promise<Story[]> => {
  try {
    console.log('📡 새 스토리 API 요청 시작: /stories/new');
    const response = await instance.get<ApiStoriesResponse>('/stories/new');
    console.log('📡 새 스토리 API 응답 성공:', response.data);

    // API 응답이 직접 배열인 경우 처리
    if (Array.isArray(response.data)) {
      return response.data;
    }

    return response.data.data || response.data || [];
  } catch (error) {
    console.error('❌ 새로운 스토리 조회 실패:', error);
    console.error('❌ 에러 상세:', error.response?.data);
    return [];
  }
};

// 추천 스토리 조회 (인기 스토리를 추천으로 사용)
export const getRecommendedStories = async (): Promise<Story[]> => {
  try {
    console.log(
      '📡 추천 스토리 API 요청 시작: /stories/popular (추천 대신 인기 사용)'
    );
    const response = await instance.get<ApiStoriesResponse>('/stories/popular');
    console.log('📡 추천 스토리 API 응답 성공:', response.data);

    // API 응답이 직접 배열인 경우 처리
    if (Array.isArray(response.data)) {
      return response.data;
    }

    return response.data.data || response.data || [];
  } catch (error) {
    console.error('❌ 추천 스토리 조회 실패:', error);
    console.error('❌ 에러 상세:', error.response?.data);
    return [];
  }
};

// 모든 스토리 조회 hook
export const useAllStories = () => {
  return useQuery({
    queryKey: ['stories', 'all'],
    queryFn: getAllStories,
    staleTime: 5 * 60 * 1000, // 5분
    retry: false, // 실패시 재시도 하지 않음
  });
};

// 인기 스토리 조회 hook
export const usePopularStories = () => {
  return useQuery({
    queryKey: ['stories', 'popular'],
    queryFn: getPopularStories,
    staleTime: 10 * 60 * 1000, // 10분
    retry: false, // 실패시 재시도 하지 않음
  });
};

// 새로운 스토리 조회 hook
export const useNewStories = () => {
  return useQuery({
    queryKey: ['stories', 'new'],
    queryFn: getNewStories,
    staleTime: 5 * 60 * 1000, // 5분
    retry: false, // 실패시 재시도 하지 않음
  });
};

// 추천 스토리 조회 hook (인증 없이 호출)
export const useRecommendedStories = () => {
  return useQuery({
    queryKey: ['stories', 'recommended'],
    queryFn: getRecommendedStories,
    staleTime: 15 * 60 * 1000, // 15분
    retry: false, // 실패시 재시도 하지 않음
  });
};
