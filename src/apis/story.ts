import { useQuery } from '@tanstack/react-query';
import { instance } from './instance';
import type { Story, ApiStoriesResponse } from '../types/story';
import { isAuthenticated } from '../utils';

// 모든 스토리 조회
export const getAllStories = async (): Promise<Story[]> => {
  try {
    const response = await instance.get<ApiStoriesResponse>('/stories');
    return response.data.data || [];
  } catch (error) {
    console.warn('전체 스토리 조회 실패, 빈 배열 반환:', error);
    return [];
  }
};

// 인기 스토리 조회
export const getPopularStories = async (): Promise<Story[]> => {
  try {
    const response = await instance.get<ApiStoriesResponse>('/stories/popular');
    return response.data.data || [];
  } catch (error) {
    console.warn('인기 스토리 조회 실패, 빈 배열 반환:', error);
    return [];
  }
};

// 새로운 스토리 조회
export const getNewStories = async (): Promise<Story[]> => {
  try {
    const response = await instance.get<ApiStoriesResponse>('/stories/new');
    return response.data.data || [];
  } catch (error) {
    console.warn('새로운 스토리 조회 실패, 빈 배열 반환:', error);
    return [];
  }
};

// 추천 스토리 조회 (사용자 기반 추천 - 일단 전체 스토리를 사용)
export const getRecommendedStories = async (): Promise<Story[]> => {
  try {
    const response = await instance.get<ApiStoriesResponse>('/stories');
    return response.data.data || [];
  } catch (error) {
    console.warn('추천 스토리 조회 실패, 빈 배열 반환:', error);
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

// 추천 스토리 조회 hook
export const useRecommendedStories = () => {
  return useQuery({
    queryKey: ['stories', 'recommended'],
    queryFn: getRecommendedStories,
    staleTime: 15 * 60 * 1000, // 15분
    retry: false, // 실패시 재시도 하지 않음
    enabled: isAuthenticated(), // 로그인된 사용자만 호출
  });
};
