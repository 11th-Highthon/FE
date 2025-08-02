export const Section = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="font-medium text-[14px] text-[#BEBEBE]">{title}</span>
      <span className="font-semibold text-[16px] text-[#FFFFFF]">{value}</span>
    </div>
  );
};
