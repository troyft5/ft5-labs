// SVG recreation of the FinTech 5 logo mark
// Concave 5-point chevron/arrow shape matching the brand asset

export default function LogoMark({
  className = '',
  textColor = '#000000',
  markColor = '#336600',
  showText = true,
}: {
  className?: string
  textColor?: string
  markColor?: string
  showText?: boolean
}) {
  return (
    <svg
      viewBox="0 0 340 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="FinTech 5 logo"
    >
      {/* Chevron mark — concave 5-point polygon matching brand asset */}
      {/* Points: top-peak → inner-notch-top → far-left-tip → bottom-right → inner-notch-bottom */}
      <polygon
        points="248,4  218,78  6,108  330,108  330,52"
        fill={markColor}
      />

      {/* FinTech 5 wordmark */}
      {showText && (
        <text
          x="6"
          y="75"
          fontFamily="'Avenir Next', 'Avenir', -apple-system, 'Segoe UI', sans-serif"
          fontWeight="800"
          fontStyle="italic"
          fontSize="54"
          fill={textColor}
        >
          FinTech 5
        </text>
      )}
    </svg>
  )
}

// Compact icon-only version for small UI slots
export function LogoIcon({
  className = '',
  markColor = '#336600',
}: {
  className?: string
  markColor?: string
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="FinTech 5 icon"
    >
      {/* Same concave chevron, square crop */}
      <polygon
        points="74,3  62,62  0,94  97,94  97,38"
        fill={markColor}
      />
    </svg>
  )
}
