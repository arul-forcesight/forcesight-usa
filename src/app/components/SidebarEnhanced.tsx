import { useState } from "react";
import svgPaths from "../imports/svg-yxu6attq6u";
import imgForceSightLogo2 from "figma:asset/1a77c43de930379011d5381d54d34a3be85dc8cb.png";
import {
  ChevronLeft,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  currentView: string;
  currentSubView?: string;
  onNavigate: (view: string, subView?: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

function WorkspaceIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g>
          <path
            d="M8.23418 11.5738C7.51327 9.54286 5.47537 8.40676 3.81847 8.42635C3.81847 8.63452 3.81617 8.84346 3.81924 9.05239C3.82346 9.34237 3.73436 9.58472 3.46205 9.72068C3.20011 9.85165 2.95891 9.79097 2.7277 9.6239C1.93612 9.05124 1.13955 8.48511 0.347204 7.91361C-0.115991 7.57947 -0.115222 7.09668 0.346436 6.76484C1.13456 6.19833 1.92537 5.63528 2.71157 5.06608C2.94585 4.89632 3.18667 4.81682 3.46013 4.95623C3.74012 5.09911 3.82462 5.34761 3.81924 5.64334C3.8154 5.84652 3.81847 6.0497 3.81847 6.25556C4.16068 6.29589 4.48638 6.31432 4.80362 6.37539C7.56819 6.9081 9.41598 8.51085 10.3512 11.164C10.4054 11.3177 10.4737 11.3972 10.6366 11.4444C12.2197 11.9053 13.2702 13.4612 13.1423 15.1384C13.0205 16.7389 11.7296 18.0862 10.1115 18.3021C8.00335 18.5836 6.11946 16.9797 6.11716 14.8531C6.11562 13.422 6.78814 12.3558 8.05136 11.6718C8.10167 11.6445 8.15391 11.6207 8.20538 11.595C8.21075 11.5923 8.21575 11.5877 8.23418 11.5742V11.5738ZM11.0168 14.8112C11.0567 14.1253 10.4476 13.4742 9.72362 13.4289C8.95278 13.3809 8.28795 13.9716 8.24186 14.7455C8.19693 15.4983 8.78226 16.1574 9.53696 16.2039C10.3443 16.2538 10.9669 15.6677 11.0168 14.8112Z"
            fill="#8E6BFF"
          />
        </g>
      </svg>
    </div>
  );
}

function AnalyticsIcon({ active }: { active?: boolean }) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g>
          <path
            d="M13.333 5.83398H18.333V10.834"
            stroke={active ? "#007FFF" : "#0A335C"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.4"
          />
          <path
            d="M18.3337 5.83398L11.2503 12.9173L7.08366 8.75065L1.66699 14.1673"
            stroke={active ? "#007FFF" : "#0A335C"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.4"
          />
        </g>
      </svg>
    </div>
  );
}

function PaymentsIcon({ active }: { active?: boolean }) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g>
          <rect
            x="2"
            y="4"
            width="16"
            height="12"
            rx="2"
            stroke={active ? "#007FFF" : "#0A335C"}
            strokeWidth="1.4"
            fill="none"
          />
          <path
            d="M2 8H18"
            stroke={active ? "#007FFF" : "#0A335C"}
            strokeWidth="1.4"
          />
          <rect
            x="4"
            y="11"
            width="4"
            height="2"
            rx="0.5"
            fill={active ? "#007FFF" : "#0A335C"}
          />
        </g>
      </svg>
    </div>
  );
}

