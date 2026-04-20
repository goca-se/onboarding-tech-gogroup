interface LogoProps {
  size?: number;
  color?: string;
}

export default function Logo({ size = 36, color = "#ffffff" }: LogoProps) {
  return (
    <svg
      width={size * 4.5}
      height={size}
      viewBox="0 0 200 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="gogroup"
    >
      <text
        x="0"
        y="34"
        fontFamily="'Poppins', sans-serif"
        fontWeight="800"
        fontSize="38"
        fill={color}
        letterSpacing="-1"
      >
        gogroup
      </text>
    </svg>
  );
}
