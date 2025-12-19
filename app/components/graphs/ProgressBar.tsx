type ProgressBarProps = {
  value: number; // 0 - 100
  trackClassName?: string;
  barClassName?: string;
};

export default function ProgressBar({
  value,
  trackClassName = "bg-[#234832] h-2",
  barClassName = "bg-green-500",
}: ProgressBarProps) {
  return (
    <div
      className={`w-full rounded-full overflow-hidden ${trackClassName}`}
    >
      <div
        className={`h-full transition-all duration-300 ${barClassName}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
