import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function svg(props: IconProps) {
  return {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
}

export function IconHome(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" />
    </svg>
  );
}

export function IconBriefcase(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
      <path d="M3 13h18" />
    </svg>
  );
}

export function IconUpload(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <path d="M12 16V5" />
      <path d="m8 9 4-4 4 4" />
      <path d="M5 19h14" />
    </svg>
  );
}

export function IconScan(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <path d="M7 4H5a1 1 0 0 0-1 1v2" />
      <path d="M17 4h2a1 1 0 0 1 1 1v2" />
      <path d="M7 20H5a1 1 0 0 1-1-1v-2" />
      <path d="M17 20h2a1 1 0 0 0 1-1v-2" />
      <path d="M8 12h8" />
    </svg>
  );
}

export function IconGap(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <path d="M4 19V9" />
      <path d="M10 19V5" />
      <path d="M16 19v-7" />
      <path d="M20 19v-3" />
    </svg>
  );
}

export function IconUser(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 19c1.2-3.4 3.7-5 7-5s5.8 1.6 7 5" />
    </svg>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

export function IconBell(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <path d="M6 16V11a6 6 0 1 1 12 0v5l1.2 2H4.8z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <path d="m5 12 4.5 4.5L19 7" />
    </svg>
  );
}

export function IconX(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <path d="m7 7 10 10" />
      <path d="M17 7 7 17" />
    </svg>
  );
}

export function IconSpark(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <path d="M12 3v4" />
      <path d="M12 17v4" />
      <path d="M5 12H3" />
      <path d="M21 12h-2" />
      <path d="m7 7-2-2" />
      <path d="m19 19-2-2" />
      <path d="m17 7 2-2" />
      <path d="m5 19 2-2" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  );
}

export function IconFile(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8z" />
      <path d="M14 3v5h5" />
    </svg>
  );
}

export function IconLogout(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <path d="M10 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h4" />
      <path d="m15 16 5-4-5-4" />
      <path d="M20 12H10" />
    </svg>
  );
}

export function IconFilter(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <path d="M4 5h16l-6 7v6l-4 2v-8z" />
    </svg>
  );
}

export function IconMap(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z" />
      <circle cx="12" cy="11" r="2" />
    </svg>
  );
}

export function IconExternal(props: IconProps) {
  return (
    <svg {...svg(props)}>
      <path d="M14 5h5v5" />
      <path d="M19 5 10 14" />
      <path d="M11 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5" />
    </svg>
  );
}
