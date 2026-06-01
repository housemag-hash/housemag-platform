interface PhoneFrameProps {
  children: React.ReactNode;
  size?: "full" | "overview";
  onClick?: () => void;
  label?: string;
  number?: string;
}

export default function PhoneFrame({
  children,
  size = "full",
  onClick,
  label,
  number,
}: PhoneFrameProps) {
  const isOverview = size === "overview";

  return (
    <div className={`flex flex-col items-center gap-[10px] ${onClick ? "cursor-pointer" : ""}`}
         onClick={onClick}>
      {/* Phone shell */}
      <div
        className={`
          relative bg-white overflow-hidden flex-shrink-0
          transition-transform duration-200
          ${isOverview
            ? "w-[300px] h-[648px] rounded-[36px] shadow-[0_16px_48px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.22)]"
            : "w-[390px] h-[844px] rounded-[48px] shadow-[0_32px_80px_rgba(0,0,0,0.22),0_0_0_1px_rgba(0,0,0,0.08)]"
          }
        `}
      >
        {/* Notch */}
        <div className="relative h-0 z-10 pointer-events-none">
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 bg-black ${
              isOverview
                ? "w-[90px] h-[20px] rounded-b-[14px]"
                : "w-[120px] h-[28px] rounded-b-[20px]"
            }`}
          />
        </div>

        {/* Scrollable content */}
        <div className="w-full h-full overflow-y-auto overflow-x-hidden"
             style={{ scrollbarWidth: "thin", scrollbarColor: "#E2E2E2 transparent" }}>
          {children}
        </div>
      </div>

      {/* Label below frame (overview mode only) */}
      {isOverview && label && (
        <div className="flex flex-col items-center gap-[4px]">
          <span className="text-[11px] font-bold text-[#8C8C8C] uppercase tracking-[0.08em]">
            {label}
          </span>
          {number && (
            <span className="text-[10px] text-[#8C8C8C] bg-[#1a1a1a] px-[8px] py-[2px] rounded-[10px]">
              {number}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
