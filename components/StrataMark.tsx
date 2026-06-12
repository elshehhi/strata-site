/**
 * The Strata mark — three dune contours stacked on the depth axis
 * (near dawn → far blue). Simultaneously a landscape, a focus stack,
 * and a depth map. DESIGN_SPEC.md §A, concept 1.
 */
export default function StrataMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M3 10.5 C8 6.5, 12 6.5, 16 9 C20 11.5, 25 11, 29 8"
        stroke="#8FA6B8"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M3 17.5 C8 13.5, 13 14, 17 16.5 C21 19, 25.5 18, 29 15.5"
        stroke="#C6A07A"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M3 24.5 C8 20.5, 13 21, 17 23.5 C21 26, 25.5 25, 29 22.5"
        stroke="#E8A25C"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