function InventoryIcon({ active }: { active?: boolean }) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g>
          <path
            d="M9.16667 18.1079C9.42003 18.2542 9.70744 18.3312 10 18.3312C10.2926 18.3312 10.58 18.2542 10.8333 18.1079L16.6667 14.7746C16.9198 14.6285 17.13 14.4183 17.2763 14.1653C17.4225 13.9123 17.4997 13.6252 17.5 13.3329V6.66626C17.4997 6.37399 17.4225 6.08693 17.2763 5.8339C17.13 5.58086 16.9198 5.37073 16.6667 5.22459L10.8333 1.89126C10.58 1.74498 10.2926 1.66797 10 1.66797C9.70744 1.66797 9.42003 1.74498 9.16667 1.89126L3.33333 5.22459C3.08022 5.37073 2.86998 5.58086 2.72372 5.8339C2.57745 6.08693 2.5003 6.37399 2.5 6.66626V13.3329C2.5003 13.6252 2.57745 13.9123 2.72372 14.1653C2.86998 14.4183 3.08022 14.6285 3.33333 14.7746L9.16667 18.1079Z"
            stroke={active ? "#B5670D" : "#0A335C"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.4"
          />
          <path
            d="M10 18.3333V10"
            stroke={active ? "#B5670D" : "#0A335C"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.4"
          />
          <path
            d="M2.74121 5.83398L9.99955 10.0007L17.2579 5.83398"
            stroke={active ? "#B5670D" : "#0A335C"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.4"
          />
          <path
            d="M6.25 3.55859L13.75 7.85026"
            stroke={active ? "#B5670D" : "#0A335C"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.4"
          />
        </g>
      </svg>
    </div>
  );
}

function MoneyIcon({ active }: { active?: boolean }) {
  const color = active ? "#059669" : "#0A335C";
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g>
          <circle
            cx="10"
            cy="10"
            r="7.5"
            stroke={color}
            strokeWidth="1.4"
            fill="none"
          />
          <path
            d="M12.5 7.5C12.5 6.4 11.38 5.83 10 5.83C8.62 5.83 7.5 6.5 7.5 7.5C7.5 8.5 8.62 9.17 10 9.17C11.38 9.17 12.5 9.83 12.5 10.83C12.5 11.83 11.38 12.5 10 12.5C8.62 12.5 7.5 11.93 7.5 10.83"
            stroke={color}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M10 4.5V5.83M10 12.5V13.83"
            stroke={color}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}

function DownloadIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g>
          <path
            d="M10 12.5V2.5"
            stroke="#0A335C"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.4"
          />
          <path
            d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5"
            stroke="#0A335C"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.4"
          />
          <path
            d="M5.83301 8.33398L9.99967 12.5007L14.1663 8.33398"
            stroke="#0A335C"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.4"
          />
        </g>
      </svg>
    </div>
  );
}

function SettingsIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g>
          <path
            d="M8.05893 3.44712C8.10485 2.96407 8.32921 2.51549 8.68818 2.18902C9.04716 1.86255 9.51495 1.68164 10.0002 1.68164C10.4854 1.68164 10.9532 1.86255 11.3122 2.18902C11.6712 2.51549 11.8955 2.96407 11.9414 3.44712C11.969 3.75916 12.0714 4.05997 12.2399 4.32407C12.4084 4.58817 12.638 4.80779 12.9093 4.96435C13.1807 5.12091 13.4857 5.20979 13.7987 5.22347C14.1116 5.23715 14.4233 5.17523 14.7073 5.04295C15.1482 4.84277 15.6478 4.8138 16.1089 4.96169C16.57 5.10958 16.9596 5.42374 17.2019 5.84304C17.4441 6.26233 17.5217 6.75676 17.4195 7.23009C17.3173 7.70343 17.0426 8.1218 16.6489 8.40378C16.3926 8.58366 16.1833 8.82262 16.0389 9.10047C15.8944 9.37832 15.819 9.68687 15.819 10C15.819 10.3132 15.8944 10.6217 16.0389 10.8996C16.1833 11.1774 16.3926 11.4164 16.6489 11.5963C17.0426 11.8783 17.3173 12.2966 17.4195 12.77C17.5217 13.2433 17.4441 13.7377 17.2019 14.157C16.9596 14.5763 16.57 14.8905 16.1089 15.0384C15.6478 15.1863 15.1482 15.1573 14.7073 14.9571C14.4233 14.8248 14.1116 14.7629 13.7987 14.7766C13.4857 14.7903 13.1807 14.8792 12.9093 15.0357C12.638 15.1923 12.4084 15.4119 12.2399 15.676C12.0714 15.9401 11.969 16.2409 11.9414 16.553C11.8955 17.036 11.6712 17.4846 11.3122 17.8111C10.9532 18.1375 10.4854 18.3184 10.0002 18.3184C9.51495 18.3184 9.04716 18.1375 8.68818 17.8111C8.32921 17.4846 8.10485 17.036 8.05893 16.553C8.03138 16.2408 7.92901 15.9399 7.76049 15.6757C7.59196 15.4115 7.36224 15.1918 7.09079 15.0352C6.81934 14.8786 6.51416 14.7898 6.20108 14.7762C5.88801 14.7626 5.57627 14.8247 5.29227 14.9571C4.85134 15.1573 4.3517 15.1863 3.8906 15.0384C3.42949 14.8905 3.03991 14.5763 2.79767 14.157C2.55543 13.7377 2.47786 13.2433 2.58007 12.77C2.68227 12.2966 2.95693 11.8783 3.3506 11.5963C3.60695 11.4164 3.81621 11.1774 3.96067 10.8996C4.10514 10.6217 4.18056 10.3132 4.18056 10C4.18056 9.68687 4.10514 9.37832 3.96067 9.10047C3.81621 8.82262 3.60695 8.58366 3.3506 8.40378C2.95749 8.12166 2.68331 7.70345 2.58135 7.23044C2.47939 6.75743 2.55694 6.2634 2.79892 5.84438C3.0409 5.42536 3.43003 5.11127 3.89067 4.96315C4.35132 4.81504 4.85059 4.84348 5.29143 5.04295C5.5754 5.17523 5.88705 5.23715 6.20002 5.22347C6.51298 5.20979 6.81804 5.12091 7.08938 4.96435C7.36072 4.80779 7.59034 4.58817 7.75882 4.32407C7.9273 4.05997 8.02967 3.75916 8.05727 3.44712"
            stroke="#6B0CC4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.4"
          />
          <path
            d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
            stroke="#6B0CC4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.4"
          />
        </g>
      </svg>
    </div>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  collapsed: boolean;
  hasSubmenu?: boolean;
  expanded?: boolean;
  onToggleExpand?: () => void;
}

