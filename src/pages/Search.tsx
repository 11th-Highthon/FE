import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components';
import { keywords, mock_list } from '../mocks';

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMissions = useMemo(() => {
    if (!searchQuery.trim()) return mock_list;

    const query = searchQuery.toLowerCase();
    return mock_list.filter(
      item =>
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.introduce.toLowerCase().includes(query)
    );
  }, [searchQuery]);

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
            : '지금 많이 플레이되는 미션'}
        </h2>
        <div className="w-full flex flex-col gap-3">
          {filteredMissions.length > 0 ? (
            filteredMissions.map(({ image, title, id }) => (
              <div
                key={id}
                className="w-full flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={image}
                    alt={title}
                    className="w-[117px] h-[75px] rounded-sm border border-[#FFFFFF30]"
                  />
                  <h3 className="text-[12px] font-medium text-white">
                    {title}
                  </h3>
                </div>
                <Link to={`/detail/${id}`}>
                  <Icon icon="Play" color="#ACACAC" size={33} />
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-[#ACACAC] text-[14px]">
                검색 결과가 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
