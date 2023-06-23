export const Loader = () => (
  <svg id="L2" className="h-4 w-4" viewBox="-10 -10 120 120">
    <circle
      fill="none"
      stroke="currentColor"
      strokeWidth="10"
      strokeMiterlimit="10"
      cx="50"
      cy="50"
      r="48"
    />
    <line
      fill="none"
      strokeLinecap="round"
      stroke="currentColor"
      strokeWidth="10"
      strokeMiterlimit="10"
      x1="50"
      y1="50"
      x2="85"
      y2="50.5"
    >
      <animateTransform
        attributeName="transform"
        dur="2s"
        type="rotate"
        from="0 50 50"
        to="360 50 50"
        repeatCount="indefinite"
      />
    </line>
    <line
      fill="none"
      strokeLinecap="round"
      stroke="currentColor"
      strokeWidth="10"
      strokeMiterlimit="10"
      x1="50"
      y1="50"
      x2="49.5"
      y2="74"
    >
      <animateTransform
        attributeName="transform"
        dur="15s"
        type="rotate"
        from="0 50 50"
        to="360 50 50"
        repeatCount="indefinite"
      />
    </line>
  </svg>
);