function MenuItem({
  icon,
  label,
  active,
  onClick,
  collapsed,
  hasSubmenu,
  expanded,
  onToggleExpand,
}: MenuItemProps) {
  return (
    <div
      className={`h-[40px] relative rounded-[8px] shrink-0 w-full cursor-pointer transition-colors ${
        active ? "bg-[#e0f0ff]" : "hover:bg-gray-50"
      }`}
      onClick={onClick}
      title={collapsed ? label : undefined}
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div
          className={`box-border content-stretch flex h-[40px] items-center justify-between px-[12px] py-[7px] relative w-full`}
        >
          <div className="flex items-center gap-[16px]">
            {icon}
            {!collapsed && (
              <p
                className={`font-['Outfit:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[14px] text-nowrap whitespace-pre ${
                  active ? "text-[#007fff]" : "text-[#0a335c]"
                }`}
              >
                {label}
              </p>
            )}
          </div>
          {!collapsed && hasSubmenu && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand?.();
              }}
            >
              {expanded ? (
                <ChevronDown
                  className={`w-4 h-4 ${active ? "text-[#007fff]" : "text-gray-400"}`}
                />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SubMenuItem({
  label,
  active,
  onClick,
  collapsed,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
  collapsed: boolean;
}) {
  if (collapsed) return null;

  return (
    <div
      className={`h-[32px] relative rounded-[6px] shrink-0 w-full cursor-pointer transition-colors ml-10 ${
        active ? "bg-[#e0f0ff]" : "hover:bg-gray-50"
      }`}
      onClick={onClick}
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[32px] items-center px-[10px] py-[6px] relative w-full overflow-hidden">
          <p
            className={`font-['Outfit'] font-normal leading-[normal] relative shrink-0 text-[13px] text-nowrap whitespace-pre truncate ${
              active ? "text-[#007fff]" : "text-[#6b7280]"
            }`}
          >
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

export function SidebarEnhanced({
  currentView,
  currentSubView,
  onNavigate,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
  const [moneyExpanded, setMoneyExpanded] = useState(
    currentView === "money",
  );
  const [analyseExpanded, setAnalyseExpanded] = useState(
    currentView === "profit",
  );
  const [paymentsExpanded, setPaymentsExpanded] = useState(
    currentView === "payments",
  );

  return (
    <div
      className={`bg-white relative h-full border-r border-[#e6e8ea] transition-all duration-300 ${collapsed ? "w-[70px]" : "w-[240px]"}`}
    >
      <div className="relative size-full overflow-y-auto">
        {/* Logo */}
        <div
          className={`absolute content-stretch flex gap-[8px] items-center left-[16px] top-[20px] transition-opacity duration-300 ${collapsed ? "opacity-0" : "opacity-100"}`}
        >
          <div className="relative shrink-0 size-[36px]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                alt=""
                className="absolute h-[208.54%] left-[-53.72%] max-w-none top-[-55%] w-[584.1%]"
                src={imgForceSightLogo2}
              />
            </div>
          </div>
          <div className="leading-[normal]">
            <p
              className="font-['SF_Pro:Semibold',_sans-serif] font-[590] text-[#262e36] text-[22.4px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              ForceSight
            </p>
            <p
              className="font-['SF_Pro:Regular',_sans-serif] font-normal text-[#959ca3] text-[8px] tracking-[-0.16px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Beyond the Obvious
            </p>
          </div>
        </div>

        {/* Collapsed Logo */}
        {collapsed && (
          <div className="absolute left-[22px] top-[20px] size-[36px]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                alt=""
                className="absolute h-[208.54%] left-[-53.72%] max-w-none top-[-55%] w-[584.1%]"
                src={imgForceSightLogo2}
              />
            </div>
          </div>
        )}

        {/* Menu Label */}
        {!collapsed && (
          <p className="absolute font-['Outfit:Regular',_sans-serif] font-normal leading-[normal] left-[20px] text-[#adb3b8] text-[14px] text-nowrap top-[80px] whitespace-pre">
            Menu
          </p>
        )}

        {/* Menu Items */}
        <div
          className={`absolute content-stretch flex flex-col gap-[6px] items-start left-[12px] top-[110px] ${collapsed ? "w-[46px]" : "w-[216px]"}`}
        >
          <MenuItem
            icon={<MoneyIcon active={currentView === "money"} />}
            label="Money"
            active={currentView === "money"}
            onClick={() => {
              onNavigate("money");
              if (!collapsed) setMoneyExpanded(!moneyExpanded);
            }}
            collapsed={collapsed}
            hasSubmenu={true}
            expanded={moneyExpanded}
            onToggleExpand={() => setMoneyExpanded(!moneyExpanded)}
          />

          {moneyExpanded && !collapsed && (
            <div className="space-y-1 max-w-full">
              <SubMenuItem
                label="The Brief"
                active={currentView === "money" && currentSubView === "brief"}
                onClick={() => onNavigate("money", "brief")}
                collapsed={collapsed}
              />
              <SubMenuItem
                label="Tracking"
                active={currentView === "money" && currentSubView === "tracking"}
                onClick={() => onNavigate("money", "tracking")}
                collapsed={collapsed}
              />
              <SubMenuItem
                label="Team Performance"
                active={currentView === "money" && currentSubView === "team"}
                onClick={() => onNavigate("money", "team")}
                collapsed={collapsed}
              />
              <SubMenuItem
                label="Analyst Dashboard"
                active={currentView === "money" && currentSubView === "dashboard"}
                onClick={() => onNavigate("money", "dashboard")}
                collapsed={collapsed}
              />
              <SubMenuItem
                label="Reports"
                active={currentView === "money" && currentSubView === "reports"}
                onClick={() => onNavigate("money", "reports")}
                collapsed={collapsed}
              />
            </div>
          )}

          <MenuItem
            icon={<WorkspaceIcon />}
            label="Actions Required"
            active={currentView === "overview"}
            onClick={() => onNavigate("overview")}
            collapsed={collapsed}
          />

          <MenuItem
            icon={
              <AnalyticsIcon
                active={currentView === "profit"}
              />
            }
            label="Analyse"
            active={currentView === "profit"}
            onClick={() => {
              onNavigate("profit");
              if (!collapsed)
                setAnalyseExpanded(!analyseExpanded);
            }}
            collapsed={collapsed}
            hasSubmenu={true}
            expanded={analyseExpanded}
            onToggleExpand={() =>
              setAnalyseExpanded(!analyseExpanded)
            }
          />

          {analyseExpanded && !collapsed && (
            <div className="space-y-1 max-w-full">
              <SubMenuItem
                label="Summary"
                active={
                  currentView === "profit" &&
                  currentSubView === "summary"
                }
                onClick={() => onNavigate("profit", "summary")}
                collapsed={collapsed}
              />
              <SubMenuItem
                label="Sales Trend"
                active={
                  currentView === "profit" &&
                  currentSubView === "sales-trend"
                }
                onClick={() =>
                  onNavigate("profit", "sales-trend")
                }
                collapsed={collapsed}
              />
              <SubMenuItem
                label="Profit - Table View"
                active={
                  currentView === "profit" &&
                  currentSubView === "table-view"
                }
                onClick={() =>
                  onNavigate("profit", "table-view")
                }
                collapsed={collapsed}
              />
              <SubMenuItem
                label="Profit - Monthly View"
                active={
                  currentView === "profit" &&
                  currentSubView === "monthly-view"
                }
                onClick={() =>
                  onNavigate("profit", "monthly-view")
                }
                collapsed={collapsed}
              />
              <SubMenuItem
                label="Canvas - MYOR"
                active={
                  currentView === "profit" &&
                  currentSubView === "custom-view"
                }
                onClick={() =>
                  onNavigate("profit", "custom-view")
                }
                collapsed={collapsed}
              />
            </div>
          )}

          <MenuItem
            icon={
              <PaymentsIcon
                active={currentView === "payments"}
              />
            }
            label="Payments"
            active={currentView === "payments"}
            onClick={() => {
              onNavigate("payments");
              if (!collapsed)
                setPaymentsExpanded(!paymentsExpanded);
            }}
            collapsed={collapsed}
            hasSubmenu={true}
            expanded={paymentsExpanded}
            onToggleExpand={() =>
              setPaymentsExpanded(!paymentsExpanded)
            }
          />

          {paymentsExpanded && !collapsed && (
            <div className="w-full space-y-1">
              <SubMenuItem
                label="Summary"
                active={
                  currentView === "payments" &&
                  currentSubView === "summary"
                }
                onClick={() =>
                  onNavigate("payments", "summary")
                }
                collapsed={collapsed}
              />
              <SubMenuItem
                label="Payment Table"
                active={
                  currentView === "payments" &&
                  currentSubView === "table"
                }
                onClick={() =>
                  onNavigate("payments", "table")
                }
                collapsed={collapsed}
              />
              <SubMenuItem
                label="Order Settlements"
                active={
                  currentView === "payments" &&
                  currentSubView === "orders"
                }
                onClick={() =>
                  onNavigate("payments", "orders")
                }
                collapsed={collapsed}
              />
              <SubMenuItem
                label="Payout Batches"
                active={
                  currentView === "payments" &&
                  currentSubView === "payouts"
                }
                onClick={() =>
                  onNavigate("payments", "payouts")
                }
                collapsed={collapsed}
              />
              <SubMenuItem
                label="Refunds & Returns"
                active={
                  currentView === "payments" &&
                  currentSubView === "refunds"
                }
                onClick={() =>
                  onNavigate("payments", "refunds")
                }
                collapsed={collapsed}
              />
              <SubMenuItem
                label="Ad Deductions"
                active={
                  currentView === "payments" &&
                  currentSubView === "ads"
                }
                onClick={() =>
                  onNavigate("payments", "ads")
                }
                collapsed={collapsed}
              />

            </div>
          )}

          <MenuItem
            icon={
              <InventoryIcon
                active={currentView === "inventory"}
              />
            }
            label="Plan Inventory"
            active={currentView === "inventory"}
            onClick={() => onNavigate("inventory")}
            collapsed={collapsed}
          />

          <MenuItem
            icon={<DownloadIcon />}
            label="Download"
            active={currentView === "downloads"}
            onClick={() => onNavigate("downloads")}
            collapsed={collapsed}
          />

          <MenuItem
            icon={<SettingsIcon />}
            label="Settings"
            active={currentView === "settings"}
            onClick={() => onNavigate("settings")}
            collapsed={collapsed}
          />
        </div>

        {/* Collapse Button */}
        <div
          className={`absolute bg-white rounded-[8px] size-[24px] top-[82px] cursor-pointer hover:bg-gray-50 transition-all duration-300 border border-gray-200 ${
            collapsed ? "left-[23px]" : "left-[204px]"
          }`}
          onClick={onToggleCollapse}
        >
          <div className="overflow-clip relative rounded-[inherit] size-[24px] flex items-center justify-center">
            <ChevronLeft
              className={`w-4 h-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
            />
          </div>
        </div>

        {/* Brand Name Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="h-[76px] p-4">
            {!collapsed && (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center border border-orange-200">
                    <span className="text-lg">🔶</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      Brand Name
                    </p>
                    <p className="text-xs text-gray-500">
                      Pro Plan
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </>
            )}
            {collapsed && (
              <div className="flex items-center justify-center">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center border border-orange-200">
                  <span className="text-lg">🔶</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}