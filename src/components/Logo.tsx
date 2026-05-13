export const Logo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 180 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Shield icon */}
      <path
        d="M18 4L6 9V21C6 27.6 11.4 33.6 18 36C24.6 33.6 30 27.6 30 21V9L18 4Z"
        fill="white"
      />
      <path
        d="M18 10L11 13V21C11 25.4 14.2 29.4 18 31.2C21.8 29.4 25 25.4 25 21V13L18 10Z"
        fill="#0a0a0a"
      />
      <path
        d="M15 20L17.5 22.5L22 17"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* JUSTERA text */}
      <text
        x="38"
        y="27"
        fontFamily="monospace"
        fontSize="18"
        fontWeight="600"
        fill="white"
        letterSpacing="1"
      >
        JUSTERA
      </text>
    </svg>
  );
};
