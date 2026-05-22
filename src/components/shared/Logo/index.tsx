interface LogoProps {
  dark?: boolean
  size?: number
}

function Logo({ dark = false, size = 32 }: LogoProps) {
  const head = dark ? "#9370d8"               : "#512da7"
  const shL  = dark ? "rgba(147,112,216,0.6)" : "rgba(81,45,167,0.5)"
  const shR  = dark ? "rgba(147,112,216,0.35)": "rgba(81,45,167,0.3)"
  const bg   = dark ? "rgba(147,112,216,0.2)" : "rgba(81,45,167,0.12)"
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
      <rect width="32" height="32" rx="9" fill={bg} />
      <circle cx="16" cy="11.5" r="5.5" fill={head} />
      <circle cx="9.5" cy="23" r="4" fill={shL} />
      <circle cx="22.5" cy="23" r="4" fill={shR} />
    </svg>
  )
}

export default Logo
