export const Helmet = ({ color = "#fff" }: { color: string }) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="300px"
      height="300px"
      viewBox="0 0 300 300"
      xmlSpace="preserve"
    >
      <g>
        <path
          style={{
            fill: color,
            stroke: "#000",
            strokeWidth: 21,
            strokeMiterlimit: 10,
          }}
          d="M61.5,197.6c0,0,113,79.6,154,59.6s13.4-55,13.4-55s17.7,4.1,18.8-4.6c0.9-7.4,0.3-45.6,0.1-57.5
		c0-2.3-1-4.5-2.7-6c-1.9-1.8-4.3-3.9-5.2-3.9c0,0-5.2-83-90-86.8S25.3,126.4,61.5,197.6z"
        />
      </g>
      <g>
        <path
          d="M239.9,126H125.6c0,0-18.1,1.1-18.1,17.4s0,21.9,0,21.9s-0.4,8.3,6,12.8c6.4,4.5,46.4,27.5,46.4,27.5s5.1,2.3,14.3,2.4
		c9.2,0.1,65.7,0,65.7,0V126z"
        />
        <circle style={{ fill: "#fff" }} cx="135.5" cy="150" r="12.7" />
      </g>
    </svg>
  );
};
