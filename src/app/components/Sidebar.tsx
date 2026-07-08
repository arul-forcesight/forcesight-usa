import svgPaths from "../imports/svg-yxu6attq6u";
import imgForceSightLogo2 from "figma:asset/1a77c43de930379011d5381d54d34a3be85dc8cb.png";
import { ChevronLeft } from "lucide-react";

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

function WorkspaceStreamlineCarbon() {
  return (
    <div className="relative shrink-0 size-[11.879px]" data-name="Workspace--Streamline-Carbon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_1_137)" id="Workspace--Streamline-Carbon">
          <path d={svgPaths.p9667c00} fill="var(--fill-0, #0A335C)" id="Vector" />
          <path d={svgPaths.pcc952c0} fill="var(--fill-0, #0A335C)" id="Vector_2" />
          <path d={svgPaths.p3fbbcb00} fill="var(--fill-0, #0A335C)" id="Vector_3" />
          <path d={svgPaths.p366db160} fill="var(--fill-0, #0A335C)" id="Vector_4" />
          <g id="_Rectangle_">
            <g id="Vector_5"></g>
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_137">
            <rect fill="white" height="11.8785" width="11.8785" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function AnalyticsStreamlineCarbon() {
  return (
    <div className="relative shrink-0 size-[11.879px]" data-name="Analytics--Streamline-Carbon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_1_132)" id="Analytics--Streamline-Carbon">
          <path d={svgPaths.p2c190000} fill="var(--fill-0, #007FFF)" id="Vector" />
          <path d={svgPaths.p16223830} fill="var(--fill-0, #007FFF)" id="Vector_2" />
          <g id="_Transparent_Rectangle_"></g>
        </g>
        <defs>
          <clipPath id="clip0_1_132">
            <rect fill="white" height="11.8785" width="11.8785" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ReconcileIcon() {
  return (
    <div className="relative shrink-0 size-[11.879px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Frame 26">
          <path d={svgPaths.p31d0d000} fill="var(--fill-0, #0A335C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ProductIntelligenceIcon() {
  return (
    <div className="relative shrink-0 size-[11.879px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_1_126)" id="Frame 25">
          <path d={svgPaths.p5692d00} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_126">
            <rect fill="white" height="11.8785" width="11.8785" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Download() {
  return (
    <div className="relative shrink-0 size-[11.879px]" data-name="Download">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Download">
          <path d={svgPaths.p3278c5c0} id="Icon" stroke="var(--stroke-0, #0A335C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.742405" />
        </g>
      </svg>
    </div>
  );
}

function Settings() {
  return (
    <div className="relative shrink-0 size-[11.879px]" data-name="Settings">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_1_120)" id="Settings">
          <g id="Icon">
            <path d={svgPaths.p269e9900} stroke="var(--stroke-0, #0A335C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.11361" />
            <path d={svgPaths.p28d07e00} stroke="var(--stroke-0, #0A335C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.11361" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_120">
            <rect fill="white" height="11.8785" width="11.8785" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

interface MenuItemInternalProps extends MenuItemProps {
  collapsed: boolean;
}

function MenuItem({ icon, label, active, onClick, collapsed }: MenuItemInternalProps) {
  return (
    <div
      className={`h-[29.696px] relative rounded-[5.939px] shrink-0 w-full cursor-pointer transition-colors group ${
        active ? "bg-[#e0f0ff]" : "hover:bg-gray-50"
      }`}
      onClick={onClick}
      title={collapsed ? label : undefined}
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className={`box-border content-stretch flex gap-[8.909px] h-[29.696px] items-center py-[5.197px] relative w-full ${
          collapsed ? "px-[6px] justify-center" : "px-[8.909px]"
        }`}>
          {icon}
          {!collapsed && (
            <p className={`font-['Outfit:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[10.394px] text-nowrap whitespace-pre transition-opacity ${
              active ? "text-[#007fff]" : "text-[#0a335c]"
            }`}>
              {label}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function Sidebar({ currentView, onNavigate, collapsed, onToggleCollapse }: SidebarProps) {
  return (
    <div className={`bg-white relative h-full border-r border-[#e6e8ea] transition-all duration-300 ${collapsed ? 'w-[70px]' : 'w-[184px]'}`}>
      <div className="relative size-full overflow-hidden">
        {/* Logo */}
        <div className={`absolute content-stretch flex gap-[7.508px] items-center left-[14.85px] top-[20px] transition-opacity duration-300 ${collapsed ? 'opacity-0' : 'opacity-100'} w-[134.375px]`}>
          <div className="relative shrink-0 size-[25.025px]" data-name="ForceSightLogo 2">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[208.54%] left-[-53.72%] max-w-none top-[-55%] w-[584.1%]" src={imgForceSightLogo2} />
            </div>
          </div>
          <div className="basis-0 grow h-[25.025px] leading-[normal] min-h-px min-w-px relative shrink-0">
            <p className="absolute font-['SF_Pro:Semibold',_sans-serif] font-[590] left-[0.13px] text-[#262e36] text-[17.518px] top-[-0.11px] w-[97.255px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              ForceSight
            </p>
            <p className="absolute font-['SF_Pro:Regular',_sans-serif] font-normal left-[0.77px] text-[#959ca3] text-[6.256px] top-[17px] tracking-[-0.1251px] w-[84.46px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Beyond the Obvious
            </p>
          </div>
        </div>
        
        {/* Collapsed Logo */}
        {collapsed && (
          <div className="absolute left-[22px] top-[20px] size-[25.025px]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[208.54%] left-[-53.72%] max-w-none top-[-55%] w-[584.1%]" src={imgForceSightLogo2} />
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="absolute h-0 left-[14.85px] top-[63.45px] w-[154.42px]">
          <div className="absolute bottom-0 left-0 right-0 top-[-0.74px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 155 1">
              <line id="Line 9" stroke="url(#paint0_linear_1_114)" strokeLinecap="round" strokeWidth="0.742405" x1="0.371203" x2="154.049" y1="0.371203" y2="0.371203" />
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_114" x1="0" x2="154.42" y1="1.24241" y2="1.24241">
                  <stop stopColor="#F3F2F2" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Menu Label */}
        {!collapsed && (
          <p className="absolute font-['Outfit:Regular',_sans-serif] font-normal leading-[normal] left-[20.78px] text-[#adb3b8] text-[10.394px] text-nowrap top-[83.5px] whitespace-pre">Menu</p>
        )}

        {/* Menu Items */}
        <div className={`absolute content-stretch flex flex-col gap-[2.97px] items-start left-[14.85px] top-[110.97px] ${collapsed ? 'w-[42px]' : 'w-[154.42px]'}`}>
          <MenuItem
            icon={<WorkspaceStreamlineCarbon />}
            label="Actions Required"
            active={currentView === "overview"}
            onClick={() => onNavigate("overview")}
            collapsed={collapsed}
          />
          <MenuItem
            icon={<AnalyticsStreamlineCarbon />}
            label="Profit"
            active={currentView === "profit"}
            onClick={() => onNavigate("profit")}
            collapsed={collapsed}
          />
          <MenuItem
            icon={<ReconcileIcon />}
            label="Returns"
            active={currentView === "returns"}
            onClick={() => onNavigate("returns")}
            collapsed={collapsed}
          />
          <MenuItem
            icon={<ProductIntelligenceIcon />}
            label="Orders"
            active={currentView === "orders"}
            onClick={() => onNavigate("orders")}
            collapsed={collapsed}
          />
          <MenuItem
            icon={<Download />}
            label="Downloads"
            active={currentView === "downloads"}
            onClick={() => onNavigate("downloads")}
            collapsed={collapsed}
          />
          <MenuItem
            icon={<Settings />}
            label="Settings"
            active={currentView === "settings"}
            onClick={() => onNavigate("settings")}
            collapsed={collapsed}
          />
        </div>

        {/* Collapse Button */}
        <div
          className={`absolute bg-white rounded-[5.939px] size-[17.818px] top-[81.27px] cursor-pointer hover:bg-gray-50 transition-all duration-300 ${
            collapsed ? 'left-[26px]' : 'left-[142.54px]'
          }`}
          onClick={onToggleCollapse}
        >
          <div className="overflow-clip relative rounded-[inherit] size-[17.818px]">
            <div className={`absolute left-[2.98px] size-[11.879px] top-[2.97px] transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}>
              <ChevronLeft className="w-full h-full" />
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[#e6e8ea] border-[0.742px] border-solid inset-0 pointer-events-none rounded-[5.939px]" />
        </div>
      </div>
    </div>
  );
}
