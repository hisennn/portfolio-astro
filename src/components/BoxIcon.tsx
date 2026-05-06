'use client';

type BoxIconProps = {
  name: string;
  size?: number;
  className?: string;
};

export default function BoxIcon({ name, size = 16, className = '' }: BoxIconProps) {
  return (
    <i
      aria-hidden="true"
      className={`bx ${name} ${className}`.trim()}
      style={{ fontSize: `${size}px`, lineHeight: 1 }}
    />
  );
}
