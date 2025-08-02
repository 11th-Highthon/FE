import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Icon, EmptyCard } from '../components';
import { usePopularStories } from '../apis';
import { keywords } from '../mocks';

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: stories = [], isLoading, error } = usePopularStories();

  const filteredMissions = useMemo(() => {
    if (!stories.length) return [];
    if (!searchQuery.trim()) return stories;

    const query = searchQuery.toLowerCase();
    return stories.filter(
      item =>
        (item.title && item.title.toLowerCase().includes(query)) ||
        (item.category && item.category.toLowerCase().includes(query)) ||
        (item.description && item.description.toLowerCase().includes(query))
    );
  }, [searchQuery, stories]);

  const handleKeywordClick = (keyword: string) => {
    setSearchQuery(keyword);
  };

  return (
    <div className="flex flex-col gap-[30px] size-full pt-10 overflow-auto px-4">
      <label className="flex items-center gap-3 px-5 py-3 rounded-full w-full bg-[#3A3A3A]">
        <Icon icon="Search" color="#ACACAC" size={15} />
        <input
          type="text"
          placeholder="제목, 키워드, 장르를 입력하세요"
          className="text-white text-[14px] font-regular outline-none border-0 w-full h-full bg-transparent"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </label>
      <div className="flex flex-col gap-4">
        <h2 className="text-[18px] font-semibold text-[#FFFFFF]">
          인기 키워드
        </h2>
        <div className="w-full flex flex-wrap gap-2">
          {keywords.map(keyword => (
            <button
              key={keyword}
              onClick={() => handleKeywordClick(keyword)}
              className="text-[12px] font-medium text-[#FFFFFF] px-5 py-1.5 border border-[#ECEDEE50] rounded-sm hover:bg-[#ECEDEE20] transition-colors"
            >
              {keyword}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-[18px] font-semibold text-[#FFFFFF]">
          {searchQuery
            ? `'${searchQuery}' 검색 결과 (${filteredMissions.length}개)`
            : isLoading
            ? '미션 목록 로딩중...'
            : '인기 미션에서 검색'}
        </h2>
        <div className="w-full flex flex-col gap-3">
          {isLoading ? (
            // 로딩 상태
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="w-full flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <EmptyCard width="w-[117px]" height="h-[75px]" />
                  <div className="text-[12px] font-medium text-[#CFCFCF]">
                    로딩 중...
                  </div>
                </div>
              </div>
            ))
          ) : error ? (
            // 에러 상태
            <div className="text-center py-8">
              <p className="text-[#ACACAC] text-[14px]">
                데이터를 불러오는데 실패했습니다.
              </p>
            </div>
          ) : filteredMissions.length > 0 ? (
            // 정상 데이터
            filteredMissions.map(({ thumbnailUrl, title, _id }) => (
              <div
                key={_id}
                className="w-full flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={thumbnailUrl}
                    alt={title}
                    className="w-[117px] h-[75px] rounded-sm border border-[#FFFFFF30]"
                  />
                  <h3 className="text-[12px] font-medium text-white">
                    {title}
                  </h3>
                </div>
                <Link to={`/detail/${_id}`}>
                  <Icon icon="Play" color="#ACACAC" size={33} />
                </Link>
              </div>
            ))
          ) : searchQuery ? (
            // 검색 결과 없음
            <div className="text-center py-8">
              <p className="text-[#ACACAC] text-[14px]">
                '{searchQuery}' 검색 결과가 없습니다.
              </p>
            </div>
          ) : (
            // 데이터가 없음 (전체)
            <div className="text-center py-8">
              <p className="text-[#ACACAC] text-[14px]">
                아직 등록된 미션이 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
