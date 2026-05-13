'use client';

type BoxIconProps = {
  name: string;
  size?: number;
  className?: string;
};

export default function BoxIcon({ name, size = 16, className = '' }: BoxIconProps) {
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
