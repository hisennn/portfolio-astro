type IconProps = {
  name: string;
  size?: number;
  className?: string;
};

export default function Icon({ name, size = 16, className = '' }: IconProps) {
  return <i aria-hidden="true" className={`ph ph-${name} ${className}`.trim()} style={{ fontSize: size, lineHeight: 1 }} />;
}
