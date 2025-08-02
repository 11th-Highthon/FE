interface EmptyCardProps {
  width?: string;
  height?: string;
  className?: string;
}

export const EmptyCard = ({
  width = 'w-[165px]',
  height = 'h-[110px]',
  className = '',
}: EmptyCardProps) => {
  return (
    <div
      className={`${width} ${height} bg-[#3A3A3A] rounded-[4px] border border-[#FFFFFF30] flex items-center justify-center shrink-0 ${className}`}
    >
      <span className="text-[#CFCFCF] text-[12px] font-medium text-center">
        데이터 없음
      </span>
    </div>
  );
};

export const EmptyBannerCard = () => {
  return (
    <div className="flex flex-col gap-1 relative shrink-0 snap-center items-center">
      <div className="w-[326px] h-[231px] bg-[#3A3A3A] rounded-[4px] border border-[#FFFFFF30] flex items-center justify-center">
        <span className="text-[#CFCFCF] text-[14px] font-medium">
          데이터 없음
        </span>
      </div>
    </div>
  );
};
