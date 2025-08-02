import { Icon } from '../../components';
import { Section } from './Section';
import { useCurrentUserProfile } from '../../apis';

export const My = () => {
  const { data: userProfile, isLoading } = useCurrentUserProfile();

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className="flex flex-col gap-[30px] size-full pt-10 overflow-auto px-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="w-32 h-6 bg-gray-600 rounded animate-pulse" />
            <div className="w-48 h-4 bg-gray-600 rounded animate-pulse" />
            <div className="flex items-center gap-3 mt-2">
              <div className="w-16 h-4 bg-gray-600 rounded animate-pulse" />
              <div className="w-16 h-4 bg-gray-600 rounded animate-pulse" />
              <div className="w-16 h-4 bg-gray-600 rounded animate-pulse" />
            </div>
          </div>
          <div className="size-[80px] bg-gray-600 rounded-full animate-pulse" />
        </div>
        <div className="w-full h-16 bg-gray-600 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[30px] size-full pt-10 overflow-auto px-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-white flex items-center font-semibold gap-2">
            {userProfile?.username || '사용자'}
            <Icon icon="Edit" size={24} />
          </h3>
          <span className="text-[#BEBEBE] font-normal text-[12px]">
            {userProfile?.email || 'user@example.com'}
          </span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[#BEBEBE] font-normal text-[12px]">
                평점
              </span>
              <span className="text-white font-semibold text-[12px]">
                {userProfile?.rating || 0}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#BEBEBE] font-normal text-[12px]">
                팔로워
              </span>
              <span className="text-white font-semibold text-[12px]">
                {userProfile?.followers || 0}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#BEBEBE] font-normal text-[12px]">
                팔로잉
              </span>
              <span className="text-white font-semibold text-[12px]">
                {userProfile?.following || 0}
              </span>
            </div>
          </div>
        </div>
        <img
          src={userProfile?.profileImage || '/sample_nightmare.jpg'}
          className="size-[80px] rounded-full border border-[#FFFFFF30]"
          alt="프로필 이미지"
        />
      </div>

      <div className="flex items-center justify-between w-full px-5 py-4 bg-[#A60000] rounded-[4px]">
        <span className="font-semibold text-white text-[14px]">
          {userProfile?.level || 'Lv.1'} {userProfile?.levelName || '겁쟁이'}
        </span>
        <img src="/Info.png" alt="정보" />
      </div>
      <Section title="나의 괴담" to="/my/my-story" />
      <Section title="나의 뱃지" to="/my/my-badge" />
      <Section title="나의 후기" to="/my/my-comment" />
      <div className="w-full h-[1px] bg-[#444444]" />
      <Section title="찜한 플레이" to="/my/liked-story" />
      <Section title="최근 플레이 기록" to="/my/history" />
    </div>
  );
};
