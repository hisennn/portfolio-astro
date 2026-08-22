'use client';

type BoxIconProps = {
  name: string;
  size?: number;
  className?: string;
};

export default function BoxIcon({ name, size = 16, className = '' }: BoxIconProps) {
  const svgIcon = {
    'bx-sun': (
      <>
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2.5v2M12 19.5v2M4.5 12h-2M21.5 12h-2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4" />
      </>
    ),
    'bx-moon': <path d="M20.2 15.2A8 8 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z" />,
    'bx-chevron-left': <path d="m15 18-6-6 6-6" />,
    'bx-chevron-right': <path d="m9 18 6-6-6-6" />
  }[name];

  if (svgIcon) {
    return (
      <svg
        aria-hidden="true"
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {svgIcon}
      </svg>
    );
  }

  const iconClass = name.startsWith('bxl-')
    ? `bxl bx-${name.slice(4)}`
    : name.startsWith('bxf-')
      ? `bxf bx-${name.slice(4)}`
      : `bx ${name}`;

  return (
    <i
      aria-hidden="true"
      className={`${iconClass} ${className}`.trim()}
      style={{ fontSize: `${size}px`, lineHeight: 1 }}
    />
  );
}
