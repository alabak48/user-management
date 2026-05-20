import { type IconType } from "react-icons"

interface IconProps {
  icon: IconType
  size?: number
  className?: string
  "aria-hidden"?: boolean
}

function Icon({ icon: IconComponent, size = 20, className, "aria-hidden": ariaHidden = true }: IconProps) {
  return <IconComponent size={size} className={className} aria-hidden={ariaHidden} />
}

export default Icon
