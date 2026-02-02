type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  hamburger: (props: IconProps) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#042B59"
    >
      <path
        d="M3 6H21M3 12H21M3 18H21"
        stroke="#042B59"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};
